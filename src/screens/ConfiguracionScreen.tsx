// src/screens/ConfiguracionScreen.tsx

import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Alert, Switch, ScrollView } from 'react-native';
import SidebarMenu from '../components/common/SidebarMenu';

// Simulación de SDK de Impresión para React Native (Generalmente librerías de terceros)
const PrintingSDK = {
    connect: (_address: string) => new Promise(resolve => {
        setTimeout(() => resolve(true), 1000); // Simular conexión exitosa
    }),
    send: (_commands: string) => new Promise(resolve => {
        setTimeout(() => resolve(true), 500); // Simular impresión exitosa
    }),
};

const ConfiguracionScreen = ({ navigation }: { navigation: any }) => {
    const [ipAddress, setIpAddress] = useState('192.168.1.100'); // Para conexión TCP/IP
    const [printerName, setPrinterName] = useState('Zebra TLP2844');
    const [isConnected, setIsConnected] = useState(false);
    const [useBluetooth, setUseBluetooth] = useState(true);

    const handleConnectPrinter = async () => {
        setIsConnected(false);
        const connectionTarget = useBluetooth ? printerName : ipAddress;

        Alert.alert("Conectando", `Intentando conectar a ${connectionTarget}...`);
        
        // --- Lógica de Impresión Nativa (Integración de SDK) ---
        const success = await PrintingSDK.connect(connectionTarget); 

        if (success) {
            setIsConnected(true);
            Alert.alert("Éxito", `Conexión con impresora ${printerName} establecida.`);
        } else {
            Alert.alert("Error", "No se pudo conectar con la impresora. Verifique la dirección/Bluetooth.");
        }
    };

    const handleTestPrint = async () => {
        if (!isConnected) {
            return Alert.alert("Error", "Debe conectar la impresora primero.");
        }
        
        // Comandos de impresión matricial (ESC/P) o ZPL simulados
        const testCommands = "N^XA^FO10,10^ADN,36,20^FDTEST ALBARÁN^FS^XZ"; 

        const success = await PrintingSDK.send(testCommands);

        if (success) {
            Alert.alert("Impresión OK", "Se envió la impresión de prueba a la impresora matricial.");
        } else {
            Alert.alert("Error", "Fallo al enviar el comando de prueba.");
        }
    };

    return (
        <View style={styles.mainContainer}>
            <SidebarMenu navigation={navigation} currentScreen="ConfiguracionScreen" />

            <ScrollView style={styles.contentContainer}>
                <Text style={styles.headerTitle}>Configuración y Mantenimiento</Text>
                
                {/* --- Configuración de Impresora Matricial  --- */}
                <Text style={styles.sectionTitle}>Impresora Matricial (Albaranes)</Text>
                
                <View style={styles.switchRow}>
                    <Text style={styles.label}>Usar Bluetooth</Text>
                    <Switch
                        onValueChange={setUseBluetooth}
                        value={useBluetooth}
                    />
                </View>

                {!useBluetooth && (
                    <View>
                        <Text style={styles.label}>Dirección IP (Conexión de red)</Text>
                        <TextInput 
                            style={styles.input} 
                            value={ipAddress} 
                            onChangeText={setIpAddress} 
                            placeholder="Ej: 192.168.1.100" 
                        />
                    </View>
                )}

                <Text style={styles.label}>Nombre de la Impresora (Bluetooth o Referencia)</Text>
                <TextInput 
                    style={styles.input} 
                    value={printerName} 
                    onChangeText={setPrinterName} 
                    placeholder="Ej: STAR TSP100" 
                />
                
                <View style={styles.statusRow}>
                    <Text style={[styles.label, {flex: 1}]}>Estado de la Conexión:</Text>
                    <Text style={[styles.statusText, {color: isConnected ? 'green' : 'red'}]}>
                        {isConnected ? 'Conectada' : 'Desconectada'}
                    </Text>
                </View>

                <Button title="Conectar Impresora" onPress={handleConnectPrinter} disabled={isConnected} />
                <View style={{ marginTop: 10 }}>
                    <Button title="Impresión de Prueba" onPress={handleTestPrint} disabled={!isConnected} color="#555" />
                </View>
                
                {/* --- Otras Configuraciones --- */}
                <Text style={styles.sectionTitle}>Otros</Text>
                <Text style={styles.infoText}>Aquí se configurarían la agenda de visitas y el login de Administrador/Vendedor.</Text>

            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: { flex: 1, flexDirection: 'row' },
    contentContainer: { flex: 1, padding: 20 },
    headerTitle: { fontSize: 28, fontWeight: 'bold', marginBottom: 20 },
    sectionTitle: { fontSize: 20, fontWeight: 'bold', marginTop: 30, marginBottom: 15, borderBottomWidth: 1, borderBottomColor: '#eee', paddingBottom: 5 },
    label: { fontSize: 16, fontWeight: '600', marginBottom: 5 },
    input: { height: 40, borderColor: '#ccc', borderWidth: 1, borderRadius: 5, paddingHorizontal: 10, marginBottom: 15 },
    switchRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
    statusRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, paddingVertical: 5 },
    statusText: { fontSize: 16, fontWeight: 'bold' },
    infoText: { fontSize: 14, color: 'gray' },
});

export default ConfiguracionScreen;