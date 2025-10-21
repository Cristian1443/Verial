// src/screens/DashboardScreen.tsx

import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useQuery } from '@realm/react';
import { NotaVenta, Gasto, Cliente } from '../models/Schemas';
import SidebarMenu from '../components/common/SidebarMenu'; // Lo crearemos a continuación

const DashboardScreen = ({ navigation }) => {
  // Datos del día (simulación de filtros por fecha actual)
  const today = new Date().toISOString().substring(0, 10);
  
  // Usamos useQuery para obtener datos de Realm (operativa offline)
  const ventasHoy = useQuery(NotaVenta).filtered(`Fecha == "${today}"`); 
  const gastosHoy = useQuery(Gasto).filtered(`Fecha == "${today}"`);
  const totalClientes = useQuery(Cliente).length;

  // Cálculo de totales
  const totalVentas = ventasHoy.sum('TotalImporte');
  const totalGastos = gastosHoy.sum('Importe');
  const totalCobros = 0; // Se calcularía al integrar el módulo de Cobros

  return (
    <View style={styles.mainContainer}>
      <SidebarMenu navigation={navigation} currentScreen="Dashboard" />

      <ScrollView style={styles.contentContainer}>
        <Text style={styles.headerTitle}>Gestión Inteligente de Ventas en Ruta</Text>
        
        {/* --- Sección de Métricas del Día (Basado en el mockup) --- */}
        <View style={styles.metricsRow}>
          <MetricCard title="Ventas Hoy" value={`${totalVentas.toFixed(2)} €`} color="#1F4788" />
          <MetricCard title="Gastos Hoy" value={`${totalGastos.toFixed(2)} €`} color="#1F4788" />
          <MetricCard title="Cobros Pendientes" value={`0`} color="#1F4788" />
          <MetricCard title="Clientes Sincronizados" value={`${totalClientes}`} color="#1F4788" />
        </View>

        {/* --- Accesos Rápidos (Botones del Mockup) --- */}
        <Text style={styles.sectionTitle}>Operaciones</Text>
        <View style={styles.shortcutsRow}>
            <ShortcutButton title="Crear Nota de Venta" icon="🛍️" onPress={() => navigation.navigate('VentasScreen')} />
            <ShortcutButton title="Registrar Cobros" icon="💰" onPress={() => navigation.navigate('CobrosScreen')} />
            <ShortcutButton title="Registrar Gastos" icon="⛽" onPress={() => navigation.navigate('GastosScreen')} />
        </View>

        {/* --- Resumen del Día (Listado de Ventas/Gastos - Módulo 2) --- */}
        <Text style={styles.sectionTitle}>Resumen de la Jornada</Text>
        <View style={styles.summaryContainer}>
            <Text>Ventas registradas: {ventasHoy.length}</Text>
            <Text>Gastos registrados: {gastosHoy.length}</Text>
        </View>
        {/* Aquí iría la agenda de visitas [cite: 569] */}

      </ScrollView>
    </View>
  );
};

// Componentes reutilizables (Mover a src/components/dashboard/)
const MetricCard = ({ title, value, color }) => (
    <View style={[styles.card, { borderColor: color }]}>
        <Text style={styles.cardValue}>{value}</Text>
        <Text style={styles.cardTitle}>{title}</Text>
    </View>
);

const ShortcutButton = ({ title, icon, onPress }) => (
    <TouchableOpacity style={styles.shortcutButton} onPress={onPress}>
        <Text style={styles.shortcutIcon}>{icon}</Text>
        <Text style={styles.shortcutText}>{title}</Text>
    </TouchableOpacity>
);


const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'row', // Para Sidebar y Contenido
    backgroundColor: '#fff',
  },
  contentContainer: {
    flex: 1, // El contenido toma el espacio restante
    padding: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '300',
    marginBottom: 20,
    color: '#333',
  },
  metricsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
    gap: 15,
  },
  card: {
    flex: 1,
    padding: 15,
    borderRadius: 8,
    backgroundColor: '#fff',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  cardValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1F4788',
  },
  cardTitle: {
    fontSize: 12,
    marginTop: 5,
    color: '#666',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    marginTop: 10,
  },
  shortcutsRow: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: 30,
  },
  shortcutButton: {
    backgroundColor: '#E6EBF5',
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
  },
  shortcutIcon: {
    fontSize: 30,
    marginBottom: 5,
  },
  shortcutText: {
    fontSize: 12,
    textAlign: 'center',
    fontWeight: '600',
  },
  summaryContainer: {
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    borderLeftWidth: 5,
    borderLeftColor: '#1F4788',
  }
});

export default DashboardScreen;