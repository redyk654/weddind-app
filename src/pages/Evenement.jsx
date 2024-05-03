import { Button, Grid, InputAdornment, TextField } from '@mui/material'
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import AddIcon from '@mui/icons-material/Add'


export const Evenement = () => {

  const { eventId } = useParams()
  const navigate = useNavigate();


  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <h1>Liste des invités</h1>
        </Grid>
        <Grid item xs={12}>
          <Button
            onClick={() => navigate(`/layoutnavbar/evenements/${eventId}/addguest`)}
            variant="contained"
            color='dark'
            fullWidth
            startIcon={<AddIcon />}
          >
            Ajouter un invité
          </Button>
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="recherche-invite"
            variant="outlined"
            placeholder='Rechercher un invité'
            size='small'
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchRoundedIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
      </Grid>
    </div>
  )
}
