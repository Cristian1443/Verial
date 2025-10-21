// src/screens/DocumentacionScreen.tsx

import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import SidebarMenu from '../components/common/SidebarMenu';
// Se necesita una librería para visualizar PDFs. Ej: react-native-pdf (npm install react-native-pdf)
// import Pdf from 'react-native-pdf'; 

type Document = {
    id: number;
    title: string;
    filename: string;
    size: string;
};

const DocumentacionScreen = ({ navigation }: { navigation: any }) => {
    // Simulación de los documentos disponibles localmente (descargados desde el ERP)
    const documents: Document[] = [
        { id: 1, title: 'Catálogo General 2025', filename: 'catalogo_2025.pdf', size: '15 MB' },
        { id: 2, title: 'Lista de Precios 4T 2025', filename: 'precios_4t.pdf', size: '3 MB' },
        { id: 3, title: 'Instrucciones de Uso', filename: 'manual.pdf', size: '1 MB' },
    ];

    const [selectedDoc, setSelectedDoc] = useState<Document>(documents[0]);
    
    const handleViewDocument = (doc: Document) => {
        setSelectedDoc(doc);
        // Lógica real: Abrir el visor de PDF
        Alert.alert("Abriendo Documento", `Mostrando: ${doc.title}. Se requiere el componente nativo de visor de PDF.`);
    };

    return (
        <View style={styles.mainContainer}>
            <SidebarMenu navigation={navigation} currentScreen="DocumentacionScreen" />

            <View style={styles.contentContainer}>
                <Text style={styles.headerTitle}>Documentación y Catálogos</Text>
                <Text style={styles.subHeader}>Catálogo en PDF de apoyo para el vendedor.</Text>

                <View style={styles.docSection}>
                    {/* --- Lista de Documentos --- */}
                    <ScrollView style={styles.listPanel}>
                        {documents.map(doc => (
                            <DocumentListItem 
                                key={doc.id} 
                                doc={doc} 
                                onPress={() => handleViewDocument(doc)}
                                isSelected={doc.id === selectedDoc.id}
                            />
                        ))}
                    </ScrollView>

                    {/* --- Visor de PDF (Simulación) --- */}
                    <View style={styles.viewerPanel}>
                        <Text style={styles.viewerTitle}>{selectedDoc?.title || 'Seleccione un documento'}</Text>
                        
                        {/* // IMPLEMENTACIÓN REAL con react-native-pdf:
                            // <Pdf
                            //     source={source}
                            //     style={styles.pdfStyle}
                            //     onLoadComplete={(numberOfPages, filePath) => { console.log(`Número de páginas: ${numberOfPages}`); }}
                            // /> 
                        */}
                        <View style={styles.pdfPlaceholder}>
                            <Text style={styles.placeholderText}>
                                [Visor de PDF: El archivo {selectedDoc?.filename} estaría renderizado aquí.]
                            </Text>
                            <Text style={styles.placeholderText}>Tamaño: {selectedDoc?.size}</Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
};

const DocumentListItem = ({ doc, onPress, isSelected }: { doc: Document; onPress: () => void; isSelected: boolean }) => (
    <TouchableOpacity 
        style={[styles.listItem, isSelected && styles.listItemActive]} 
        onPress={onPress}
    >
        <Text style={styles.docTitle}>📚 {doc.title}</Text>
        <Text style={styles.docSize}>{doc.size}</Text>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    mainContainer: { flex: 1, flexDirection: 'row' },
    contentContainer: { flex: 1, padding: 20 },
    headerTitle: { fontSize: 28, fontWeight: 'bold', marginBottom: 10 },
    subHeader: { fontSize: 14, color: 'gray', marginBottom: 20 },
    docSection: { flexDirection: 'row', flex: 1, gap: 15 },
    
    listPanel: { flex: 1, backgroundColor: '#f9f9f9', padding: 10, borderRadius: 8 },
    viewerPanel: { flex: 3, backgroundColor: '#fff', padding: 20, borderRadius: 8, borderWidth: 1, borderColor: '#eee' },
    viewerTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 15, borderBottomWidth: 1, borderBottomColor: '#eee', paddingBottom: 10 },

    listItem: { padding: 15, borderBottomWidth: 1, borderBottomColor: '#eee', flexDirection: 'row', justifyContent: 'space-between' },
    listItemActive: { backgroundColor: '#E6EBF5', borderLeftWidth: 4, borderLeftColor: '#1F4788' },
    docTitle: { fontWeight: 'bold' },
    docSize: { fontSize: 12, color: 'gray' },

    pdfPlaceholder: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#eee', borderRadius: 5 },
    placeholderText: { color: '#666', textAlign: 'center', padding: 20 },
    pdfStyle: { flex: 1, width: '100%', height: '100%' },
});

export default DocumentacionScreen;