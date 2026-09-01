import type { FastifyInstance } from 'fastify';
import { z } from 'zod';
import type { DbPool } from '../../db/pool.js';

const createQuestion = z.object({ businessId: z.string().uuid(), text: z.string().min(10).max(20000) });

export async function registerQuestionRoutes(app: FastifyInstance, pool: DbPool) {
  app.get('/v1/questions', async (request) => {
    const { rows } = await pool.query(`select id,business_id,question_text,status,match_count,created_at,updated_at from ask_queries where member_id=$1 and deleted_at is null order by created_at desc`, [request.betAuth.userId]);
    return { data: rows };
  });
  app.post('/v1/questions', async (request, reply) => {
    const body = createQuestion.parse(request.body);
    const allowed = await pool.query(`select 1 from member_business_roles where member_id=$1 and business_id=$2 and deleted_at is null`, [request.betAuth.userId, body.businessId]);
    if (!allowed.rowCount) return reply.code(403).send({ error: 'business_access_denied' });
    const { rows } = await pool.query(`insert into ask_queries(member_id,business_id,question_text,status) values($1,$2,$3,'processing') returning id,status,created_at`, [request.betAuth.userId, body.businessId, body.text]);
    await pool.query(`insert into job_queue(job_type,payload,dedupe_key) values('process_ask_query',$1,$2) on conflict(dedupe_key) do nothing`, [JSON.stringify({ queryId: rows[0].id }), `ask:${rows[0].id}`]);
    return reply.code(202).send({ data: rows[0] });
  });
  app.get('/v1/questions/:id', async (request, reply) => {
    const id = (request.params as {id:string}).id;
    const q = await pool.query(`select id,business_id,question_text,status,match_count,created_at,updated_at from ask_queries where id=$1 and member_id=$2 and deleted_at is null`, [id, request.betAuth.userId]);
    if (!q.rowCount) return reply.code(404).send({ error: 'not_found' });
    const matches = await pool.query(`select pm.id,pm.experience_id,pm.why_match,pm.rank_order,pm.created_at from problem_matches pm where pm.query_id=$1 and pm.status='qualified' order by pm.rank_order asc`, [id]);
    return { data: { ...q.rows[0], matches: matches.rows } };
  });
}
