import type { DbPool } from '../db/pool.js';
import type { AiProvider } from '../providers/ai/ai-provider.js';

export function buildHandlers(pool:DbPool,ai:AiProvider){
  return {
    async structure_experience(job:{payload:Record<string,unknown>}){
      const experienceId=String(job.payload.experienceId);
      const versionId=String(job.payload.versionId);
      const {rows}=await pool.query(`select source_text from experience_versions where id=$1 and experience_id=$2`,[versionId,experienceId]);
      if(!rows[0]) throw new Error('Experience version not found');
      // Structuring is deliberately conservative. If AI is disabled, the source remains valid but unstructured.
      let structured:any={source_text:rows[0].source_text,quality_status:'source_only'};
      try{
        const raw=await ai.complete([{role:'system',content:'Return strict JSON only. Faithfully extract business context, situation, decision, action, result, later_outcome and concrete_metrics. Use null for unknown. Do not infer success or invent numbers.'},{role:'user',content:rows[0].source_text}],{maxOutputTokens:1000,temperature:0});
        structured=JSON.parse(raw);
      }catch{}
      await pool.query(`update experience_versions set structured_json=$2,structured_at=now() where id=$1`,[versionId,structured]);
      await pool.query(`update experience_records set status='active',updated_at=now() where id=$1`,[experienceId]);
    },
    async process_ask_query(job:{payload:Record<string,unknown>}){
      const queryId=String(job.payload.queryId);
      const q=await pool.query(`select id,member_id,business_id,question_text from ask_queries where id=$1`,[queryId]);
      if(!q.rows[0]) throw new Error('Query not found');
      // Portable baseline retrieval: PostgreSQL full-text. Vector/reranker is an additive projection layer.
      const candidates=await pool.query(`
        select er.id as experience_id, ev.source_text,
          ts_rank_cd(to_tsvector('simple',coalesce(ev.source_text,'')), plainto_tsquery('simple',$2)) as score
        from experience_records er join experience_versions ev on ev.id=er.active_version_id
        where er.status='active' and er.deleted_at is null and er.member_id<>$1
          and to_tsvector('simple',coalesce(ev.source_text,'')) @@ plainto_tsquery('simple',$2)
        order by score desc limit 30`,[q.rows[0].member_id,q.rows[0].question_text]);
      const qualified=candidates.rows.filter((r:any)=>Number(r.score)>=0.03).slice(0,8);
      await pool.query(`delete from problem_matches where query_id=$1`,[queryId]);
      for(let i=0;i<qualified.length;i++){
        const c=qualified[i];
        await pool.query(`insert into problem_matches(query_id,experience_id,status,internal_score,rank_order,why_match) values($1,$2,'qualified',$3,$4,$5)`,[queryId,c.experience_id,c.score,i+1,'Relevant source language overlaps with the concrete problem. Production reranking must add Business/Decision DNA before public beta.']);
      }
      await pool.query(`update ask_queries set status=$2,match_count=$3,updated_at=now() where id=$1`,[queryId,qualified.length?'matched':'no_match',qualified.length]);
      if(qualified.length){
        await pool.query(`insert into notifications(member_id,type,title,body,deep_link) values($1,'new_match','New matches for your question',$2,$3)`,[q.rows[0].member_id,`${qualified.length} qualified match${qualified.length===1?'':'es'} found.`,`/questions/${queryId}`]);
      }
    }
  };
}
