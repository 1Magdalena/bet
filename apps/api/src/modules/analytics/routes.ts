import type { FastifyInstance } from 'fastify';
import type { DbPool } from '../../db/pool.js';
import { z } from 'zod';

const Consent=z.object({productAnalytics:z.boolean(),analytics:z.boolean().default(false),marketing:z.boolean().default(false),policyVersion:z.string().min(1).max(50)});
const Event=z.object({sessionId:z.string().uuid().optional(),eventName:z.string().min(1).max(80),module:z.string().max(80).optional(),objectType:z.string().max(80).optional(),objectId:z.string().uuid().optional(),metadata:z.record(z.unknown()).optional()});
const Heartbeat=z.object({sessionId:z.string().uuid(),activeSeconds:z.number().int().min(0).max(300),module:z.string().max(80).optional()});

async function analyticsAllowed(pool:DbPool,memberId:string){
  const {rows}=await pool.query(`select product_analytics from consent_preferences where member_id=$1`,[memberId]);
  return rows[0]?.product_analytics===true;
}

export async function registerAnalyticsRoutes(app:FastifyInstance,pool:DbPool){
  app.get('/v1/me/consent',async(request)=>{
    const {rows}=await pool.query(`select necessary,product_analytics,analytics,marketing,policy_version,updated_at from consent_preferences where member_id=$1`,[request.betAuth.userId]);
    return {data:rows[0]??{necessary:true,product_analytics:false,analytics:false,marketing:false,policy_version:null}};
  });
  app.put('/v1/me/consent',async(request)=>{
    const b=Consent.parse(request.body);
    const {rows}=await pool.query(`insert into consent_preferences(member_id,necessary,product_analytics,analytics,marketing,policy_version,source)
      values($1,true,$2,$3,$4,$5,'member_preferences')
      on conflict(member_id) where member_id is not null do update set necessary=true,product_analytics=excluded.product_analytics,analytics=excluded.analytics,marketing=excluded.marketing,policy_version=excluded.policy_version,source=excluded.source,updated_at=now()
      returning necessary,product_analytics,analytics,marketing,policy_version,updated_at`,[request.betAuth.userId,b.productAnalytics,b.analytics,b.marketing,b.policyVersion]);
    if(!b.productAnalytics) await pool.query(`update member_sessions set ended_at=coalesce(ended_at,now()) where member_id=$1 and ended_at is null`,[request.betAuth.userId]);
    return {data:rows[0]};
  });
  app.post('/v1/activity/session',async(request,reply)=>{
    const memberId=request.betAuth.userId;
    if(!await analyticsAllowed(pool,memberId)) return reply.code(204).send();
    const {rows}=await pool.query(`insert into member_sessions(member_id,consented_product_analytics) values($1,true) returning id,started_at`,[memberId]);
    await pool.query(`insert into member_activity_daily(member_id,activity_date,session_count,active_seconds,event_count,first_active_at,last_active_at) values($1,current_date,1,0,0,now(),now()) on conflict(member_id,activity_date) do update set session_count=member_activity_daily.session_count+1,last_active_at=now(),first_active_at=coalesce(member_activity_daily.first_active_at,now())`,[memberId]);
    return {data:rows[0]};
  });
  app.post('/v1/activity/event',async(request,reply)=>{
    const b=Event.parse(request.body); const memberId=request.betAuth.userId;
    if(!await analyticsAllowed(pool,memberId)) return reply.code(204).send();
    await pool.query(`insert into product_activity_events(member_id,session_id,event_name,module,object_type,object_id,metadata) values($1,$2,$3,$4,$5,$6,$7)`,[memberId,b.sessionId??null,b.eventName,b.module??null,b.objectType??null,b.objectId??null,b.metadata??{}]);
    await pool.query(`insert into member_activity_daily(member_id,activity_date,session_count,active_seconds,event_count,first_active_at,last_active_at) values($1,current_date,0,0,1,now(),now()) on conflict(member_id,activity_date) do update set event_count=member_activity_daily.event_count+1,last_active_at=now()`,[memberId]);
    reply.code(204).send();
  });
  app.post('/v1/activity/heartbeat',async(request,reply)=>{
    const b=Heartbeat.parse(request.body); const memberId=request.betAuth.userId;
    if(!await analyticsAllowed(pool,memberId)) return reply.code(204).send();
    const updated=await pool.query(`update member_sessions set last_activity_at=now(),active_seconds=active_seconds+$1,last_module=coalesce($2,last_module) where id=$3 and member_id=$4 and consented_product_analytics=true and ended_at is null returning id`,[b.activeSeconds,b.module??null,b.sessionId,memberId]);
    if(updated.rowCount) await pool.query(`insert into member_activity_daily(member_id,activity_date,session_count,active_seconds,event_count,first_active_at,last_active_at) values($1,current_date,0,$2,0,now(),now()) on conflict(member_id,activity_date) do update set active_seconds=member_activity_daily.active_seconds+excluded.active_seconds,last_active_at=now()`,[memberId,b.activeSeconds]);
    reply.code(204).send();
  });
}
