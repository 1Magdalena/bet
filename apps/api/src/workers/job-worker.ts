import type { DbPool } from '../db/pool.js';

type Job={id:string;job_type:string;payload:Record<string,unknown>;attempts:number};

export class JobWorker {
  private stopped=false;
  constructor(private readonly pool:DbPool,private readonly handlers:Record<string,(job:Job)=>Promise<void>>){}
  stop(){this.stopped=true;}
  async run(){
    while(!this.stopped){
      const job=await this.claim();
      if(!job){await new Promise(r=>setTimeout(r,750));continue;}
      try{await this.handlers[job.job_type]?.(job);await this.complete(job.id);}catch(error){await this.fail(job.id,error);}
    }
  }
  private async claim():Promise<Job|null>{
    const client=await this.pool.connect();
    try{await client.query('begin');
      const {rows}=await client.query(`select id,job_type,payload,attempts from job_queue where status='queued' and run_after<=now() order by created_at asc for update skip locked limit 1`);
      if(!rows[0]){await client.query('commit');return null;}
      await client.query(`update job_queue set status='running',locked_at=now(),attempts=attempts+1 where id=$1`,[rows[0].id]);
      await client.query('commit');return rows[0] as Job;
    }catch(e){await client.query('rollback');throw e;}finally{client.release();}
  }
  private async complete(id:string){await this.pool.query(`update job_queue set status='done',finished_at=now() where id=$1`,[id]);}
  private async fail(id:string,error:unknown){
    const message=error instanceof Error?error.message:String(error);
    await this.pool.query(`update job_queue set status=case when attempts>=5 then 'dead' else 'queued' end,last_error=$2,run_after=now()+((greatest(attempts,1)*30)||' seconds')::interval where id=$1`,[id,message.slice(0,2000)]);
  }
}
