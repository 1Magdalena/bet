import pg from 'pg';
import type { Env } from '../config/env.js';

const { Pool } = pg;

export function createPool(env: Env) {
  return new Pool({
    connectionString: env.DATABASE_URL,
    max: env.DB_POOL_MAX,
    ssl: env.DATABASE_SSL ? { rejectUnauthorized: true } : undefined,
    application_name: 'bet-api',
  });
}

export type DbPool = ReturnType<typeof createPool>;
