import { Box, Button, Container } from '@mui/material'
import React from 'react'
import firebase from '../firebase'
import { Outlet, useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';

export default function LayoutNavBar() {

    const navigate = useNavigate();
    const { user, loading } = useAuth();

    const signOut = () => {
        firebase.auth().signOut()
        navigate('/signin')
    }

    const goBack = () => {
        navigate(-1)
    }

    if (loading) {
        return <Container>
                <div>
                  <h1>Veuillez patienter...</h1>
                </div>
              </Container>
    }

    if (user) {
        return (
            <div>
                <Box sx={{bgcolor: '#f1f1f1'}} className='p-2 d-flex justify-content-between'>
                    <Box>
                        <Button onClick={goBack} variant='text' color='primary' className=' text-lowercase'>
                            <ArrowBackIosRoundedIcon color='primary' />
                            retour
                        </Button>
                      <p>
                        Bienvenue <strong className='text-uppercase'>{user.displayName}</strong></p>
                    </Box>
                    <Box>
                        <Button
                        onClick={signOut}
                        variant="outlined"
                        color='primary'
                        size='small'
                        >
                        deconnexion
                        </Button>
                    </Box>
                </Box>
                <Container>
                    <Outlet />
                </Container>
            </div>
        )
    } else {
        navigate("/signin")
    }
}
