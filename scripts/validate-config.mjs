import fs from 'node:fs';
for (const file of ['package.json','apps/api/package.json','apps/api/tsconfig.json']) JSON.parse(fs.readFileSync(new URL(`../${file}`,import.meta.url)));
const required=['db/migrations/0001_core.sql','docs/SECURITY-BASELINE.md','docs/DEPLOYMENT-RUNBOOK.md','.env.example'];
for(const file of required) if(!fs.existsSync(new URL(`../${file}`,import.meta.url))) throw new Error(`Missing ${file}`);
console.log('configuration files valid');
