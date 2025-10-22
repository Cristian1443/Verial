import React from 'react';
import RealmProviderWrapper from './src/context/RealmProviderWrapper';
import WebDemoScreen from './src/screens/WebDemoScreen';
import { LogBox, Platform } from 'react-native';

LogBox.ignoreLogs(['...']); 

const App = () => {
  // En web, mostrar pantalla demo informativa
  if (Platform.OS === 'web') {
    return <WebDemoScreen />;
  }

  // En móvil, usar Realm normalmente
  return (
    <RealmProviderWrapper />
  );
};

export default App;