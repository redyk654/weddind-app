import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import CustomizedSnackbars from '../shared/components/CustomizedSnackbars'
import { Grid, Modal, TextField } from '@mui/material'
import RegisterButton from '../shared/components/RegisterButton'
import firebase from '../firebase'
import GuestTicket from '../shared/components/GuestTicket'

export default function AddGuest() {
    const customizedSnackbarsRef = useRef()
    const imageTicketRef = useRef()
    const { eventId } = useParams()

    const [nom, setNom] = useState('')
    const [table, setTable] = useState('')
    const [helperTextNom, setHelperTextNom] = useState('')
    const [helperTextTable, setHelperTextTable] = useState('')
    const [qrContent, setQrContent] = useState('')
    const [isHandlingSubmit, setisHandlingSubmit] = useState(false)
    const [isModalQrCodeOpen, setisModalQrCodeOpen] = useState(false)
    const [imageUrl, setImageUrl] = useState('')

    useEffect(() => {
        fetchUrlImage().then((url) => {
            setImageUrl(url)
        })
    })

    const handleNom = (e) => {
        setNom(e.target.value)
    }

    const handleTable = (e) => {
        setTable(e.target.value)
    }

    const handleOpenModalQrCode = () => {
        setisModalQrCodeOpen(true)
    }

    const handleCloseModalQrCode = () => {
        setisModalQrCodeOpen(false)
    }

    const fetchUrlImage = async () => {
        try {
            const db = firebase.firestore();
            const eventRef = db.collection('evenements').doc(eventId);
            const doc = await eventRef.get();
            if (!doc.exists) {
                console.log('No such document!');
                return;
            }
            return doc.data().fileUrl;
        } catch (error) {
            console.error("Erreur lors de la récupération de l'image", error)
        }
    }

    const verifyGuestExistence = async (guestListRef) => {
        setHelperTextNom('');
        setHelperTextTable('');
        const formatNom = nom.trim().toUpperCase();
        const formatTable = table.trim().toUpperCase();
        const guestQuery = await guestListRef.where('nom', '==', formatNom).get();
        const tableQuery = await guestListRef.where('table', '==', formatTable).get();
        if (!guestQuery.empty) {
            setHelperTextNom("Un invité avec le même nom existe déjà.");
            setisHandlingSubmit(false);
            return true;
        } else if (!tableQuery.empty) {
            setHelperTextTable("La table est déjà occupée.");
            setisHandlingSubmit(false);
            return true;
        }
        setHelperTextNom('');
        setHelperTextTable('');
        return false;
    }

    const addNewGuest = async () => {
        try {
            const db = firebase.firestore();
            const guestListRef = db.collection('evenements').doc(eventId).collection('guestlist');
            const formatNom = nom.trim().toUpperCase();
            const formatTable = table.trim().toUpperCase();
            await guestListRef.add({
                nom: formatNom,
                table: formatTable,
                qrContent: qrContent,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            });
        } catch (error) {
            customizedSnackbarsRef.current.handleError()
            console.error("Erreur lors de l'enregistrement de l'invité", error)
        }
    }

    const handleSubmitCreateGuest = async (e) => {
        e.preventDefault()
        setisHandlingSubmit(true)
        try {
            const db = firebase.firestore();
            const guestListRef = db.collection('evenements').doc(eventId).collection('guestlist');
            
            if (await verifyGuestExistence(guestListRef)) {
                return;
            }

            const formatNom = nom.trim().toUpperCase();
            const formatTable = table.trim().toUpperCase();

            const qrContentCreated = `${formatNom}-${formatTable}`;

            setQrContent(qrContentCreated)
            setisHandlingSubmit(false)
            handleOpenModalQrCode()
        } catch (error) {
            customizedSnackbarsRef.current.handleError()
            console.error("Erreur lors de l'enregistrement de l'invité", error)
        }
    }

    const clearForm = () => {
        customizedSnackbarsRef.current.handleSuccess()
        setNom('')
        setTable('')
        setHelperTextNom('');
        setHelperTextTable('');
    }

  return (
    <div>
        <CustomizedSnackbars
          successMessage="Invité enregistré avec succès"
          errorMessage="Erreur lors de l'enregistrement de l'invité"
          ref={customizedSnackbarsRef}
        />
        <h1>Nouvel invité</h1>
        <form onSubmit={handleSubmitCreateGuest}>
            <Grid container spacing={3} className='mt-3'>
                <Grid item xs={12}>
                    <TextField
                        value={nom}
                        onChange={handleNom}
                        helperText={helperTextNom}
                        error={helperTextNom !== ''}
                        required
                        fullWidth
                        id="nom"
                        label="Nom"
                        variant="outlined"
                        autoComplete='off'
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        value={table}
                        onChange={handleTable}
                        helperText={helperTextTable}
                        error={helperTextTable !== ''}
                        type='number'
                        required
                        fullWidth
                        id="table"
                        label="N° de table"
                        variant="outlined"
                        autoComplete='off'
                    />
                </Grid>
                <Grid item xs={12}>
                    <RegisterButton isHandlingSubmit={isHandlingSubmit}>
                        Voir le billet
                    </RegisterButton>
                </Grid>
            </Grid>
        </form>
        <Modal
            open={isModalQrCodeOpen}
            onClose={handleCloseModalQrCode}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <GuestTicket
                nom={nom}
                table={table}
                qrContent={qrContent}
                imageUrl={imageUrl}
                ref={imageTicketRef}
                handleCloseModalQrCode={handleCloseModalQrCode}
                addNewGuest={addNewGuest}
                clearForm={clearForm}
            />
        </Modal>
    </div>
  )
}
