// src/screens/CobrosScreen.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Modal } from 'react-native';
import SidebarMenu from '../components/common/SidebarMenu';

const cobrosData = [
  { id: 100, nombre: 'ÁLVAREZ CORDERO CONSUELO', subtitulo: 'ALVAREZ C. CONSUELO E HIJOS', direccion: 'Barrio Catalunya — Trubia', desde: '24-09-2010', cobrado: 49.99, total: 88.99, porcentaje: 55 },
  { id: 300, nombre: 'RAMIRO FERNANDEZ', subtitulo: 'Restaurante La Gallina Loca', direccion: 'C/ Doctor Fleming 1 — Lugones', desde: '01-10-2014', cobrado: 1263.5, total: 1763.5, porcentaje: 72 },
  { id: 302, nombre: 'SUPERMERCADO EL PINO', subtitulo: 'Supermercado El Pino', direccion: 'C/ del Centro 11 — Lugones', desde: '14-10-2014', cobrado: 200.00, total: 200.00, porcentaje: 100 },
];

const CobrosScreen = ({ navigation }: { navigation: any }) => {
  const [showNuevaCobranza, setShowNuevaCobranza] = useState(false);
  const [showMarcarNotas, setShowMarcarNotas] = useState(false);
  const [showConfirmarCobro, setShowConfirmarCobro] = useState(false);
  const [clienteSeleccionado, setClienteSeleccionado] = useState<any>(null);

  const totalCobrado = cobrosData.reduce((sum, c) => sum + c.cobrado, 0);
  const totalPendiente = cobrosData.reduce((sum, c) => sum + c.total, 0);
  const porcentajeTotal = Math.round((totalCobrado / totalPendiente) * 100);

    return (
        <View style={styles.mainContainer}>
            <SidebarMenu navigation={navigation} currentScreen="CobrosScreen" />

            <View style={styles.contentContainer}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.headerIcon}>📋</Text>
                <Text style={styles.headerTitle}>Cobros</Text>
            <Text style={styles.headerSubtitle}>Gestioná tus cobros.</Text>
          </View>
          
          <TouchableOpacity 
            style={styles.nuevaCobranzaBtn}
            onPress={() => setShowNuevaCobranza(true)}
          >
            <Text style={styles.nuevaCobranzaBtnIcon}>➕</Text>
            <Text style={styles.nuevaCobranzaBtnText}>Nueva Cobranza</Text>
          </TouchableOpacity>
        </View>

        {/* Barra de Total */}
        <View style={styles.totalBar}>
          <Text style={styles.totalText}>
            Total: {totalCobrado.toFixed(2)} € de {totalPendiente.toFixed(2)} € ({porcentajeTotal}%)
          </Text>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${porcentajeTotal}%` }]} />
          </View>
        </View>

        {/* Buscador */}
        <View style={styles.searchContainer}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput style={styles.searchInput} placeholder="Buscar cliente" />
          <TouchableOpacity><Text>▼</Text></TouchableOpacity>
          <TouchableOpacity><Text>📅</Text></TouchableOpacity>
          <TouchableOpacity><Text>🖨️</Text></TouchableOpacity>
        </View>

        {/* Lista de Cobros */}
        <ScrollView style={styles.cobrosList}>
          {cobrosData.map((cobro) => (
            <View key={cobro.id} style={styles.cobroCard}>
              <View style={styles.cobroHeader}>
                <View style={styles.cobroIcon}>
                  <Text style={styles.cobroIconText}>👤</Text>
                </View>
                <View style={styles.cobroInfo}>
                  <Text style={styles.cobroNombre}>{cobro.id} — {cobro.nombre}</Text>
                  <Text style={styles.cobroSubtitulo}>{cobro.subtitulo}</Text>
                </View>
                <View style={styles.cobroMonto}>
                  <Text style={styles.montoValue}>{cobro.cobrado.toFixed(2)} € de {cobro.total.toFixed(2)} € ({cobro.porcentaje}%)</Text>
                  <View style={styles.progressBarSmall}>
                    <View style={[styles.progressFillSmall, { width: `${cobro.porcentaje}%` }]} />
                  </View>
                </View>
                <TouchableOpacity 
                  style={styles.visualizarBtn}
                  onPress={() => {
                    setClienteSeleccionado(cobro);
                    setShowMarcarNotas(true);
                  }}
                >
                  <Text style={styles.visualizarBtnIcon}>👁️</Text>
                  <Text style={styles.visualizarBtnText}>Visualizar</Text>
                </TouchableOpacity>
              </View>
              
              <View style={styles.cobroDetails}>
                <Text style={styles.detailText}>{cobro.direccion}</Text>
                <Text style={styles.detailText}><Text style={styles.detailLabel}>Desde:</Text> {cobro.desde}</Text>
              </View>
            </View>
          ))}
                </ScrollView>
            </View>
            
      {/* Modal Nueva Cobranza */}
      {showNuevaCobranza && (
        <NuevaCobranzaModal 
          onClose={() => setShowNuevaCobranza(false)}
          onContinuar={() => {
            setShowNuevaCobranza(false);
            setShowMarcarNotas(true);
          }}
        />
      )}

      {/* Modal Marcar Notas Pendientes */}
      {showMarcarNotas && (
        <MarcarNotasModal
          cliente={clienteSeleccionado}
          onClose={() => setShowMarcarNotas(false)}
          onConfirmar={() => {
            setShowMarcarNotas(false);
            setShowConfirmarCobro(true);
          }}
        />
      )}

      {/* Modal Confirmar Cobro */}
      {showConfirmarCobro && (
        <ConfirmarCobroModal
          onClose={() => setShowConfirmarCobro(false)}
                />
            )}
        </View>
    );
};

// Modal Nueva Cobranza
const NuevaCobranzaModal = ({ onContinuar }: any) => {
  return (
    <Modal visible={true} animationType="fade" transparent={true}>
      <View style={modalStyles.overlay}>
        <View style={modalStyles.modal}>
          <Text style={modalStyles.title}>Cobros</Text>
          
          <View style={modalStyles.formGroup}>
            <Text style={modalStyles.label}>Cliente</Text>
            <TouchableOpacity style={modalStyles.dropdown}>
              <Text style={modalStyles.dropdownText}>ALVAREZ C. CONSUELO E HIJOS</Text>
              <Text>▼</Text>
            </TouchableOpacity>
          </View>

          <View style={modalStyles.formGroup}>
            <Text style={modalStyles.label}>Forma de Pago</Text>
            <TouchableOpacity style={modalStyles.dropdown}>
              <Text style={modalStyles.dropdownText}>-</Text>
              <Text>▼</Text>
            </TouchableOpacity>
            </View>

          <TouchableOpacity style={modalStyles.confirmButton} onPress={onContinuar}>
            <Text style={modalStyles.confirmButtonIcon}>✓</Text>
            <Text style={modalStyles.confirmButtonText}>Confirmar Cobro</Text>
                </TouchableOpacity>
            </View>
        </View>
    </Modal>
  );
};

// Modal Marcar Notas Pendientes
const MarcarNotasModal = ({ onClose, onConfirmar }: any) => {
  const [notasSeleccionadas, setNotasSeleccionadas] = useState([true, false, false, false]);
  
  const toggleNota = (index: number) => {
    const newSelection = [...notasSeleccionadas];
    newSelection[index] = !newSelection[index];
    setNotasSeleccionadas(newSelection);
  };

  const notas = [
    { numero: 'P001', cliente: '100 — ÁLVAREZ CORDERO CONSUELO', fecha: '24-09-2025', monto: 289.90 },
    { numero: 'P001', cliente: '100 — ÁLVAREZ CORDERO CONSUELO', fecha: '24-09-2025', monto: 289.90 },
    { numero: 'P001', cliente: '100 — ÁLVAREZ CORDERO CONSUELO', fecha: '24-09-2025', monto: 289.90 },
    { numero: 'P001', cliente: '100 — ÁLVAREZ CORDERO CONSUELO', fecha: '24-09-2025', monto: 289.90 },
  ];

  const subtotal = notas
    .filter((_, index) => notasSeleccionadas[index])
    .reduce((sum, n) => sum + n.monto, 0);

    return (
    <Modal visible={true} animationType="slide">
      <View style={modalStyles.fullModal}>
        <View style={modalStyles.fullHeader}>
          <TouchableOpacity onPress={onClose}>
            <Text style={modalStyles.backBtn}>←</Text>
          </TouchableOpacity>
          <Text style={modalStyles.fullTitle}>Cobros</Text>
          <View style={{ width: 30 }} />
        </View>

        <ScrollView style={modalStyles.fullContent}>
          <Text style={modalStyles.sectionTitle}>📋 Marcar Notas Pendientes</Text>

          {notas.map((nota, index) => (
            <View key={index} style={modalStyles.notaItem}>
              <View style={modalStyles.notaBadgeGreen}>
                <Text style={modalStyles.notaBadgeTextWhite}>{nota.numero}</Text>
              </View>
              <View style={modalStyles.notaInfoFull}>
                <Text style={modalStyles.notaClienteFull}>{nota.cliente}</Text>
                <Text style={modalStyles.notaFecha}>Fecha: {nota.fecha}</Text>
              </View>
              <Text style={modalStyles.notaMontoFull}>{nota.monto.toFixed(2)} €</Text>
              <TouchableOpacity onPress={() => toggleNota(index)}>
                <View style={[
                  modalStyles.checkbox,
                  notasSeleccionadas[index] && modalStyles.checkboxChecked
                ]}>
                  {notasSeleccionadas[index] && <Text style={modalStyles.checkmark}>✓</Text>}
                </View>
                        </TouchableOpacity>
            </View>
                    ))}

          <View style={modalStyles.subtotalSection}>
            <Text style={modalStyles.subtotalLabel}>Subtotal:</Text>
            <Text style={modalStyles.subtotalValue}>{subtotal.toFixed(2)} €</Text>
          </View>
                </ScrollView>

                <View style={modalStyles.footer}>
          <TouchableOpacity style={modalStyles.btnVolver} onPress={onClose}>
            <Text style={modalStyles.btnVolverText}>← Imprimir Comprobante</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={modalStyles.btnConfirmar} onPress={onConfirmar}>
            <Text style={modalStyles.btnConfirmarText}>✓ Confirmar Cobro</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

// Modal Confirmar Cobro
const ConfirmarCobroModal = ({ onClose }: any) => {
  return (
    <Modal visible={true} animationType="slide">
      <View style={modalStyles.fullModal}>
        <View style={modalStyles.fullHeader}>
          <TouchableOpacity onPress={onClose}>
            <Text style={modalStyles.backBtn}>←</Text>
          </TouchableOpacity>
          <Text style={modalStyles.fullTitle}>Cobros</Text>
          <View style={{ width: 30 }} />
        </View>

        <View style={modalStyles.confirmContent}>
          <Text style={modalStyles.sectionTitle}>📋 Notas Pendientes</Text>

          {[1, 2, 3].map((item) => (
            <View key={item} style={modalStyles.notaItemSimple}>
              <View style={modalStyles.notaBadgeGreen}>
                <Text style={modalStyles.notaBadgeTextWhite}>P001</Text>
              </View>
              <View style={modalStyles.notaInfoSimple}>
                <Text style={modalStyles.notaClienteSimple}>100 — ÁLVAREZ CORDERO CONSUELO</Text>
                <Text style={modalStyles.notaFechaSimple}>Fecha: 24-09-2025</Text>
              </View>
              <Text style={modalStyles.notaMontoSimple}>289,90 €</Text>
            </View>
          ))}

          <View style={modalStyles.subtotalSectionBig}>
            <Text style={modalStyles.subtotalLabelBig}>Subtotal:</Text>
            <Text style={modalStyles.subtotalValueBig}>645,50 €</Text>
          </View>

          <View style={modalStyles.footerButtons}>
            <TouchableOpacity style={modalStyles.btnVolverCobros} onPress={onClose}>
              <Text style={modalStyles.btnVolverCobrosText}>← Volver a Cobros</Text>
            </TouchableOpacity>
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
    padding: 25,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 25,
  },
  headerIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 15,
    color: '#999',
  },
  nuevaCobranzaBtn: {
    flexDirection: 'row',
    backgroundColor: '#1F4788',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 10,
    alignItems: 'center',
    gap: 10,
  },
  nuevaCobranzaBtnIcon: {
    fontSize: 18,
    color: 'white',
  },
  nuevaCobranzaBtnText: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
  },
  totalBar: {
    marginBottom: 20,
  },
  totalText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F4788',
    marginBottom: 10,
  },
  progressBar: {
    height: 12,
    backgroundColor: '#e0e0e0',
    borderRadius: 6,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#1F4788',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 20,
    gap: 10,
  },
  searchIcon: {
    fontSize: 18,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
  },
  cobrosList: {
    flex: 1,
  },
    cobroCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  cobroHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
    gap: 12,
  },
  cobroIcon: {
    width: 45,
    height: 45,
    borderRadius: 23,
    backgroundColor: '#E6EBF5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cobroIconText: {
    fontSize: 22,
  },
  cobroInfo: {
    flex: 1,
  },
  cobroNombre: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  cobroSubtitulo: {
    fontSize: 13,
    color: '#666',
  },
  cobroMonto: {
    alignItems: 'flex-end',
  },
  montoValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1F4788',
    marginBottom: 6,
  },
  progressBarSmall: {
    width: 120,
    height: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFillSmall: {
    height: '100%',
    backgroundColor: '#1F4788',
  },
  visualizarBtn: {
    flexDirection: 'row',
    backgroundColor: '#1F4788',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    gap: 6,
  },
  visualizarBtnIcon: {
    fontSize: 14,
  },
  visualizarBtnText: {
    color: 'white',
    fontSize: 13,
    fontWeight: 'bold',
  },
  cobroDetails: {
    gap: 4,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  detailText: {
    fontSize: 13,
    color: '#666',
  },
  detailLabel: {
    fontWeight: '600',
    color: '#1F4788',
  },
});

const modalStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modal: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 30,
    width: '100%',
    maxWidth: 500,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 25,
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
  confirmButton: {
    flexDirection: 'row',
    backgroundColor: '#8BC34A',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    marginTop: 10,
  },
  confirmButtonIcon: {
    fontSize: 18,
    color: 'white',
  },
  confirmButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  // Modal Full Screen
  fullModal: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  fullHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
  backBtn: {
    fontSize: 24,
    color: '#333',
  },
  fullTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  fullContent: {
    flex: 1,
    padding: 25,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  notaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 18,
    borderRadius: 12,
    marginBottom: 12,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  notaBadgeGreen: {
    backgroundColor: '#8BC34A',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  notaBadgeTextWhite: {
    color: 'white',
    fontSize: 13,
    fontWeight: 'bold',
  },
  notaInfoFull: {
    flex: 1,
  },
  notaClienteFull: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  notaFecha: {
    fontSize: 13,
    color: '#1F4788',
  },
  notaMontoFull: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#333',
    marginRight: 10,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#1F4788',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
        backgroundColor: '#1F4788',
  },
  checkmark: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  subtotalSection: {
    backgroundColor: '#E6EBF5',
    padding: 20,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  subtotalLabel: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F4788',
  },
  subtotalValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F4788',
  },
  footer: {
    flexDirection: 'row',
    padding: 20,
    gap: 15,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  btnVolver: {
    flex: 1,
    borderWidth: 2,
    borderColor: '#1F4788',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  btnVolverText: {
    color: '#1F4788',
    fontSize: 15,
    fontWeight: 'bold',
  },
  btnConfirmar: {
    flex: 1,
    backgroundColor: '#8BC34A',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  btnConfirmarText: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
  },
  // Modal Confirmar
  confirmContent: {
    flex: 1,
    padding: 25,
    justifyContent: 'space-between',
  },
  notaItemSimple: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 18,
    borderRadius: 12,
    marginBottom: 12,
    gap: 12,
  },
  notaInfoSimple: {
    flex: 1,
  },
  notaClienteSimple: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  notaFechaSimple: {
    fontSize: 13,
    color: '#1F4788',
  },
  notaMontoSimple: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#333',
  },
  subtotalSectionBig: {
    backgroundColor: '#E6EBF5',
    padding: 25,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  subtotalLabelBig: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1F4788',
  },
  subtotalValueBig: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1F4788',
  },
  footerButtons: {
    padding: 20,
  },
  btnVolverCobros: {
    borderWidth: 2,
    borderColor: '#1F4788',
    padding: 18,
    borderRadius: 10,
    alignItems: 'center',
  },
  btnVolverCobrosText: {
    color: '#1F4788',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CobrosScreen;
