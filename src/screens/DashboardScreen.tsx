// src/screens/DashboardScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, useWindowDimensions } from 'react-native';
import SidebarMenu from '../components/common/SidebarMenu';

const ventasRecientes = [
  { id: 1, cliente: 'Cliente Nuevo 01', fecha: '14-21', vendedor: 'Ver Detalles', estado: 'verde', monto: 450.00 },
  { id: 2, cliente: 'Cliente Nuevo 01', fecha: '14-21', vendedor: 'Ver Detalles', estado: 'naranja', monto: 450.00 },
  { id: 3, cliente: 'Cliente Nuevo 01', fecha: '14-21', vendedor: 'Ver Detalles', estado: 'verde', monto: 450.00 },
  { id: 4, cliente: 'Cliente Nuevo 01', fecha: '14-21', vendedor: 'Ver Detalles', estado: 'naranja', monto: 450.00 },
  { id: 5, cliente: 'Cliente Nuevo 01', fecha: '14-21', vendedor: 'Ver Detalles', estado: 'verde', monto: 450.00 },
  { id: 6, cliente: 'Cliente Nuevo 01', fecha: '14-21', vendedor: 'Ver Detalles', estado: 'verde', monto: 450.00 },
];

const DashboardScreen = ({ navigation }: { navigation: any }) => {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1024;

  return (
    <View style={styles.mainContainer}>
      <SidebarMenu navigation={navigation} currentScreen="Dashboard" />
      
      <ScrollView style={styles.contentContainer}>
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <Text style={styles.heroTitle}>Gestión Inteligente{'\n'}de Ventas en Ruta</Text>
          <Text style={styles.heroSubtitle}>
            Control completo de tus ventas,{'\n'}
            stock y clientes en una plataforma{'\n'}
            moderna e intuitiva.
          </Text>
          
          <View style={styles.heroButtons}>
            <TouchableOpacity 
              style={styles.buttonWhite}
              onPress={() => navigation.navigate('VentasScreen')}
            >
              <Text style={styles.buttonWhiteIcon}>➕</Text>
              <Text style={styles.buttonWhiteText}>Nota de Venta</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.buttonOutline}>
              <Text style={styles.buttonOutlineIcon}>📊</Text>
              <Text style={styles.buttonOutlineText}>Ver Informes</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Métricas - 3 Cards */}
        <View style={[styles.metricsRow, isMobile && styles.metricsColumn]}>
          <View style={styles.metricCard}>
            <View style={styles.metricBadge}>
              <Text style={styles.metricBadgeText}>Ventas Hoy</Text>
            </View>
            <View style={styles.metricIconCircle}>
              <Text style={styles.metricIconText}>€</Text>
            </View>
            <Text style={styles.metricValue}>2,450,00 €</Text>
            <Text style={styles.metricChangePositive}>+12% vs ayer</Text>
          </View>

          <View style={styles.metricCard}>
            <View style={styles.metricBadge}>
              <Text style={styles.metricBadgeText}>Gastos Hoy</Text>
            </View>
            <View style={styles.metricIconCircle}>
              <Text style={styles.metricIconText}>📊</Text>
            </View>
            <Text style={styles.metricValue}>180,50 €</Text>
            <Text style={styles.metricChangeNegative}>-8% vs ayer</Text>
          </View>

          <View style={styles.metricCard}>
            <View style={styles.metricBadge}>
              <Text style={styles.metricBadgeText}>Nº de Ventas</Text>
            </View>
            <View style={styles.metricIconCircle}>
              <Text style={styles.metricIconText}>🛒</Text>
            </View>
            <Text style={styles.metricValue}>8</Text>
            <Text style={styles.metricChangePositive}>+2 vs ayer</Text>
          </View>
        </View>

        {/* Segunda fila */}
        <View style={[styles.secondRow, isMobile && styles.secondRowMobile]}>
          <View style={styles.clientesCard}>
            <View style={styles.clientesBadge}>
              <Text style={styles.clientesBadgeText}>Clientes Visitados</Text>
            </View>
            <View style={styles.clientesIconCircle}>
              <Text style={styles.clientesIconText}>👥</Text>
            </View>
            <Text style={styles.clientesNumber}>12</Text>
            <Text style={styles.clientesText}>Objetivo: 15 clientes</Text>
          </View>

          <View style={styles.actionButtonsContainer}>
            <TouchableOpacity 
              style={styles.actionCard}
              onPress={() => navigation.navigate('VentasScreen')}
            >
              <View style={styles.actionIcon}>
                <Text style={styles.actionIconText}>➕</Text>
              </View>
              <Text style={styles.actionText}>Nueva{'\n'}Venta</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionCard}>
              <View style={styles.actionIcon}>
                <Text style={styles.actionIconText}>📈</Text>
              </View>
              <Text style={styles.actionText}>Informe{'\n'}Día</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.actionCard}
              onPress={() => navigation.navigate('SincronizacionScreen')}
            >
              <View style={styles.actionIcon}>
                <Text style={styles.actionIconText}>🔄</Text>
              </View>
              <Text style={styles.actionText}>Sincronizar{'\n'}datos</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Ventas Recientes - RESTAURADO */}
        <View style={styles.ventasSection}>
          <View style={styles.ventasHeader}>
            <Text style={styles.ventasTitle}>🛒 Ventas Recientes</Text>
          </View>

          {ventasRecientes.map((venta) => (
            <View key={venta.id} style={styles.ventaItem}>
              <View style={[
                styles.ventaIndicator,
                { backgroundColor: venta.estado === 'verde' ? '#4CAF50' : '#FF9800' }
              ]} />
              <View style={styles.ventaInfo}>
                <Text style={styles.ventaCliente}>{venta.cliente}</Text>
                <Text style={styles.ventaDetalle}>{venta.fecha} | {venta.vendedor}</Text>
              </View>
              <Text style={styles.ventaMonto}>{venta.monto.toFixed(2)} €</Text>
            </View>
          ))}

          <TouchableOpacity style={styles.verTodas}>
            <Text style={styles.verTodasText}>👁️ Ver todas las ventas</Text>
          </TouchableOpacity>
        </View>
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
  },
  heroSection: {
    backgroundColor: '#1F4788',
    padding: 50,
    paddingBottom: 60,
  },
  heroTitle: {
    fontSize: 42,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 15,
    lineHeight: 50,
  },
  heroSubtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.95)',
    marginBottom: 30,
    lineHeight: 24,
  },
  heroButtons: {
    flexDirection: 'row',
    gap: 15,
  },
  buttonWhite: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 10,
    alignItems: 'center',
    gap: 10,
  },
  buttonWhiteIcon: {
    fontSize: 16,
    color: '#1F4788',
  },
  buttonWhiteText: {
    color: '#1F4788',
    fontSize: 15,
    fontWeight: 'bold',
  },
  buttonOutline: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'white',
    alignItems: 'center',
    gap: 10,
  },
  buttonOutlineIcon: {
    fontSize: 16,
  },
  buttonOutlineText: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
  },
  metricsRow: {
    flexDirection: 'row',
    padding: 25,
    gap: 20,
  },
  metricsColumn: {
    flexDirection: 'column',
    padding: 15,
  },
  metricCard: {
    flex: 1,
    backgroundColor: 'white',
    padding: 25,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
    minHeight: 180,
  },
  metricBadge: {
    backgroundColor: '#1F4788',
    alignSelf: 'flex-start',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 15,
  },
  metricBadgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  metricIconCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E6EBF5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  metricIconText: {
    fontSize: 24,
  },
  metricValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  metricChangePositive: {
    fontSize: 13,
    color: '#4CAF50',
    fontWeight: '600',
  },
  metricChangeNegative: {
    fontSize: 13,
    color: '#FF5722',
    fontWeight: '600',
  },
  secondRow: {
    flexDirection: 'row',
    paddingHorizontal: 25,
    paddingBottom: 25,
    gap: 20,
  },
  secondRowMobile: {
    flexDirection: 'column',
    paddingHorizontal: 15,
  },
  clientesCard: {
    flex: 1,
    backgroundColor: 'white',
    padding: 25,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  },
  clientesBadge: {
    backgroundColor: '#1F4788',
    alignSelf: 'flex-start',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 15,
  },
  clientesBadgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  clientesIconCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E6EBF5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  clientesIconText: {
    fontSize: 24,
  },
  clientesNumber: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#1F4788',
    marginBottom: 8,
  },
  clientesText: {
    fontSize: 14,
    color: '#666',
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    gap: 15,
  },
  actionCard: {
    width: 130,
    height: 130,
    backgroundColor: '#1F4788',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 4,
  },
  actionIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  actionIconText: {
    fontSize: 24,
  },
  actionText: {
    color: 'white',
    fontSize: 13,
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 16,
  },
  // Ventas Recientes
  ventasSection: {
    backgroundColor: 'white',
    margin: 25,
    marginTop: 0,
    padding: 25,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  },
  ventasHeader: {
    marginBottom: 20,
  },
  ventasTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  ventaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    gap: 12,
  },
  ventaIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  ventaInfo: {
    flex: 1,
  },
  ventaCliente: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  ventaDetalle: {
    fontSize: 13,
    color: '#999',
  },
  ventaMonto: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F4788',
  },
  verTodas: {
    marginTop: 15,
    alignItems: 'center',
    paddingVertical: 12,
  },
  verTodasText: {
    fontSize: 15,
    color: '#1F4788',
    fontWeight: 'bold',
  },
});

export default DashboardScreen;
