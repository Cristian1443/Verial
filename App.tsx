
import React from 'react';
import RealmProviderWrapper from './src/context/RealmProviderWrapper';
import { LogBox } from 'react-native';

LogBox.ignoreLogs(['...']); 

const App = () => {
  return (
    <RealmProviderWrapper />
  );
};

export default App;