// src/screens/ClientesScreen.tsx

import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, ViewStyle } from 'react-native';
import { useQuery, useRealm } from '@realm/react';
import SidebarMenu from '../components/common/SidebarMenu';
import { Cliente, NotaVenta } from '../models/Schemas';

const ClientesScreen = ({ navigation }: { navigation: any }) => {
    // Consulta offline de todos los clientes
    const clientes = useQuery(Cliente).sorted('Nombre');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedClienteId, setSelectedClienteId] = useState<number | null>(null);

    // Búsqueda offline por nombre o NIF
    const filteredClientes = clientes.filtered(
        'Nombre CONTAINS[c] $0 OR NIF CONTAINS[c] $0',
        searchTerm
    );

    return (
        <View style={styles.mainContainer}>
            <SidebarMenu navigation={navigation} currentScreen="ClientesScreen" />

            <View style={styles.contentContainer}>
                <Text style={styles.headerTitle}>Clientes</Text>

                <View style={styles.listSection}>
                    {/* --- Panel de Listado --- */}
                    <View style={styles.listPanel}>
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Buscar cliente por nombre o NIF..."
                            value={searchTerm}
                            onChangeText={setSearchTerm}
                        />
                        <ScrollView>
                            {filteredClientes.map(client => (
                                <ClienteListItem 
                                    key={client.id} 
                                    cliente={client} 
                                    onPress={() => setSelectedClienteId(client.id)}
                                    isSelected={client.id === selectedClienteId}
                                />
                            ))}
                            {filteredClientes.length === 0 && <Text style={styles.emptyText}>No se encontraron clientes.</Text>}
                        </ScrollView>
                    </View>
                    
                    {/* --- Panel de Detalle (Basado en Frame 201) --- */}
                    <ClienteDetailPanel 
                        clienteId={selectedClienteId} 
                        style={styles.detailPanel}
                    />
                </View>
            </View>
        </View>
    );
};

// Componente para una fila del listado
const ClienteListItem = ({ cliente, onPress, isSelected }: { cliente: Cliente; onPress: () => void; isSelected: boolean }) => (
    <TouchableOpacity 
        style={[styles.listItem, isSelected && styles.listItemActive]} 
        onPress={onPress}
    >
        <Text style={styles.itemTitle}>{cliente.Nombre}</Text>
        <Text style={styles.itemRef}>NIF: {cliente.NIF}</Text>
        <Text style={styles.itemStatus}>Ventas Pendientes: 0</Text> {/* Se calcularía con otra query */}
    </TouchableOpacity>
);

// Componente para el panel de detalle del cliente
const ClienteDetailPanel = ({ clienteId, style }: { clienteId: number | null; style: ViewStyle }) => {
    const realm = useRealm();
    const allVentas = useQuery(NotaVenta);
    
    const cliente = clienteId ? realm.objectForPrimaryKey<Cliente>('Cliente', clienteId) : null;
    const historialVentas = cliente ? allVentas.filtered('ID_Cliente == $0', clienteId).sorted('Fecha', true) : [];
    
    if (!cliente) {
        return (
            <View style={style}>
                <Text style={styles.detailPlaceholder}>Seleccione un cliente para ver los datos históricos.</Text>
            </View>
        );
    }

    return (
        <ScrollView style={style}>
            <Text style={styles.detailTitle}>{cliente.Nombre}</Text>
            <Text style={styles.sectionTitle}>Datos Históricos (Cliente)</Text>
            <View style={styles.detailInfoBlock}>
                <Text style={styles.detailInfoLabel}>NIF:</Text>
                <Text style={styles.detailInfoValue}>{cliente.NIF}</Text>
            </View>
            <View style={styles.detailInfoBlock}>
                <Text style={styles.detailInfoLabel}>Apellido:</Text>
                <Text style={styles.detailInfoValue}>{cliente.Apellido1}</Text>
            </View>
            
            <Text style={styles.sectionTitle}>Historial de Pedidos ({historialVentas.length})</Text>
            {historialVentas.map(venta => (
                <View key={venta.idLocal} style={styles.historyItem}>
                    <Text>{venta.Fecha.toISOString().substring(0, 10)} - {venta.Referencia}</Text>
                    <Text style={styles.historyTextBold}>{venta.TotalImporte.toFixed(2)} €</Text>
                </View>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    mainContainer: { flex: 1, flexDirection: 'row' },
    contentContainer: { flex: 1, padding: 20 },
    headerTitle: { fontSize: 28, fontWeight: 'bold', marginBottom: 20 },
    listSection: { flexDirection: 'row', flex: 1, gap: 15 }, 
    
    listPanel: { flex: 1, backgroundColor: '#f9f9f9', padding: 10, borderRadius: 8 },
    detailPanel: { 
        flex: 1.5, 
        backgroundColor: '#fff', 
        padding: 20, 
        borderRadius: 8, 
        borderLeftWidth: 1, 
        borderColor: '#eee' 
    },
    detailPlaceholder: { color: 'gray', textAlign: 'center', marginTop: 50 },

    searchInput: { height: 40, borderColor: '#ccc', borderWidth: 1, borderRadius: 8, paddingHorizontal: 15, marginBottom: 10 },
    
    listItem: { padding: 15, borderBottomWidth: 1, borderBottomColor: '#eee', backgroundColor: 'white' },
    listItemActive: { backgroundColor: '#E6EBF5', borderLeftWidth: 4, borderLeftColor: '#1F4788' },
    itemTitle: { fontWeight: 'bold', fontSize: 16 },
    itemRef: { fontSize: 12, color: 'gray' },
    itemStatus: { fontSize: 12, color: 'orange' },

    detailTitle: { fontSize: 22, fontWeight: 'bold', marginBottom: 10, paddingBottom: 5 },
    sectionTitle: { fontSize: 16, fontWeight: 'bold', marginTop: 15, marginBottom: 10 },
    detailInfoBlock: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 },
    detailInfoLabel: { fontWeight: '600' },
    detailInfoValue: { maxWidth: '60%', textAlign: 'right' },
    historyItem: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 5, borderBottomWidth: 1, borderBottomColor: '#f5f5f5' },
    historyTextBold: { fontWeight: 'bold' },
    emptyText: { textAlign: 'center', marginTop: 50, color: 'gray' },
});

export default ClientesScreen;