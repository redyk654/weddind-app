import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

// Styles pour le document PDF
const stylesGuestListPdf = StyleSheet.create({
  page: {
    padding: 30,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  table: {
    display: "table",
    width: "auto",
    margin: "0 auto",
  },
  tableRow: {
    flexDirection: "row",
  },
  tableCol: {
    width: "34%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000",
  },
  tableCell: {
    margin: 5,
    fontSize: 12,
  },
  header: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
  },
});

const GuestListPdf = ({ guestList }) => (
  <Document>
    <Page style={stylesGuestListPdf.page}>
      <Text style={stylesGuestListPdf.header}>Liste des Invités {'(' + guestList?.length + ')'}</Text>
      <View style={stylesGuestListPdf.table}>
        {/* En-tête du tableau */}
        <View style={stylesGuestListPdf.tableRow}>
            <View style={stylesGuestListPdf.tableCol}>
                <Text style={stylesGuestListPdf.tableCell}>N°</Text>
            </View>
          <View style={stylesGuestListPdf.tableCol}>
            <Text style={stylesGuestListPdf.tableCell}>Nom</Text>
          </View>
          <View style={stylesGuestListPdf.tableCol}>
            <Text style={stylesGuestListPdf.tableCell}>Numéro de Table</Text>
          </View>
        </View>
        {/* Données du tableau */}
        {guestList.map((guest, index) => (
          <View style={stylesGuestListPdf.tableRow} key={index}>
            <View style={stylesGuestListPdf.tableCol}>
              <Text style={stylesGuestListPdf.tableCell}>{index + 1}</Text>
            </View>
            <View style={stylesGuestListPdf.tableCol}>
              <Text style={stylesGuestListPdf.tableCell}>{guest.data.nom}</Text>
            </View>
            <View style={stylesGuestListPdf.tableCol}>
              <Text style={stylesGuestListPdf.tableCell}>{guest.data.table}</Text>
            </View>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

export default GuestListPdf;