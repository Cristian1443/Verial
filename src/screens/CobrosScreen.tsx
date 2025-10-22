// src/screens/CobrosScreen.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import SidebarMenu from '../components/common/SidebarMenu';

// Datos de ejemplo
const notasPendientes = [
  { id: 1, numero: '100', cliente: 'ÁLVAREZ CORDERO CONSUELO', fecha: '24-09-2025', importe: 289.90 },
  { id: 2, numero: '100', cliente: 'ÁLVAREZ CORDERO CONSUELO', fecha: '19-08-2025', importe: 289.90 },
  { id: 3, numero: '100', cliente: 'ÁLVAREZ CORDERO CONSUELO', fecha: '14-07-2025', importe: 289.90 },
  { id: 4, numero: '100', cliente: 'ÁLVAREZ CORDERO CONSUELO', fecha: '12-06-2025', importe: 289.90 },
];

const CobrosScreen = ({ navigation }: { navigation: any }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const total = notasPendientes.reduce((sum, n) => sum + n.importe, 0);

  return (
    <View style={styles.mainContainer}>
      <SidebarMenu navigation={navigation} currentScreen="CobrosScreen" />

      <View style={styles.contentContainer}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton}>
            <Text style={styles.backButtonText}>← Cobros</Text>
          </TouchableOpacity>
        </View>

        {/* Panel de Notas Pendientes */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>📋 Notas Pendientes</Text>
            <TouchableOpacity style={styles.confirmButton}>
              <Text style={styles.confirmButtonText}>✓ Confirmar Cobro</Text>
            </TouchableOpacity>
          </View>

          {/* Lista de Notas */}
          <ScrollView style={styles.notesList}>
            {notasPendientes.map((nota) => (
              <View key={nota.id} style={styles.noteItem}>
                <View style={styles.noteIndicator} />
                <View style={styles.noteInfo}>
                  <Text style={styles.noteNumber}>{nota.numero} — {nota.cliente}</Text>
                  <Text style={styles.noteDate}>Fecha: {nota.fecha}</Text>
                </View>
                <Text style={styles.noteAmount}>{nota.importe.toFixed(2)} €</Text>
                <TouchableOpacity style={styles.noteCheckbox}>
                  <View style={styles.checkbox} />
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>

          {/* Total */}
          <View style={styles.totalSection}>
            <Text style={styles.totalLabel}>Subtotal:</Text>
            <Text style={styles.totalValue}>{total.toFixed(2)} €</Text>
          </View>
        </View>

        {/* Botones de acción */}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.returnButton}>
            <Text style={styles.returnButtonText}>← Volver a Cobros</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
  },
  contentContainer: {
    flex: 1,
    padding: 30,
  },
  header: {
    marginBottom: 20,
  },
  backButton: {
    alignSelf: 'flex-start',
  },
  backButtonText: {
    fontSize: 16,
    color: '#1F4788',
    fontWeight: '600',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 25,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  confirmButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  confirmButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  notesList: {
    maxHeight: 400,
  },
  noteItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    marginBottom: 10,
    gap: 12,
  },
  noteIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4CAF50',
  },
  noteInfo: {
    flex: 1,
  },
  noteNumber: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1F4788',
    marginBottom: 4,
  },
  noteDate: {
    fontSize: 12,
    color: '#666',
  },
  noteAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginRight: 15,
  },
  noteCheckbox: {
    padding: 5,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#1F4788',
  },
  totalSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 20,
    marginTop: 10,
    borderTopWidth: 2,
    borderTopColor: '#1F4788',
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  totalValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F4788',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 15,
  },
  returnButton: {
    flex: 1,
    borderWidth: 2,
    borderColor: '#1F4788',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  returnButtonText: {
    color: '#1F4788',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CobrosScreen;
