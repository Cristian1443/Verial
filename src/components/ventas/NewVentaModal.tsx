// src/components/ventas/NewVentaModal.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Modal } from 'react-native';

const NewVentaModal = ({ visible, onClose }: { visible: boolean; onClose: () => void }) => {
  const [selectedCliente, setSelectedCliente] = useState<any>(null);
  const [lineas, setLineas] = useState<any[]>([]);
  const [showClientSelector, setShowClientSelector] = useState(false);
  const [showArticleSelector, setShowArticleSelector] = useState(false);

  const subtotal = lineas.reduce((sum, l) => sum + (l.Uds * l.Precio * (1 - l.Dto / 100)), 0);
  const iva = subtotal * 0.21;
  const total = subtotal + iva;

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.backButton}>← Volver</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Nueva Venta</Text>
          <TouchableOpacity>
            <Text style={styles.headerAction}>...</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.mainContent}>
          {/* Panel Izquierdo - Selección */}
          <View style={styles.leftPanel}>
            <ScrollView>
              {/* Cliente */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Cliente</Text>
                <TouchableOpacity 
                  style={styles.selectCard}
                  onPress={() => setShowClientSelector(true)}
                >
                  <Text style={styles.selectCardText}>
                    {selectedCliente ? selectedCliente.Nombre : '📋 Buscar/Crear Escaneado'}
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Tipo de Nota y Forma de Pago */}
              <View style={styles.row}>
                <View style={[styles.section, { flex: 1, marginRight: 10 }]}>
                  <Text style={styles.sectionTitle}>Tipo de Nota</Text>
                  <TouchableOpacity style={styles.dropdown}>
                    <Text style={styles.dropdownText}>Forma de Pago</Text>
                  </TouchableOpacity>
                </View>
                
                <View style={[styles.section, { flex: 1 }]}>
                  <Text style={styles.sectionTitle}>Forma de Pago</Text>
                  <TouchableOpacity style={styles.dropdown}>
                    <Text style={styles.dropdownText}>-</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Artículos */}
              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionTitle}>Artículo  Nota: 0</Text>
                  <View style={styles.switchContainer}>
                    <Text style={styles.switchLabel}>¿Añadir descuento en documento?</Text>
                    <View style={styles.switch}>
                      <Text style={styles.switchText}>NO  SÍ</Text>
                    </View>
                  </View>
                </View>

                {lineas.length === 0 && (
                  <View style={styles.emptyArticles}>
                    <Text style={styles.emptyText}>Artículos</Text>
                    <View style={styles.tablePlaceholder}>
                      <View style={styles.tableRow}>
                        <Text style={styles.tableHeader}>Artículo</Text>
                        <Text style={styles.tableHeader}>Cant.</Text>
                      </View>
                    </View>
                  </View>
                )}

                {/* Precio, Descuento */}
                <View style={styles.row}>
                  <View style={[styles.inputGroup, { flex: 1, marginRight: 10 }]}>
                    <Text style={styles.inputLabel}>Precio</Text>
                    <TextInput style={styles.input} value="0,00 €" editable={false} />
                  </View>
                  <View style={[styles.inputGroup, { flex: 1 }]}>
                    <Text style={styles.inputLabel}>Descuento</Text>
                    <TextInput style={styles.input} value="0%" editable={false} />
                  </View>
                </View>

                {/* Notas */}
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Nota:</Text>
                  <TextInput
                    style={styles.textArea}
                    placeholder="Lorem ipsum dolor sit amet, consectetur"
                    multiline
                    numberOfLines={3}
                  />
                </View>

                <TouchableOpacity 
                  style={styles.addButton}
                  onPress={() => setShowArticleSelector(true)}
                >
                  <Text style={styles.addButtonText}>+ Añadir Artículo</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>

          {/* Panel Derecho - Nota de Venta */}
          <View style={styles.rightPanel}>
            <View style={styles.notaCard}>
              <Text style={styles.notaTitle}>Nota de Venta</Text>
              
              {/* Tabla de artículos */}
              <ScrollView style={styles.table}>
                {lineas.map((linea, index) => (
                  <View key={index} style={styles.tableRow}>
                    <Text style={styles.tableCell}>Artículo</Text>
                    <Text style={styles.tableCell}>{linea.Uds}</Text>
                    <Text style={styles.tableCell}>{linea.Precio}€</Text>
                    <Text style={styles.tableCell}>{linea.Dto}%</Text>
                  </View>
                ))}
              </ScrollView>

              {/* Descuentos y Totales */}
              <View style={styles.totalsSection}>
                <View style={styles.totalRow}>
                  <Text style={styles.totalLabel}>Descuentos:</Text>
                  <Text style={styles.totalValue}>{subtotal.toFixed(2)} € (17%)</Text>
                </View>
                <View style={styles.totalRow}>
                  <Text style={styles.totalLabel}>IVA + RE:</Text>
                  <Text style={styles.totalValue}>$ {iva.toFixed(2)}</Text>
                </View>
                <View style={[styles.totalRow, styles.subtotalRow]}>
                  <Text style={styles.subtotalLabel}>Subtotal:</Text>
                  <Text style={styles.subtotalValue}>{total.toFixed(2)} €</Text>
                </View>
              </View>

              {/* Botones de acción */}
              <View style={styles.actionButtons}>
                <TouchableOpacity style={styles.actionButtonOutline}>
                  <Text style={styles.actionButtonOutlineText}>Limpiar</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.actionButtonOutline}>
                  <Text style={styles.actionButtonOutlineText}>Familias</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    </Modal>
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
  // Modal
  modalContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    fontSize: 16,
    color: '#1F4788',
    fontWeight: '600',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  headerAction: {
    fontSize: 24,
    color: '#1F4788',
  },
  mainContent: {
    flex: 1,
    flexDirection: 'row',
  },
  leftPanel: {
    flex: 2,
    backgroundColor: 'white',
    padding: 20,
  },
  rightPanel: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  selectCard: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  selectCardText: {
    color: '#666',
    fontSize: 14,
  },
  row: {
    flexDirection: 'row',
  },
  dropdown: {
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  dropdownText: {
    color: '#333',
    fontSize: 14,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  switchLabel: {
    fontSize: 12,
    color: '#666',
  },
  switch: {
    backgroundColor: '#1F4788',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  switchText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  emptyArticles: {
    backgroundColor: '#f9f9f9',
    padding: 20,
    borderRadius: 8,
    marginBottom: 15,
  },
  emptyText: {
    color: '#999',
    fontSize: 12,
    marginBottom: 10,
  },
  tablePlaceholder: {
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingTop: 10,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tableHeader: {
    fontSize: 12,
    color: '#999',
  },
  tableCell: {
    fontSize: 12,
    color: '#333',
  },
  inputGroup: {
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
  },
  input: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
  },
  textArea: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    height: 80,
    textAlignVertical: 'top',
  },
  addButton: {
    backgroundColor: '#1F4788',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  // Panel derecho
  notaCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    height: '100%',
  },
  notaTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F4788',
    marginBottom: 20,
    textAlign: 'center',
  },
  table: {
    flex: 1,
    marginBottom: 20,
  },
  totalsSection: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 15,
    marginBottom: 20,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  totalLabel: {
    fontSize: 14,
    color: '#666',
  },
  totalValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
  },
  subtotalRow: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  subtotalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  subtotalValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F4788',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  actionButtonOutline: {
    flex: 1,
    borderWidth: 2,
    borderColor: '#1F4788',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  actionButtonOutlineText: {
    color: '#1F4788',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default NewVentaModal;
