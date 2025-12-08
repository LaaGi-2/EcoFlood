/* eslint-disable @typescript-eslint/no-explicit-any */
import { Client, createClient } from '@libsql/client';
import initializedDatabase from './initialize-db';

type Global = typeof globalThis & {
    db: Client,
    dbInitPromis: Promise<void> | null
}

const globalDb = global as Global;

if (!globalDb.db) {
    globalDb.db = createClient({
        url: process.env.TURSO_DATABASE_URL!,
        authToken: process.env.TURSO_AUTH_TOKEN
    });
}

if (!globalDb.dbInitPromis) {
    globalDb.dbInitPromis = initializedDatabase(globalDb.db).then(() => {
        if (process.env.NODE_ENV != "production") {
            (global as any).initializedDatabase = true;
            console.log("Database siap digunakan!");
        }
    }).catch(err => {
        console.log("Error: Database gagal diinisialisasi", err);
    });
}

export const db = globalDb.db;
export const dbInitPromis = globalDb.dbInitPromis;