// src/screens/VentasScreen.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import SidebarMenu from '../components/common/SidebarMenu';
import NewVentaModal from '../components/ventas/NewVentaModal';

const VentasScreen = ({ navigation }: { navigation: any }) => {
  const [showNewVentaModal, setShowNewVentaModal] = useState(false);

  const modules = [
    { id: 1, icon: '📋', title: 'Lista\nNotas', action: () => setShowNewVentaModal(true) },
    { id: 2, icon: '📱', title: 'Tablet\nVentas', action: () => setShowNewVentaModal(true) },
    { id: 3, icon: '📊', title: 'Cobros', action: () => navigation.navigate('CobrosScreen') },
    { id: 4, icon: '📃', title: 'Gastos', action: () => navigation.navigate('GastosScreen') },
    { id: 5, icon: '📄', title: 'Documentos', action: () => navigation.navigate('DocumentacionScreen') },
    { id: 6, icon: '⚙️', title: 'Configuración', action: () => navigation.navigate('ConfiguracionScreen') },
    { id: 7, icon: '👥', title: 'Clientes', action: () => navigation.navigate('ClientesScreen') },
  ];

  return (
    <View style={styles.mainContainer}>
      <SidebarMenu navigation={navigation} currentScreen="VentasScreen" />
      
      <View style={styles.contentContainer}>
        <Text style={styles.headerTitle}>Ventas</Text>
        
        {/* Grid de Módulos - 7 botones azules */}
        <View style={styles.modulesGrid}>
          {modules.map((module) => (
            <TouchableOpacity
              key={module.id}
              style={styles.moduleCard}
              onPress={module.action}
            >
              <Text style={styles.moduleIcon}>{module.icon}</Text>
              <Text style={styles.moduleTitle}>{module.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Modal de Nueva Venta */}
      <NewVentaModal
        visible={showNewVentaModal}
        onClose={() => setShowNewVentaModal(false)}
      />
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
  modulesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20,
  },
  moduleCard: {
    width: 150,
    height: 150,
    backgroundColor: '#1F4788',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 5,
  },
  moduleIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  moduleTitle: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 18,
  },
});

export default VentasScreen;
