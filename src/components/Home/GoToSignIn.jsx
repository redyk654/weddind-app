import { Button } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

export default function GoToSignIn() {
  return (
    <Link to='/signin'>
        <Button variant='contained' color='dark' fullWidth>Se connecter</Button>
    </Link>
  )
}
