// src/models/Schemas.ts
import { Platform } from 'react-native';
import { Realm, createRealmContext } from '@realm/react';

// --- Maestros y Configuración ---
export class Configuracion extends Realm.Object {
  clave!: string;
  valor!: string;

  static schema = {
    name: 'Configuracion',
    primaryKey: 'clave',
    properties: {
      clave: 'string', 
      valor: 'string', 
    },
  };
}

export class Cliente extends Realm.Object { 
  id!: number;
  NIF?: string;
  Nombre!: string;
  Apellido1?: string;
  UltimaSincronizacion!: Date;

  static schema = {
    name: 'Cliente',
    primaryKey: 'id',
    properties: {
      id: 'int',
      NIF: 'string?',
      Nombre: 'string',
      Apellido1: 'string?',
      UltimaSincronizacion: 'date',
    },
  };
}

export class Articulo extends Realm.Object { 
  id!: number;
  Nombre!: string;
  Referencia?: string;
  PorcentajeIVA?: number;
  Stock!: number;
  PrecioTarifa!: number;
  UltimaSincronizacion!: Date;

  static schema = {
    name: 'Articulo',
    primaryKey: 'id',
    properties: {
      id: 'int',
      Nombre: 'string',
      Referencia: 'string?',
      PorcentajeIVA: 'float?',
      Stock: 'float',
      PrecioTarifa: 'float',
      UltimaSincronizacion: 'date',
    },
  };
}

export class LineaVenta extends Realm.Object {
    _id!: Realm.BSON.ObjectId;
    ID_Articulo!: number;
    Uds!: number;
    Precio!: number;
    Dto!: number;

    static schema = {
        name: 'LineaVenta',
        primaryKey: '_id',
        properties: {
            _id: 'objectId', 
            ID_Articulo: 'int',
            Uds: 'float',
            Precio: 'float',
            Dto: 'float',
        }
    }
}

export class NotaVenta extends Realm.Object {
  idLocal!: string;
  idVerial?: number;
  Referencia?: string;
  Fecha!: Date;
  ID_Cliente!: number;
  TotalImporte!: number;
  EstadoSincro!: string;
  lineas!: Realm.List<LineaVenta>;

  static schema = {
    name: 'NotaVenta',
    primaryKey: 'idLocal',
    properties: {
      idLocal: 'string',
      idVerial: 'int?',
      Referencia: 'string?',
      Fecha: 'date',
      ID_Cliente: 'int', 
      TotalImporte: 'float',
      EstadoSincro: 'string',
      lineas: 'LineaVenta[]',
    },
  };
}

export class Gasto extends Realm.Object {
  idLocal!: string;
  Tipo!: string;
  Importe!: number;
  Fecha!: Date;
  EstadoSincro!: string;

  static schema = {
    name: 'Gasto',
    primaryKey: 'idLocal',
    properties: {
      idLocal: 'string',
      Tipo: 'string',
      Importe: 'float',
      Fecha: 'date',
      EstadoSincro: 'string', 
    },
  };
}

export class StockFurgon extends Realm.Object {
  ID_Articulo!: number;
  UnidadesActuales!: number;
  UltimaActualizacion!: Date;

  static schema = {
    name: 'StockFurgon',
    primaryKey: 'ID_Articulo',
    properties: {
      ID_Articulo: 'int',
      UnidadesActuales: 'float',
      UltimaActualizacion: 'date',
    },
  };
}

// Configuración principal de Realm
export const realmConfig = {
    schema: [Configuracion, Cliente, Articulo, NotaVenta, LineaVenta, Gasto, StockFurgon],
};

// Crear contexto de Realm SOLO si NO estamos en web
let RealmProvider: any;
let useRealm: any;
let useObject: any;
let useQuery: any;

if (Platform.OS !== 'web') {
  const context = createRealmContext(realmConfig);
  RealmProvider = context.RealmProvider;
  useRealm = context.useRealm;
  useObject = context.useObject;
  useQuery = context.useQuery;
} else {
  // Mocks para web
  RealmProvider = ({ children }: any) => children;
  
  useRealm = () => ({
    objects: () => [],
    write: (callback: any) => callback && callback(),
    create: () => {},
    objectForPrimaryKey: () => null,
  });
  
  useQuery = () => {
    const mockArray: any = [];
    mockArray.filtered = () => mockArray;
    mockArray.sorted = () => mockArray;
    mockArray.sum = () => 0;
    return mockArray;
  };
  
  useObject = () => null;
}

export { RealmProvider, useRealm, useObject, useQuery };
