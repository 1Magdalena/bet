import type { FastifyInstance } from 'fastify';
import type { DbPool } from '../../db/pool.js';
export async function registerNotificationRoutes(app: FastifyInstance, pool: DbPool) {
  app.get('/v1/notifications', async (request) => {
    const { rows } = await pool.query(`select id,type,title,body,deep_link,read_at,created_at from notifications where member_id=$1 order by created_at desc limit 100`, [request.betAuth.userId]);
    return { data: rows };
  });
  app.post('/v1/notifications/:id/read', async (request, reply) => {
    const id=(request.params as {id:string}).id;
    const result=await pool.query(`update notifications set read_at=coalesce(read_at,now()) where id=$1 and member_id=$2 returning id,read_at`,[id,request.betAuth.userId]);
    if(!result.rowCount) return reply.code(404).send({error:'not_found'});
    return {data:result.rows[0]};
  });
}
