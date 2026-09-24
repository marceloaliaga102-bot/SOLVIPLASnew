import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema.ts';

declare global {
  var _postgresPool: Pool | undefined;
}

export const isSqlConfigured = (): boolean => {
  return Boolean(
    process.env.SQL_HOST &&
    process.env.SQL_USER &&
    process.env.SQL_DB_NAME
  );
};

export const createPool = () => {
  if (!isSqlConfigured()) {
    return null;
  }

  if (!global._postgresPool) {
    try {
      global._postgresPool = new Pool({
        host: process.env.SQL_HOST,
        user: process.env.SQL_USER,
        password: process.env.SQL_PASSWORD,
        database: process.env.SQL_DB_NAME,
        port: process.env.SQL_PORT ? parseInt(process.env.SQL_PORT) : 5432,
        max: 10,
        connectionTimeoutMillis: 3000,
      });

      global._postgresPool.on('error', (err) => {
        console.warn('PostgreSQL connection warning:', err.message);
      });
    } catch (e: any) {
      console.warn('Could not initialize PostgreSQL pool:', e?.message);
      return null;
    }
  }
  return global._postgresPool;
};

const pool = createPool();

export const db = pool ? drizzle(pool, { schema }) : null;

