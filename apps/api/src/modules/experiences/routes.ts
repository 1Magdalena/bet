import type { FastifyInstance } from 'fastify';
import { z } from 'zod';
import type { DbPool } from '../../db/pool.js';

const createExperience = z.object({
  businessId: z.string().uuid(),
  sourceText: z.string().min(10).max(50000),
  occurredAt: z.string().datetime().optional(),
  visibility: z.enum(['private','matched_members','shared']).default('matched_members'),
});

export async function registerExperienceRoutes(app: FastifyInstance, pool: DbPool) {
  app.get('/v1/experiences', async (request) => {
    const { rows } = await pool.query(`select er.id, er.business_id, er.status, er.visibility, ev.version_no, ev.source_text, er.created_at
      from experience_records er join experience_versions ev on ev.id=er.active_version_id
      where er.member_id=$1 and er.deleted_at is null order by er.created_at desc`, [request.betAuth.userId]);
    return { data: rows };
  });

  app.post('/v1/experiences', async (request, reply) => {
    const body = createExperience.parse(request.body);
    const allowed = await pool.query(`select 1 from member_business_roles where member_id=$1 and business_id=$2 and deleted_at is null`, [request.betAuth.userId, body.businessId]);
    if (!allowed.rowCount) return reply.code(403).send({ error: 'business_access_denied' });
    const client = await pool.connect();
    try {
      await client.query('begin');
      const record = await client.query(`insert into experience_records(member_id,business_id,status,visibility,occurred_at) values($1,$2,'processing',$3,$4) returning id`, [request.betAuth.userId, body.businessId, body.visibility, body.occurredAt ?? null]);
      const version = await client.query(`insert into experience_versions(experience_id,version_no,source_text,source_kind,provenance,status) values($1,1,$2,'text','member_reported','active') returning id,version_no`, [record.rows[0].id, body.sourceText]);
      await client.query(`update experience_records set active_version_id=$2 where id=$1`, [record.rows[0].id, version.rows[0].id]);
      await client.query(`insert into job_queue(job_type,payload,dedupe_key) values('structure_experience',$1,$2) on conflict(dedupe_key) do nothing`, [JSON.stringify({ experienceId: record.rows[0].id, versionId: version.rows[0].id }), `structure:${version.rows[0].id}`]);
      await client.query('commit');
      return reply.code(201).send({ data: { id: record.rows[0].id, version: 1, status: 'processing' } });
    } catch(e) { await client.query('rollback'); throw e; } finally { client.release(); }
  });
}
