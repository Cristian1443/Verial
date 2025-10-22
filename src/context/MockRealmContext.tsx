// Contexto Mock para Web (sin Realm Database)
import React, { createContext, useContext } from 'react';

// Mock del hook useRealm
export const useRealm = () => ({
  objects: () => [],
  write: (callback: any) => callback(),
  create: () => {},
});

// Mock del hook useQuery  
export const useQuery = (schema: string) => {
  // Retornar array vacío con métodos de Realm
  const mockArray: any = [];
  mockArray.filtered = () => mockArray;
  mockArray.sorted = () => mockArray;
  mockArray.sum = () => 0;
  return mockArray;
};

// Mock del hook useObject
export const useObject = (schema: string, primaryKey: any) => null;

// Proveedor Mock
export const MockRealmProvider = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

