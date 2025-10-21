// src/screens/SincronizacionScreen.tsx

import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRealm } from '@realm/react';
import SidebarMenu from '../components/common/SidebarMenu';
import { sincronizarClientes, sincronizarArticulos, sincronizarOperacionesVenta } from '../services/Sincronizador';

const SincronizacionScreen = ({ navigation }: { navigation: any }) => {
  const realm = useRealm();
  const [loading, setLoading] = useState(false);
  const [log, setLog] = useState<string[]>([]);

  const appendLog = (message: string) => {
    setLog(prev => [`[${new Date().toLocaleTimeString()}] ${message}`, ...prev]);
  };

  const handleFullSync = async () => {
    if (loading) return;
    setLoading(true);
    setLog([]);
    appendLog("--- INICIANDO SINCRONIZACIÓN COMPLETA ---");

    try {
        // --- FASE 1: UPLOAD (Sincronización de Salida) ---
        appendLog("FASE 1/3: Subiendo Notas de Venta pendientes...");
        const uploadedCount = await sincronizarOperacionesVenta(realm);
        appendLog(`Éxito: ${uploadedCount} Notas de Venta subidas.`);

        // --- FASE 2: DOWNLOAD MAESTROS (Sincronización de Entrada) ---
        appendLog("FASE 2/3: Descargando Clientes (actualizaciones)...");
        const syncClientes = await sincronizarClientes(realm);
        appendLog(syncClientes ? "Clientes actualizados." : "Clientes: Error.");

        appendLog("FASE 3/3: Descargando Artículos (actualizaciones)...");
        const syncArticulos = await sincronizarArticulos(realm);
        appendLog(syncArticulos ? "Artículos actualizados." : "Artículos: Error.");
        
        // Aquí se agregarían las sincronizaciones de Stock, Precios, etc.

        appendLog("--- SINCRONIZACIÓN FINALIZADA ---");

    } catch (error) {
        appendLog(`ERROR CRÍTICO: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
        setLoading(false);
    }
  };

  return (
    <View style={styles.mainContainer}>
      <SidebarMenu navigation={navigation} currentScreen="SincronizacionScreen" />

      <View style={styles.contentContainer}>
        <Text style={styles.headerTitle}>Módulo de Comunicación (Sincronización)</Text>

        <TouchableOpacity 
          style={loading ? styles.syncButtonDisabled : styles.syncButton} 
          onPress={handleFullSync}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.syncButtonText}>Sincronización Diaria Ahora</Text>
          )}
        </TouchableOpacity>
        
        <Text style={styles.infoText}>
            La aplicación funciona offline. Use este módulo para enviar Notas de Venta y recibir las últimas actualizaciones de Clientes/Artículos.
        </Text>
        
        {/* Log de Sincronización */}
        <Text style={styles.logTitle}>Registro de Actividad:</Text>
        <ScrollView style={styles.logContainer}>
            {log.map((entry, index) => (
                <Text key={index} style={styles.logEntry}>{entry}</Text>
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
  },
  contentContainer: {
    flex: 1,
    padding: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  syncButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  syncButtonDisabled: {
    backgroundColor: '#999',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  syncButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  infoText: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 10,
  },
  logTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  logContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    borderRadius: 5,
    padding: 10,
    minHeight: 200,
  },
  logEntry: {
    fontSize: 12,
    color: '#333',
    fontFamily: 'monospace',
  }
});

export default SincronizacionScreen;