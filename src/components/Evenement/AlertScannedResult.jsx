import { Alert, AlertTitle, Backdrop } from '@mui/material'
import React from 'react'

export default function AlertScannedResult({ isSnackBar, handleCloseSnackBar, textInSnackBar, guestFound}) {
  return (
    <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isSnackBar}
        onClick={handleCloseSnackBar}
    >
        <Alert
            variant='filled'
            severity={`${guestFound.nom.length > 0 ? 'success' : 'error'}`}
            sx={{position: 'absolute', top: '15%'}}
        >
            <AlertTitle>
                {`${textInSnackBar}`}
            </AlertTitle>
            {`${guestFound.nom.length > 0 ? `Nom : ${guestFound.nom}` : ''}`}
            <br />
            {`${guestFound.nom.length > 0 ? `N° Table : ${guestFound.table}` : ''}`}
        </Alert>
    </Backdrop>
  )
}
