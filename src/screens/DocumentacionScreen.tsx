// src/screens/DocumentacionScreen.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import SidebarMenu from '../components/common/SidebarMenu';

const documentos = [
  { id: 1, nombre: 'Información.pdf', size: '2.5 MB' },
  { id: 2, nombre: 'Campaña.pdf', size: '1.8 MB' },
  { id: 3, nombre: 'Preguntas.pdf', size: '800 KB' },
  { id: 4, nombre: 'Info.pdf', size: '1.2 MB' },
];

const DocumentacionScreen = ({ navigation }: { navigation: any }) => {
  const [selectedDoc, setSelectedDoc] = useState(documentos[0]);

  return (
    <View style={styles.mainContainer}>
      <SidebarMenu navigation={navigation} currentScreen="DocumentacionScreen" />

      <View style={styles.contentContainer}>
        <Text style={styles.headerTitle}>Documentos</Text>

        <View style={styles.contentSection}>
          {/* Lista de Documentos */}
          <View style={styles.docList}>
            <TouchableOpacity style={styles.uploadButton}>
              <Text style={styles.uploadIcon}>⬆️</Text>
              <Text style={styles.uploadText}>Subir un nuevo documento</Text>
            </TouchableOpacity>

            <ScrollView style={styles.docItems}>
              {documentos.map((doc) => (
                <TouchableOpacity
                  key={doc.id}
                  style={[
                    styles.docItem,
                    selectedDoc.id === doc.id && styles.docItemActive
                  ]}
                  onPress={() => setSelectedDoc(doc)}
                >
                  <Text style={styles.docIcon}>📄</Text>
                  <View style={styles.docInfo}>
                    <Text style={styles.docNombre}>{doc.nombre}</Text>
                  </View>
                  <View style={styles.docActions}>
                    <TouchableOpacity style={styles.docActionBtn}>
                      <Text>📋</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.docActionBtn}>
                      <Text>⚙️</Text>
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Visor de Documento */}
          <View style={styles.docViewer}>
            <Text style={styles.viewerTitle}>{selectedDoc.nombre}</Text>
            <View style={styles.pdfPlaceholder}>
              <Text style={styles.pdfIcon}>📄</Text>
              <Text style={styles.pdfText}>Vista previa del documento</Text>
              <Text style={styles.pdfSize}>{selectedDoc.size}</Text>
            </View>
          </View>
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
  contentSection: {
    flex: 1,
    flexDirection: 'row',
    gap: 20,
  },
  docList: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
  },
  uploadButton: {
    backgroundColor: '#E6EBF5',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#1F4788',
  },
  uploadIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  uploadText: {
    fontSize: 14,
    color: '#1F4788',
    fontWeight: '600',
  },
  docItems: {
    flex: 1,
  },
  docItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: '#f9f9f9',
    gap: 12,
  },
  docItemActive: {
    backgroundColor: '#E6EBF5',
    borderLeftWidth: 4,
    borderLeftColor: '#1F4788',
  },
  docIcon: {
    fontSize: 24,
  },
  docInfo: {
    flex: 1,
  },
  docNombre: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  docActions: {
    flexDirection: 'row',
    gap: 5,
  },
  docActionBtn: {
    padding: 5,
  },
  docViewer: {
    flex: 2,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 25,
  },
  viewerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  pdfPlaceholder: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  pdfIcon: {
    fontSize: 80,
    marginBottom: 20,
  },
  pdfText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  pdfSize: {
    fontSize: 14,
    color: '#999',
  },
});

export default DocumentacionScreen;
