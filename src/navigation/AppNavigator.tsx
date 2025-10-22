// src/navigation/AppNavigator.tsx
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Importar todas las pantallas
import LoginScreen from '../screens/LoginScreen';
import DashboardScreen from '../screens/DashboardScreen';
import VentasScreen from '../screens/VentasScreen'; 
import ClientesScreen from '../screens/ClientesScreen';
import ArticulosScreen from '../screens/ArticulosScreen';
import CobrosScreen from '../screens/CobrosScreen';
import GastosScreen from '../screens/GastosScreen';
import SincronizacionScreen from '../screens/SincronizacionScreen';
import AlmacenScreen from '../screens/AlmacenScreen';
import DocumentacionScreen from '../screens/DocumentacionScreen';
import ConfiguracionScreen from '../screens/ConfiguracionScreen';

const Stack = createNativeStackNavigator();

export const AppNavigator = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Para web, siempre autenticado

  return (
    <Stack.Navigator>
      {isAuthenticated ? (
        <>
          <Stack.Screen name="Dashboard" component={DashboardScreen} options={{ headerShown: false }} /> 
          <Stack.Screen name="VentasScreen" component={VentasScreen} options={{ headerShown: false }} />
          <Stack.Screen name="ClientesScreen" component={ClientesScreen} options={{ headerShown: false }} />
          <Stack.Screen name="ArticulosScreen" component={ArticulosScreen} options={{ headerShown: false }} />
          <Stack.Screen name="CobrosScreen" component={CobrosScreen} options={{ headerShown: false }} />
          <Stack.Screen name="GastosScreen" component={GastosScreen} options={{ headerShown: false }} />
          <Stack.Screen name="SincronizacionScreen" component={SincronizacionScreen} options={{ headerShown: false }} />
          <Stack.Screen name="AlmacenScreen" component={AlmacenScreen} options={{ headerShown: false }} />
          <Stack.Screen name="DocumentacionScreen" component={DocumentacionScreen} options={{ headerShown: false }} />
          <Stack.Screen name="ConfiguracionScreen" component={ConfiguracionScreen} options={{ headerShown: false }} />
        </>
      ) : (
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      )}
    </Stack.Navigator>
  );
};

export default function AppNavigatorWrapper() {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}
