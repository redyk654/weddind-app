import { Button } from '@mui/material'
import React from 'react'
import AddIcon from '@mui/icons-material/Add'
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

export default function AddEventButton() {

    const navigate = useNavigate();
    const { user } = useAuth();

  return (
    <Button
        onClick={() => navigate(`/layoutnavbar/evenements/${user.uid}/create`)}
        variant="contained"
        color='dark'
        fullWidth
        startIcon={<AddIcon />}
    >
        Ajouter un evenement
    </Button>
  )
}
