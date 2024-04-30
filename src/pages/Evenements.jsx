import React from 'react'
import { Outlet, useNavigate, useParams } from 'react-router-dom'
import firebase from '../firebase'
import { Button, Container } from '@mui/material'
import useAuth from '../hooks/useAuth'

export default function Evenements() {
    const { eventId } = useParams()
    const navigate = useNavigate()
    const { user, loading } = useAuth();

    if (loading) {
        return <Container>
                <div>
                  <h1>Veuillez patienter...</h1>
                </div>
              </Container>
    }

    if (user) {
      // L'utilisateur est authentifié
      // return <p>
      //           Bonjour, {user.displayName}!
      //           <Button
      //             onClick={() => firebase.auth().signOut()}
      //             type="submit"
      //             variant="contained"
      //             color='dark'
      //             fullWidth
      //           >
      //             deconnexion
      //           </Button>
      //         </p>;
      if (eventId) {
          return (
              <Outlet />
          )
      }
  
      return (
        <div>
          Evenements
          <p>Bonjour, {user.displayName}!</p>
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
