// src/screens/WebDemoScreen.tsx

import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

const WebDemoScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>📱 App Ventas Verial</Text>
        <Text style={styles.subtitle}>Sistema de Gestión de Ventas Móvil</Text>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <View style={styles.demoBox}>
          <Text style={styles.title}>🌐 Vista Web Demo</Text>
          <Text style={styles.description}>
            Esta es una aplicación móvil para vendedores que trabajan con el ERP Verial.
          </Text>

          <View style={styles.featuresSection}>
            <Text style={styles.sectionTitle}>✨ Características:</Text>
            
            <View style={styles.feature}>
              <Text style={styles.featureIcon}>📋</Text>
              <View style={styles.featureContent}>
                <Text style={styles.featureTitle}>Gestión de Ventas</Text>
                <Text style={styles.featureDesc}>Crear y gestionar notas de venta offline</Text>
              </View>
            </View>

            <View style={styles.feature}>
              <Text style={styles.featureIcon}>👥</Text>
              <View style={styles.featureContent}>
                <Text style={styles.featureTitle}>Clientes</Text>
                <Text style={styles.featureDesc}>Base de datos local de clientes sincronizada</Text>
              </View>
            </View>

            <View style={styles.feature}>
              <Text style={styles.featureIcon}>📦</Text>
              <View style={styles.featureContent}>
                <Text style={styles.featureTitle}>Artículos</Text>
                <Text style={styles.featureDesc}>Catálogo de productos con precios y stock</Text>
              </View>
            </View>

            <View style={styles.feature}>
              <Text style={styles.featureIcon}>💰</Text>
              <View style={styles.featureContent}>
                <Text style={styles.featureTitle}>Cobros</Text>
                <Text style={styles.featureDesc}>Registro de pagos y cobros</Text>
              </View>
            </View>

            <View style={styles.feature}>
              <Text style={styles.featureIcon}>🏪</Text>
              <View style={styles.featureContent}>
                <Text style={styles.featureTitle}>Almacén</Text>
                <Text style={styles.featureDesc}>Control de stock del furgón</Text>
              </View>
            </View>

            <View style={styles.feature}>
              <Text style={styles.featureIcon}>🔄</Text>
              <View style={styles.featureContent}>
                <Text style={styles.featureTitle}>Sincronización</Text>
                <Text style={styles.featureDesc}>Sincronización bidireccional con Verial ERP</Text>
              </View>
            </View>
          </View>

          <View style={styles.mobileSection}>
            <Text style={styles.sectionTitle}>📱 Para ver la app completa:</Text>
            <View style={styles.steps}>
              <View style={styles.step}>
                <Text style={styles.stepNumber}>1</Text>
                <Text style={styles.stepText}>Descarga Expo Go en tu móvil</Text>
              </View>
              <View style={styles.step}>
                <Text style={styles.stepNumber}>2</Text>
                <Text style={styles.stepText}>Escanea el código QR de la terminal</Text>
              </View>
              <View style={styles.step}>
                <Text style={styles.stepNumber}>3</Text>
                <Text style={styles.stepText}>Explora todas las funcionalidades</Text>
              </View>
            </View>
          </View>

          <View style={styles.techStack}>
            <Text style={styles.techTitle}>🔧 Tecnologías:</Text>
            <View style={styles.techBadges}>
              <Text style={styles.badge}>React Native</Text>
              <Text style={styles.badge}>Expo</Text>
              <Text style={styles.badge}>Realm DB</Text>
              <Text style={styles.badge}>TypeScript</Text>
              <Text style={styles.badge}>React Navigation</Text>
            </View>
          </View>

          <View style={styles.note}>
            <Text style={styles.noteText}>
              ⚠️ Nota: Esta app usa Realm Database que requiere un dispositivo nativo (Android/iOS) para funcionar completamente.
            </Text>
          </View>

          <TouchableOpacity 
            style={styles.githubButton}
            onPress={() => {
              if (typeof window !== 'undefined') {
                window.open('https://github.com/Cristian1443/Verial', '_blank');
              }
            }}
          >
            <Text style={styles.githubButtonText}>Ver en GitHub →</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#1F4788',
    padding: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  logo: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#E6EBF5',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    alignItems: 'center',
  },
  demoBox: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 40,
    maxWidth: 900,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1F4788',
    marginBottom: 16,
    textAlign: 'center',
  },
  description: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 26,
  },
  featuresSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
    padding: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
  },
  featureIcon: {
    fontSize: 32,
    marginRight: 16,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F4788',
    marginBottom: 4,
  },
  featureDesc: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  mobileSection: {
    backgroundColor: '#E6EBF5',
    padding: 24,
    borderRadius: 12,
    marginBottom: 30,
  },
  steps: {
    marginTop: 16,
  },
  step: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#1F4788',
    color: 'white',
    textAlign: 'center',
    lineHeight: 32,
    fontWeight: 'bold',
    marginRight: 12,
  },
  stepText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  techStack: {
    marginBottom: 30,
  },
  techTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  techBadges: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  badge: {
    backgroundColor: '#1F4788',
    color: 'white',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    fontSize: 14,
    fontWeight: '600',
  },
  note: {
    backgroundColor: '#FFF3CD',
    padding: 16,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#FFC107',
    marginBottom: 24,
  },
  noteText: {
    fontSize: 14,
    color: '#856404',
    lineHeight: 20,
  },
  githubButton: {
    backgroundColor: '#1F4788',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  githubButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default WebDemoScreen;

