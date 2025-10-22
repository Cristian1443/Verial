// src/screens/ConfiguracionScreen.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Switch } from 'react-native';
import SidebarMenu from '../components/common/SidebarMenu';

const ConfiguracionScreen = ({ navigation }: { navigation: any }) => {
  const [url, setUrl] = useState('');
  const [puerto, setPuerto] = useState('');
  const [usuario, setUsuario] = useState('');
  const [enableNotifications, setEnableNotifications] = useState(true);
  const [enableSync, setEnableSync] = useState(false);

  return (
    <View style={styles.mainContainer}>
      <SidebarMenu navigation={navigation} currentScreen="ConfiguracionScreen" />

      <ScrollView style={styles.contentContainer}>
        <Text style={styles.headerTitle}>Configuración</Text>

        {/* Sección de Conexión */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>⚙️ Configuración de Conexión</Text>
          
          <View style={styles.formGroup}>
            <Text style={styles.label}>URL del Servidor</Text>
            <TextInput
              style={styles.input}
              placeholder="https://servidor.verial.com"
              value={url}
              onChangeText={setUrl}
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Puerto</Text>
            <TextInput
              style={styles.input}
              placeholder="8000"
              value={puerto}
              onChangeText={setPuerto}
              keyboardType="numeric"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Usuario</Text>
            <TextInput
              style={styles.input}
              placeholder="nombre_usuario"
              value={usuario}
              onChangeText={setUsuario}
            />
          </View>

          <TouchableOpacity style={styles.testButton}>
            <Text style={styles.testButtonText}>🔗 Probar Conexión</Text>
          </TouchableOpacity>
        </View>

        {/* Sección de Preferencias */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🔔 Preferencias</Text>
          
          <View style={styles.switchRow}>
            <Text style={styles.switchLabel}>Notificaciones push</Text>
            <Switch
              value={enableNotifications}
              onValueChange={setEnableNotifications}
              trackColor={{ false: '#ddd', true: '#1F4788' }}
            />
          </View>

          <View style={styles.switchRow}>
            <Text style={styles.switchLabel}>Sincronización automática</Text>
            <Switch
              value={enableSync}
              onValueChange={setEnableSync}
              trackColor={{ false: '#ddd', true: '#1F4788' }}
            />
          </View>
        </View>

        {/* Información de la App */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>ℹ️ Información de la App</Text>
          
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Versión:</Text>
            <Text style={styles.infoValue}>1.0.0</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Última sincronización:</Text>
            <Text style={styles.infoValue}>Nunca</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Base de datos:</Text>
            <Text style={styles.infoValue}>Realm 20.2.0</Text>
          </View>
        </View>

        {/* Botones de acción */}
        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.saveButtonText}>💾 Guardar Configuración</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.dangerButton}>
          <Text style={styles.dangerButtonText}>🗑️ Limpiar Datos Locales</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
  },
  contentContainer: {
    flex: 1,
    padding: 30,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 30,
  },
  section: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 25,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#555',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#f9f9f9',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
  },
  testButton: {
    backgroundColor: '#1F4788',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  testButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  switchLabel: {
    fontSize: 15,
    color: '#333',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  infoLabel: {
    fontSize: 14,
    color: '#666',
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  dangerButton: {
    backgroundColor: '#f44336',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  dangerButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ConfiguracionScreen;
