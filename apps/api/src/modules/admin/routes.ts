import type { FastifyInstance, FastifyRequest } from 'fastify';
import type { DbPool } from '../../db/pool.js';
import { requireAdmin } from '../../middleware/admin.js';
import { z } from 'zod';

const Range=z.object({from:z.string().date().optional(),to:z.string().date().optional()});
function dates(q:unknown){const p=Range.parse(q);return {from:p.from??new Date(Date.now()-29*86400000).toISOString().slice(0,10),to:p.to??new Date().toISOString().slice(0,10)};}
async function audit(pool:DbPool,request:FastifyRequest,action:string,targetType?:string,targetId?:string){
  await pool.query(`insert into admin_access_events(admin_member_id,action,target_type,target_id,request_id) values ($1,$2,$3,$4,$5)`,[request.betAuth.userId,action,targetType??null,targetId??null,request.id]);
}
export async function registerAdminRoutes(app:FastifyInstance,pool:DbPool){
  app.get('/v1/admin/overview',{preHandler:requireAdmin},async(request)=>{
    const {from,to}=dates(request.query); await audit(pool,request,'owner_overview_read');
    const {rows}=await pool.query(`select
      (select count(*)::int from members where deleted_at is null) total_members,
      (select count(*)::int from members where deleted_at is null and created_at >= $1::date and created_at < $2::date + interval '1 day') new_members,
      (select count(distinct member_id)::int from member_activity_daily where activity_date between $1::date and $2::date) active_members,
      (select coalesce(sum(session_count),0)::int from member_activity_daily where activity_date between $1::date and $2::date) sessions,
      (select coalesce(sum(active_seconds),0)::bigint from member_activity_daily where activity_date between $1::date and $2::date) active_seconds,
      (select count(*)::int from businesses where deleted_at is null) businesses,
      (select count(*)::int from experience_records where deleted_at is null and created_at >= $1::date and created_at < $2::date + interval '1 day') experiences_created,
      (select count(*)::int from ask_queries where deleted_at is null and created_at >= $1::date and created_at < $2::date + interval '1 day') questions_created,
      (select count(*)::int from problem_matches where status='qualified' and created_at >= $1::date and created_at < $2::date + interval '1 day') qualified_matches,
      (select count(*)::int from ask_queries where deleted_at is null and status in ('no_match','researching')) zero_match_or_researching,
      (select count(*)::int from subscriptions where status='active') active_subscriptions`,[from,to]);
    return {range:{from,to},data:rows[0]};
  });
  app.get('/v1/admin/metrics',{preHandler:requireAdmin},async(request)=>{
    const {from,to}=dates(request.query); await audit(pool,request,'owner_metrics_read');
    const {rows}=await pool.query(`select metric_date,metric_key,dimension_key,dimension_value,metric_value from owner_metric_daily where metric_date between $1::date and $2::date order by metric_date,metric_key`,[from,to]);
    return {range:{from,to},data:rows};
  });
  app.get('/v1/admin/filter-options',{preHandler:requireAdmin},async(request)=>{
    await audit(pool,request,'owner_filter_options_read');
    const countries=await pool.query(`select signup_country_code value,count(*)::int count from members where deleted_at is null and signup_country_code is not null group by signup_country_code order by count desc,value`);
    const businessCountries=await pool.query(`select country_code value,count(*)::int count from businesses where deleted_at is null and country_code is not null group by country_code order by count desc,value`);
    const plans=await pool.query(`select coalesce(plan_id,'none') value,count(*)::int count from subscriptions group by coalesce(plan_id,'none') order by count desc,value`);
    const acquisitionSources=await pool.query(`select acquisition_source value,count(*)::int count from members where deleted_at is null and acquisition_source is not null group by acquisition_source order by count desc,value`);
    return {data:{countries:countries.rows,businessCountries:businessCountries.rows,plans:plans.rows,acquisitionSources:acquisitionSources.rows}};
  });
  app.get('/v1/admin/members',{preHandler:requireAdmin},async(request)=>{
    const Filter=z.object({
      from:z.string().date().optional(),to:z.string().date().optional(),country:z.string().length(2).optional(),
      paymentStatus:z.enum(['all','paid','free','trial','past_due','cancelled']).default('all'),plan:z.string().max(80).optional(),
      accountStatus:z.enum(['pending','active','hibernated','suspended','deletion_requested','deleted']).optional(),
      verificationStatus:z.enum(['pending_verification','verified','verification_issue','rejected']).optional(),
      activity:z.enum(['all','today','7d','30d','inactive30d']).default('all'),businessCountry:z.string().length(2).optional(),
      businessStatus:z.enum(['current','former','sold','closed']).optional(),acquisitionSource:z.string().max(120).optional(),
      sort:z.enum(['joined','country','payment','last_active','sessions','active_time','experiences','questions']).default('joined'),
      order:z.enum(['asc','desc']).default('desc')
    }).parse(request.query);
    await audit(pool,request,'member_directory_read');
    const where:string[]=['m.deleted_at is null']; const values:unknown[]=[];
    const add=(sql:string,value:unknown)=>{values.push(value);where.push(sql.replace('?',`$${values.length}`));};
    if(Filter.from)add('m.created_at >= ?::date',Filter.from);
    if(Filter.to)add("m.created_at < ?::date + interval '1 day'",Filter.to);
    if(Filter.country)add('m.signup_country_code = upper(?)',Filter.country);
    if(Filter.plan)add('s.plan_id = ?',Filter.plan);
    if(Filter.accountStatus)add('m.account_status::text = ?',Filter.accountStatus);
    if(Filter.verificationStatus)add('exists (select 1 from member_business_roles vr where vr.member_id=m.id and vr.deleted_at is null and vr.verification_status::text = ?)',Filter.verificationStatus);
    if(Filter.businessCountry)add('exists (select 1 from member_business_roles br join businesses bb on bb.id=br.business_id where br.member_id=m.id and br.deleted_at is null and bb.deleted_at is null and bb.country_code = upper(?))',Filter.businessCountry);
    if(Filter.businessStatus)add('exists (select 1 from member_business_roles br join businesses bb on bb.id=br.business_id where br.member_id=m.id and br.deleted_at is null and bb.deleted_at is null and bb.status = ?)',Filter.businessStatus);
    if(Filter.acquisitionSource)add('m.acquisition_source = ?',Filter.acquisitionSource);
    if(Filter.paymentStatus==='paid')where.push("s.status='active'");
    if(Filter.paymentStatus==='free')where.push("coalesce(s.status::text,'none')='none'");
    if(Filter.paymentStatus==='trial')where.push("s.status='trial'");
    if(Filter.paymentStatus==='past_due')where.push("s.status='past_due'");
    if(Filter.paymentStatus==='cancelled')where.push("s.status='cancelled'");
    if(Filter.activity==='today')where.push('u.last_active_at >= current_date');
    if(Filter.activity==='7d')where.push("u.last_active_at >= current_date - interval '6 days'");
    if(Filter.activity==='30d')where.push("u.last_active_at >= current_date - interval '29 days'");
    if(Filter.activity==='inactive30d')where.push("(u.last_active_at is null or u.last_active_at < current_date - interval '29 days')");
    const sortMap:Record<string,string>={joined:'m.created_at',country:'m.signup_country_code',payment:'subscription_status',last_active:'u.last_active_at',sessions:'u.sessions_30d',active_time:'u.active_seconds_30d',experiences:'x.experience_count',questions:'q.question_count'};
    const sql=`select m.id,m.email,m.display_name,m.account_status,m.onboarding_status,m.created_at,m.signup_country_code,m.acquisition_source,m.acquisition_campaign,
      coalesce(s.status::text,'none') subscription_status,s.plan_id,
      coalesce(b.business_count,0)::int business_count,b.primary_business,b.primary_business_country,
      coalesce(x.experience_count,0)::int experience_count,coalesce(q.question_count,0)::int question_count,coalesce(q.qualified_match_count,0)::int qualified_match_count,
      coalesce(c.conversation_count,0)::int conversation_count,u.last_active_at,coalesce(u.active_days_30d,0)::int active_days_30d,
      coalesce(u.sessions_30d,0)::int sessions_30d,coalesce(u.active_seconds_30d,0)::bigint active_seconds_30d
      from members m
      left join subscriptions s on s.member_id=m.id
      left join lateral (select count(*)::int business_count,min(bb.name) primary_business,min(bb.country_code) primary_business_country from member_business_roles br join businesses bb on bb.id=br.business_id and bb.deleted_at is null where br.member_id=m.id and br.deleted_at is null) b on true
      left join lateral (select count(*)::int experience_count from experience_records e where e.member_id=m.id and e.deleted_at is null) x on true
      left join lateral (select count(distinct aq.id)::int question_count,count(distinct pm.id) filter(where pm.status='qualified')::int qualified_match_count from ask_queries aq left join problem_matches pm on pm.query_id=aq.id where aq.member_id=m.id and aq.deleted_at is null) q on true
      left join lateral (select count(distinct cp.conversation_id)::int conversation_count from conversation_participants cp where cp.member_id=m.id) c on true
      left join lateral (select count(*)::int active_days_30d,coalesce(sum(d.session_count),0)::int sessions_30d,coalesce(sum(d.active_seconds),0)::bigint active_seconds_30d,max(d.last_active_at) last_active_at from member_activity_daily d where d.member_id=m.id and d.activity_date >= current_date-29) u on true
      where ${where.join(' and ')} order by ${sortMap[Filter.sort]} ${Filter.order} nulls last limit 500`;
    const {rows}=await pool.query(sql,values);
    return {filters:Filter,data:rows};
  });
  app.get('/v1/admin/members/:memberId',{preHandler:requireAdmin},async(request)=>{
    const {memberId}=z.object({memberId:z.string().uuid()}).parse(request.params); await audit(pool,request,'member_detail_read','member',memberId);
    const member=await pool.query(`select id,email,display_name,account_status,onboarding_status,locale,timezone,signup_country_code,signup_country_source,acquisition_source,acquisition_campaign,created_at from members where id=$1 and deleted_at is null`,[memberId]);
    const businesses=await pool.query(`select b.id,b.name,b.country_code,b.status,r.role_type,r.verification_status from member_business_roles r join businesses b on b.id=r.business_id where r.member_id=$1 and r.deleted_at is null`,[memberId]);
    const usage=await pool.query(`select count(*)::int active_days,coalesce(sum(session_count),0)::int sessions,coalesce(sum(active_seconds),0)::bigint active_seconds,max(last_active_at) last_active_at from member_activity_daily where member_id=$1`,[memberId]);
    const counts=await pool.query(`select (select count(*) from experience_records where member_id=$1 and deleted_at is null)::int experiences,(select count(*) from ask_queries where member_id=$1 and deleted_at is null)::int questions`,[memberId]);
    return {data:{member:member.rows[0]??null,businesses:businesses.rows,usage:usage.rows[0],counts:counts.rows[0]}};
  });
  app.get('/v1/admin/billing-summary',{preHandler:requireAdmin},async(request)=>{
    const {from,to}=dates(request.query); await audit(pool,request,'billing_summary_read');
    const {rows}=await pool.query(`select count(*) filter(where status in ('succeeded','partially_refunded','refunded'))::int successful_payments,
      coalesce(sum(gross_amount_minor),0)::bigint gross_amount_minor,coalesce(sum(refund_amount_minor),0)::bigint refunds_minor,
      coalesce(sum(fee_amount_minor),0)::bigint fees_minor,coalesce(sum(net_amount_minor),0)::bigint net_amount_minor,
      min(currency) filter(where status in ('succeeded','partially_refunded','refunded')) currency
      from billing_transactions where paid_at >= $1::date and paid_at < $2::date + interval '1 day'`,[from,to]);
    return {range:{from,to},data:rows[0]};
  });

  app.get('/v1/admin/data-summary',{preHandler:requireAdmin},async(request)=>{
    const {from,to}=dates(request.query); await audit(pool,request,'data_summary_read');
    const {rows}=await pool.query(`select
      (select count(*)::int from experience_records where deleted_at is null) experiences_total,
      (select count(*)::int from outcome_observations where deleted_at is null) outcomes_total,
      (select count(*)::int from ask_queries where deleted_at is null) questions_total,
      (select count(*)::int from problem_matches where status='qualified') qualified_matches_total,
      (select count(*)::int from live_research_requests where status not in ('closed','cancelled')) live_research_open,
      (select count(*)::int from support_tickets where status not in ('resolved','closed')) support_open,
      (select count(*)::int from verification_cases where status='pending_verification') verification_pending,
      (select count(*)::int from job_queue where status='dead') dead_jobs,
      (select count(*)::int from security_events where created_at >= $1::date and created_at < $2::date + interval '1 day') security_events_period`,[from,to]);
    return {range:{from,to},data:rows[0]};
  });

  app.get('/v1/admin/verification-queue',{preHandler:requireAdmin},async(request)=>{
    await audit(pool,request,'verification_queue_read');
    const {rows}=await pool.query(`select r.id,r.member_id,r.business_id,r.role_type,r.verification_status,r.created_at,b.name as business_name,m.email from member_business_roles r join businesses b on b.id=r.business_id join members m on m.id=r.member_id where r.verification_status='pending_verification' and r.deleted_at is null order by r.created_at asc`); return {data:rows};
  });
}
