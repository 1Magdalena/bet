import type { FastifyInstance } from 'fastify';
import { z } from 'zod';
import type { DbPool } from '../../db/pool.js';
import type { AiProvider } from '../../providers/ai/ai-provider.js';

const supportBody=z.object({message:z.string().min(2).max(5000)});
const businessIntent=/\b(should i|pricing|raise prices|hire|expand|sales strategy|marketing strategy|enter market|what should we do)\b/i;

export async function registerSupportRoutes(app:FastifyInstance,pool:DbPool,ai:AiProvider,enabled:boolean){
  app.post('/v1/support/chat',async(request,reply)=>{
    const body=supportBody.parse(request.body);
    if(businessIntent.test(body.message)) return {data:{kind:'redirect_to_ask_bet',message:'This looks like a business question. Please use Ask BET for business intelligence.'}};
    if(!enabled) return {data:{kind:'help',message:'Support AI is not enabled yet. You can use Help or send this issue to human support.'}};
    const answer=await ai.complete([
      {role:'system',content:'You are BET Technical Support. Answer only questions about using BET, account access, navigation, technical errors, privacy controls, uploads, notifications and product operation. Never answer business strategy questions and never access or claim access to the Experience Graph. If uncertain, say you cannot resolve it and advise human escalation. Keep answers concise.'},
      {role:'user',content:body.message}
    ],{maxOutputTokens:500,temperature:0.1});
    return {data:{kind:'answer',message:answer}};
  });
  app.post('/v1/support/escalate',async(request,reply)=>{
    const body=supportBody.extend({page:z.string().max(500).optional(),errorCode:z.string().max(100).optional()}).parse(request.body);
    const {rows}=await pool.query(`insert into support_tickets(member_id,message,page,error_code,status) values($1,$2,$3,$4,'open') returning id,status,created_at`,[request.betAuth.userId,body.message,body.page??null,body.errorCode??null]);
    return reply.code(201).send({data:rows[0]});
  });
}
