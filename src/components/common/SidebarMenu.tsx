// src/components/common/SidebarMenu.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

const SidebarMenu = ({ navigation, currentScreen }: { navigation: any; currentScreen: string }) => {
  const menuItems = [
    { id: 'Dashboard', icon: '🏠', label: 'Inicio', screen: 'Dashboard' },
    { id: 'VentasScreen', icon: '📋', label: 'Ventas', screen: 'VentasScreen' },
    { id: 'ClientesScreen', icon: '👥', label: 'Clientes', screen: 'ClientesScreen' },
    { id: 'ArticulosScreen', icon: '📦', label: 'Artículos', screen: 'ArticulosScreen' },
    { id: 'CobrosScreen', icon: '💰', label: 'Cobros', screen: 'CobrosScreen' },
    { id: 'GastosScreen', icon: '📃', label: 'Gastos', screen: 'GastosScreen' },
    { id: 'AlmacenScreen', icon: '🏪', label: 'Almacén', screen: 'AlmacenScreen' },
    { id: 'SincronizacionScreen', icon: '🔄', label: 'Comunicación', screen: 'SincronizacionScreen' },
    { id: 'DocumentacionScreen', icon: '📄', label: 'Documentos', screen: 'DocumentacionScreen' },
    { id: 'ConfiguracionScreen', icon: '⚙️', label: 'Configuración', screen: 'ConfiguracionScreen' },
  ];

  return (
    <View style={styles.sidebar}>
      {/* Logo */}
      <View style={styles.logoContainer}>
        <View style={styles.logoCircle}>
          <Text style={styles.logoText}>V</Text>
        </View>
        <Text style={styles.logoSubtext}>Verial</Text>
      </View>

      {/* Menu Items */}
      <ScrollView style={styles.menuItems}>
        {menuItems.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[
              styles.menuItem,
              currentScreen === item.id && styles.menuItemActive
            ]}
            onPress={() => navigation.navigate(item.screen)}
          >
            <View style={styles.menuItemContent}>
              <Text style={[
                styles.menuIcon,
                currentScreen === item.id && styles.menuIconActive
              ]}>
                {item.icon}
              </Text>
              <Text style={[
                styles.menuLabel,
                currentScreen === item.id && styles.menuLabelActive
              ]}>
                {item.label}
              </Text>
            </View>
            {currentScreen === item.id && <View style={styles.activeIndicator} />}
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton}>
          <Text style={styles.footerIcon}>❓</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton}>
          <Text style={styles.footerIcon}>🚪</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sidebar: {
    width: 80,
    backgroundColor: '#1F4788',
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  logoContainer: {
    alignItems: 'center',
    paddingVertical: 25,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  logoCircle: {
    width: 45,
    height: 45,
    borderRadius: 23,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F4788',
  },
  logoSubtext: {
    fontSize: 10,
    color: 'white',
    fontWeight: '600',
  },
  menuItems: {
    flex: 1,
    paddingVertical: 10,
  },
  menuItem: {
    position: 'relative',
    paddingVertical: 15,
    paddingHorizontal: 10,
    alignItems: 'center',
    marginVertical: 2,
  },
  menuItemActive: {
    backgroundColor: 'rgba(255,255,255,0.15)',
  },
  menuItemContent: {
    alignItems: 'center',
  },
  menuIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  menuIconActive: {
    transform: [{ scale: 1.1 }],
  },
  menuLabel: {
    fontSize: 10,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
    fontWeight: '500',
  },
  menuLabelActive: {
    color: 'white',
    fontWeight: 'bold',
  },
  activeIndicator: {
    position: 'absolute',
    right: 0,
    top: '25%',
    bottom: '25%',
    width: 4,
    backgroundColor: 'white',
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
    paddingVertical: 15,
    alignItems: 'center',
    gap: 10,
  },
  footerButton: {
    padding: 5,
  },
  footerIcon: {
    fontSize: 22,
  },
});

export default SidebarMenu;
