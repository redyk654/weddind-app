import { Container, Grid } from '@mui/material'
import React from 'react'
import GoToSignIn from '../components/Home/GoToSignIn'
import GoToSignUp from '../components/Home/GoToSignUp'

export default function Home() {
  return (
    <Container maxWidth="" className='pt-4'>
      <div>
        <div>
          <p className='h1 text-center'>Bienvenue sur <strong>WeddingApp</strong></p>
          <p className='h3 text-center'>Organisez votre mariage en toute simplicité</p>
        </div>
        <Grid container spacing={2} className='mt-3'>
          <Grid item xs={6} sm={6}>
            <GoToSignIn />
          </Grid>
          <Grid item xs={6} sm={6}>
            <GoToSignUp />
          </Grid>
        </Grid>
      </div>
    </Container>
  )
}
