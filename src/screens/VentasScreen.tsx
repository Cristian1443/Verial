// src/screens/VentasScreen.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Modal } from 'react-native';
import SidebarMenu from '../components/common/SidebarMenu';

const VentasScreen = ({ navigation }: { navigation: any }) => {
  const [showNewVentaModal, setShowNewVentaModal] = useState(false);

  const modules = [
    { id: 1, icon: '📋', title: 'Lista\nNotas', screen: 'VentasScreen' },
    { id: 2, icon: '📱', title: 'Tablet\nVentas', screen: 'VentasScreen' },
    { id: 3, icon: '📊', title: 'Cobros', screen: 'CobrosScreen' },
    { id: 4, icon: '📃', title: 'Gastos', screen: 'GastosScreen' },
    { id: 5, icon: '📄', title: 'Documentos', screen: 'DocumentacionScreen' },
    { id: 6, icon: '⚙️', title: 'Configuración', screen: 'ConfiguracionScreen' },
    { id: 7, icon: '👥', title: 'Clientes', screen: 'ClientesScreen' },
  ];

  return (
    <View style={styles.mainContainer}>
      <SidebarMenu navigation={navigation} currentScreen="VentasScreen" />
      
      <View style={styles.contentContainer}>
        <Text style={styles.headerTitle}>Ventas</Text>
        
        {/* Grid de Módulos */}
        <View style={styles.modulesGrid}>
          {modules.map((module) => (
            <TouchableOpacity
              key={module.id}
              style={styles.moduleCard}
              onPress={() => {
                if (module.screen === 'VentasScreen') {
                  setShowNewVentaModal(true);
                } else {
                  navigation.navigate(module.screen);
                }
              }}
            >
              <Text style={styles.moduleIcon}>{module.icon}</Text>
              <Text style={styles.moduleTitle}>{module.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Modal de Nueva Venta */}
      {showNewVentaModal && (
        <Modal
          visible={showNewVentaModal}
          animationType="slide"
          onRequestClose={() => setShowNewVentaModal(false)}
        >
          <NewVentaModal onClose={() => setShowNewVentaModal(false)} />
        </Modal>
      )}
    </View>
  );
};

// Componente Modal de Nueva Venta
const NewVentaModal = ({ onClose }: { onClose: () => void }) => {
  return (
    <View style={styles.modalContainer}>
      <View style={styles.modalHeader}>
        <TouchableOpacity onPress={onClose}>
          <Text style={styles.backButton}>← Volver</Text>
        </TouchableOpacity>
        <Text style={styles.modalTitle}>Nueva Venta</Text>
        <View style={{ width: 60 }} />
      </View>

      <ScrollView style={styles.modalContent}>
        <Text style={styles.modalSectionTitle}>Cliente</Text>
        <TouchableOpacity style={styles.selectButton}>
          <Text style={styles.selectButtonText}>Seleccionar Cliente</Text>
        </TouchableOpacity>

        <Text style={styles.modalSectionTitle}>Artículos</Text>
        <Text style={styles.emptyText}>No hay artículos agregados</Text>

        <TouchableOpacity style={styles.addArticleButton}>
          <Text style={styles.addArticleText}>+ Añadir Artículo</Text>
        </TouchableOpacity>
      </ScrollView>

      <View style={styles.modalFooter}>
        <View style={styles.totalSection}>
          <Text style={styles.totalLabel}>Subtotal:</Text>
          <Text style={styles.totalValue}>0,00 €</Text>
        </View>
        
        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Guardar Nota</Text>
        </TouchableOpacity>
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
    width: 140,
    height: 140,
    backgroundColor: '#1F4788',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  moduleIcon: {
    fontSize: 40,
    marginBottom: 12,
  },
  moduleTitle: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 18,
  },
  // Modal styles
  modalContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: 'white',
  },
  backButton: {
    fontSize: 16,
    color: '#1F4788',
    fontWeight: '600',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  modalContent: {
    flex: 1,
    padding: 20,
  },
  modalSectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
    marginBottom: 10,
  },
  selectButton: {
    backgroundColor: '#1F4788',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  selectButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    padding: 30,
    fontSize: 14,
  },
  addArticleButton: {
    borderWidth: 2,
    borderColor: '#1F4788',
    borderStyle: 'dashed',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  addArticleText: {
    color: '#1F4788',
    fontSize: 16,
    fontWeight: '600',
  },
  modalFooter: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    padding: 20,
    backgroundColor: 'white',
  },
  totalSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  totalValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F4788',
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default VentasScreen;
