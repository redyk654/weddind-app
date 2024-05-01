import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate, useParams } from 'react-router-dom'
import { Button } from '@mui/material'
import useAuth from '../hooks/useAuth'
import AddIcon from '@mui/icons-material/Add'
import firebase from '../firebase'

export default function Evenements() {
    const { eventId } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();

    const [eventsList, setEventsList] = useState([])

    useEffect(() => {
      if (user) {
        fecthEvents()
      }
    }, [user])

    const fecthEvents = async () => {
      try {
        const db = firebase.firestore();
        const eventsRef = db.collection('evenements');
        const snapshot = await eventsRef.where('userId', '==', user.uid).get();
        if (snapshot.empty) {
            console.log('No matching documents.');
            return;
        }
        const tempList = []
        snapshot.forEach(doc => {
            tempList.push(doc.data())
        });
        setEventsList(tempList)
      } catch (error) {
        console.error("Erreur lors de la récupération des évènements", error)
      }
    }


    if (eventId) {
        return (
            <Outlet />
        )
    }

    return (
      <div>
          <div>
            <h1>Evenements</h1>
            <Button
              onClick={() => navigate(`/layoutnavbar/evenements/${user.uid}/create`)}
              variant="contained"
              color='dark'
              fullWidth
              startIcon={<AddIcon />}
            >
              Ajouter un evenement
            </Button>
          </div>
      </div>
    )

}
