// src/services/Sincronizador.ts

import { Realm } from '@realm/react';
import { postVerialData, fetchVerialData } from './VerialAPI';
import { LineaVenta, NotaVenta } from '../models/Schemas';

/**
 * Convierte una LineaVenta local de Realm a la estructura JSon requerida por Verial.
 * La estructura de línea de contenido es crucial para NuevoDocClienteWS (Página 27).
 */
const mapLineaVentaToVerial = (linea: LineaVenta) => {
    // Referencia a la estructura del Contenido del documento (Pág. 27 del manual)
    return {
        TipoRegistro: 1, // 1-Articulo
        ID_Articulo: linea.ID_Articulo,
        Comentario: null,
        Precio: linea.Precio,
        Dto: linea.Dto,
        DtoPPago: 0.0,
        DtoEurosXUd: 0.0,
        DtoEuros: 0.0,
        Uds: linea.Uds,
        UdsRegalo: 0.0,
        UdsAuxiliares: 0.0,
        ImporteLinea: (linea.Uds * linea.Precio * (1 - linea.Dto / 100)), // Cálculo simplificado local
        Lote: null,
        Caducidad: null,
        ID_Partida: 0,
        PorcentajeIVA: 21.0, // Simplificado, debería tomarse del Articulo local
        PorcentajeRE: 0.0,
        DescripcionAmplia: null,
    };
};

/**
 * Procesa todas las Notas de Venta pendientes y las envía a Verial como Pedidos.
 */
export const sincronizarOperacionesVenta = async (realm: Realm): Promise<number> => {
    // Filtramos todas las notas de venta creadas localmente y que están pendientes.
    const notasPendientes = realm.objects<NotaVenta>('NotaVenta').filtered('EstadoSincro == "PENDIENTE"');
    
    let notasSincronizadas = 0;

    for (const notaLocal of notasPendientes) {
        // 1. Mapeo de la Nota de Venta a la estructura de NuevoDocClienteWS (Pág. 26)
        const ventaBody = {
            // Cabecera del Documento:
            Id: 0, // Crear nuevo documento
            Tipo: 5, // 5-Pedido (Recomendado para la web/app de toma de pedidos)
            Referencia: notaLocal.Referencia, // Referencia generada por la app
            Numero: 0,
            Fecha: notaLocal.Fecha.toISOString().substring(0, 10),
            ID_Cliente: notaLocal.ID_Cliente,
            // Campos obligatorios de la cabecera:
            PreciosImpIncluidos: true,
            BaseImponible: notaLocal.TotalImporte, // Cálculo simplificado local (debería ser sin impuestos)
            TotalImporte: notaLocal.TotalImporte,
            Peso: 0, 
            Bultos: 1,
            TipoPortes: 1, // Portes pagados
            Portes: 0.0,
            
            // Contenido del Documento:
            Contenido: notaLocal.lineas.map(mapLineaVentaToVerial),
            
            // Pagos (Si el vendedor ha cobrado el pedido, si no, este array puede estar vacío o con el método de pago)
            Pagos: [],
            // Se recomienda usar los ID de agente/pago del cliente si no se especifican en la nota
            ID_Agente1: 0, 
            ID_MetodoPago: 0,
        };

        // 2. Llamada a la API de Verial
        const result = await postVerialData<any>('NuevoDocClienteWS', ventaBody);

        // 3. Manejo de la Respuesta y Actualización de Realm
        realm.write(() => {
            if (result.InfoError.Codigo === 0) {
                // Éxito: Verial devuelve el documento completo, incluyendo el ID de Verial.
                // Actualizamos la nota local con el ID asignado por el ERP.
                // result.Id contendría el ID del nuevo documento.
                notaLocal.idVerial = result.Id || -1; 
                notaLocal.EstadoSincro = 'SINCRONIZADO';
                notasSincronizadas++;
                console.log(`Venta sincronizada: ID Verial ${result.Id}`);
            } else {
                // Error: Marcar como error en el registro local
                notaLocal.EstadoSincro = `ERROR: ${result.InfoError.Codigo}`;
                console.error(`Error al subir Venta ${notaLocal.Referencia}: ${result.InfoError.Descripcion}`);
            }
        });
    }

    return notasSincronizadas;
};

/**
 * Sincroniza los clientes desde Verial a la base de datos local.
 */
export const sincronizarClientes = async (realm: Realm): Promise<boolean> => {
    try {
        const result = await fetchVerialData<{ Clientes: any[] }>('GetClientesWS', {});
        
        if (result.InfoError.Codigo === 0 && result.Clientes) {
            realm.write(() => {
                result.Clientes.forEach((clienteVerial: any) => {
                    realm.create(
                        'Cliente',
                        {
                            id: clienteVerial.Id,
                            NIF: clienteVerial.NIF,
                            Nombre: clienteVerial.Nombre,
                            Apellido1: clienteVerial.Apellido1,
                            UltimaSincronizacion: new Date(),
                        },
                        Realm.UpdateMode.Modified
                    );
                });
            });
            return true;
        }
        return false;
    } catch {
        return false;
    }
};

/**
 * Sincroniza los artículos desde Verial a la base de datos local.
 */
export const sincronizarArticulos = async (realm: Realm): Promise<boolean> => {
    try {
        const result = await fetchVerialData<{ Articulos: any[] }>('GetArticulosWS', {});
        
        if (result.InfoError.Codigo === 0 && result.Articulos) {
            realm.write(() => {
                result.Articulos.forEach((articuloVerial: any) => {
                    realm.create(
                        'Articulo',
                        {
                            id: articuloVerial.Id,
                            Nombre: articuloVerial.Nombre,
                            Referencia: articuloVerial.Referencia,
                            PorcentajeIVA: articuloVerial.PorcentajeIVA,
                            Stock: articuloVerial.Stock || 0,
                            PrecioTarifa: articuloVerial.PrecioTarifa || 0,
                            UltimaSincronizacion: new Date(),
                        },
                        Realm.UpdateMode.Modified
                    );
                });
            });
            return true;
        }
        return false;
    } catch {
        return false;
    }
};

// ... Aquí se añadiría la sincronización de Cobros (NuevoPagoWS) y Gastos (si hay un endpoint auxiliar) ...
