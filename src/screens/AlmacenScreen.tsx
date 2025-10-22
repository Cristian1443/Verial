// src/screens/AlmacenScreen.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import SidebarMenu from '../components/common/SidebarMenu';

const AlmacenScreen = ({ navigation }: { navigation: any }) => {
  const [selectedOption, setSelectedOption] = useState('Resumen Stock');

  const opciones = [
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
        <View style={styles.optionsContainer}>
          {opciones.map((opcion) => (
            <TouchableOpacity
              key={opcion}
              style={[
                styles.optionItem,
                selectedOption === opcion && styles.optionItemActive
              ]}
              onPress={() => setSelectedOption(opcion)}
            >
              <Text style={[
                styles.optionText,
                selectedOption === opcion && styles.optionTextActive
              ]}>
                {opcion}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Panel de contenido */}
        <View style={styles.contentPanel}>
          <Text style={styles.emptyMessage}>
            Seleccione una opción para gestionar el stock del almacén
          </Text>
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
    marginBottom: 25,
  },
  optionsContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
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
  optionTextActive: {
    color: '#1F4788',
    fontWeight: 'bold',
  },
  contentPanel: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 40,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  emptyMessage: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
  },
});

export default AlmacenScreen;
