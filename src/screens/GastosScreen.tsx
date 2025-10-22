// src/screens/GastosScreen.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import SidebarMenu from '../components/common/SidebarMenu';

const gastosEjemplo = [
  { id: 1, tipo: 'Gasto 01', importe: 28.90, fecha: '15/10/2025', imagen: '🍽️' },
  { id: 2, tipo: 'Gasto 02', importe: 28.90, fecha: '14/10/2025', imagen: '⛽' },
  { id: 3, tipo: 'Gasto 03', importe: 28.90, fecha: '13/10/2025', imagen: '🏨' },
  { id: 4, tipo: 'Gasto 04', importe: 28.90, fecha: '12/10/2025', imagen: '🚗' },
  { id: 5, tipo: 'Gasto 05', importe: 28.90, fecha: '11/10/2025', imagen: '📋' },
];

const GastosScreen = ({ navigation }: { navigation: any }) => {
  const [selectedTipo, setSelectedTipo] = useState('');
  const verEuros = 12.88;

  const tiposGasto = ['Todos', 'Notas de Venta', 'Cobros', 'Gastos', 'Incidencias', 'Impuestos Boxes'];

  return (
    <View style={styles.mainContainer}>
      <SidebarMenu navigation={navigation} currentScreen="GastosScreen" />

      <View style={styles.contentContainer}>
        <Text style={styles.headerTitle}>Gastos</Text>

        {/* Resumen */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Numero sin Datos</Text>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Tipo de Gasto</Text>
              <TextInput
                style={styles.summaryInput}
                placeholder="-"
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Valer Ecu {verEuros.toFixed(2)} €</Text>
              <TextInput
                style={styles.summaryInput}
                placeholder="-"
              />
            </View>
          </View>
        </View>

        {/* Filtros */}
        <View style={styles.filtersContainer}>
          {tiposGasto.map((tipo) => (
            <TouchableOpacity
              key={tipo}
              style={[
                styles.filterChip,
                selectedTipo === tipo && styles.filterChipActive
              ]}
              onPress={() => setSelectedTipo(tipo)}
            >
              <Text
                style={[
                  styles.filterChipText,
                  selectedTipo === tipo && styles.filterChipTextActive
                ]}
              >
                {tipo}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Mensaje informativo */}
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>
            💡 Haz clic en todos a votar una imagen
          </Text>
        </View>

        {/* Botón Añadir Nuevo Gasto */}
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>➕ Añadir Nuevo Gasto</Text>
        </TouchableOpacity>

        {/* Lista de Gastos */}
        <ScrollView style={styles.gastosList}>
          {gastosEjemplo.map((gasto) => (
            <View key={gasto.id} style={styles.gastoCard}>
              <View style={styles.gastoImageContainer}>
                <Text style={styles.gastoImage}>{gasto.imagen}</Text>
              </View>
              <View style={styles.gastoInfo}>
                <Text style={styles.gastoTipo}>{gasto.tipo}</Text>
                <Text style={styles.gastoFecha}>Ver Detalles: {gasto.fecha}</Text>
              </View>
              <Text style={styles.gastoAmount}>{gasto.importe.toFixed(2)} €</Text>
              <TouchableOpacity style={styles.gastoMenu}>
                <Text>📋</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
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
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
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
  summaryCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  summaryRow: {
    flexDirection: 'row',
    gap: 20,
    alignItems: 'flex-end',
  },
  summaryLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    flex: 1,
  },
  inputContainer: {
    flex: 1,
  },
  inputLabel: {
    fontSize: 11,
    color: '#666',
    marginBottom: 5,
  },
  summaryInput: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 10,
    fontSize: 14,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  filtersContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 20,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  filterChipActive: {
    backgroundColor: '#1F4788',
    borderColor: '#1F4788',
  },
  filterChipText: {
    fontSize: 13,
    color: '#666',
    fontWeight: '500',
  },
  filterChipTextActive: {
    color: 'white',
  },
  infoBox: {
    backgroundColor: '#FFF9E6',
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#FFC107',
  },
  infoText: {
    fontSize: 13,
    color: '#856404',
  },
  addButton: {
    backgroundColor: '#1F4788',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  gastosList: {
    flex: 1,
  },
  gastoCard: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    alignItems: 'center',
    gap: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  gastoImageContainer: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gastoImage: {
    fontSize: 30,
  },
  gastoInfo: {
    flex: 1,
  },
  gastoTipo: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  gastoFecha: {
    fontSize: 12,
    color: '#1F4788',
  },
  gastoAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  gastoMenu: {
    padding: 5,
  },
  actionButtons: {
    marginTop: 20,
  },
  returnButton: {
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

export default GastosScreen;
