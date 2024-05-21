import { Button } from '@mui/material'
import React from 'react'
import AddIcon from '@mui/icons-material/Add'
import { useNavigate } from 'react-router-dom'

export default function AddGuestBtn({ eventId }) {
    
    const navigate = useNavigate();

  return (
    <Button
        onClick={() => navigate(`/layoutnavbar/evenements/${eventId}/addguest`)}
        variant="contained"
        color='dark'
        fullWidth
        startIcon={<AddIcon />}
    >
        Ajouter un invité
    </Button>
  )
}
