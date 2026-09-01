import { loadEnv } from './config/env.js';
import { createPool } from './db/pool.js';
import { DevAuthProvider } from './providers/auth/dev-auth.js';
import { JwksAuthProvider } from './providers/auth/jwks-auth.js';
import { DisabledAiProvider } from './providers/ai/ai-provider.js';
import { OpenAiCompatibleProvider } from './providers/ai/openai-compatible.js';
import { buildApp } from './http/app.js';
import { JobWorker } from './workers/job-worker.js';
import { buildHandlers } from './workers/handlers.js';

const env=loadEnv();
const pool=createPool(env);
const auth=env.AUTH_PROVIDER==='supabase'
  ? new JwksAuthProvider(env.AUTH_JWKS_URL!,env.AUTH_ISSUER,env.AUTH_AUDIENCE)
  : new DevAuthProvider(env.AUTH_DEV_USER_ID);
const ai=env.AI_PROVIDER==='openai_compatible' && env.AI_BASE_URL && env.AI_API_KEY && env.AI_MODEL
  ? new OpenAiCompatibleProvider(env.AI_BASE_URL,env.AI_API_KEY,env.AI_MODEL)
  : new DisabledAiProvider();
const app=await buildApp(env,pool,auth,ai);
const worker=new JobWorker(pool,buildHandlers(pool,ai));
worker.run().catch(err=>app.log.error(err));

const shutdown=async()=>{worker.stop();await app.close();await pool.end();process.exit(0);};
process.on('SIGTERM',shutdown);process.on('SIGINT',shutdown);
await app.listen({port:env.PORT,host:'0.0.0.0'});
