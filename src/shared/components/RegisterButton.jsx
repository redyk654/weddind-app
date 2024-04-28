import { Button } from '@mui/material'
import React from 'react'

export default function RegisterButton({ children }) {
  return (
    <Button type="submit" variant="contained" color='dark' fullWidth>
        {children}
    </Button>
  )
}
