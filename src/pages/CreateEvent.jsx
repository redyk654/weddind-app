import { Button, Grid, TextField } from '@mui/material'
import React, { useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import firebase from '../firebase'
import CustomizedSnackbars from '../shared/components/CustomizedSnackbars'
import RegisterButton from '../shared/components/RegisterButton'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

export default function CreateEvent() {

    const customizedSnackbarsRef = useRef(null)
    const fileRef = useRef(null)
    const { userId } = useParams()

    const [description, setDescription] = useState('');
    const [dateEvent, setDateEvent] = useState('');
    const [isHandlingSubmit, setisHandlingSubmit] = useState(false);

    const handleDescription = (e) => {
      setDescription(e.target.value)
    }

    const handleDateEvent = (e) => {
      setDateEvent(e.target.value)
    }

    const handleFileChange = (e) => {
      // Mettez à jour le fichier sélectionné
      fileRef.current = e.target.files[0];
    };

    const validation = () => {
      return description.length > 0 && dateEvent.length > 0
    }

    const upLoadFileToStorage = async () => {
      try {
        const storageRef = firebase.storage().ref();
        const file = fileRef.current;

        if (!file) {
          console.error("Veuillez sélectionner un fichier.");
          return;
        }

        const fileSnapshot = await storageRef.child(file.name).put(file);
        const downloadURL = await fileSnapshot.ref.getDownloadURL();
        return downloadURL;
      } catch (error) {
        console.error("Erreur lors de l'upload de l'image", error)
      }
    }

    const handleSubmit = async (e) => {
      e.preventDefault()
      setisHandlingSubmit(true)
      
      if (validation()) {
        try {
          const fileUrl = await upLoadFileToStorage()
          const db = firebase.firestore()

          await db.collection('evenements').doc().set({
            description: description,
            dateEvent: dateEvent,
            userId: userId,
            fileUrl: fileUrl,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
          })
          
          clearForm();
          customizedSnackbarsRef.current.handleSuccess();
          setisHandlingSubmit(false)
        } catch (error) {
          customizedSnackbarsRef.current.handleError();
          setisHandlingSubmit(false)
          console.error("Erreur lors de l'enregistrement de l'évènement", error)
        }
      } else {
          console.log("Veuillez remplir tous les champs")
      }
    }

    const clearForm = () => {
      setDescription('');
      setDateEvent('');
      fileRef.current = null;
    }

  return (
    <div>
        <CustomizedSnackbars
          successMessage="Evènement enregistré avec succès"
          errorMessage="Erreur lors de l'enregistrement de l'évènement"
          ref={customizedSnackbarsRef}
        />
        <h1>Nouvel évènement</h1>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3} className='mt-3'>
            <Grid item xs={12}>
              <div className=''>
                <TextField
                  label='Description'
                  variant='outlined'
                  value={description}
                  onChange={handleDescription}
                  fullWidth
                  required
                />
              </div>
            </Grid>
            <Grid item xs={12}>
              <div className=''>
                <label htmlFor="dateEvent">Date* &nbsp;</label>
                <input
                  type="date"
                  name=""
                  id="dateEvent"
                  value={dateEvent}
                  onChange={handleDateEvent}
                  required
                />
              </div>
            </Grid>
          </Grid>
          <Grid item xs={12} className='mt-3'>
            <Button
              variant='outlined'
              color='primary'
              fullWidth
              startIcon={<CloudUploadIcon />}
            >
              <input
                onChange={handleFileChange}
                type='file'
                accept='image/*'
                required
              />
            </Button>
          </Grid>
          <Grid item xs={12} className='mt-3'>
            <RegisterButton isHandlingSubmit={isHandlingSubmit}>
              Enregistrer
            </RegisterButton>
          </Grid>
        </form>
    </div>
  )
}

