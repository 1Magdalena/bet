import Fastify from 'fastify';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import rateLimit from '@fastify/rate-limit';
import type { Env } from '../config/env.js';
import type { DbPool } from '../db/pool.js';
import type { AuthProvider } from '../providers/auth/auth-provider.js';
import type { AiProvider } from '../providers/ai/ai-provider.js';
import { buildAuthPreHandler } from '../middleware/auth.js';
import { registerHealthRoutes } from '../modules/health/routes.js';
import { registerAuthRoutes } from '../modules/auth/routes.js';
import { registerNoteRoutes } from '../modules/notes/routes.js';
import { registerConversationRoutes } from '../modules/conversations/routes.js';
import { registerProfileRoutes } from '../modules/profile/routes.js';
import { registerBusinessRoutes } from '../modules/businesses/routes.js';
import { registerExperienceRoutes } from '../modules/experiences/routes.js';
import { registerQuestionRoutes } from '../modules/questions/routes.js';
import { registerNotificationRoutes } from '../modules/notifications/routes.js';
import { registerSupportRoutes } from '../modules/support/routes.js';
import { registerAdminRoutes } from '../modules/admin/routes.js';
import { registerAnalyticsRoutes } from '../modules/analytics/routes.js';

export async function buildApp(env:Env,pool:DbPool,authProvider:AuthProvider,ai:AiProvider){
  const app=Fastify({logger:{level:env.LOG_LEVEL},trustProxy:true,bodyLimit:2_000_000,requestIdHeader:'x-request-id'});
  await app.register(helmet,{global:true,contentSecurityPolicy:false});
  await app.register(cors,{origin:env.CORS_ALLOWED_ORIGINS.split(',').map(v=>v.trim()),credentials:true});
  await app.register(rateLimit,{global:true,max:env.RATE_LIMIT_GLOBAL_MAX,timeWindow:env.RATE_LIMIT_GLOBAL_WINDOW_MS});
  app.setErrorHandler((error,request,reply)=>{
    request.log.error({err:error,requestId:request.id},'request failed');
    const statusCode =
      typeof error === 'object' &&
      error !== null &&
      'statusCode' in error &&
      typeof error.statusCode === 'number'
        ? error.statusCode
        : undefined;
    const errorName = error instanceof Error ? error.name : undefined;
    const errorMessage = error instanceof Error ? error.message : 'Request failed';
    const status = statusCode ?? (errorName === 'ZodError' ? 400 : 500);
    reply.code(status).send({error:status===500?'internal_error':errorMessage,requestId:request.id});
  });
  await registerHealthRoutes(app,pool);
  app.addHook('preHandler',async(request)=>{
    if(request.url.startsWith('/health/')) return;
    await buildAuthPreHandler(authProvider)(request);
  });
  await registerAuthRoutes(app,pool);
  await registerBusinessRoutes(app,pool);
  await registerExperienceRoutes(app,pool);
  await registerQuestionRoutes(app,pool);
  await registerNotificationRoutes(app,pool);
  await registerSupportRoutes(app,pool,ai,env.FEATURE_SUPPORT_AI);
  await registerNoteRoutes(app,pool);
  await registerConversationRoutes(app,pool,env.FEATURE_GROUP_DISCUSSIONS);
  await registerProfileRoutes(app,pool);
  await registerAnalyticsRoutes(app,pool);
  await registerAdminRoutes(app,pool);
  return app;
}
