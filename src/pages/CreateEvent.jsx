import React from 'react'
import { useParams } from 'react-router-dom'

export default function CreateEvent() {
    const { userId } = useParams()
  return (
    <div>CreateEvent for user : {userId}</div>
  )
}

