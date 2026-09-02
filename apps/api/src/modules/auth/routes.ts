import type { FastifyInstance } from 'fastify';
import { z } from 'zod';
import type { DbPool } from '../../db/pool.js';

const consentBody=z.object({displayName:z.string().min(1).max(120).optional(),termsVersion:z.string().min(1).max(50),privacyVersion:z.string().min(1).max(50),signupCountryCode:z.string().length(2).regex(/^[A-Za-z]{2}$/).optional(),acquisitionSource:z.string().max(120).optional(),acquisitionCampaign:z.string().max(120).optional()});

export async function registerAuthRoutes(app:FastifyInstance,pool:DbPool){
  app.post('/v1/auth/sync',async(request,reply)=>{
    const body=consentBody.parse(request.body);
    const email=request.betAuth.email;
    if(!email) return reply.code(400).send({error:'authenticated_email_required'});
    const {rows}=await pool.query(`insert into members(id,auth_subject,email,display_name,account_status,onboarding_status,is_admin,terms_version,terms_accepted_at,privacy_version,privacy_accepted_at,signup_country_code,signup_country_source,acquisition_source,acquisition_campaign)
      values($1,$1,$2,$3,'active','not_started',$4,$5,now(),$6,now(),upper($7),'member_reported',$8,$9)
      on conflict(id) do update set email=excluded.email,display_name=coalesce(excluded.display_name,members.display_name),terms_version=excluded.terms_version,terms_accepted_at=excluded.terms_accepted_at,privacy_version=excluded.privacy_version,privacy_accepted_at=excluded.privacy_accepted_at,signup_country_code=coalesce(members.signup_country_code,excluded.signup_country_code),signup_country_source=coalesce(members.signup_country_source,excluded.signup_country_source),acquisition_source=coalesce(members.acquisition_source,excluded.acquisition_source),acquisition_campaign=coalesce(members.acquisition_campaign,excluded.acquisition_campaign),updated_at=now()
      returning id,email,display_name,account_status,onboarding_status,is_admin,created_at`,[request.betAuth.userId,email,body.displayName??null,request.betAuth.role==='admin',body.termsVersion,body.privacyVersion,body.signupCountryCode??null,body.acquisitionSource??null,body.acquisitionCampaign??null]);
    await pool.query(`insert into notification_preferences(member_id) values($1) on conflict(member_id) do nothing`,[request.betAuth.userId]);
    await pool.query(`insert into subscriptions(member_id,plan_id,status) values($1,'launch_full_access','none') on conflict(member_id) do nothing`,[request.betAuth.userId]);
    await pool.query(`insert into entitlement_grants(member_id,entitlement_key,source)
      select $1,e.key,'launch_full_access' from entitlements e on conflict do nothing`,[request.betAuth.userId]);
    return {data:rows[0]};
  });
  app.get('/v1/me',async(request,reply)=>{
    const {rows}=await pool.query(`select id,email,display_name,account_status,onboarding_status,lifecycle_state,is_admin,created_at from members where id=$1 and deleted_at is null`,[request.betAuth.userId]);
    if(!rows[0]) return reply.code(404).send({error:'member_not_synced'});
    return {data:rows[0]};
  });
  app.post('/v1/me/onboarding',async(request)=>{
    const body=z.object({status:z.enum(['in_progress','completed','skipped'])}).parse(request.body);
    const {rows}=await pool.query(`update members set onboarding_status=$2 where id=$1 returning onboarding_status`,[request.betAuth.userId,body.status]);
    return {data:rows[0]};
  });
}
