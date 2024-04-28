import React from 'react'
import { Box, Button } from '@mui/material'
import GoogleIcon from '@mui/icons-material/Google';


export default function GoogleButton({ children, handleGoogleButtonClick}) {
  return (
    <Box className='mt-3 d-flex align-items-center justify-content-center'>
        <Button onClick={handleGoogleButtonClick} variant="outlined" color='dark' className='w-75 rounded-5'>
            <div className='d-flex align-items-center justify-content-center'>
                <GoogleIcon color='secondary' />
                <p className='pt-3 ps-1'>
                    {children}
                </p>
            </div>
        </Button>
    </Box>
  )
}
