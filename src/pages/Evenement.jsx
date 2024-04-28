import React from 'react'
import { useParams } from 'react-router-dom'

export const Evenement = () => {

  const { eventId } = useParams()

  return (
    <div>
      Evenement number {eventId}
    </div>
  )
}
