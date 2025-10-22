// src/components/common/SidebarMenu.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, useWindowDimensions } from 'react-native';

const SidebarMenu = ({ navigation, currentScreen }: { navigation: any; currentScreen: string }) => {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  const menuItems = [
    { id: 'Dashboard', icon: '🏠', label: 'Panel', screen: 'Dashboard' },
    { id: 'VentasScreen', icon: '📋', label: 'Ventas', screen: 'VentasScreen' },
    { id: 'AlmacenScreen', icon: '📦', label: 'Almacén', screen: 'AlmacenScreen' },
    { id: 'SincronizacionScreen', icon: '🌐', label: 'Comunica', screen: 'SincronizacionScreen' },
    { id: 'Dashboard', icon: '📅', label: 'Agenda', screen: 'Dashboard' },
  ];

  return (
    <View style={[styles.sidebar, isMobile && styles.sidebarMobile]}>
      {/* Logo */}
      <View style={styles.logoContainer}>
        <View style={styles.logoBox}>
          <Text style={styles.logoText}>V</Text>
        </View>
      </View>

      {/* Menu Items */}
      <ScrollView style={styles.menuItems} showsVerticalScrollIndicator={false}>
        {menuItems.map((item) => (
          <TouchableOpacity
            key={item.id + item.label}
            style={[
              styles.menuItem,
              currentScreen === item.id && styles.menuItemActive,
              isMobile && styles.menuItemMobile
            ]}
            onPress={() => navigation.navigate(item.screen)}
          >
            <Text style={[styles.menuIcon, isMobile && styles.menuIconMobile]}>{item.icon}</Text>
            {!isMobile && (
              <Text style={[
                styles.menuLabel,
                currentScreen === item.id && styles.menuLabelActive
              ]}>
                {item.label}
              </Text>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton}>
          <Text style={styles.footerIcon}>⚙️</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sidebar: {
    width: 100,
    backgroundColor: '#1F4788',
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  sidebarMobile: {
    width: 70,
  },
  logoContainer: {
    paddingVertical: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  logoBox: {
    width: 50,
    height: 50,
    borderRadius: 10,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1F4788',
  },
  menuItems: {
    flex: 1,
    paddingVertical: 20,
  },
  menuItem: {
    paddingVertical: 20,
    paddingHorizontal: 15,
    alignItems: 'center',
    borderLeftWidth: 4,
    borderLeftColor: 'transparent',
  },
  menuItemMobile: {
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  menuItemActive: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderLeftColor: 'white',
  },
  menuIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  menuIconMobile: {
    fontSize: 22,
    marginBottom: 0,
  },
  menuLabel: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.7)',
    textAlign: 'center',
    fontWeight: '500',
  },
  menuLabelActive: {
    color: 'white',
    fontWeight: 'bold',
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
    paddingVertical: 20,
    alignItems: 'center',
  },
  footerButton: {
    padding: 10,
  },
  footerIcon: {
    fontSize: 24,
  },
});

export default SidebarMenu;
