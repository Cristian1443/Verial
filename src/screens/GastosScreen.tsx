// src/screens/GastosScreen.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import SidebarMenu from '../components/common/SidebarMenu';

const gastosEjemplo = [
  { id: 1, tipo: 'Gasto 01', importe: 28.90 },
  { id: 2, tipo: 'Gasto 02', importe: 28.90 },
  { id: 3, tipo: 'Gasto 03', importe: 28.90 },
  { id: 4, tipo: 'Gasto 04', importe: 28.90 },
  { id: 5, tipo: 'Gasto 05', importe: 28.90 },
];

const GastosScreen = ({ navigation }: { navigation: any }) => {
  const [selectedTipo, setSelectedTipo] = useState('');

  const tiposGasto = ['Todos', 'Notas de Venta', 'Cobros', 'Gastos', 'Incidencias', 'Impuestos Boxes'];

  return (
    <View style={styles.mainContainer}>
      <SidebarMenu navigation={navigation} currentScreen="GastosScreen" />

      <View style={styles.contentContainer}>
        <Text style={styles.headerTitle}>Gastos</Text>

        {/* Formulario superior */}
        <View style={styles.formCard}>
          <View style={styles.formRow}>
            <View style={styles.formField}>
              <Text style={styles.formLabel}>Numero sin Datos</Text>
            </View>
            <View style={styles.formField}>
              <Text style={styles.formLabel}>Tipo de Gasto</Text>
              <TextInput
                style={styles.formInput}
                placeholder="-"
              />
            </View>
            <View style={styles.formField}>
              <Text style={styles.formLabel}>Valer Ecu 12,88 €</Text>
              <TextInput
                style={styles.formInput}
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

        {/* Info */}
        <View style={styles.infoBox}>
          <Text style={styles.infoIcon}>💡</Text>
          <Text style={styles.infoText}>Haz clic en todos a votar una imagen</Text>
        </View>

        {/* Botón Añadir */}
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>➕ Añadir Nuevo Gasto</Text>
        </TouchableOpacity>

        {/* Lista de Gastos */}
        <ScrollView style={styles.gastosList}>
          {gastosEjemplo.map((gasto) => (
            <View key={gasto.id} style={styles.gastoCard}>
              {/* Imagen placeholder */}
              <View style={styles.gastoImageBox}>
                <Text style={styles.gastoImagePlaceholder}>📷</Text>
              </View>
              
              <View style={styles.gastoInfo}>
                <Text style={styles.gastoTipo}>{gasto.tipo}</Text>
                <Text style={styles.gastoDetalle}>Ver Detalles 📋</Text>
              </View>
              
              <Text style={styles.gastoMonto}>{gasto.importe.toFixed(2)} €</Text>
              
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
    marginBottom: 25,
  },
  formCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  formRow: {
    flexDirection: 'row',
    gap: 20,
  },
  formField: {
    flex: 1,
  },
  formLabel: {
    fontSize: 13,
    color: '#666',
    marginBottom: 8,
    fontWeight: '500',
  },
  formInput: {
    backgroundColor: '#f9f9f9',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
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
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF9E6',
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
    gap: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#FFC107',
  },
  infoIcon: {
    fontSize: 16,
  },
  infoText: {
    fontSize: 13,
    color: '#856404',
    flex: 1,
  },
  addButton: {
    backgroundColor: '#1F4788',
    padding: 15,
    borderRadius: 10,
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
    marginBottom: 12,
    alignItems: 'center',
    gap: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  gastoImageBox: {
    width: 70,
    height: 70,
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gastoImagePlaceholder: {
    fontSize: 32,
    color: '#ccc',
  },
  gastoInfo: {
    flex: 1,
  },
  gastoTipo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  gastoDetalle: {
    fontSize: 13,
    color: '#1F4788',
    fontWeight: '500',
  },
  gastoMonto: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  gastoMenu: {
    padding: 8,
  },
});

export default GastosScreen;
