import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const pairs = [
  ['db/migrations/0001_core.sql', 'supabase/migrations/0001_core.sql'],
  ['db/migrations/0002_functions.sql', 'supabase/migrations/0002_functions.sql'],
];

let failed = false;
for (const [portable, provider] of pairs) {
  const a = readFileSync(resolve(portable));
  const b = readFileSync(resolve(provider));
  if (!a.equals(b)) {
    console.error(`Migration mirror mismatch: ${portable} != ${provider}`);
    failed = true;
  }
}

if (failed) process.exit(1);
console.log('Supabase migration mirrors are in sync.');
