// src/screens/VentasScreen.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import SidebarMenu from '../components/common/SidebarMenu';
import NewVentaModal from '../components/ventas/NewVentaModal';

const clientesData = [
  {
    id: 101,
    nombre: 'Panadería El Trigo Dorado',
    razonSocial: 'Martín Delgado S.L.',
    nif: 'B12345678',
    direccion: 'Av. Castilla 89, Oviedo, Asturias',
    telefono: '+34 985 234 789',
    email: 'contacto@eltrigodorado.es',
    cobrosPendientes: 4,
  },
  {
    id: 102,
    nombre: 'López Hermanos C.B.',
    razonSocial: 'López Hermanos C.B.',
    nif: 'E87654321',
    direccion: 'Calle Sol 22, Gijón, Asturias',
    telefono: '+34 984 556 210',
    email: 'info@ferrelopez.es',
    cobrosPendientes: 2,
  },
  {
    id: 103,
    nombre: 'Restaurante La Gallina Loca',
    razonSocial: 'Ramiro Fernández S.A.',
    nif: 'A23456789',
    direccion: 'C/ Doctor Fleming 1, Lugones, Asturias',
    telefono: '+34 985 441 032',
    email: 'reservas@gallinaloca.es',
    cobrosPendientes: 4,
  },
  {
    id: 104,
    nombre: 'Supermercado El Pino',
    razonSocial: 'Distribuciones El Pino S.L.',
    nif: 'B98765432',
    direccion: 'Plaza Mayor 5, Avilés, Asturias',
    telefono: '+34 985 123 456',
    email: 'admin@superpino.es',
    cobrosPendientes: 3,
  },
];

const VentasScreen = ({ navigation }: { navigation: any }) => {
  const [showNewVentaModal, setShowNewVentaModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredClientes = clientesData.filter(c =>
    c.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.razonSocial.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <View style={styles.mainContainer}>
      <SidebarMenu navigation={navigation} currentScreen="VentasScreen" />
      
      <View style={styles.contentContainer}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backButton}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Notas de Venta</Text>
          <View style={{ width: 30 }} />
        </View>

        {/* Sección crear nota */}
        <View style={styles.createSection}>
          <View>
            <Text style={styles.createIcon}>📋</Text>
            <Text style={styles.createTitle}>Crear Nota de Venta</Text>
            <Text style={styles.createSubtitle}>Gestioná tus notas de venta.</Text>
          </View>
          
          <TouchableOpacity 
            style={styles.createButton}
            onPress={() => setShowNewVentaModal(true)}
          >
            <Text style={styles.createButtonIcon}>➕</Text>
            <Text style={styles.createButtonText}>Crear Nota de Venta</Text>
          </TouchableOpacity>
        </View>

        {/* Buscador */}
        <View style={styles.searchContainer}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar cliente"
            value={searchTerm}
            onChangeText={setSearchTerm}
          />
          <TouchableOpacity>
            <Text style={styles.filterIcon}>▼</Text>
          </TouchableOpacity>
        </View>

        {/* Lista de Clientes */}
        <ScrollView style={styles.clientesList}>
          {filteredClientes.map((cliente) => (
            <View key={cliente.id} style={styles.clienteCard}>
              <View style={styles.clienteHeader}>
                <View style={styles.clienteNumero}>
                  <Text style={styles.clienteNumeroText}>{cliente.id}</Text>
                </View>
                <View style={styles.clienteMainInfo}>
                  <Text style={styles.clienteNombre}>{cliente.nombre}</Text>
                  <View style={styles.clienteRow}>
                    <Text style={styles.clienteLabel}>Razón Social:</Text>
                    <Text style={styles.clienteValue}>{cliente.razonSocial}</Text>
                    <Text style={styles.clienteCobrosPendientes}>
                      Cobros Pendientes: <Text style={styles.cobroNumber}>{cliente.cobrosPendientes}</Text>
                    </Text>
                  </View>
                </View>
                
                <TouchableOpacity 
                  style={styles.selectButton}
                  onPress={() => setShowNewVentaModal(true)}
                >
                  <Text style={styles.selectButtonIcon}>👁️</Text>
                  <Text style={styles.selectButtonText}>Seleccionar Cliente</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.clienteDetails}>
                <Text style={styles.detailText}><Text style={styles.detailLabel}>NIF:</Text> {cliente.nif}</Text>
                <Text style={styles.detailText}><Text style={styles.detailLabel}>Dirección:</Text> {cliente.direccion}</Text>
                <Text style={styles.detailText}><Text style={styles.detailLabel}>Teléfono:</Text> {cliente.telefono}</Text>
                <Text style={styles.detailText}><Text style={styles.detailLabel}>E-mail:</Text> {cliente.email}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Modal Nueva Venta */}
      <NewVentaModal
        visible={showNewVentaModal}
        onClose={() => setShowNewVentaModal(false)}
        navigation={navigation}
      />
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
  },
  backButton: {
    fontSize: 28,
    color: '#333',
    fontWeight: 'bold',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  createSection: {
    backgroundColor: 'white',
    padding: 25,
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  createIcon: {
    fontSize: 32,
    marginBottom: 10,
  },
  createTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  createSubtitle: {
    fontSize: 14,
    color: '#999',
  },
  createButton: {
    flexDirection: 'row',
    backgroundColor: '#1F4788',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 10,
    alignItems: 'center',
    gap: 10,
  },
  createButtonIcon: {
    fontSize: 18,
    color: 'white',
  },
  createButtonText: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
    gap: 10,
  },
  searchIcon: {
    fontSize: 18,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#333',
  },
  filterIcon: {
    fontSize: 12,
    color: '#666',
  },
  clientesList: {
    flex: 1,
  },
  clienteCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  clienteHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 15,
    gap: 15,
  },
  clienteNumero: {
    backgroundColor: '#1F4788',
    width: 45,
    height: 45,
    borderRadius: 23,
    justifyContent: 'center',
    alignItems: 'center',
  },
  clienteNumeroText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  clienteMainInfo: {
    flex: 1,
  },
  clienteNombre: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 6,
  },
  clienteRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
  },
  clienteLabel: {
    fontSize: 13,
    color: '#666',
    fontWeight: '600',
  },
  clienteValue: {
    fontSize: 13,
    color: '#333',
  },
  clienteCobrosPendientes: {
    fontSize: 13,
    color: '#666',
  },
  cobroNumber: {
    color: '#1F4788',
    fontWeight: 'bold',
  },
  selectButton: {
    flexDirection: 'row',
    backgroundColor: '#1F4788',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 8,
    alignItems: 'center',
    gap: 8,
  },
  selectButtonIcon: {
    fontSize: 16,
  },
  selectButtonText: {
    color: 'white',
    fontSize: 13,
    fontWeight: 'bold',
  },
  clienteDetails: {
    gap: 6,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  detailText: {
    fontSize: 13,
    color: '#666',
  },
  detailLabel: {
    fontWeight: '600',
    color: '#1F4788',
  },
});

export default VentasScreen;
