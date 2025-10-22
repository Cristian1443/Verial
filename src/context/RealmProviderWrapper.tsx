// src/context/RealmProviderWrapper.tsx
import React from 'react';
import { Platform, ActivityIndicator, View, Text } from 'react-native';
import AppNavigator from '../navigation/AppNavigator';

const RealmProviderWrapper = () => {
  // Si estamos en web, solo mostrar el navegador sin Realm
  if (Platform.OS === 'web') {
    return <AppNavigator />;
  }

  // En móvil, cargar Realm dinámicamente
  const { RealmProvider } = require('../models/Schemas');
  const { realmConfig } = require('../models/Schemas');
  
  return (
    <RealmProvider
      {...realmConfig}
      fallback={() => ( 
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text>Cargando Base de Datos Local...</Text>
        </View>
      )}
    >
      <AppNavigator />
    </RealmProvider>
  );
};

export default RealmProviderWrapper;
