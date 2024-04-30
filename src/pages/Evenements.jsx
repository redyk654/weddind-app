import React from 'react'
import { Outlet, useNavigate, useParams } from 'react-router-dom'
import { Button } from '@mui/material'
import useAuth from '../hooks/useAuth'
import AddIcon from '@mui/icons-material/Add'

export default function Evenements() {
    const { eventId } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();

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
