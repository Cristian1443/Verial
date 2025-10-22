// src/screens/ResumenNotaScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import SidebarMenu from '../components/common/SidebarMenu';

const ResumenNotaScreen = ({ navigation }: { navigation: any }) => {
  const handleModificar = () => {
    Alert.alert('Modificar', 'Volver a editar la nota de venta');
  };

  const handleImprimir = () => {
    Alert.alert('Imprimir', 'Imprimiendo nota de venta...');
  };

  const handleAnular = () => {
    Alert.alert('Anular', '¿Está seguro que desea anular esta nota?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Anular', onPress: () => navigation.goBack(), style: 'destructive' }
    ]);
  };

  const handleCerrarOperacion = () => {
    Alert.alert('Éxito', 'Operación cerrada correctamente');
    navigation.navigate('Dashboard');
  };

  return (
    <View style={styles.mainContainer}>
      <SidebarMenu navigation={navigation} currentScreen="VentasScreen" />
      
      <View style={styles.contentContainer}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backButton}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Nota de Venta</Text>
          <View style={{ width: 30 }} />
        </View>

        <ScrollView style={styles.scrollContent}>
          {/* Card de Información del Cliente */}
          <View style={styles.clienteCard}>
            <View style={styles.clienteBadge}>
              <Text style={styles.clienteBadgeText}>101</Text>
            </View>
            
            <Text style={styles.clienteNombre}>Panadería El Trigo Dorado</Text>
            
            <View style={styles.clienteDetails}>
              <Text style={styles.detailText}>
                <Text style={styles.detailLabel}>Razón Social:</Text> Martín Delgado S.L.
              </Text>
              <Text style={styles.detailText}>
                <Text style={styles.detailLabel}>NIF:</Text> B12345678
              </Text>
            </View>
            
            <View style={styles.clienteDetails}>
              <Text style={styles.detailText}>
                <Text style={styles.detailLabel}>Dirección:</Text> Av. Castilla 89, Oviedo, Asturias
              </Text>
            </View>
            
            <View style={styles.clienteDetails}>
              <Text style={styles.detailText}>
                <Text style={styles.detailLabel}>Teléfono:</Text> +34 985 234 789
                {'  '}
                <Text style={styles.detailLabel}>E-mail:</Text> contacto@eltrigodorado.es
              </Text>
            </View>

            <View style={styles.tipoFormaRow}>
              <View style={styles.tipoBadge}>
                <Text style={styles.tipoBadgeText}>Tipo de Nota: Serie P</Text>
              </View>
              <View style={styles.formaBadge}>
                <Text style={styles.formaBadgeText}>Forma de Pago: Tarjeta de Crédito</Text>
              </View>
            </View>
          </View>

          {/* Tabla de Artículos */}
          <View style={styles.tablaCard}>
            <View style={styles.tablaHeader}>
              <Text style={[styles.tablaHeaderText, { flex: 2 }]}>Artículo</Text>
              <Text style={[styles.tablaHeaderText, { flex: 1 }]}>Cantidad</Text>
              <Text style={[styles.tablaHeaderText, { flex: 1 }]}>Valor</Text>
              <Text style={[styles.tablaHeaderText, { flex: 1 }]}>Descuento</Text>
              <View style={{ width: 40 }} />
            </View>

            {[1, 2, 3, 4, 5, 6].map((item) => (
              <View key={item} style={styles.tablaRow}>
                <Text style={[styles.tablaCell, { flex: 2, color: '#1F4788' }]}>Artículo</Text>
                <Text style={[styles.tablaCell, { flex: 1 }]}>01</Text>
                <Text style={[styles.tablaCell, { flex: 1 }]}>27,00 €</Text>
                <Text style={[styles.tablaCell, { flex: 1 }]}>16,00 €</Text>
                <Text style={[styles.tablaCell, { flex: 0.5, color: '#4CAF50' }]}>12%</Text>
                <TouchableOpacity>
                  <Text style={styles.copyIcon}>📋</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </ScrollView>

        {/* Panel Derecho - Totales y Botones */}
        <View style={styles.rightPanel}>
          {/* Botones superiores */}
          <TouchableOpacity style={styles.btnModificar} onPress={handleModificar}>
            <Text style={styles.btnModificarIcon}>✏️</Text>
            <Text style={styles.btnModificarText}>Modificar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btnImprimir} onPress={handleImprimir}>
            <Text style={styles.btnImprimirIcon}>🖨️</Text>
            <Text style={styles.btnImprimirText}>Imprimir</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btnAnular} onPress={handleAnular}>
            <Text style={styles.btnAnularIcon}>✖️</Text>
            <Text style={styles.btnAnularText}>Anular</Text>
          </TouchableOpacity>

          {/* Totales */}
          <View style={styles.totalesBox}>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Descuentos:</Text>
              <Text style={styles.totalValue}>297,00 € (17%)</Text>
            </View>
            
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>IVA o RE</Text>
              <Text style={styles.totalValue}>123,00 €</Text>
            </View>
            
            <View style={[styles.totalRow, styles.subtotalRow]}>
              <Text style={styles.subtotalLabel}>Subtotal:</Text>
              <Text style={styles.subtotalValue}>2.450,00 €</Text>
            </View>
          </View>

          {/* Botón Cerrar Operación */}
          <TouchableOpacity style={styles.btnCerrar} onPress={handleCerrarOperacion}>
            <Text style={styles.btnCerrarIcon}>✓</Text>
            <Text style={styles.btnCerrarText}>Cerrar Operación</Text>
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
    padding: 25,
    flexDirection: 'row',
    gap: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
    position: 'absolute',
    top: 25,
    left: 25,
    right: 400,
    zIndex: 10,
  },
  backButton: {
    fontSize: 24,
    color: '#333',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F4788',
  },
  scrollContent: {
    flex: 1,
    paddingTop: 70,
  },
  clienteCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 25,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  clienteBadge: {
    backgroundColor: '#1F4788',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  clienteBadgeText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  clienteNombre: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  clienteDetails: {
    marginBottom: 10,
  },
  detailText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 22,
  },
  detailLabel: {
    fontWeight: 'bold',
    color: '#1F4788',
  },
  tipoFormaRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 15,
  },
  tipoBadge: {
    backgroundColor: '#1F4788',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
  },
  tipoBadgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  formaBadge: {
    backgroundColor: '#1F4788',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
  },
  formaBadgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  tablaCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  tablaHeader: {
    flexDirection: 'row',
    paddingBottom: 12,
    borderBottomWidth: 2,
    borderBottomColor: '#1F4788',
    marginBottom: 10,
  },
  tablaHeaderText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1F4788',
  },
  tablaRow: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    alignItems: 'center',
  },
  tablaCell: {
    fontSize: 13,
    color: '#333',
  },
  copyIcon: {
    fontSize: 14,
  },
  // Panel Derecho
  rightPanel: {
    width: 350,
    gap: 15,
  },
  btnModificar: {
    flexDirection: 'row',
    backgroundColor: '#1F4788',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  btnModificarIcon: {
    fontSize: 18,
  },
  btnModificarText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  btnImprimir: {
    flexDirection: 'row',
    backgroundColor: '#1F4788',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  btnImprimirIcon: {
    fontSize: 18,
  },
  btnImprimirText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  btnAnular: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#1F4788',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  btnAnularIcon: {
    fontSize: 18,
  },
  btnAnularText: {
    color: '#1F4788',
    fontSize: 16,
    fontWeight: 'bold',
  },
  totalesBox: {
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 20,
    marginTop: 20,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
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
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingTop: 15,
    marginTop: 10,
  },
  subtotalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F4788',
  },
  subtotalValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F4788',
  },
  btnCerrar: {
    flexDirection: 'row',
    backgroundColor: '#8BC34A',
    padding: 18,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    marginTop: 10,
  },
  btnCerrarIcon: {
    fontSize: 20,
    color: 'white',
  },
  btnCerrarText: {
    color: 'white',
    fontSize: 17,
    fontWeight: 'bold',
  },
});

export default ResumenNotaScreen;

