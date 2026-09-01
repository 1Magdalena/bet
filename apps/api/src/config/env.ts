import { z } from 'zod';

const boolFromString = z.string().optional().transform((v) => v === 'true');
const intFromString = (fallback: number) => z.string().optional().transform((v) => v ? Number(v) : fallback);

const schema = z.object({
  NODE_ENV: z.enum(['development','test','production']).default('development'),
  PORT: intFromString(8787),
  APP_BASE_URL: z.string().url().default('http://localhost:8888'),
  API_BASE_URL: z.string().url().default('http://localhost:8787'),
  LOG_LEVEL: z.string().default('info'),
  DATABASE_URL: z.string().min(1),
  DATABASE_SSL: boolFromString,
  DB_POOL_MAX: intFromString(10),
  AUTH_PROVIDER: z.enum(['dev','supabase']).default('dev'),
  AUTH_JWKS_URL: z.string().optional(),
  AUTH_ISSUER: z.string().optional(),
  AUTH_AUDIENCE: z.string().default('authenticated'),
  AUTH_DEV_USER_ID: z.string().uuid().default('00000000-0000-4000-8000-000000000001'),
  AI_PROVIDER: z.enum(['disabled','openai_compatible']).default('disabled'),
  AI_API_KEY: z.string().optional(),
  AI_MODEL: z.string().optional(),
  AI_BASE_URL: z.string().optional(),
  TRANSCRIPTION_PROVIDER: z.enum(['disabled','openai_compatible']).default('disabled'),
  TRANSCRIPTION_API_KEY: z.string().optional(),
  TRANSCRIPTION_MODEL: z.string().optional(),
  TRANSCRIPTION_BASE_URL: z.string().optional(),
  STORAGE_PROVIDER: z.enum(['local','supabase']).default('local'),
  LOCAL_STORAGE_DIR: z.string().default('.tmp/storage'),
  SUPABASE_URL: z.string().optional(),
  SUPABASE_SERVICE_ROLE_KEY: z.string().optional(),
  SUPABASE_STORAGE_BUCKET: z.string().default('bet-private-media'),
  EMAIL_PROVIDER: z.enum(['console','smtp']).default('console'),
  SMTP_HOST: z.string().optional(),
  SMTP_PORT: intFromString(587),
  SMTP_SECURE: boolFromString,
  SMTP_USER: z.string().optional(),
  SMTP_PASSWORD: z.string().optional(),
  EMAIL_FROM: z.string().default('BET <support@example.com>'),
  OWNER_SUPPORT_EMAIL: z.string().email().optional(),
  CORS_ALLOWED_ORIGINS: z.string().default('http://localhost:8888'),
  RATE_LIMIT_GLOBAL_MAX: intFromString(300),
  RATE_LIMIT_GLOBAL_WINDOW_MS: intFromString(60000),
  RATE_LIMIT_AUTH_MAX: intFromString(20),
  RATE_LIMIT_AI_MAX: intFromString(30),
  SESSION_IP_HASH_SECRET: z.string().min(8),
  FEATURE_SUPPORT_AI: boolFromString,
  FEATURE_LIVE_RESEARCH: boolFromString,
  FEATURE_EMAIL_NOTIFICATIONS: boolFromString,
  FEATURE_PAYMENT_SAFETY_MESSAGING: boolFromString,
  FEATURE_GROUP_DISCUSSIONS: boolFromString,
});

export type Env = z.infer<typeof schema>;

export function loadEnv(input: NodeJS.ProcessEnv = process.env): Env {
  const parsed = schema.safeParse(input);
  if (!parsed.success) {
    throw new Error(`Invalid environment configuration: ${parsed.error.message}`);
  }
  const env = parsed.data;
  if (env.NODE_ENV === 'production' && env.AUTH_PROVIDER === 'dev') {
    throw new Error('AUTH_PROVIDER=dev is forbidden in production');
  }
  if (env.AUTH_PROVIDER === 'supabase' && !env.AUTH_JWKS_URL) {
    throw new Error('AUTH_JWKS_URL is required for Supabase auth');
  }
  return env;
}
