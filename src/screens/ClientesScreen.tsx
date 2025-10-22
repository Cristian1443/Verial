// src/screens/ClientesScreen.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import SidebarMenu from '../components/common/SidebarMenu';

// Datos de ejemplo
const clientesEjemplo = [
  { id: 1, Nombre: '100 Distribuciones Rivera S.L.', NIF: 'B12345678', Direccion: 'Calle Flores S/N, Barcelona' },
  { id: 2, Nombre: 'Almacenes López S.A.', NIF: 'A98765432', Direccion: 'Av. Industrial 45, Madrid' },
  { id: 3, Nombre: 'Transportes García S.L.', NIF: 'B55544433', Direccion: 'Polígono Sur, Valencia' },
  { id: 4, Nombre: 'Panaderías Martín S.L.', NIF: 'B11223344', Direccion: 'Plaza Mayor 12, Sevilla' },
];

const ClientesScreen = ({ navigation }: { navigation: any }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClienteId, setSelectedClienteId] = useState<number | null>(1);

  const filteredClientes = clientesEjemplo.filter(c =>
    c.Nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.NIF.includes(searchTerm)
  );

  const selectedCliente = clientesEjemplo.find(c => c.id === selectedClienteId);

  return (
    <View style={styles.mainContainer}>
      <SidebarMenu navigation={navigation} currentScreen="ClientesScreen" />

      <View style={styles.contentContainer}>
        <Text style={styles.headerTitle}>Clientes</Text>

        <View style={styles.listSection}>
          {/* Panel Izquierdo - Lista */}
          <View style={styles.listPanel}>
            <TextInput
              style={styles.searchInput}
              placeholder="🔍 Buscar cliente"
              value={searchTerm}
              onChangeText={setSearchTerm}
            />

            <ScrollView>
              {filteredClientes.map(cliente => (
                <TouchableOpacity
                  key={cliente.id}
                  style={[
                    styles.clienteItem,
                    selectedClienteId === cliente.id && styles.clienteItemActive
                  ]}
                  onPress={() => setSelectedClienteId(cliente.id)}
                >
                  <View style={styles.clienteIcon}>
                    <Text style={styles.clienteIconText}>👤</Text>
                  </View>
                  <View style={styles.clienteInfo}>
                    <Text style={styles.clienteNombre}>{cliente.Nombre}</Text>
                    <Text style={styles.clienteNIF}>NIF: {cliente.NIF}</Text>
                    <Text style={styles.clienteCobros}>Cobros Pendientes: 0€</Text>
                  </View>
                  <View style={styles.clienteActions}>
                    <TouchableOpacity style={styles.actionBtn}>
                      <Text style={styles.actionBtnText}>Ver Detalles</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionBtnSecondary}>
                      <Text style={styles.actionBtnSecondaryText}>Seleccionar</Text>
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Panel Derecho - Detalles */}
          {selectedCliente && (
            <View style={styles.detailPanel}>
              <Text style={styles.detailTitle}>100 Distribuciones Rivera S.L.</Text>
              
              <View style={styles.detailSection}>
                <Text style={styles.detailSectionTitle}>Información General (Cliente)</Text>
                
                <View style={styles.infoGrid}>
                  <View style={styles.infoColumn}>
                    <InfoItem label="Razón Social" value="MARTÍN DELGADO S.L." />
                    <InfoItem label="Nombre" value="100 Distribuciones Rivera" />
                    <InfoItem label="Dirección" value="Av. Cataluña 85, Barcelona" />
                    <InfoItem label="Provincia / Ciudad" value="Barcelona" />
                    <InfoItem label="Categoría 2" value="Distribuciones Rivera" />
                    <InfoItem label="Categoría 1" value="Profesional Cadena" />
                    <InfoItem label="Cuenta" value="43100001" />
                    <InfoItem label="Profesional Cadena" value="" />
                  </View>
                  
                  <View style={styles.infoColumn}>
                    <InfoItem label="NIF" value={selectedCliente.NIF} />
                    <InfoItem label="Apellido 1" value="" />
                    <InfoItem label="CP" value="08001" />
                    <InfoItem label="Teléfono" value="+34 93 123 4578" />
                    <InfoItem label="E-mail" value="ventas@delgado-es.es" />
                    <InfoItem label="Categoría 2" value="Mayoristas" />
                    <InfoItem label="Prov. Defecto" value="Castellón, Valencia, Albacete, Alicante" />
                    <InfoItem label="Provincia Defecto" value="" />
                  </View>
                </View>
              </View>

              <View style={styles.detailSection}>
                <Text style={styles.detailSectionTitle}>Datos comerciales</Text>
                <View style={styles.comercialGrid}>
                  <InfoItem label="Cód. Tarifa: 136" value="" />
                  <InfoItem label="Cód. Tarifa esp." value="" />
                  <InfoItem label="Dto 3: 2%" value="" />
                  <InfoItem label="Dto 2: 2%" value="" />
                  <InfoItem label="Dto 1: 2%" value="" />
                  <InfoItem label="Impresión: Inglés. Logica tofas del logo." value="" />
                  <InfoItem label="E-Com 928/92: SÍ" value="" />
                </View>
              </View>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

const InfoItem = ({ label, value }: { label: string; value: string }) => (
  <View style={styles.infoItem}>
    <Text style={styles.infoLabel}>{label}:</Text>
    <Text style={styles.infoValue}>{value || '-'}</Text>
  </View>
);

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
  },
  contentContainer: {
    flex: 1,
    padding: 20,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  listSection: {
    flexDirection: 'row',
    flex: 1,
    gap: 20,
  },
  listPanel: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 15,
  },
  searchInput: {
    height: 45,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 14,
  },
  clienteItem: {
    flexDirection: 'row',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    alignItems: 'center',
    gap: 12,
  },
  clienteItemActive: {
    backgroundColor: '#E6EBF5',
    borderLeftWidth: 4,
    borderLeftColor: '#1F4788',
  },
  clienteIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E6EBF5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  clienteIconText: {
    fontSize: 20,
  },
  clienteInfo: {
    flex: 1,
  },
  clienteNombre: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 2,
  },
  clienteNIF: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  clienteCobros: {
    fontSize: 11,
    color: '#999',
  },
  clienteActions: {
    gap: 5,
  },
  actionBtn: {
    backgroundColor: '#1F4788',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  actionBtnText: {
    color: 'white',
    fontSize: 11,
    fontWeight: 'bold',
  },
  actionBtnSecondary: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#1F4788',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  actionBtnSecondaryText: {
    color: '#1F4788',
    fontSize: 11,
    fontWeight: 'bold',
  },
  detailPanel: {
    flex: 2,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 25,
  },
  detailTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F4788',
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  detailSection: {
    marginBottom: 25,
  },
  detailSectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  infoGrid: {
    flexDirection: 'row',
    gap: 30,
  },
  infoColumn: {
    flex: 1,
  },
  infoItem: {
    marginBottom: 12,
  },
  infoLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 13,
    color: '#333',
    fontWeight: '500',
  },
  comercialGrid: {
    gap: 10,
  },
});

export default ClientesScreen;
