// src/models/Schemas.ts

import { Realm, createRealmContext } from '@realm/react';

// --- Maestros y Configuración ---
export class Configuracion extends Realm.Object { // Para guardar la última fecha de sincronización
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
      id: 'int', // Identificador en Verial
      NIF: 'string?', // NIF/CIF
      Nombre: 'string', // Nombre
      Apellido1: 'string?', // Primer apellido
      // Otros campos...
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
      id: 'int', // Identificador en Verial
      Nombre: 'string', // Nombre del artículo
      Referencia: 'string?', // Código de barras o referencia
      PorcentajeIVA: 'float?', // Porcentaje de IVA
      Stock: 'float', // Stock desde GetStockArticulosWS
      PrecioTarifa: 'float', // Precio desde GetCondicionesTarifaWS
      UltimaSincronizacion: 'date',
    },
  };
}

// --- Transacciones (Operaciones Offline) ---

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
            Uds: 'float', // Unidades
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
      idLocal: 'string', // PK local (UUID)
      idVerial: 'int?', // ID asignado por Verial
      Referencia: 'string?', // Referencia App (se envía a Verial)
      Fecha: 'date',
      ID_Cliente: 'int', 
      TotalImporte: 'float',
      EstadoSincro: 'string', // 'PENDIENTE', 'SINCRONIZADO', 'ERROR'
      lineas: 'LineaVenta[]', // Contenido
    },
  };
}

export class Gasto extends Realm.Object { // Módulo de Gastos del Vendedor
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
      Tipo: 'string', // Comidas, combustible, etc.
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
    primaryKey: 'ID_Articulo', // Asumimos una única entrada por artículo por simplicidad
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

export const { RealmProvider, useRealm, useObject, useQuery } = createRealmContext(realmConfig);