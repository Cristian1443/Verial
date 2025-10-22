// src/screens/ResumenDiaScreen.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import SidebarMenu from '../components/common/SidebarMenu';

const ResumenDiaScreen = ({ navigation }: { navigation: any }) => {
  const [filtroActivo, setFiltroActivo] = useState('Totales del Día');
  const [searchTerm, setSearchTerm] = useState('');

  const filtros = ['Totales del Día', 'Notas de Venta', 'Cobros', 'Gastos', 'Incidencias', 'Ingresos Banco'];

  const notasVenta = [
    { id: 'P001', cliente: '100 Distribuciones Rivera S.L.', detalle: 'Ver Detalles 🔗', monto: 28.90 },
    { id: 'P001', cliente: '100 Distribuciones Rivera S.L.', detalle: 'Ver Detalles 🔗', monto: 28.90 },
    { id: 'P001', cliente: '100 Distribuciones Rivera S.L.', detalle: 'Ver Detalles 🔗', monto: 28.90 },
  ];

  const gastos = [
    { id: 1, tipo: 'Gasto 01', subtipo: 'Comida', detalle: 'Ver Detalles 🔗', monto: 28.90 },
    { id: 2, tipo: 'Gasto 01', subtipo: 'Comida', detalle: 'Ver Detalles 🔗', monto: 28.90 },
    { id: 3, tipo: 'Gasto 01', subtipo: 'Comida', detalle: 'Ver Detalles 🔗', monto: 28.90 },
  ];

  return (
    <View style={styles.mainContainer}>
      <SidebarMenu navigation={navigation} currentScreen="VentasScreen" />
      
      <View style={styles.contentContainer}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backButton}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Resumen Día</Text>
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.iconBtn}>
              <Text>▼</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconBtn}>
              <Text>📅</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconBtn}>
              <Text>🖨️</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Buscador */}
        <View style={styles.searchContainer}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar cliente"
            value={searchTerm}
            onChangeText={setSearchTerm}
          />
          <TouchableOpacity>
            <Text>▼</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text>☰</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text>📋</Text>
          </TouchableOpacity>
        </View>

        {/* Filtros */}
        <View style={styles.filtrosContainer}>
          {filtros.map((filtro) => (
            <TouchableOpacity
              key={filtro}
              style={[
                styles.filtroChip,
                filtroActivo === filtro && styles.filtroChipActive
              ]}
              onPress={() => setFiltroActivo(filtro)}
            >
              <Text style={[
                styles.filtroText,
                filtroActivo === filtro && styles.filtroTextActive
              ]}>
                {filtro}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Métricas */}
        <View style={styles.metricsRow}>
          <View style={[styles.metricCardBig, { backgroundColor: '#1F4788' }]}>
            <View style={styles.metricBadge}>
              <Text style={styles.metricBadgeText}>Ventas Hoy</Text>
            </View>
            <View style={styles.metricIcon}>
              <Text style={styles.metricIconText}>€</Text>
            </View>
            <Text style={styles.metricValueBig}>2.450,00 €</Text>
            <Text style={styles.metricChange}>+12% vs ayer</Text>
          </View>

          <View style={styles.metricCard}>
            <View style={styles.metricBadge}>
              <Text style={styles.metricBadgeText}>Gastos Hoy</Text>
            </View>
            <View style={styles.metricIconSmall}>
              <Text style={styles.metricIconTextSmall}>📊</Text>
            </View>
            <Text style={styles.metricValue}>180,50 €</Text>
            <Text style={styles.metricChangeNeg}>-8% vs ayer</Text>
          </View>

          <View style={styles.metricCard}>
            <View style={styles.metricBadge}>
              <Text style={styles.metricBadgeText}>Nº de Ventas</Text>
            </View>
            <View style={styles.metricIconSmall}>
              <Text style={styles.metricIconTextSmall}>🛒</Text>
            </View>
            <Text style={styles.metricValue}>8</Text>
            <Text style={styles.metricChange}>+2 vs ayer</Text>
          </View>
        </View>

        {/* Contenido en dos columnas */}
        <View style={styles.contentRow}>
          {/* Notas de Venta */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>📋 Notas de Venta</Text>
            
            {notasVenta.map((nota, index) => (
              <View key={index} style={styles.notaCard}>
                <View style={styles.notaBadge}>
                  <Text style={styles.notaBadgeText}>{nota.id}</Text>
                </View>
                <View style={styles.notaInfo}>
                  <Text style={styles.notaCliente}>{nota.cliente}</Text>
                  <Text style={styles.notaDetalle}>{nota.detalle}</Text>
                </View>
                <Text style={styles.notaMonto}>{nota.monto.toFixed(2)} €</Text>
              </View>
            ))}
          </View>

          {/* Gastos */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>📋 Gastos</Text>
            
            {gastos.map((gasto) => (
              <View key={gasto.id} style={styles.gastoCard}>
                <View style={styles.gastoImage}>
                  <Text style={styles.gastoImageText}>📷</Text>
                </View>
                <View style={styles.gastoInfo}>
                  <Text style={styles.gastoTipo}>{gasto.tipo}</Text>
                  <Text style={styles.gastoSubtipo}>{gasto.subtipo}</Text>
                  <Text style={styles.gastoDetalle}>{gasto.detalle}</Text>
                </View>
                <Text style={styles.gastoMonto}>{gasto.monto.toFixed(2)} €</Text>
              </View>
            ))}
          </View>
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
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
  },
  backButton: {
    fontSize: 24,
    color: '#333',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  headerActions: {
    flexDirection: 'row',
    gap: 10,
  },
  iconBtn: {
    width: 40,
    height: 40,
    backgroundColor: 'white',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  searchIcon: {
    fontSize: 18,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
  },
  filtrosContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 25,
  },
  filtroChip: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 25,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  filtroChipActive: {
    backgroundColor: '#1F4788',
    borderColor: '#1F4788',
  },
  filtroText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  filtroTextActive: {
    color: 'white',
    fontWeight: 'bold',
  },
  metricsRow: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: 30,
  },
  metricCardBig: {
    flex: 1,
    padding: 25,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 4,
  },
  metricCard: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  metricBadge: {
    backgroundColor: 'rgba(255,255,255,0.3)',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
    marginBottom: 12,
  },
  metricBadgeText: {
    color: 'white',
    fontSize: 11,
    fontWeight: 'bold',
  },
  metricIcon: {
    width: 45,
    height: 45,
    borderRadius: 23,
    backgroundColor: 'rgba(255,255,255,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  metricIconText: {
    fontSize: 22,
    color: 'white',
  },
  metricIconSmall: {
    width: 45,
    height: 45,
    borderRadius: 23,
    backgroundColor: '#E6EBF5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  metricIconTextSmall: {
    fontSize: 20,
  },
  metricValueBig: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 6,
  },
  metricValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 6,
  },
  metricChange: {
    fontSize: 13,
    color: '#8BC34A',
    fontWeight: '600',
  },
  metricChangeNeg: {
    fontSize: 13,
    color: '#FF9800',
    fontWeight: '600',
  },
  contentRow: {
    flexDirection: 'row',
    gap: 20,
    flex: 1,
  },
  section: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  notaCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    marginBottom: 12,
    gap: 12,
  },
  notaBadge: {
    backgroundColor: '#8BC34A',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 15,
  },
  notaBadgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  notaInfo: {
    flex: 1,
  },
  notaCliente: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 3,
  },
  notaDetalle: {
    fontSize: 12,
    color: '#1F4788',
  },
  notaMonto: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  gastoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    marginBottom: 12,
    gap: 12,
  },
  gastoImage: {
    width: 60,
    height: 60,
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gastoImageText: {
    fontSize: 28,
  },
  gastoInfo: {
    flex: 1,
  },
  gastoTipo: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 2,
  },
  gastoSubtipo: {
    fontSize: 12,
    color: '#666',
    marginBottom: 3,
  },
  gastoDetalle: {
    fontSize: 12,
    color: '#1F4788',
  },
  gastoMonto: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default ResumenDiaScreen;

