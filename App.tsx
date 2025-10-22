import React from 'react';
import { Platform } from 'react-native';
import RealmProviderWrapper from './src/context/RealmProviderWrapper';
import AppNavigatorWrapper from './src/navigation/AppNavigator';

export default function App() {
  // En web, mostrar la navegación sin Realm (solo UI)
  if (Platform.OS === 'web') {
    return <AppNavigatorWrapper />;
  }

  // En móvil, usar Realm completo
  return <RealmProviderWrapper />;
}
