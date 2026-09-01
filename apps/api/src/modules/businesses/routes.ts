import type { FastifyInstance } from 'fastify';
import { z } from 'zod';
import type { DbPool } from '../../db/pool.js';

const createBusiness = z.object({ name: z.string().min(1).max(200), countryCode: z.string().length(2).optional() });

export async function registerBusinessRoutes(app: FastifyInstance, pool: DbPool) {
  app.get('/v1/businesses', async (request) => {
    const { rows } = await pool.query(`
      select b.id, b.name, b.country_code, r.role_type, r.verification_status
      from businesses b
      join member_business_roles r on r.business_id=b.id
      where r.member_id=$1 and r.deleted_at is null and b.deleted_at is null
      order by b.created_at asc`, [request.betAuth.userId]);
    return { data: rows };
  });

  app.post('/v1/businesses', async (request, reply) => {
    const body = createBusiness.parse(request.body);
    const client = await pool.connect();
    try {
      await client.query('begin');
      const business = await client.query(`insert into businesses(name,country_code) values($1,$2) returning id,name,country_code,created_at`, [body.name, body.countryCode ?? null]);
      await client.query(`insert into member_business_roles(member_id,business_id,role_type,verification_status) values($1,$2,'owner','pending_verification')`, [request.betAuth.userId, business.rows[0].id]);
      await client.query('commit');
      return reply.code(201).send({ data: business.rows[0] });
    } catch (e) {
      await client.query('rollback'); throw e;
    } finally { client.release(); }
  });
}
