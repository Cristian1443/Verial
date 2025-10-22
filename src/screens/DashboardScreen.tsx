// src/screens/DashboardScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import SidebarMenu from '../components/common/SidebarMenu';

const DashboardScreen = ({ navigation }: { navigation: any }) => {
  return (
    <View style={styles.mainContainer}>
      <SidebarMenu navigation={navigation} currentScreen="Dashboard" />
      
      <ScrollView style={styles.contentContainer}>
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <Text style={styles.heroTitle}>Gestión Inteligente{'\n'}de Ventas en Ruta</Text>
          <Text style={styles.heroSubtitle}>
            Cambia rápidamente de una venta{'\n'}
            rápida y sencilla con una plataforma{'\n'}
            lista para la venta.
          </Text>
          
          <View style={styles.heroButtons}>
            <TouchableOpacity style={styles.buttonPrimary}>
              <Text style={styles.buttonPrimaryText}>Ver Lecciones</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonSecondary}>
              <Text style={styles.buttonSecondaryText}>Acciones</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Métricas */}
        <View style={styles.metricsContainer}>
          <View style={styles.metricCard}>
            <Text style={styles.metricLabel}>💰</Text>
            <Text style={styles.metricValue}>2.450,00 €</Text>
            <Text style={styles.metricSubtext}>Total Ventas</Text>
          </View>
          
          <View style={styles.metricCard}>
            <Text style={styles.metricLabel}>📊</Text>
            <Text style={styles.metricValue}>180.50 €</Text>
            <Text style={styles.metricSubtext}>Promedio</Text>
          </View>
          
          <View style={styles.metricCard}>
            <Text style={styles.metricLabel}>⭐</Text>
            <Text style={styles.metricValue}>B</Text>
            <Text style={styles.metricSubtext}>Calificación</Text>
          </View>
        </View>

        {/* Acciones Rápidas */}
        <View style={styles.quickActionsSection}>
          <Text style={styles.sectionTitle}>Acciones Rápidas</Text>
          
          <View style={styles.actionsGrid}>
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => navigation.navigate('VentasScreen')}
            >
              <Text style={styles.actionIcon}>📋</Text>
              <Text style={styles.actionText}>Nueva{'\n'}Venta</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => navigation.navigate('ClientesScreen')}
            >
              <Text style={styles.actionIcon}>👥</Text>
              <Text style={styles.actionText}>Clientes</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => navigation.navigate('ArticulosScreen')}
            >
              <Text style={styles.actionIcon}>📦</Text>
              <Text style={styles.actionText}>Artículos</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Familias de Favoritas */}
        <View style={styles.favoritesCard}>
          <View style={styles.favoritesHeader}>
            <Text style={styles.favoritesTitle}>12</Text>
            <Text style={styles.favoritesSubtitle}>Familias de Favoritas</Text>
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
  heroSection: {
    backgroundColor: '#1F4788',
    padding: 40,
    paddingTop: 60,
    paddingBottom: 60,
  },
  heroTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 15,
    lineHeight: 44,
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#E6EBF5',
    marginBottom: 25,
    lineHeight: 24,
  },
  heroButtons: {
    flexDirection: 'row',
    gap: 15,
  },
  buttonPrimary: {
    backgroundColor: 'white',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
  },
  buttonPrimaryText: {
    color: '#1F4788',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonSecondary: {
    backgroundColor: 'transparent',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: 'white',
  },
  buttonSecondaryText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  metricsContainer: {
    flexDirection: 'row',
    padding: 20,
    gap: 15,
  },
  metricCard: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  metricLabel: {
    fontSize: 24,
    marginBottom: 8,
  },
  metricValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F4788',
    marginBottom: 4,
  },
  metricSubtext: {
    fontSize: 12,
    color: '#999',
  },
  quickActionsSection: {
    padding: 20,
    paddingTop: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  actionsGrid: {
    flexDirection: 'row',
    gap: 15,
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#1F4788',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    minHeight: 100,
    justifyContent: 'center',
  },
  actionIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  actionText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  favoritesCard: {
    margin: 20,
    marginTop: 10,
    backgroundColor: '#E6EBF5',
    padding: 25,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#1F4788',
  },
  favoritesHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  favoritesTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1F4788',
  },
  favoritesSubtitle: {
    fontSize: 16,
    color: '#1F4788',
  },
});

export default DashboardScreen;
