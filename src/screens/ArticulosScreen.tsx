// src/screens/ArticulosScreen.tsx

import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, ViewStyle } from 'react-native';
import { useQuery, useRealm } from '@realm/react';
import SidebarMenu from '../components/common/SidebarMenu';
import { Articulo } from '../models/Schemas';

const ArticulosScreen = ({ navigation }: { navigation: any }) => {
    // Consulta offline de todos los artículos (Maestro sincronizado)
    const articulos = useQuery(Articulo).sorted('Nombre');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedArticuloId, setSelectedArticuloId] = useState<number | null>(null);

    // Búsqueda offline por nombre o referencia
    const filteredArticulos = articulos.filtered(
        'Nombre CONTAINS[c] $0 OR Referencia CONTAINS[c] $0',
        searchTerm
    );

    return (
        <View style={styles.mainContainer}>
            <SidebarMenu navigation={navigation} currentScreen="ArticulosScreen" />

            <View style={styles.contentContainer}>
                <Text style={styles.headerTitle}>Artículos</Text>

                <View style={styles.listSection}>
                    {/* --- Panel de Listado --- */}
                    <View style={styles.listPanel}>
                        {/* Buscador y Filtros */}
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Buscar Artículos..."
                            value={searchTerm}
                            onChangeText={setSearchTerm}
                        />
                        {/* Filtros rápidos: Todos, Asociados, Medidas, Colecciones */}
                        <View style={styles.filterBar}>
                             <FilterButton title="Todos" isActive={true} />
                             <FilterButton title="Asociados" isActive={false} />
                             <FilterButton title="Medidas" isActive={false} />
                             <FilterButton title="Clasificación" isActive={false} />
                        </View>

                        {/* Listado de Artículos (Simulación del listado de tarjetas) */}
                        <ScrollView>
                            {filteredArticulos.map(art => (
                                <ArticuloListItem 
                                    key={art.id} 
                                    articulo={art} 
                                    onPress={() => setSelectedArticuloId(art.id)}
                                    isSelected={art.id === selectedArticuloId}
                                />
                            ))}
                            {filteredArticulos.length === 0 && <Text style={styles.emptyText}>No se encontraron artículos.</Text>}
                        </ScrollView>
                    </View>
                    
                    {/* --- Panel de Detalle --- */}
                    <ArticuloDetailPanel 
                        articuloId={selectedArticuloId} 
                        style={styles.detailPanel}
                    />
                </View>
            </View>
        </View>
    );
};

// Componente para los botones de filtro
const FilterButton = ({ title, isActive }: { title: string; isActive: boolean }) => (
    <TouchableOpacity style={[styles.filterButton, isActive && styles.filterButtonActive]}>
        <Text style={[styles.filterButtonText, isActive && styles.filterButtonTextActive]}>
            {title}
        </Text>
    </TouchableOpacity>
);

// Componente para una fila del listado
const ArticuloListItem = ({ articulo, onPress, isSelected }: { articulo: Articulo; onPress: () => void; isSelected: boolean }) => (
    <TouchableOpacity 
        style={[styles.listItem, isSelected && styles.listItemActive]} 
        onPress={onPress}
    >
        <Text style={styles.itemTitle}>{articulo.Nombre}</Text>
        <Text style={styles.itemRef}>Ref: {articulo.Referencia}</Text>
        <Text style={styles.itemStock}>Stock: {articulo.Stock}</Text>
    </TouchableOpacity>
);

// Componente para el panel de detalle
const ArticuloDetailPanel = ({ articuloId, style }: { articuloId: number | null; style: ViewStyle }) => {
    const realm = useRealm();
    const articulo = articuloId ? realm.objectForPrimaryKey<Articulo>('Articulo', articuloId) : null;
    
    if (!articulo) {
        return (
            <View style={style}>
                <Text style={styles.detailPlaceholder}>Seleccione un artículo para ver los detalles.</Text>
            </View>
        );
    }

    // Nota: Aquí se mostrarían más datos del Articulo (Descripción, Precios, Imágenes - usando GetImagenesArticulosWS)
    return (
        <View style={style}>
            <Text style={styles.detailTitle}>{articulo.Nombre}</Text>
            <View style={styles.detailInfoBlock}>
                <Text style={styles.detailInfoLabel}>Referencia:</Text>
                <Text style={styles.detailInfoValue}>{articulo.Referencia}</Text>
            </View>
            <View style={styles.detailInfoBlock}>
                <Text style={styles.detailInfoLabel}>Precio Tarifa:</Text>
                <Text style={styles.detailInfoValue}>{articulo.PrecioTarifa.toFixed(2)} €</Text>
            </View>
            <View style={styles.detailInfoBlock}>
                <Text style={styles.detailInfoLabel}>Stock Disponible (Global):</Text>
                <Text style={styles.detailInfoValue}>{articulo.Stock}</Text>
            </View>
            <Text style={styles.detailInfoLabel}>Descripción:</Text>
            <Text>Aquí iría la descripción ampliada del artículo...</Text>
        </View>
    );
};


const styles = StyleSheet.create({
    mainContainer: { flex: 1, flexDirection: 'row' },
    contentContainer: { flex: 1, padding: 20 },
    headerTitle: { fontSize: 28, fontWeight: 'bold', marginBottom: 20 },
    listSection: { flexDirection: 'row', flex: 1, gap: 15 }, // Layout para dos paneles
    
    listPanel: { flex: 1, backgroundColor: '#f9f9f9', padding: 10, borderRadius: 8 },
    detailPanel: { 
        flex: 1.5, 
        backgroundColor: '#fff', 
        padding: 20, 
        borderRadius: 8, 
        borderLeftWidth: 1, 
        borderColor: '#eee' 
    },
    detailPlaceholder: { color: 'gray', textAlign: 'center', marginTop: 50 },

    searchInput: { height: 40, borderColor: '#ccc', borderWidth: 1, borderRadius: 8, paddingHorizontal: 15, marginBottom: 10 },
    
    filterBar: { flexDirection: 'row', marginBottom: 15, gap: 5 },
    filterButton: { padding: 8, borderRadius: 5, backgroundColor: '#fff', borderWidth: 1, borderColor: '#ccc' },
    filterButtonActive: { backgroundColor: '#1F4788', borderColor: '#1F4788' },
    filterButtonText: { color: '#333', fontSize: 12 },
    filterButtonTextActive: { color: 'white', fontWeight: 'bold' },
    
    listItem: { padding: 10, borderBottomWidth: 1, borderBottomColor: '#eee', backgroundColor: 'white' },
    listItemActive: { backgroundColor: '#E6EBF5', borderLeftWidth: 4, borderLeftColor: '#1F4788' },
    itemTitle: { fontWeight: 'bold' },
    itemRef: { fontSize: 12, color: 'gray' },
    itemStock: { fontSize: 12, color: 'green' },

    detailTitle: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, borderBottomWidth: 1, borderBottomColor: '#eee', paddingBottom: 10 },
    detailInfoBlock: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
    detailInfoLabel: { fontWeight: '600' },
    detailInfoValue: { color: '#1F4788', fontWeight: 'bold' },
    emptyText: { textAlign: 'center', marginTop: 50, color: 'gray' },
});

export default ArticulosScreen;