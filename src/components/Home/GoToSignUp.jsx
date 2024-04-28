import { Button } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

export default function GoToSignUp() {
  return (
    <Link to='/signup'>
        <Button variant='outlined' color='dark' fullWidth>Créer un compte</Button>
    </Link>
)
}
