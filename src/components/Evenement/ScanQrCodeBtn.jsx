import { Button } from '@mui/material'
import React from 'react'
import QrCodeScannerRoundedIcon from '@mui/icons-material/QrCodeScannerRounded';

export default function ScanQrCodeBtn({ scanQrCode }) {
  return (
    <Button
        sx={{ mb: 1 }}
        onClick={scanQrCode}
        variant="contained"
        color='primary'
        fullWidth
        startIcon={<QrCodeScannerRoundedIcon />}
    >
        Scanner un QR Code
    </Button>
  )
}
