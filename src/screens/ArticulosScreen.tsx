// src/screens/ArticulosScreen.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import SidebarMenu from '../components/common/SidebarMenu';

// Datos de ejemplo
const articulosEjemplo = [
  { id: 1, Nombre: 'Croqueta Jamón', Referencia: 'CRQ-001', Stock: 150, PrecioTarifa: 12.50 },
  { id: 2, Nombre: 'Croqueta Jamón', Referencia: 'CRQ-002', Stock: 200, PrecioTarifa: 11.80 },
  { id: 3, Nombre: 'Croqueta Jamón', Referencia: 'CRQ-003', Stock: 80, PrecioTarifa: 13.20 },
  { id: 4, Nombre: 'Croqueta Jamón', Referencia: 'CRQ-004', Stock: 120, PrecioTarifa: 12.00 },
];

const ArticulosScreen = ({ navigation }: { navigation: any }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('Todos');

  const filters = ['Todos', 'Finas', 'Preconcertadas', 'Verduras', 'Congeladas'];

  return (
    <View style={styles.mainContainer}>
      <SidebarMenu navigation={navigation} currentScreen="ArticulosScreen" />

      <View style={styles.contentContainer}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Artículos</Text>
          
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.iconButton}>
              <Text>📊</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Text>📋</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Text>⚙️</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Buscador */}
        <TextInput
          style={styles.searchInput}
          placeholder="🔍 Buscar artículo..."
          value={searchTerm}
          onChangeText={setSearchTerm}
        />

        {/* Módulos superiores */}
        <View style={styles.modulesRow}>
          <TouchableOpacity style={styles.moduleButton}>
            <Text style={styles.moduleIcon}>📋</Text>
            <Text style={styles.moduleText}>De{'\n'}Favoritas</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.moduleButton}>
            <Text style={styles.moduleIcon}>👤</Text>
            <Text style={styles.moduleText}>Escaneado</Text>
          </TouchableOpacity>
        </View>

        {/* Filtros */}
        <View style={styles.filtersContainer}>
          {filters.map((filter) => (
            <TouchableOpacity
              key={filter}
              style={[
                styles.filterChip,
                selectedFilter === filter && styles.filterChipActive
              ]}
              onPress={() => setSelectedFilter(filter)}
            >
              <Text
                style={[
                  styles.filterChipText,
                  selectedFilter === filter && styles.filterChipTextActive
                ]}
              >
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Lista de Artículos */}
        <ScrollView style={styles.articlesList}>
          {articulosEjemplo.map((articulo) => (
            <View key={articulo.id} style={styles.articleItem}>
              <View style={styles.articleIcon}>
                <Text style={styles.articleIconText}>📦</Text>
              </View>
              <View style={styles.articleInfo}>
                <Text style={styles.articleNombre}>{articulo.Nombre}</Text>
                <View style={styles.articleBadge}>
                  <Text style={styles.articleBadgeText}>Ver Nota</Text>
                </View>
              </View>
              <View style={styles.articleActions}>
                <TouchableOpacity style={styles.articleActionBtn}>
                  <Text>⋮</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
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
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
  },
  headerActions: {
    flexDirection: 'row',
    gap: 10,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  searchInput: {
    height: 45,
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 20,
    fontSize: 14,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  modulesRow: {
    flexDirection: 'row',
    gap: 15,
    marginBottom: 20,
  },
  moduleButton: {
    backgroundColor: '#1F4788',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    minWidth: 120,
  },
  moduleIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  moduleText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  filtersContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 20,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  filterChipActive: {
    backgroundColor: '#1F4788',
    borderColor: '#1F4788',
  },
  filterChipText: {
    fontSize: 13,
    color: '#666',
    fontWeight: '500',
  },
  filterChipTextActive: {
    color: 'white',
  },
  articlesList: {
    flex: 1,
  },
  articleItem: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    alignItems: 'center',
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  articleIcon: {
    width: 45,
    height: 45,
    borderRadius: 8,
    backgroundColor: '#E6EBF5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  articleIconText: {
    fontSize: 24,
  },
  articleInfo: {
    flex: 1,
  },
  articleNombre: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  articleBadge: {
    backgroundColor: '#1F4788',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  articleBadgeText: {
    color: 'white',
    fontSize: 11,
    fontWeight: 'bold',
  },
  articleActions: {
    padding: 5,
  },
  articleActionBtn: {
    padding: 5,
  },
  infoItem: {
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 11,
    color: '#999',
  },
  infoValue: {
    fontSize: 12,
    color: '#333',
    fontWeight: '500',
  },
});

export default ArticulosScreen;
