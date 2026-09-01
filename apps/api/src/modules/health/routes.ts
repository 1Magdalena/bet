import type { FastifyInstance } from 'fastify';
import type { DbPool } from '../../db/pool.js';
export async function registerHealthRoutes(app: FastifyInstance, pool: DbPool) {
  app.get('/health/live', async () => ({ ok: true }));
  app.get('/health/ready', async () => {
    await pool.query('select 1');
    return { ok: true, database: 'ok' };
  });
}
