// src/services/VerialAPI.ts

import { BASE_URL, SESION_WCF } from '../config/constants';

// Tipos de respuesta base de Verial
type VerialInfoError = {
    Codigo: number; // 0 = Todo correcto
    Descripcion: string | null;
};
export type VerialResponse<T> = {
    InfoError: VerialInfoError;
} & T;

/**
 * Realiza una petición GET a la API de Verial.
 */
export const fetchVerialData = async <T>(endpoint: string, params: Record<string, any>): Promise<VerialResponse<T>> => {
    const urlParams = new URLSearchParams({ x: String(SESION_WCF), ...params }); // El parámetro 'x' es obligatorio para GET
    const url = `${BASE_URL}${endpoint}?${urlParams.toString()}`;

    try {
        const response = await fetch(url);
        // ... Lógica de manejo de errores HTTP y parseo a JSON
        const data = await response.json();
        return data as VerialResponse<T>;
    } catch {
        // ... Manejo de errores de red
        return { InfoError: { Codigo: -1, Descripcion: "Error de red/servidor." } } as VerialResponse<T>;
    }
};

/**
 * Realiza una petición POST a la API de Verial (cuerpo en formato JSON).
 */
export const postVerialData = async <T>(endpoint: string, body: Record<string, any>): Promise<VerialResponse<T>> => {
    const jsonBody = { sesionwcf: SESION_WCF, ...body }; // 'sesionwcf' es obligatorio para POST
    const url = `${BASE_URL}${endpoint}`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(jsonBody),
        });
        // ... Lógica de manejo de errores HTTP y parseo a JSON
        const data = await response.json();
        return data as VerialResponse<T>;
    } catch {
        // ... Manejo de errores de red
        return { InfoError: { Codigo: -1, Descripcion: "Error de red/servidor." } } as VerialResponse<T>;
    }
};