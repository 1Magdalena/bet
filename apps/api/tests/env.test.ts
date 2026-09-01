import test from 'node:test';
import assert from 'node:assert/strict';
import { loadEnv } from '../src/config/env.js';

test('forbids dev auth in production',()=>{
  assert.throws(()=>loadEnv({NODE_ENV:'production',DATABASE_URL:'postgres://x',SESSION_IP_HASH_SECRET:'12345678',AUTH_PROVIDER:'dev'} as NodeJS.ProcessEnv));
});

test('accepts minimal development env',()=>{
  const env=loadEnv({DATABASE_URL:'postgres://x',SESSION_IP_HASH_SECRET:'12345678'} as NodeJS.ProcessEnv);
  assert.equal(env.NODE_ENV,'development');
});
