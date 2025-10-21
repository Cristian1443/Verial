// src/screens/VentasScreen.tsx

import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Modal, Alert } from 'react-native';
import { useQuery } from '@realm/react';
import SidebarMenu from '../components/common/SidebarMenu';
import { NotaVenta, Cliente, Articulo } from '../models/Schemas';
import NewVentaModal from '../components/ventas/NewVentaModal'; // Componente que crearemos

const VentasScreen = ({ navigation }) => {
  const notasVenta = useQuery(NotaVenta).sorted('Fecha', true); // Listar por fecha descendente
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Filtrar notas de venta por estado de sincronización, referencia, etc.
  const filteredNotas = notasVenta.filter(nota => 
    nota.Referencia?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    nota.EstadoSincro.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <View style={styles.mainContainer}>
      <SidebarMenu navigation={navigation} currentScreen="VentasScreen" />

      <View style={styles.contentContainer}>
        <Text style={styles.headerTitle}>Notas de Venta</Text>
        <TouchableOpacity 
          style={styles.createButton} 
          onPress={() => setIsModalVisible(true)}
        >
          <Text style={styles.createButtonText}>+ Crear Nota de Venta</Text>
        </TouchableOpacity>

        {/* --- Buscador y Filtros --- */}
        <TextInput
            style={styles.searchInput}
            placeholder="Buscar notas por referencia o estado..."
            value={searchTerm}
            onChangeText={setSearchTerm}
        />

        {/* --- Listado de Notas de Venta (Simulación de listado del mockup) --- */}
        <ScrollView style={styles.listContainer}>
          {filteredNotas.map(nota => (
            <VentaItem key={nota.idLocal} nota={nota} navigation={navigation} />
          ))}
          {filteredNotas.length === 0 && <Text style={styles.emptyText}>No hay notas de venta registradas localmente.</Text>}
        </ScrollView>
      </View>

      {/* Modal para la Creación de la Nota de Venta */}
      <Modal
        animationType="slide"
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <NewVentaModal onClose={() => setIsModalVisible(false)} />
      </Modal>
    </View>
  );
};

// Componente para una fila de nota de venta
const VentaItem = ({ nota, navigation }) => {
    // Aquí se usaría useObject(Cliente, nota.ID_Cliente) para obtener el nombre del cliente
    return (
        <TouchableOpacity style={styles.ventaCard}>
            <View>
                <Text style={styles.ventaTitle}>Ref: {nota.Referencia || 'PENDIENTE REF'}</Text>
                <Text style={styles.ventaInfo}>Cliente ID: {nota.ID_Cliente}</Text>
                <Text style={styles.ventaInfo}>Fecha: {nota.Fecha.toISOString().substring(0, 10)}</Text>
            </View>
            <View style={styles.ventaStatus}>
                <Text style={{ fontWeight: 'bold', color: nota.EstadoSincro === 'SINCRONIZADO' ? 'green' : 'orange' }}>
                    {nota.EstadoSincro}
                </Text>
                <Text style={styles.ventaAmount}>{nota.TotalImporte.toFixed(2)} €</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  contentContainer: {
    flex: 1,
    padding: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  createButton: {
    backgroundColor: '#1F4788',
    padding: 12,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  createButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  listContainer: {
    flex: 1,
  },
  ventaCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  ventaTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  ventaInfo: {
    fontSize: 12,
    color: 'gray',
  },
  ventaStatus: {
    alignItems: 'flex-end',
  },
  ventaAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 5,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    color: 'gray',
  }
});

export default VentasScreen;