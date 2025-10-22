// src/screens/AlmacenScreen.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import SidebarMenu from '../components/common/SidebarMenu';

const AlmacenScreen = ({ navigation }: { navigation: any }) => {
  const [selectedOption, setSelectedOption] = useState('Resumen Stock');

  const options = [
    'Carga Camión',
    'Descarga Camión',
    'Inventario Camión',
    'Herramienta Entrada',
    'Herramienta Salida',
  ];

  return (
    <View style={styles.mainContainer}>
      <SidebarMenu navigation={navigation} currentScreen="AlmacenScreen" />

      <View style={styles.contentContainer}>
        <Text style={styles.headerTitle}>Notas Almacén</Text>

        {/* Lista de opciones */}
        <ScrollView style={styles.optionsList}>
          {options.map((option) => (
            <TouchableOpacity
              key={option}
              style={[
                styles.optionItem,
                selectedOption === option && styles.optionItemActive
              ]}
              onPress={() => setSelectedOption(option)}
            >
              <Text style={styles.optionText}>{option}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Panel vacío para detalles */}
        <View style={styles.emptyPanel}>
          <Text style={styles.emptyText}>Seleccione una opción para gestionar el stock</Text>
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
    padding: 30,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 30,
  },
  optionsList: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 10,
    marginBottom: 20,
    maxHeight: 400,
  },
  optionItem: {
    padding: 15,
    borderRadius: 8,
    marginBottom: 5,
  },
  optionItemActive: {
    backgroundColor: '#E6EBF5',
  },
  optionText: {
    fontSize: 15,
    color: '#333',
    fontWeight: '500',
  },
  emptyPanel: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
  },
});

export default AlmacenScreen;
