// src/screens/GastosScreen.tsx

import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Alert, Modal, Button } from 'react-native';
import { useRealm, useQuery } from '@realm/react';
import SidebarMenu from '../components/common/SidebarMenu';
import { Gasto } from '../models/Schemas';
// import { v4 as uuidv4 } from 'uuid'; // Necesario para el idLocal - Requiere instalación: npm install uuid
// import DateTimePicker from '@react-native-community/datetimepicker'; // Se necesita esta librería para manejar fechas nativas - Requiere instalación

// Generador de UUID simple (alternativa temporal a la librería uuid)
const generateUUID = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
};

// Tipos de gasto fijos (basados en el requisito )
const TIPO_GASTO_OPTIONS = ['Comidas', 'Hoteles', 'Combustible', 'Peajes', 'Otros'];

const GastosScreen = ({ navigation }: { navigation: any }) => {
    const gastos = useQuery(Gasto).sorted('Fecha', true); // Listar por fecha descendente
    const [isModalVisible, setIsModalVisible] = useState(false);

    // Métricas del día (Basado en el mockup)
    const today = new Date().toISOString().substring(0, 10);
    const gastosHoy = gastos.filtered(`Fecha.toISOString() BEGINSWITH "${today}"`);
    const totalGastosHoy = gastosHoy.sum('Importe');
    const totalGastosSincronizados = gastosHoy.filtered('EstadoSincro == "SINCRONIZADO"').sum('Importe');
    const porcentajeSinc = totalGastosHoy > 0 ? (totalGastosSincronizados / totalGastosHoy) * 100 : 0;
    
    return (
        <View style={styles.mainContainer}>
            <SidebarMenu navigation={navigation} currentScreen="GastosScreen" />

            <View style={styles.contentContainer}>
                <Text style={styles.headerTitle}>Gastos</Text>
                
                {/* Bar de métricas (similar al mockup de Cobros) */}
                <View style={styles.metricsBar}>
                    <Text style={styles.metricsText}>
                        Total: {totalGastosHoy.toFixed(2)} € de 2.000,00 € ({porcentajeSinc.toFixed(0)}%)
                    </Text>
                    <TouchableOpacity 
                        style={styles.addButton} 
                        onPress={() => setIsModalVisible(true)}
                    >
                        <Text style={styles.addButtonText}>+ Añadir Nuevo Gasto</Text>
                    </TouchableOpacity>
                </View>

                {/* Listado de Gastos */}
                <ScrollView style={styles.listContainer}>
                    {gastos.map(gasto => (
                        <GastoItem key={gasto.idLocal} gasto={gasto} />
                    ))}
                    {gastos.length === 0 && <Text style={styles.emptyText}>No hay gastos registrados localmente.</Text>}
                </ScrollView>
            </View>

            {/* Modal de Registro de Nuevo Gasto */}
            <Modal animationType="slide" visible={isModalVisible} onRequestClose={() => setIsModalVisible(false)}>
                <NewGastoModal onClose={() => setIsModalVisible(false)} />
            </Modal>
        </View>
    );
};

// Componente para una fila de gasto (basado en el mockup de Gastos)
const GastoItem = ({ gasto }: { gasto: Gasto }) => {
    const syncColor = gasto.EstadoSincro === 'SINCRONIZADO' ? 'green' : 'orange';
    const syncText = gasto.EstadoSincro === 'PENDIENTE' ? 'Pendiente' : 'Sincronizado';

    return (
        <View style={styles.gastoCard}>
            <View style={styles.gastoDetails}>
                <Text style={styles.gastoType}>{gasto.Tipo}</Text>
                <Text style={styles.gastoDate}>Fecha: {gasto.Fecha.toISOString().substring(0, 10)}</Text>
            </View>
            <View style={styles.gastoAmountContainer}>
                <Text style={styles.gastoAmount}>{gasto.Importe.toFixed(2)} €</Text>
                <Text style={[styles.gastoSync, { color: syncColor }]}>{syncText}</Text>
            </View>
        </View>
    );
};

// --- Componente Modal para el Registro de Gasto ---
const NewGastoModal = ({ onClose }: { onClose: () => void }) => {
    const realm = useRealm();
    const [tipo, setTipo] = useState(TIPO_GASTO_OPTIONS[0]);
    const [importe, setImporte] = useState('');
    const [fecha] = useState(new Date());

    const handleSaveGasto = () => {
        const importeFloat = parseFloat(importe);
        if (!tipo || importeFloat <= 0) {
            return Alert.alert("Error", "Seleccione un tipo e introduzca un importe válido.");
        }

        realm.write(() => {
            realm.create('Gasto', {
                idLocal: generateUUID(),
                Tipo: tipo,
                Importe: importeFloat,
                Fecha: fecha,
                EstadoSincro: 'PENDIENTE',
            });
        });
        Alert.alert("Éxito", "Gasto registrado localmente y pendiente de sincronización.");
        onClose();
    };

    return (
        <View style={modalStyles.container}>
            <Text style={modalStyles.headerTitle}>Registrar Nuevo Gasto</Text>

            <ScrollView>
                <Text style={modalStyles.label}>Tipo de Gasto:</Text>
                <View style={modalStyles.typeSelector}>
                    {TIPO_GASTO_OPTIONS.map(opt => (
                        <TouchableOpacity
                            key={opt}
                            style={[modalStyles.typeItem, tipo === opt && modalStyles.typeItemSelected]}
                            onPress={() => setTipo(opt)}
                        >
                            <Text>{opt}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <Text style={modalStyles.label}>Importe (€):</Text>
                <TextInput
                    style={modalStyles.input}
                    keyboardType="numeric"
                    value={importe}
                    onChangeText={setImporte}
                    placeholder="Ej: 45.50"
                />

                <Text style={modalStyles.label}>Fecha: {fecha.toLocaleDateString()}</Text>
            </ScrollView>

            <View style={modalStyles.footer}>
                <Button title="Cancelar" onPress={onClose} color="#ccc" />
                <Button title="Guardar Gasto" onPress={handleSaveGasto} disabled={parseFloat(importe) <= 0 || !tipo} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: { flex: 1, flexDirection: 'row' },
    contentContainer: { flex: 1, padding: 20 },
    headerTitle: { fontSize: 28, fontWeight: 'bold', marginBottom: 10 },
    metricsBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#E6EBF5',
        padding: 15,
        borderRadius: 8,
        marginBottom: 20,
    },
    metricsText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1F4788',
    },
    addButton: {
        backgroundColor: '#1F4788',
        padding: 8,
        borderRadius: 5,
    },
    addButtonText: { color: 'white', fontWeight: 'bold', fontSize: 12 },
    listContainer: { flex: 1 },
    gastoCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    gastoDetails: { flex: 3 },
    gastoType: { fontWeight: 'bold', fontSize: 16 },
    gastoDesc: { fontSize: 12, color: 'gray' },
    gastoDate: { fontSize: 12, color: '#666' },
    gastoAmountContainer: { flex: 1, alignItems: 'flex-end' },
    gastoAmount: { fontSize: 18, fontWeight: 'bold' },
    gastoSync: { fontSize: 12 },
    emptyText: { textAlign: 'center', marginTop: 50, color: 'gray' },
});

const modalStyles = StyleSheet.create({
    container: { flex: 1, padding: 20, justifyContent: 'space-between' },
    headerTitle: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
    label: { fontSize: 16, marginTop: 15, marginBottom: 5, fontWeight: '600' },
    input: { height: 40, borderColor: '#ccc', borderWidth: 1, borderRadius: 5, paddingHorizontal: 10, marginBottom: 15 },
    dateInput: {
        height: 40, 
        borderColor: '#ccc', 
        borderWidth: 1, 
        borderRadius: 5, 
        paddingHorizontal: 10, 
        justifyContent: 'center', 
        marginBottom: 15
    },
    typeSelector: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 15 },
    typeItem: { padding: 10, borderWidth: 1, borderColor: '#ccc', borderRadius: 5 },
    typeItemSelected: { backgroundColor: '#1F4788', borderColor: '#1F4788', },
    footer: { flexDirection: 'row', justifyContent: 'space-around', paddingTop: 20, borderTopWidth: 1, borderTopColor: '#eee' },
});

export default GastosScreen;