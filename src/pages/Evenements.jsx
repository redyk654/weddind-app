import React from 'react'
import { Outlet, useNavigate, useParams } from 'react-router-dom'
import firebase from '../firebase'
import { Button } from '@mui/material'
import useAuth from '../hooks/useAuth'

export default function Evenements() {
    const { eventId } = useParams()
    const navigate = useNavigate()
    const [user, loading] = useAuth();

    if (loading) {
        return <p>Chargement...</p>;
    }

    if (user) {
      // L'utilisateur est authentifié
      // return <p>Bonjour, {user.displayName}!</p>;
      if (eventId) {
          return (
              <Outlet />
          )
      }
  
      return (
        <div>
          Evenements
          <Button
            onClick={() => firebase.auth().signOut()}
            type="submit"
            variant="contained"
            color='dark'
            fullWidth
          >
            deconnexion
          </Button>
        </div>
      )
    } else {
      navigate("/signin")
    }

}
