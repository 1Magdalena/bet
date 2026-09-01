# Supabase deployment layout

This folder is the Supabase GitHub-integration deployment layout for BET.

- `migrations/0001_core.sql` — canonical PostgreSQL schema mirror.
- `migrations/0002_functions.sql` — triggers and helper view mirror.
- `migrations/0003_rls.sql` — Supabase-specific RLS defense in depth.

The portable canonical SQL is retained in `db/migrations/`. For Supabase production deployment, keep the first two migration files byte-for-byte aligned with the portable copies and deploy from this `supabase/migrations/` directory.

Supabase project settings for BET:

- GitHub repository: `1Magdalena/bet`
- Working directory: `.` (repository root, which contains this `supabase/` folder)
- Data API: enabled
- Automatically expose new tables: disabled
- Automatic RLS for new public tables: enabled

Do not commit database passwords, service-role keys, access tokens, or other production secrets.
