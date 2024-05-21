import { Grid, InputAdornment, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import firebase from '../firebase';
import { Scanner } from '@yudiel/react-qr-scanner';
import AlertScannedResult from '../components/Evenement/AlertScannedResult';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { PDFDownloadLink } from '@react-pdf/renderer';
import GuestListPdf from '../components/Evenement/GuestListPdf';
import DisplayGuestList from '../components/Evenement/DisplayGuestList';
import ScanQrCodeBtn from '../components/Evenement/ScanQrCodeBtn';
import AddGuestBtn from '../components/Evenement/AddGuestBtn';

export const Evenement = () => {

  const { eventId } = useParams()

  const [guestList, setGuestList] = useState([])
  const [guestFound, setGuestFound] = useState({nom: '',table: ''})
  const [isFetchingGuestList, setIsFetchingGuestList] = useState(true)
  const [guestResearch, setGuestResearch] = useState('')
  const [isScanning, setIsScanning] = useState(false)
  const [isSnackBar, setIsSnackBar] = useState(false)
  const [textInSnackBar, setTextSnackBar] = useState('')

  const filteredGuestsList = guestList.filter(guest => {
    return guest.data.nom.toLowerCase().includes(guestResearch.toLowerCase())
  })

  useEffect(() => {
    fetchGuests()
  })

  const fetchGuests = async () => {
    try {
      const db = firebase.firestore();
      const guestsRef = db.collection('evenements').doc(eventId).collection('guestlist');
      const snapshot = await guestsRef.get();
      if (snapshot.empty) {
        setIsFetchingGuestList(false)
        return;
      }
      const guestByTable = {}
      snapshot.forEach(doc => {
        // tempList.push({ id: doc.id, data: doc.data() });
        const guestData = doc.data()
        const tableNum = guestData.table
        if (!guestByTable[tableNum]) {
          guestByTable[tableNum] = []
        }
        guestByTable[tableNum].push({ id: doc.id, data: guestData })
      });
      const tempList = []
      for (const tableNum in guestByTable) {
        tempList.push(...guestByTable[tableNum])
      }
      setGuestList(tempList)
      setIsFetchingGuestList(false)
    } catch (error) {
      console.error("Erreur lors de la récupération des invités", error)
    }
  }

  const handleGuestResearch = (e) => {
    setGuestResearch(e.target.value)
  }

  const handleOpenSnackBar = () => {
    setIsSnackBar(true)
  }

  const handleCloseSnackBar = () => {
    setIsSnackBar(false)
  }

  const scanQrCode = () => {
    setIsScanning(true)
  }

  const updateGuestStatut = async (guestId, statut) => {
    try {
      const db = firebase.firestore();
      const guestRef = db.collection('evenements').doc(eventId).collection('guestlist').doc(guestId);
      await guestRef.update({ statut: statut });
    } catch (error) {
      console.error("Erreur lors de la mise à jour du statut de l'invité", error)
    }
  }

  const handleScanning = (text, result) => {
    const data = text.split('-');
    const guestName = data[0]
    const guestTable = data[1]
    const guest = guestList.find(guest => guest.data.nom.toUpperCase() === guestName.toUpperCase() && guest.data.table === guestTable)
    if (guest) {
      if (guest.data.statut === 'checked') {
        setTextSnackBar('Invité déjà scanné !')
        setGuestFound({nom: '', table: ''})
      } else {
        setTextSnackBar('Invité trouvé !')
        setGuestFound({nom: guest.data.nom, table: guest.data.table})
        updateGuestStatut(guest.id, 'checked')
      }
    } else {
      setTextSnackBar('Invité non trouvé !')
      setGuestFound({nom: '', table: ''})
    }
    handleOpenSnackBar()
    setIsScanning(false)
  }

  return (
    <div>
      <AlertScannedResult
        isSnackBar={isSnackBar}
        handleCloseSnackBar={handleCloseSnackBar}
        textInSnackBar={textInSnackBar}
        guestFound={guestFound}
      />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <div className={`${!isScanning && 'd-none'}`}>
            <Scanner
                onResult={(text, result) => handleScanning(text, result)}
                onError={(error) => console.log(error?.message)}
                enabled={isScanning}
            />
          </div>
          <ScanQrCodeBtn scanQrCode={scanQrCode} />
          <AddGuestBtn eventId={eventId} />
        </Grid>
        <Grid item xs={12}>
          <h1>
            Liste des invités
            <span>
              {'(' + guestList.length + ')'}
            </span>
            <span>
              <PDFDownloadLink
                document={<GuestListPdf guestList={guestList} />}
                fileName="guestlist.pdf"
              >
                {({ loading }) =>
                  loading ? 'Chargement du document...' : <PictureAsPdfIcon />
                }
              </PDFDownloadLink>
            </span>
          </h1>
        </Grid>
        <Grid item xs={12}>
          <TextField
            value={guestResearch}
            onChange={handleGuestResearch}
            id="recherche-invite"
            variant="outlined"
            placeholder='Rechercher un invité'
            size='small'
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchRoundedIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} sx={{ width: '100%', overflow: 'hidden' }}>
          <DisplayGuestList
            filteredGuestsList={filteredGuestsList}
            isFetchingGuestList={isFetchingGuestList}
          />
        </Grid>
      </Grid>
    </div>
  )
}
