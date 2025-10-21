// src/screens/AlmacenScreen.tsx

import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Alert, Modal, Button } from 'react-native';
import { useRealm, useQuery } from '@realm/react';
import SidebarMenu from '../components/common/SidebarMenu';
import { StockFurgon, Articulo } from '../models/Schemas';

// Tipos de operación para gestionar el stock
const OPERACION_OPTIONS = ['Entrada (Sede)', 'Traspaso Salida', 'Traspaso Entrada'];

const AlmacenScreen = ({ navigation }: { navigation: any }) => {
    // Stock local del furgón
    const stockLocal = useQuery(StockFurgon);
    const [isModalVisible, setIsModalVisible] = useState(false);

    return (
        <View style={styles.mainContainer}>
            <SidebarMenu navigation={navigation} currentScreen="AlmacenScreen" />

            <View style={styles.contentContainer}>
                <Text style={styles.headerTitle}>Almacén (Stock Furgón)</Text>

                <TouchableOpacity 
                    style={styles.actionButton}
                    onPress={() => setIsModalVisible(true)}
                >
                    <Text style={styles.actionButtonText}>+ Registrar Movimiento de Stock</Text>
                </TouchableOpacity>

                <Text style={styles.listTitle}>Stock Actual del Furgón</Text>
                <ScrollView style={styles.listContainer}>
                    {stockLocal.map(stock => (
                        <StockItem key={stock.ID_Articulo} stock={stock} />
                    ))}
                    {stockLocal.length === 0 && <Text style={styles.emptyText}>Stock del furgón vacío.</Text>}
                </ScrollView>
            </View>

            {/* Modal para el registro de movimientos */}
            <Modal animationType="slide" visible={isModalVisible} onRequestClose={() => setIsModalVisible(false)}>
                <StockMovementModal 
                    onClose={() => setIsModalVisible(false)} 
                />
            </Modal>
        </View>
    );
};

const StockItem = ({ stock }: { stock: StockFurgon }) => {
    const realm = useRealm();
    // Se usa objectForPrimaryKey para obtener el nombre del artículo asociado
    const articulo = realm.objectForPrimaryKey<Articulo>('Articulo', stock.ID_Articulo); 
    
    return (
        <View style={styles.stockCard}>
            <View>
                <Text style={styles.stockName}>{articulo?.Nombre || `Artículo ID: ${stock.ID_Articulo}`}</Text>
                <Text style={styles.stockUpdate}>Última actualización: {stock.UltimaActualizacion.toLocaleDateString()}</Text>
            </View>
            <Text style={styles.stockUnits}>{stock.UnidadesActuales.toFixed(2)} Uds.</Text>
        </View>
    );
};

// --- Componente Modal para el Movimiento de Stock ---
const StockMovementModal = ({ onClose }: { onClose: () => void }) => {
    const realm = useRealm();
    const articulos = useQuery(Articulo);
    
    const [operacion, setOperacion] = useState(OPERACION_OPTIONS[0]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedArticuloId, setSelectedArticuloId] = useState<number | null>(null);
    const [unidades, setUnidades] = useState('');
    
    const filteredArticulos = articulos.filtered('Nombre CONTAINS[c] $0', searchTerm).slice(0, 5);
    const selectedArticulo = selectedArticuloId ? realm.objectForPrimaryKey<Articulo>('Articulo', selectedArticuloId) : null;

    const handleSaveMovement = () => {
        const units = parseFloat(unidades);
        if (!selectedArticuloId || units <= 0) return Alert.alert("Error", "Seleccione un artículo y unidades válidas.");

        realm.write(() => {
            const existingStock = realm.objectForPrimaryKey<StockFurgon>('StockFurgon', selectedArticuloId);
            
            let newUnits = units;
            // La lógica para Entradas suma, Traspasos Salida resta (debe haber stock)
            if (operacion === 'Traspaso Salida') {
                newUnits = -units;
                if (existingStock && existingStock.UnidadesActuales < units) {
                    Alert.alert("Error", "Stock insuficiente para la salida.");
                    return;
                }
            } else if (operacion === 'Entrada (Sede)' || operacion === 'Traspaso Entrada') {
                newUnits = units; // Siempre suma
            }
            
            if (existingStock) {
                existingStock.UnidadesActuales += newUnits;
                existingStock.UltimaActualizacion = new Date();
            } else if (newUnits > 0) {
                 // Solo crea si es una entrada inicial
                realm.create('StockFurgon', {
                    ID_Articulo: selectedArticuloId,
                    UnidadesActuales: newUnits,
                    UltimaActualizacion: new Date(),
                });
            }
            
            // En una app real, esta operación (Entrada/Traspaso) se marcaría como PENDIENTE
            // de ser enviada al ERP para actualizar los registros de almacén.
        });

        Alert.alert("Éxito", `Movimiento de ${operacion} registrado localmente.`);
        onClose();
    };


    return (
        <View style={modalStyles.container}>
            <Text style={modalStyles.headerTitle}>Registrar Movimiento de Stock</Text>
            
            <ScrollView>
                <Text style={modalStyles.label}>Operación:</Text>
                <View style={modalStyles.operationSelector}>
                    {OPERACION_OPTIONS.map(opt => (
                        <TouchableOpacity
                            key={opt}
                            style={[modalStyles.operationItem, operacion === opt && modalStyles.operationItemSelected]}
                            onPress={() => setOperacion(opt)}
                        >
                            <Text style={modalStyles.operationText}>{opt}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
                
                <Text style={modalStyles.label}>Buscar Artículo:</Text>
                <TextInput
                    style={modalStyles.input}
                    placeholder="Escriba el nombre del artículo..."
                    value={searchTerm}
                    onChangeText={setSearchTerm}
                />
                
                {searchTerm.length > 2 && (
                    <View style={modalStyles.searchResultBox}>
                        {filteredArticulos.map(art => (
                            <TouchableOpacity
                                key={art.id}
                                style={[modalStyles.searchResultItem, selectedArticuloId === art.id && { backgroundColor: '#E6EBF5' }]}
                                onPress={() => setSelectedArticuloId(art.id)}
                            >
                                <Text>{art.Nombre} (Stock: {art.Stock})</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                )}
                
                {selectedArticuloId && <Text style={modalStyles.selectedText}>Artículo Seleccionado: {selectedArticulo?.Nombre}</Text>}

                <Text style={modalStyles.label}>Unidades:</Text>
                <TextInput
                    style={modalStyles.input}
                    keyboardType="numeric"
                    value={unidades}
                    onChangeText={setUnidades}
                    placeholder="Ej: 10.00"
                />
            </ScrollView>

            <View style={modalStyles.footer}>
                <Button title="Cancelar" onPress={onClose} color="#ccc" />
                <Button title="Guardar Movimiento" onPress={handleSaveMovement} disabled={!selectedArticuloId || parseFloat(unidades) <= 0} />
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    mainContainer: { flex: 1, flexDirection: 'row' },
    contentContainer: { flex: 1, padding: 20 },
    headerTitle: { fontSize: 28, fontWeight: 'bold', marginBottom: 20 },
    actionButton: { 
        backgroundColor: '#1F4788', 
        padding: 12, 
        borderRadius: 8, 
        alignSelf: 'flex-start', 
        marginBottom: 20 
    },
    actionButtonText: { color: 'white', fontWeight: 'bold' },
    listTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
    listContainer: { flex: 1 },
    stockCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    stockName: { fontWeight: 'bold', fontSize: 16 },
    stockUpdate: { fontSize: 12, color: 'gray' },
    stockUnits: { fontSize: 18, fontWeight: 'bold', color: 'green' },
    emptyText: { textAlign: 'center', marginTop: 50, color: 'gray' },
});

const modalStyles = StyleSheet.create({
    container: { flex: 1, padding: 20, justifyContent: 'space-between' },
    headerTitle: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
    label: { fontSize: 16, marginTop: 15, marginBottom: 5, fontWeight: '600' },
    input: { height: 40, borderColor: '#ccc', borderWidth: 1, borderRadius: 5, paddingHorizontal: 10, marginBottom: 15 },
    operationSelector: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 15 },
    operationItem: { padding: 10, borderWidth: 1, borderColor: '#ccc', borderRadius: 5 },
    operationItemSelected: { backgroundColor: '#1F4788', borderColor: '#1F4788' },
    operationText: { color: '#333' },
    searchResultBox: { borderWidth: 1, borderColor: '#ccc', borderRadius: 5, maxHeight: 150, marginBottom: 15 },
    searchResultItem: { padding: 8, borderBottomWidth: 1, borderBottomColor: '#eee' },
    selectedText: { fontSize: 14, fontWeight: 'bold', marginBottom: 10, color: '#1F4788' },
    footer: { flexDirection: 'row', justifyContent: 'space-around', paddingTop: 20, borderTopWidth: 1, borderTopColor: '#eee' },
});

export default AlmacenScreen;