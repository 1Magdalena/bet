import type { FastifyInstance } from 'fastify';
import { z } from 'zod';
import type { DbPool } from '../../db/pool.js';
const note=z.object({body:z.string().min(1).max(50000)});
export async function registerNoteRoutes(app:FastifyInstance,pool:DbPool){
 app.get('/v1/notes',async(request)=>{const {rows}=await pool.query(`select id,body,created_at,updated_at from private_notes where member_id=$1 and deleted_at is null order by updated_at desc`,[request.betAuth.userId]);return {data:rows};});
 app.post('/v1/notes',async(request,reply)=>{const b=note.parse(request.body);const {rows}=await pool.query(`insert into private_notes(member_id,body) values($1,$2) returning id,body,created_at,updated_at`,[request.betAuth.userId,b.body]);return reply.code(201).send({data:rows[0]});});
 app.patch('/v1/notes/:id',async(request,reply)=>{const b=note.parse(request.body),id=(request.params as any).id;const {rows}=await pool.query(`update private_notes set body=$3,updated_at=now() where id=$1 and member_id=$2 and deleted_at is null returning id,body,updated_at`,[id,request.betAuth.userId,b.body]);if(!rows[0])return reply.code(404).send({error:'not_found'});return {data:rows[0]};});
 app.delete('/v1/notes/:id',async(request,reply)=>{const id=(request.params as any).id;const r=await pool.query(`update private_notes set deleted_at=now() where id=$1 and member_id=$2 and deleted_at is null`,[id,request.betAuth.userId]);return reply.code(r.rowCount?204:404).send();});
}
