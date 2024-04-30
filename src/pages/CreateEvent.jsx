import { Grid, TextField } from '@mui/material'
import React, { useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import firebase from '../firebase'
import CustomizedSnackbars from '../shared/components/CustomizedSnackbars'
import RegisterButton from '../shared/components/RegisterButton'

export default function CreateEvent() {

    const customizedSnackbarsRef = useRef(null)
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

    const validation = () => {
        return description.length > 0 && dateEvent.length > 0
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setisHandlingSubmit(true)
        if (validation()) {
          try {
            const db = firebase.firestore()
            await db.collection('evenements').doc().set({
                description: description,
                dateEvent: dateEvent,
                userId: userId,
                guestList: []
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
            <RegisterButton isHandlingSubmit={isHandlingSubmit}>
              Enregistrer
            </RegisterButton>
          </Grid>
        </form>
    </div>
  )
}

