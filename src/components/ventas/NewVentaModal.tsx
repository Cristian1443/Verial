// src/components/ventas/NewVentaModal.tsx

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Alert } from 'react-native';
import { useRealm, useQuery } from '@realm/react';
import { Cliente, Articulo, NotaVenta, LineaVenta } from '../../models/Schemas';
import { v4 as uuidv4 } from 'uuid'; // Necesitas instalar 'uuid': npm install uuid @types/uuid

const NewVentaModal = ({ onClose }) => {
  const realm = useRealm();
  const clientes = useQuery(Cliente); // Consulta offline de clientes
  const articulos = useQuery(Articulo); // Consulta offline de artículos

  const [selectedClienteId, setSelectedClienteId] = useState<number | null>(null);
  const [searchClient, setSearchClient] = useState('');
  const [lineasVenta, setLineasVenta] = useState([]);
  const [isAddingItems, setIsAddingItems] = useState(false); // Flag para mostrar el modal de artículos

  // --- 1. Lógica de Búsqueda y Selección de Cliente (Offline) ---
  const filteredClientes = clientes.filtered(
    'Nombre CONTAINS[c] $0 OR NIF CONTAINS[c] $0', 
    searchClient
  ).slice(0, 10); // Limitar a 10 resultados para rendimiento

  const selectedCliente = clientes.filtered('id == $0', selectedClienteId)[0];
  
  // --- 2. Lógica para Añadir Líneas y Cierre de Venta ---
  
  const handleAddItem = (articulo, uds) => {
      if (uds <= 0) return Alert.alert("Error", "Las unidades deben ser mayores a cero.");
      
      const newLinea = {
          _id: new Realm.BSON.ObjectId(), // Genera un ID local de Realm
          ID_Articulo: articulo.id,
          Uds: uds,
          Precio: articulo.PrecioTarifa,
          Dto: 0.0, // Asumir 0% por defecto
      };

      setLineasVenta([...lineasVenta, newLinea]);
      setIsAddingItems(false); // Cierra el modal de artículos
  };

  const handleSaveVenta = () => {
    if (!selectedClienteId || lineasVenta.length === 0) {
      return Alert.alert("Error", "Debe seleccionar un cliente y añadir al menos una línea.");
    }

    // Calcular el total (Lógica de descuentos y precios más compleja se añadiría aquí)
    const totalImporte = lineasVenta.reduce((sum, linea) => sum + (linea.Uds * linea.Precio * (1 - linea.Dto / 100)), 0);

    // Creación del documento en Realm (Operación Offline)
    realm.write(() => {
        const newVenta = realm.create<NotaVenta>('NotaVenta', {
            idLocal: uuidv4(), // Usar UUID como PK local
            Fecha: new Date(),
            ID_Cliente: selectedClienteId,
            TotalImporte: parseFloat(totalImporte.toFixed(2)),
            EstadoSincro: 'PENDIENTE',
            // Añadir líneas a la lista de Realm
            lineas: lineasVenta.map(linea => {
                return realm.create('LineaVenta', linea, true);
            }),
        });
        
        // Simulación de Referencia App (Recomendado por Verial)
        newVenta.Referencia = `APP-${newVenta.ID_Cliente}-${new Date().getTime()}`;
    });

    Alert.alert("Éxito", "Nota de Venta guardada localmente y marcada para sincronización.");
    onClose();
  };

  if (isAddingItems) {
      // Muestra la vista de búsqueda de artículos
      return <ArticulosSearchModal onAddItem={handleAddItem} onBack={() => setIsAddingItems(false)} />;
  }

  return (
    <View style={modalStyles.container}>
      <Text style={modalStyles.headerTitle}>Crear Nueva Nota de Venta</Text>
      
      {/* SECCIÓN 1: SELECCIÓN DE CLIENTE */}
      {!selectedCliente ? (
        <>
          <TextInput
            style={modalStyles.searchInput}
            placeholder="Buscar cliente por nombre o NIF..."
            value={searchClient}
            onChangeText={setSearchClient}
          />
          <ScrollView style={modalStyles.clientList}>
            {filteredClientes.map(client => (
              <TouchableOpacity
                key={client.id}
                style={modalStyles.clientItem}
                onPress={() => setSelectedClienteId(client.id)}
              >
                <Text style={modalStyles.clientName}>{client.Nombre} ({client.NIF})</Text>
                <Text style={modalStyles.selectButton}>Seleccionar</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </>
      ) : (
        <>
          <Text style={modalStyles.selectedClientText}>Cliente Seleccionado:</Text>
          <Text style={modalStyles.selectedClientName}>{selectedCliente.Nombre} ({selectedCliente.NIF})</Text>
          <TouchableOpacity 
              style={modalStyles.changeClientButton}
              onPress={() => setSelectedClienteId(null)}
          >
              <Text style={modalStyles.changeClientText}>Cambiar Cliente</Text>
          </TouchableOpacity>
        </>
      )}

      {/* SECCIÓN 2: LÍNEAS DE VENTA */}
      {selectedCliente && (
        <View style={modalStyles.lineasSection}>
          <Text style={modalStyles.sectionTitle}>Contenido del Pedido ({lineasVenta.length} líneas)</Text>
          
          <TouchableOpacity 
            style={modalStyles.addButton}
            onPress={() => setIsAddingItems(true)}
          >
            <Text style={modalStyles.addButtonText}>+ Añadir Artículo</Text>
          </TouchableOpacity>

          <ScrollView style={modalStyles.lineasList}>
              {lineasVenta.map((linea, index) => (
                  // Renderizar cada línea de venta
                  <View key={index} style={modalStyles.lineaItem}>
                      <Text>Art. ID: {linea.ID_Articulo}</Text>
                      <Text>{linea.Uds} x {linea.Precio.toFixed(2)} €</Text>
                  </View>
              ))}
          </ScrollView>
        </View>
      )}

      {/* FOOTER: Botones de Cierre */}
      <View style={modalStyles.footer}>
        <Button title="Cancelar" onPress={onClose} color="#ccc" />
        <Button title="Guardar y Cerrar (Offline)" onPress={handleSaveVenta} disabled={!selectedCliente || lineasVenta.length === 0} />
      </View>
    </View>
  );
};

// --- Componente Modal para Búsqueda de Artículos ---
const ArticulosSearchModal = ({ onAddItem, onBack }) => {
    const articulos = useQuery(Articulo);
    const [searchItem, setSearchItem] = useState('');
    const [units, setUnits] = useState('1'); // Unidades a añadir
    
    // Búsqueda offline de artículos por nombre o referencia
    const filteredArticulos = articulos.filtered(
        'Nombre CONTAINS[c] $0 OR Referencia CONTAINS[c] $0', 
        searchItem
    ).slice(0, 15);

    return (
        <View style={modalStyles.container}>
            <Text style={modalStyles.headerTitle}>Añadir Artículos</Text>
            <TouchableOpacity onPress={onBack} style={modalStyles.backButton}>
                <Text>← Volver a la Nota</Text>
            </TouchableOpacity>

            <TextInput
                style={modalStyles.searchInput}
                placeholder="Buscar artículo por nombre o referencia..."
                value={searchItem}
                onChangeText={setSearchItem}
            />
            
            <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10}}>
                <Text>Unidades:</Text>
                <TextInput
                    style={[modalStyles.searchInput, {flex: 1, marginLeft: 10}]}
                    keyboardType='numeric'
                    value={units}
                    onChangeText={setUnits}
                />
            </View>

            <ScrollView>
                {filteredArticulos.map(art => (
                    <TouchableOpacity 
                        key={art.id} 
                        style={modalStyles.articleItem}
                        onPress={() => onAddItem(art, parseFloat(units))}
                    >
                        <Text style={modalStyles.articleName}>{art.Nombre} (Ref: {art.Referencia})</Text>
                        <Text style={modalStyles.articlePrice}>{art.PrecioTarifa.toFixed(2)} €</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
            
            <View style={modalStyles.footer}>
                <Button title="Cerrar" onPress={onBack} />
            </View>
        </View>
    );
}

// Se recomienda un archivo de estilos separado, pero aquí se incluye por simplicidad
const modalStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    // ... Estilos para cliente, artículos, etc.
});

export default NewVentaModal;