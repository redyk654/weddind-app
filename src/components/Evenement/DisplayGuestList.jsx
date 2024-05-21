import { Badge, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React from 'react'

export default function DisplayGuestList({ filteredGuestsList, isFetchingGuestList}) {
  return (
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
  )
}
