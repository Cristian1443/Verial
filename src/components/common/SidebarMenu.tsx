// src/components/common/SidebarMenu.tsx

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const menuItems = [
  { name: 'Panel', icon: '🏠', target: 'Dashboard' },
  { name: 'Ventas', icon: '🧾', target: 'VentasScreen' },
  { name: 'Cobros', icon: '💰', target: 'CobrosScreen' },
  { name: 'Gastos', icon: '⛽', target: 'GastosScreen' },
  { name: 'Clientes', icon: '👥', target: 'ClientesScreen' },
  { name: 'Artículos', icon: '📦', target: 'ArticulosScreen' },
  { name: 'Comunicación', icon: '🌐', target: 'SincronizacionScreen' },
  { name: 'Almacén', icon: '🚚', target: 'AlmacenScreen' },
  // ... Otros módulos: Documentación, Configuración
];

const SidebarMenu = ({ navigation, currentScreen }) => {
  return (
    <View style={styles.sidebar}>
        <Text style={styles.logo}>V</Text> {/* Logo simplificado */}
        <View style={styles.menuList}>
            {menuItems.map((item) => (
                <TouchableOpacity
                    key={item.name}
                    style={[
                        styles.menuItem,
                        currentScreen === item.target && styles.activeMenuItem,
                    ]}
                    onPress={() => navigation.navigate(item.target)}
                >
                    <Text style={styles.menuIcon}>{item.icon}</Text>
                    <Text style={styles.menuText}>{item.name}</Text>
                </TouchableOpacity>
            ))}
        </View>
        <TouchableOpacity style={styles.logoutButton}>
            <Text style={styles.logoutText}>⚙️</Text>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  sidebar: {
    width: 80, // Ancho reducido para tablets/diseño de mockup
    backgroundColor: '#1F4788', // Color azul oscuro
    paddingTop: 40,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 20,
    height: '100%',
  },
  logo: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 40,
  },
  menuList: {
    flex: 1,
    width: '100%',
  },
  menuItem: {
    alignItems: 'center',
    paddingVertical: 15,
    width: '100%',
    opacity: 0.7,
  },
  activeMenuItem: {
    backgroundColor: '#003366', // Azul más oscuro para activo
    opacity: 1,
  },
  menuIcon: {
    fontSize: 20,
    color: 'white',
    marginBottom: 5,
  },
  menuText: {
    fontSize: 10,
    color: 'white',
    textAlign: 'center',
  },
  logoutButton: {
    marginTop: 20,
  },
  logoutText: {
    fontSize: 24,
    color: 'white',
  }
});

export default SidebarMenu;