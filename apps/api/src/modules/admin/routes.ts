import type { FastifyInstance } from 'fastify';
import type { DbPool } from '../../db/pool.js';
import { requireAdmin } from '../../middleware/admin.js';
export async function registerAdminRoutes(app:FastifyInstance,pool:DbPool){
  app.get('/v1/admin/members',{preHandler:requireAdmin},async()=>{
    const {rows}=await pool.query(`select m.id,m.email,m.display_name,m.account_status,m.onboarding_status,m.created_at,
      count(distinct r.business_id)::int as business_count,
      count(distinct e.id)::int as experience_count
      from members m left join member_business_roles r on r.member_id=m.id and r.deleted_at is null
      left join experience_records e on e.member_id=m.id and e.deleted_at is null
      where m.deleted_at is null group by m.id order by m.created_at desc limit 500`);
    return {data:rows};
  });
  app.get('/v1/admin/verification-queue',{preHandler:requireAdmin},async()=>{
    const {rows}=await pool.query(`select r.id,r.member_id,r.business_id,r.role_type,r.verification_status,r.created_at,b.name as business_name,m.email
      from member_business_roles r join businesses b on b.id=r.business_id join members m on m.id=r.member_id
      where r.verification_status='pending_verification' and r.deleted_at is null order by r.created_at asc`);
    return {data:rows};
  });
}
