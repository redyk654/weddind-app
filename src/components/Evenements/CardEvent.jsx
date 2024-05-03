import { Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

export default function CardEvent({ event }) {
  return (
    <Grid item xs={6}>
        <Card sx={{ maxWidth: 345 }}>
            <CardMedia
                component="img"
                alt="faire part"
                height="140"
                image={event.data.fileUrl}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                {event.data.description}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                {event.data.dateEvent}
                </Typography>
            </CardContent>
            <CardActions>
                <Link to={`/layoutnavbar/evenements/${event.id}`}>
                    <Button size="small">
                        Voir
                    </Button>
                </Link>
            </CardActions>
        </Card>
    </Grid>
  )
}
