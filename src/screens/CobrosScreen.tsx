// src/screens/CobrosScreen.tsx

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Alert, Modal, Button } from 'react-native';
import { useRealm, useQuery } from '@realm/react';
import SidebarMenu from '../components/common/SidebarMenu';
import { NotaVenta, Cliente } from '../models/Schemas';
import { postVerialData } from '../services/VerialAPI';

// Definición de Tipo de Pago (Basado en GetMetodosPagoWS - Pág. 31)
type MetodoPago = { Id: number; Nombre: string; };

const CobrosScreen = ({ navigation }: { navigation: any }) => {
    const realm = useRealm();
    // Usar la vista de Notas de Venta SINCRONIZADAS para simular deudas, ya que los pagos
    // se asocian a documentos ya creados en Verial.
    // En una aplicación real, se cargaría un "listado de deudas" del ERP.
    const syncedVentas = useQuery(NotaVenta).filtered('EstadoSincro == "SINCRONIZADO"');
    const [selectedNota, setSelectedNota] = useState<NotaVenta | null>(null);
    const [metodosPago, setMetodosPago] = useState<MetodoPago[]>([]);

    useEffect(() => {
        // Cargar los métodos de pago de Verial una vez al entrar
        const fetchMetodosPago = async () => {
            try {
                const result = await postVerialData<any>('GetMetodosPagoWS', {});
                if (result.InfoError.Codigo === 0) {
                    setMetodosPago(result.MetodosPago);
                }
            } catch (error) {
                console.error("Error al cargar métodos de pago:", error);
            }
        };
        fetchMetodosPago();
    }, []);

    const handleRegisterPayment = async (nota: NotaVenta) => {
        // Asume que la nota tiene saldo pendiente (TotalImporte)
        setSelectedNota(nota);
    };

    return (
        <View style={styles.mainContainer}>
            <SidebarMenu navigation={navigation} currentScreen="CobrosScreen" />

            <View style={styles.contentContainer}>
                <Text style={styles.headerTitle}>Cobros</Text>
                <Text style={styles.subHeader}>Gestión de Cobros de Notas de Venta Sincronizadas (Deudas)</Text>
                
                <ScrollView style={styles.listContainer}>
                    {syncedVentas.map(nota => (
                        <CobroItem 
                            key={nota.idLocal} 
                            nota={nota} 
                            realm={realm}
                            onRegisterPayment={handleRegisterPayment}
                        />
                    ))}
                    {syncedVentas.length === 0 && <Text style={styles.emptyText}>No hay pedidos sincronizados pendientes de cobro.</Text>}
                </ScrollView>
            </View>
            
            {/* Modal de Registro de Pago */}
            {selectedNota && (
                <PagoModal 
                    nota={selectedNota} 
                    metodosPago={metodosPago}
                    onClose={() => setSelectedNota(null)}
                />
            )}
        </View>
    );
};

// Componente para una fila de cobro
const CobroItem = ({ nota, realm, onRegisterPayment }: { nota: NotaVenta; realm: any; onRegisterPayment: (nota: NotaVenta) => void }) => {
    const cliente = realm.objectForPrimaryKey('Cliente', nota.ID_Cliente) as Cliente | null;
    // Calcular un "saldo pendiente" ficticio para el ejemplo
    const saldoPendiente = nota.TotalImporte; 

    if (saldoPendiente <= 0) return null; // No mostrar si ya está pagado

    return (
        <View style={styles.cobroCard}>
            <View>
                <Text style={styles.cobroTitle}>{cliente?.Nombre || `Cliente ID: ${nota.ID_Cliente}`}</Text>
                <Text style={styles.cobroInfo}>Pedido ID Verial: {nota.idVerial}</Text>
                <Text style={styles.cobroInfo}>Fecha: {nota.Fecha.toISOString().substring(0, 10)}</Text>
            </View>
            <View style={styles.cobroActions}>
                <Text style={styles.saldoAmount}>{saldoPendiente.toFixed(2)} €</Text>
                <TouchableOpacity 
                    style={styles.payButton}
                    onPress={() => onRegisterPayment(nota)}
                >
                    <Text style={styles.payButtonText}>Registrar Cobro</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

// --- Componente Modal para el Pago ---
const PagoModal = ({ nota, metodosPago, onClose }: { nota: NotaVenta; metodosPago: MetodoPago[]; onClose: () => void }) => {
    const [importe, setImporte] = useState(nota.TotalImporte.toFixed(2));
    const [metodoId, setMetodoId] = useState<number | null>(null);

    const handleSavePago = async () => {
        const importePago = parseFloat(importe);
        if (importePago <= 0 || !metodoId) {
            return Alert.alert("Error", "Debe especificar un importe válido y un método de pago.");
        }

        // 1. Estructura de NuevoPagoWS (Pág. 31)
        const pagoBody = {
            ID_DocCli: nota.idVerial, // ID del pedido en Verial
            ID_MetodoPago: metodoId,
            Fecha: new Date().toISOString().substring(0, 10),
            Importe: importePago,
        };

        // 2. Llamada a la API de Verial
        const result = await postVerialData<any>('NuevoPagoWS', pagoBody);

        if (result.InfoError.Codigo === 0) {
            Alert.alert("Éxito", `Pago de ${importePago}€ registrado en Verial.`);
            // En una app real, aquí se actualizaría la deuda del pedido localmente.
            onClose();
        } else {
            Alert.alert("Error de Pago", `Fallo al registrar el pago. Código: ${result.InfoError.Codigo}, Descripción: ${result.InfoError.Descripcion}`);
        }
    };

    return (
        <Modal animationType="slide" visible={true} onRequestClose={onClose}>
            <View style={modalStyles.container}>
                <Text style={modalStyles.headerTitle}>Registrar Pago para Pedido #{nota.idVerial}</Text>
                
                <Text style={modalStyles.label}>Importe a Pagar (€):</Text>
                <TextInput
                    style={modalStyles.input}
                    keyboardType="numeric"
                    value={importe}
                    onChangeText={setImporte}
                />
                
                <Text style={modalStyles.label}>Método de Pago:</Text>
                {/* Selector simple para el método de pago */}
                <ScrollView style={modalStyles.metodoSelector}>
                    {metodosPago.map((metodo: MetodoPago) => (
                        <TouchableOpacity
                            key={metodo.Id}
                            style={[modalStyles.metodoItem, metodoId === metodo.Id && modalStyles.metodoItemSelected]}
                            onPress={() => setMetodoId(metodo.Id)}
                        >
                            <Text>{metodo.Nombre}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                <View style={modalStyles.footer}>
                    <Button title="Cancelar" onPress={onClose} color="#ccc" />
                    <Button title="Confirmar Pago" onPress={handleSavePago} disabled={!metodoId || parseFloat(importe) <= 0} />
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    mainContainer: { flex: 1, flexDirection: 'row' },
    contentContainer: { flex: 1, padding: 20 },
    headerTitle: { fontSize: 28, fontWeight: 'bold', marginBottom: 10 },
    subHeader: { fontSize: 14, color: 'gray', marginBottom: 20 },
    listContainer: { flex: 1 },
    cobroCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    cobroTitle: { fontWeight: 'bold', fontSize: 16 },
    cobroInfo: { fontSize: 12, color: 'gray' },
    cobroActions: { alignItems: 'flex-end' },
    saldoAmount: { fontSize: 18, fontWeight: 'bold', color: 'red' },
    payButton: {
        backgroundColor: '#1F4788',
        padding: 8,
        borderRadius: 5,
        marginTop: 5,
    },
    payButtonText: { color: 'white', fontWeight: 'bold', fontSize: 12 },
    emptyText: { textAlign: 'center', marginTop: 50, color: 'gray' },
});

const modalStyles = StyleSheet.create({
    container: { flex: 1, padding: 30, justifyContent: 'space-between' },
    headerTitle: { fontSize: 24, fontWeight: 'bold', marginBottom: 30, textAlign: 'center' },
    label: { fontSize: 16, marginTop: 15, marginBottom: 5, fontWeight: '600' },
    input: { height: 40, borderColor: '#ccc', borderWidth: 1, borderRadius: 5, paddingHorizontal: 10, marginBottom: 15 },
    metodoSelector: { maxHeight: 200, borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 10 },
    metodoItem: { padding: 10, borderBottomWidth: 1, borderBottomColor: '#eee' },
    metodoItemSelected: { backgroundColor: '#E6EBF5', fontWeight: 'bold' },
    footer: { flexDirection: 'row', justifyContent: 'space-around', paddingTop: 20, borderTopWidth: 1, borderTopColor: '#eee' },
});

export default CobrosScreen;