// src/screens/DashboardScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import SidebarMenu from '../components/common/SidebarMenu';

const DashboardScreen = ({ navigation }: { navigation: any }) => {
  return (
    <View style={styles.mainContainer}>
      <SidebarMenu navigation={navigation} currentScreen="Dashboard" />
      
      <ScrollView style={styles.contentContainer}>
        {/* Hero Section - Exacto al mockup */}
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

        {/* Métricas - 3 Cards exactas */}
        <View style={styles.metricsRow}>
          {/* Ventas Hoy */}
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

          {/* Gastos Hoy */}
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

          {/* Nº de Ventas */}
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

        {/* Segunda fila - Clientes Visitados + 3 Botones */}
        <View style={styles.secondRow}>
          {/* Clientes Visitados Card */}
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

          {/* Botones de Acción */}
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
  // Hero Section - Azul con patrón
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
  // Métricas - 3 Cards
  metricsRow: {
    flexDirection: 'row',
    padding: 25,
    gap: 20,
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
  // Segunda fila
  secondRow: {
    flexDirection: 'row',
    paddingHorizontal: 25,
    paddingBottom: 25,
    gap: 20,
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
});

export default DashboardScreen;
