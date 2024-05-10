import React, { useEffect, useState } from 'react'
import { Outlet, useParams } from 'react-router-dom'
import { Grid } from '@mui/material'
import useAuth from '../hooks/useAuth'
import CardEvent from '../components/Evenements/CardEvent'
import AddEventButton from '../components/Evenements/AddEventButton'
import NoEventFound from '../components/Evenements/NoEventFound'
import LoadingData from '../shared/components/LoadingData'
import { fetchEvents } from '../requests/RGet'

export default function Evenements() {
  
  const { eventId } = useParams();
  const { user } = useAuth();

  const [eventsList, setEventsList] = useState([])
  const [isFetching, setIsFetching] = useState(true)

  useEffect(() => {
    if (user) {
      handleFetchEvents()
    }
  })

  const handleFetchEvents = async () => {
    try {
      const tempList = await fetchEvents(user.uid)
      setEventsList(tempList)
      setIsFetching(false)
    } catch (error) {
      console.error("Erreur lors de la récupération des évènements", error)
    }
  }


  if (eventId) {
      return (
        <Outlet />
      )
  }

  return (
    <div>
        <div>
          <h1>Evènements</h1>

          <AddEventButton />

          {!isFetching ?
            <Grid className='mt-3' container spacing={2}>
              {eventsList.length > 0 ?
                eventsList.map((event, index) => (
                  <CardEvent
                    key={index}
                    event={event}
                  />
                )) :
                <NoEventFound />
              }
            </Grid> :
            <LoadingData />
          }
        </div>
    </div>
  )

}
