// src/screens/SincronizacionScreen.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import SidebarMenu from '../components/common/SidebarMenu';

const SincronizacionScreen = ({ navigation }: { navigation: any }) => {
  const [exporting, setExporting] = useState(false);
  const [importing, setImporting] = useState(false);
  const [syncing, setSyncing] = useState(false);

  const handleExport = () => {
    setExporting(true);
    setTimeout(() => {
      setExporting(false);
      alert('Datos exportados correctamente');
    }, 2000);
  };

  const handleImport = () => {
    setImporting(true);
    setTimeout(() => {
      setImporting(false);
      alert('Datos importados correctamente');
    }, 2000);
  };

  const handleSync = () => {
    setSyncing(true);
    setTimeout(() => {
      setSyncing(false);
      alert('Sincronización completada');
    }, 3000);
  };

  return (
    <View style={styles.mainContainer}>
      <SidebarMenu navigation={navigation} currentScreen="SincronizacionScreen" />

      <View style={styles.contentContainer}>
        <View style={styles.cardsContainer}>
          {/* Card Exportando Datos */}
          <View style={styles.card}>
            <View style={styles.iconCircle}>
              <Text style={styles.iconText}>⬆️</Text>
            </View>
            <Text style={styles.cardTitle}>Exportando{'\n'}Datos</Text>
            
            {exporting && (
              <ActivityIndicator size="large" color="#1F4788" style={styles.loader} />
            )}
          </View>

          {/* Card Importando Datos */}
          <View style={styles.card}>
            <View style={styles.iconCircle}>
              <Text style={styles.iconText}>⬇️</Text>
            </View>
            <Text style={styles.cardTitle}>Importando{'\n'}Datos</Text>
            
            {importing && (
              <ActivityIndicator size="large" color="#1F4788" style={styles.loader} />
            )}
          </View>

          {/* Card Sincronización */}
          <View style={styles.card}>
            <View style={styles.iconCircle}>
              <Text style={styles.iconText}>🔄</Text>
            </View>
            <Text style={styles.cardTitle}>Sincronización</Text>
            
            {syncing && (
              <ActivityIndicator size="large" color="#1F4788" style={styles.loader} />
            )}
          </View>
        </View>

        {/* Botones de acción */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity 
            style={[styles.actionButton, exporting && styles.actionButtonDisabled]}
            onPress={handleExport}
            disabled={exporting}
          >
            <Text style={styles.actionButtonText}>
              {exporting ? 'Exportando...' : 'Exportar Datos'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.actionButton, importing && styles.actionButtonDisabled]}
            onPress={handleImport}
            disabled={importing}
          >
            <Text style={styles.actionButtonText}>
              {importing ? 'Importando...' : 'Importar Datos'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.syncButton, syncing && styles.actionButtonDisabled]}
            onPress={handleSync}
            disabled={syncing}
          >
            <Text style={styles.syncButtonText}>
              {syncing ? 'Sincronizando...' : 'Sincronizar Ahora'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
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
    padding: 40,
    justifyContent: 'center',
  },
  cardsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 30,
    marginBottom: 50,
  },
  card: {
    width: 220,
    height: 260,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 5,
  },
  iconCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#E6EBF5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  iconText: {
    fontSize: 50,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F4788',
    textAlign: 'center',
    lineHeight: 28,
  },
  loader: {
    marginTop: 15,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
  },
  actionButton: {
    backgroundColor: '#1F4788',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    minWidth: 180,
    alignItems: 'center',
  },
  actionButtonDisabled: {
    backgroundColor: '#999',
    opacity: 0.6,
  },
  actionButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  syncButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    minWidth: 180,
    alignItems: 'center',
  },
  syncButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SincronizacionScreen;
