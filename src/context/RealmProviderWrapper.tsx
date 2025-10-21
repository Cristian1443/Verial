// src/context/RealmProviderWrapper.tsx

import React from 'react';
import { RealmProvider, realmConfig } from '../models/Schemas';
import { AppNavigator } from '../navigation/AppNavigator';
import { ActivityIndicator, View, Text } from 'react-native';

const RealmProviderWrapper = () => {
  return (
    <RealmProvider
      {...realmConfig}
      // Muestra un indicador de carga mientras Realm inicializa la base de datos local
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