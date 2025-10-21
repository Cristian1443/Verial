// src/screens/LoginScreen.tsx

import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator, Alert, ScrollView } from 'react-native';
import { useRealm } from '@realm/react';
import { sincronizarAgentes, sincronizarClientes, sincronizarArticulos } from '../services/Sincronizador';
// Importar estilos de mockup si estuvieran definidos

const LoginScreen = ({ navigation }) => {
  const realm = useRealm();
  const [loading, setLoading] = useState(false);
  const [syncStatus, setSyncStatus] = useState('Esperando credenciales...');
  const [agentId, setAgentId] = useState(''); 
  const [password, setPassword] = useState('');

  const runFullSync = async () => {
    setLoading(true);
    let success = true;

    // 1. Sincronizar Agentes (vendedores)
    setSyncStatus('Sincronizando Vendedores...');
    if (!await sincronizarAgentes(realm)) { success = false; }

    // 2. Sincronizar Clientes
    setSyncStatus('Sincronizando Clientes...');
    if (success && !await sincronizarClientes(realm)) { success = false; }

    // 3. Sincronizar Artículos
    setSyncStatus('Sincronizando Artículos...');
    if (success && !await sincronizarArticulos(realm)) { success = false; }

    // 4. (Pendiente) Sincronizar Stock, Precios, etc.
    // ...

    setLoading(false);
    return success;
  };

  const handleLogin = async () => {
    if (!agentId || !password) {
      Alert.alert("Error", "Debe introducir el ID de Vendedor y Contraseña.");
      return;
    }

    // --- Simulación de Autenticación (Reemplazar con lógica real si el ERP lo requiere) ---
    // En la versión final, aquí se validaría el NIF/WebUser/WebPassword si Verial lo soporta.
    // Por ahora, asumimos que el login es solo una clave de acceso local al ID de Agente.

    setSyncStatus('Credenciales Aceptadas. Iniciando sincronización de datos...');
    const syncSuccess = await runFullSync();

    if (syncSuccess) {
        Alert.alert("Sincronización Completa", "Datos listos. Accediendo al Dashboard.");
        // Navegación exitosa
        navigation.replace('Dashboard');
    } else {
        setSyncStatus('Error crítico en la sincronización. Revisar conexión.');
        Alert.alert("Error Crítico", "No se pudo completar la sincronización. Intente de nuevo.");
    }
  };

  // El diseño debe ser responsivo y adaptable a tablet (mockup Tablet)
  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.syncStatusText}>{syncStatus}</Text>
        <Text>Modo de operación: Offline-First. Esto solo ocurre al inicio o al forzar la sincronización.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Basado en el mockup de Iniciar Sesión */}
      <Text style={styles.title}>Iniciar sesión</Text>
      <TextInput
        style={styles.input}
        placeholder="ID de Vendedor (Agente)"
        keyboardType="numeric"
        value={agentId}
        onChangeText={setAgentId}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Continuar" onPress={handleLogin} />
    </View>
  );
};

// Estilos básicos (ajustar para el look and feel de los mockups)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 40,
    textAlign: 'center',
    color: '#000',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 15,
    backgroundColor: 'white',
  },
  syncStatusText: {
    marginTop: 15,
    textAlign: 'center',
    color: 'gray',
  }
});

export default LoginScreen;