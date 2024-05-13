import { Badge, Button, Grid, InputAdornment, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import AddIcon from '@mui/icons-material/Add'
import firebase from '../firebase';
import QrCodeScannerRoundedIcon from '@mui/icons-material/QrCodeScannerRounded';
import { Scanner } from '@yudiel/react-qr-scanner';
import AlertScannedResult from '../components/Evenement/AlertScannedResult';

export const Evenement = () => {

  const { eventId } = useParams()
  const navigate = useNavigate();

  const [guestsList, setGuestsList] = useState([])
  const [guestFound, setGuestFound] = useState({nom: '',table: ''})
  const [isFetchingGuestList, setIsFetchingGuestList] = useState(true)
  const [guestResearch, setGuestResearch] = useState('')
  const [isScanning, setIsScanning] = useState(false)
  const [isSnackBar, setIsSnackBar] = useState(false)
  const [textInSnackBar, setTextSnackBar] = useState('')

  const filteredGuestsList = guestsList.filter(guest => {
    return guest.data.nom.toLowerCase().includes(guestResearch.toLowerCase())
  })

  useEffect(() => {
    fetchGuests()
  })

  const fetchGuests = async () => {
    try {
      const db = firebase.firestore();
      const guestsRef = db.collection('evenements').doc(eventId).collection('guestlist');
      const snapshot = await guestsRef.get();
      if (snapshot.empty) {
        setIsFetchingGuestList(false)
        return;
      }
      const guestByTable = {}
      snapshot.forEach(doc => {
        // tempList.push({ id: doc.id, data: doc.data() });
        const guestData = doc.data()
        const tableNum = guestData.table
        if (!guestByTable[tableNum]) {
          guestByTable[tableNum] = []
        }
        guestByTable[tableNum].push({ id: doc.id, data: guestData })
      });
      const tempList = []
      for (const tableNum in guestByTable) {
        tempList.push(...guestByTable[tableNum])
      }
      setGuestsList(tempList)
      setIsFetchingGuestList(false)
    } catch (error) {
      console.error("Erreur lors de la récupération des invités", error)
    }
  }

  const handleGuestResearch = (e) => {
    setGuestResearch(e.target.value)
  }

  const handleOpenSnackBar = () => {
    setIsSnackBar(true)
  }

  const handleCloseSnackBar = () => {
    setIsSnackBar(false)
  }

  const scanQrCode = () => {
    setIsScanning(true)
  }

  const updateGuestStatut = async (guestId, statut) => {
    try {
      const db = firebase.firestore();
      const guestRef = db.collection('evenements').doc(eventId).collection('guestlist').doc(guestId);
      await guestRef.update({ statut: statut });
    } catch (error) {
      console.error("Erreur lors de la mise à jour du statut de l'invité", error)
    }
  }

  const handleScanning = (text, result) => {
    const data = text.split('-');
    const guestName = data[0]
    const guestTable = data[1]
    const guest = guestsList.find(guest => guest.data.nom.toUpperCase() === guestName.toUpperCase() && guest.data.table === guestTable)
    if (guest) {
      if (guest.data.statut === 'checked') {
        setTextSnackBar('Invité déjà scanné !')
        setGuestFound({nom: '', table: ''})
      } else {
        setTextSnackBar('Invité trouvé !')
        setGuestFound({nom: guest.data.nom, table: guest.data.table})
        updateGuestStatut(guest.id, 'checked')
      }
    } else {
      setTextSnackBar('Invité non trouvé !')
      setGuestFound({nom: '', table: ''})
    }
    handleOpenSnackBar()
    setIsScanning(false)
  }

  return (
    <div>
      <AlertScannedResult
        isSnackBar={isSnackBar}
        handleCloseSnackBar={handleCloseSnackBar}
        textInSnackBar={textInSnackBar}
        guestFound={guestFound}
      />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <div className={`${!isScanning && 'd-none'}`}>
            <Scanner
                onResult={(text, result) => handleScanning(text, result)}
                onError={(error) => console.log(error?.message)}
                enabled={isScanning}
            />
          </div>
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
          <h1>
            Liste des invités
            <span>
              {'(' + guestsList.length + ')'}
            </span>
          </h1>
        </Grid>
        <Grid item xs={12}>
          <TextField
            value={guestResearch}
            onChange={handleGuestResearch}
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
        <Grid item xs={12} sx={{ width: '100%', overflow: 'hidden' }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell align='left'>Nom</TableCell>
                  <TableCell align='right'>N° Table</TableCell>
                  <TableCell align='center'>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {isFetchingGuestList ? <TableRow><TableCell>Chargement...</TableCell></TableRow> : filteredGuestsList.map((guest, index) => (
                  <TableRow key={index}>
                    <TableCell align='left'>{guest.data.nom}</TableCell>
                    <TableCell align='right'>{guest.data.table}</TableCell>
                    <TableCell align='center'>
                      <Badge color={`${guest.data.statut === "checked" ? "success" : "dark"}`} badgeContent={''}>
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </div>
  )
}
