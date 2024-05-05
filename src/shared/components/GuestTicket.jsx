import { Box, Button, CircularProgress, IconButton } from '@mui/material';
import React, { forwardRef, useRef, useState } from 'react'
import { QRCodeSVG } from 'qrcode.react';
import { toPng } from 'html-to-image';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    height: 600,
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const GuestTicket = forwardRef(({ imageUrl, qrContent, nom, handleCloseModalQrCode, addNewGuest, clearForm }, ref) => {
    
    const imageTicketRef = useRef()

    const [isSaving, setIsSaving] = useState(false);

    const downloadTicket = () => {
        toPng(imageTicketRef.current, { cacheBust: false })
            .then((dataUrl) => {
                const link = document.createElement("a");
                link.download = `invitation-${nom}.png`;
                link.href = dataUrl;
                link.click();
                setIsSaving(false);
                handleCloseModalQrCode();
                clearForm();
            })
            .catch((err) => {
                console.log(err);
        });
    };

    const saveGuestTicket = () => {
        setIsSaving(true);
        addNewGuest();
        downloadTicket();
    }
    
  return (
    <Box sx={style} component='div' className='bg-dark'>
        <div>
            <div 
                className='text-light position-absolute top-0 end-0 pe-4'
            >
                <IconButton size='large' onClick={handleCloseModalQrCode}>
                    <CloseRoundedIcon color='light' />
                </IconButton>
            </div>
            <h2 className='text-light text-capitalize'>Billet d'invitation</h2>
            <Box sx={{ m: 0, position: 'relative' }}>
                <Button
                    onClick={saveGuestTicket}
                    disabled={isSaving}
                    variant="contained"
                    color='primary'
                    fullWidth
                >
                    Enregistrer
                </Button>
                {isSaving && (
                    <CircularProgress
                        color='light'
                        size={24}
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            marginTop: '-12px',
                            marginLeft: '-12px'
                        }}
                    />
                )}
            </Box>
        </div>
        <div
            id='invitation-ticket'
            ref={imageTicketRef}
            style={{
                width: '100%',
                position: 'relative'
            }}
        >
            <img
                src={imageUrl}
                // className='w-100 h-100'
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                }}
                alt="faire part de l'évènement"
            />
            <div
                style={{ 
                    position: 'absolute',
                    backgroundColor: '#fff',
                    padding: '4px',
                    top: '0%',
                    left: '5%'
                }}
                component='div'
            >
                <QRCodeSVG value={qrContent} size={45} />
            </div>
            <p
                style={{
                    position: 'absolute',
                    top: '75%',
                    left: '25%',
                    fontSize: 9,
                    fontWeight: 'bold'
                }}
            >
                {nom.toUpperCase()}
            </p>
        </div>
    </Box>
  )
});

export default GuestTicket;