// src/components/ventas/NewVentaModal.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Modal } from 'react-native';

const articulosEjemplo = [
  { id: 1, nombre: 'Artículo', cantidad: 1, precio: 27.00, descuento: 16.00, descuentoPorcentaje: 12 },
  { id: 2, nombre: 'Artículo', cantidad: 1, precio: 27.00, descuento: 16.00, descuentoPorcentaje: 12 },
  { id: 3, nombre: 'Artículo', cantidad: 1, precio: 27.00, descuento: 16.00, descuentoPorcentaje: 12 },
  { id: 4, nombre: 'Artículo', cantidad: 1, precio: 27.00, descuento: 16.00, descuentoPorcentaje: 12 },
  { id: 5, nombre: 'Artículo', cantidad: 1, precio: 27.00, descuento: 16.00, descuentoPorcentaje: 12 },
  { id: 6, nombre: 'Artículo', cantidad: 1, precio: 27.00, descuento: 16.00, descuentoPorcentaje: 12 },
];

const NewVentaModal = ({ visible, onClose }: { visible: boolean; onClose: () => void }) => {
  const [aplicarDescuento, setAplicarDescuento] = useState(false);
  const [showHistorial, setShowHistorial] = useState(false);

  const subtotal = articulosEjemplo.reduce((sum, art) => sum + (art.cantidad * art.precio), 0);
  const descuentosTotal = articulosEjemplo.reduce((sum, art) => sum + art.descuento, 0);
  const ivaRE = 123.00;
  const total = 2450.00;

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.backButton}>←</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Nueva Venta</Text>
          <View style={{ width: 30 }} />
        </View>

        <View style={styles.mainContent}>
          {/* Panel Izquierdo - Formulario */}
          <ScrollView style={styles.leftPanel}>
            {/* Cliente */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>Cliente</Text>
              <TouchableOpacity style={styles.dropdown}>
                <Text style={styles.dropdownText}>105 | Boutique Encanto</Text>
                <Text style={styles.dropdownArrow}>▼</Text>
              </TouchableOpacity>
            </View>

            {/* Tipo de Nota y Forma de Pago */}
            <View style={styles.row}>
              <View style={[styles.formGroup, { flex: 1, marginRight: 10 }]}>
                <Text style={styles.label}>Tipo de Nota</Text>
                <TouchableOpacity style={styles.dropdown}>
                  <Text style={styles.dropdownText}>-</Text>
                  <Text style={styles.dropdownArrow}>▼</Text>
                </TouchableOpacity>
              </View>
              
              <View style={[styles.formGroup, { flex: 1 }]}>
                <Text style={styles.label}>Forma de Pago</Text>
                <TouchableOpacity style={styles.dropdown}>
                  <Text style={styles.dropdownText}>-</Text>
                  <Text style={styles.dropdownArrow}>▼</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Switch Descuento */}
            <View style={styles.switchRow}>
              <Text style={styles.switchLabel}>¿Aplicar descuento en documento?</Text>
              <View style={styles.switchContainer}>
                <TouchableOpacity
                  style={[styles.switchOption, !aplicarDescuento && styles.switchOptionActive]}
                  onPress={() => setAplicarDescuento(false)}
                >
                  <Text style={[styles.switchText, !aplicarDescuento && styles.switchTextActive]}>Sí</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.switchOption, aplicarDescuento && styles.switchOptionActive]}
                  onPress={() => setAplicarDescuento(true)}
                >
                  <Text style={[styles.switchText, aplicarDescuento && styles.switchTextActive]}>No</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Artículo */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>Artículo  Stock: 6</Text>
              <View style={styles.articuloInput}>
                <TextInput style={styles.articuloText} value="Artículo" />
                <TouchableOpacity>
                  <Text style={styles.scanIcon}>📷</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Cantidad */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>Cant.</Text>
              <TextInput style={styles.input} value="01" />
            </View>

            {/* Precio y Descuento */}
            <View style={styles.row}>
              <View style={[styles.formGroup, { flex: 1, marginRight: 10 }]}>
                <Text style={styles.label}>Precio</Text>
                <View style={styles.inputWithButton}>
                  <TextInput style={styles.inputSmall} value="27,90 €" />
                  <TouchableOpacity style={styles.editButton}>
                    <Text style={styles.editIcon}>✏️</Text>
                  </TouchableOpacity>
                </View>
              </View>
              
              <View style={[styles.formGroup, { flex: 1 }]}>
                <Text style={styles.label}>Descuento</Text>
                <TextInput style={styles.input} value="17%" />
              </View>
            </View>

            {/* Nota */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>Nota:</Text>
              <TextInput
                style={styles.textArea}
                placeholder="Lorem ipsum dolor sit amet, consectet."
                multiline
                numberOfLines={3}
              />
              <Text style={styles.charCount}>40/40</Text>
            </View>

            {/* Botón Añadir Artículo */}
            <TouchableOpacity style={styles.addArticleButton}>
              <Text style={styles.addArticleIcon}>➕</Text>
              <Text style={styles.addArticleText}>Añadir Artículo</Text>
            </TouchableOpacity>

            {/* Botones inferiores */}
            <View style={styles.bottomButtons}>
              <TouchableOpacity style={styles.resumeButton}>
                <Text style={styles.resumeButtonIcon}>📋</Text>
                <Text style={styles.resumeButtonText}>Resumen Nota</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.historyButton}
                onPress={() => setShowHistorial(true)}
              >
                <Text style={styles.historyButtonIcon}>🕐</Text>
                <Text style={styles.historyButtonText}>Historial de Ventas</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>

          {/* Panel Derecho - Nota de Venta */}
          <View style={styles.rightPanel}>
            <Text style={styles.notaTitle}>Nota de Venta</Text>
            
            {/* Tabla de artículos */}
            <ScrollView style={styles.table}>
              {/* Header */}
              <View style={styles.tableHeader}>
                <Text style={[styles.tableHeaderText, { flex: 2 }]}>Artículo</Text>
                <Text style={[styles.tableHeaderText, { flex: 1 }]}>Cantidad</Text>
                <Text style={[styles.tableHeaderText, { flex: 1 }]}>Valor</Text>
                <Text style={[styles.tableHeaderText, { flex: 1 }]}>Descuento</Text>
                <View style={{ width: 60 }} />
              </View>

              {/* Filas */}
              {articulosEjemplo.map((art, index) => (
                <View key={index} style={styles.tableRow}>
                  <Text style={[styles.tableCell, { flex: 2, color: '#1F4788' }]}>{art.nombre}</Text>
                  <Text style={[styles.tableCell, { flex: 1 }]}>{String(art.cantidad).padStart(2, '0')}</Text>
                  <Text style={[styles.tableCell, { flex: 1 }]}>{art.precio.toFixed(2)} €</Text>
                  <Text style={[styles.tableCell, { flex: 1 }]}>{art.descuento.toFixed(2)} €</Text>
                  <Text style={[styles.tableCell, { flex: 0.5, color: '#4CAF50' }]}>{art.descuentoPorcentaje}%</Text>
                  <View style={styles.rowActions}>
                    <TouchableOpacity><Text style={styles.actionIcon}>✏️</Text></TouchableOpacity>
                    <TouchableOpacity><Text style={styles.actionIconDelete}>🗑️</Text></TouchableOpacity>
                  </View>
                </View>
              ))}
            </ScrollView>

            {/* Totales */}
            <View style={styles.totalsSection}>
              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Descuentos:</Text>
                <Text style={styles.totalValue}>{descuentosTotal.toFixed(2)} € (17%)</Text>
              </View>
              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>IVA o RE</Text>
                <Text style={styles.totalValue}>$ {ivaRE.toFixed(2)}</Text>
              </View>
              <View style={[styles.totalRow, styles.subtotalRow]}>
                <Text style={styles.subtotalLabel}>Subtotal:</Text>
                <Text style={styles.subtotalValue}>{total.toFixed(2)} €</Text>
              </View>
            </View>

            {/* Botones Líneas y Familias */}
            <View style={styles.actionButtonsRow}>
              <TouchableOpacity style={styles.lineasButton}>
                <Text style={styles.lineasButtonText}>Líneas</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.familiasButton}>
                <Text style={styles.familiasButtonText}>Familias</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

      {/* Modal Historial de Ventas */}
      {showHistorial && (
        <HistorialVentasModal onClose={() => setShowHistorial(false)} />
      )}
    </Modal>
  );
};

// Modal de Historial de Ventas
const HistorialVentasModal = ({ onClose }: { onClose: () => void }) => {
  const historial = [
    { id: 'P122', cliente: 'Almacenes López S.A.', info: 'Rivera Antonio y Hermanos • IUO: 1234567BA • Avenida Mayor 12, Villa Solanda, Provincia del Sur 33001', monto: 280.90 },
    { id: 'P122', cliente: 'Almacenes López S.A.', info: 'Rivera Antonio y Hermanos • IUO: 1234567BA • Avenida Mayor 12, Villa Solanda, Provincia del Sur 33001', monto: 280.90 },
    { id: 'P122', cliente: 'Almacenes López S.A.', info: 'Rivera Antonio y Hermanos • IUO: 1234567BA • Avenida Mayor 12, Villa Solanda, Provincia del Sur 33001', monto: 280.90 },
  ];

  return (
    <Modal visible={true} animationType="fade" transparent={true} onRequestClose={onClose}>
      <View style={modalStyles.overlay}>
        <View style={modalStyles.modal}>
          <View style={modalStyles.modalHeader}>
            <Text style={modalStyles.modalTitle}>📋 Historial de Ventas</Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={modalStyles.closeButton}>✕</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={modalStyles.modalContent}>
            {historial.map((venta, index) => (
              <View key={index} style={modalStyles.ventaCard}>
                <View style={modalStyles.ventaBadge}>
                  <Text style={modalStyles.ventaBadgeText}>{venta.id}</Text>
                </View>
                <View style={modalStyles.ventaDetails}>
                  <Text style={modalStyles.ventaCliente}>{venta.cliente}</Text>
                  <Text style={modalStyles.ventaInfo}>{venta.info}</Text>
                </View>
                <Text style={modalStyles.ventaMonto}>{venta.monto.toFixed(2)} €</Text>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
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
    fontSize: 24,
    color: '#333',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  mainContent: {
    flex: 1,
    flexDirection: 'row',
  },
  leftPanel: {
    flex: 1.5,
    backgroundColor: 'white',
    padding: 25,
  },
  rightPanel: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 25,
    borderLeftWidth: 1,
    borderLeftColor: '#eee',
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  dropdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 14,
  },
  dropdownText: {
    fontSize: 15,
    color: '#333',
  },
  dropdownArrow: {
    fontSize: 12,
    color: '#999',
  },
  row: {
    flexDirection: 'row',
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  switchLabel: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  switchContainer: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 2,
  },
  switchOption: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 6,
  },
  switchOptionActive: {
    backgroundColor: '#1F4788',
  },
  switchText: {
    fontSize: 13,
    color: '#666',
    fontWeight: '600',
  },
  switchTextActive: {
    color: 'white',
  },
  articuloInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 14,
  },
  articuloText: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 15,
    color: '#333',
  },
  scanIcon: {
    fontSize: 20,
  },
  input: {
    backgroundColor: '#f9f9f9',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 14,
    fontSize: 15,
    color: '#333',
  },
  inputWithButton: {
    flexDirection: 'row',
    gap: 10,
  },
  inputSmall: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 14,
    fontSize: 15,
    color: '#333',
  },
  editButton: {
    width: 45,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#1F4788',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editIcon: {
    fontSize: 18,
  },
  textArea: {
    backgroundColor: '#f9f9f9',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 14,
    fontSize: 14,
    color: '#666',
    height: 80,
    textAlignVertical: 'top',
  },
  charCount: {
    fontSize: 11,
    color: '#999',
    textAlign: 'right',
    marginTop: 4,
  },
  addArticleButton: {
    flexDirection: 'row',
    backgroundColor: '#1F4788',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    marginTop: 10,
  },
  addArticleIcon: {
    fontSize: 18,
    color: 'white',
  },
  addArticleText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  bottomButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 25,
  },
  resumeButton: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#8BC34A',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  resumeButtonIcon: {
    fontSize: 18,
  },
  resumeButtonText: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
  },
  historyButton: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#666',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  historyButtonIcon: {
    fontSize: 18,
  },
  historyButtonText: {
    color: '#666',
    fontSize: 15,
    fontWeight: 'bold',
  },
  // Panel Derecho
  notaTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1F4788',
    marginBottom: 20,
    textAlign: 'center',
  },
  table: {
    flex: 1,
    marginBottom: 20,
  },
  tableHeader: {
    flexDirection: 'row',
    paddingBottom: 12,
    borderBottomWidth: 2,
    borderBottomColor: '#1F4788',
    marginBottom: 10,
  },
  tableHeaderText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1F4788',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    alignItems: 'center',
  },
  tableCell: {
    fontSize: 13,
    color: '#333',
  },
  rowActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionIcon: {
    fontSize: 16,
  },
  actionIconDelete: {
    fontSize: 16,
    color: '#FF9800',
  },
  totalsSection: {
    borderTopWidth: 2,
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
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  subtotalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  subtotalValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F4788',
  },
  actionButtonsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  lineasButton: {
    flex: 1,
    backgroundColor: '#1F4788',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  lineasButtonText: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
  },
  familiasButton: {
    flex: 1,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#1F4788',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  familiasButtonText: {
    color: '#1F4788',
    fontSize: 15,
    fontWeight: 'bold',
  },
});

const modalStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 25,
    width: '90%',
    maxWidth: 900,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  closeButton: {
    fontSize: 28,
    color: '#999',
  },
  modalContent: {
    flex: 1,
  },
  ventaCard: {
    flexDirection: 'row',
    backgroundColor: '#f9f9f9',
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    alignItems: 'flex-start',
    gap: 15,
  },
  ventaBadge: {
    backgroundColor: '#8BC34A',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  ventaBadgeText: {
    color: 'white',
    fontSize: 13,
    fontWeight: 'bold',
  },
  ventaDetails: {
    flex: 1,
  },
  ventaCliente: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 6,
  },
  ventaInfo: {
    fontSize: 12,
    color: '#666',
    lineHeight: 18,
  },
  ventaMonto: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F4788',
  },
});

export default NewVentaModal;
