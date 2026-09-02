# BET — Business Experience Together

**Business Experience Intelligence** — **See what happened before you decide.**

This is the current canonical production-preparation repository for BET. It contains the product/architecture MASTER, the visual prototype, and the portable backend/database/security skeleton that will become the real closed-beta system.

## What is already prepared

- Canonical `ARCHITECTURE.md`
- `DATABASE-MAP.md`
- Portable PostgreSQL migrations in `db/migrations/`
- Supabase-ready deployment migrations in `supabase/migrations/`
- TypeScript modular-monolith API in `apps/api/`
- Managed-auth adapter boundary
- Member sync, businesses and Business Snapshots
- Separate Experience records and Experience versions
- Ask BET queries, matches and Evidence Packs
- Notifications and problem-context conversations
- Private Notes boundary
- Technical Support and human escalation
- Owner Control Center: users, countries, activity, filters, product/database operations and future revenue
- Consent preferences and first-party active-time analytics (opt-in)
- Admin list and verification queue
- Durable PostgreSQL job queue
- Provider boundaries for AI, auth, storage, transcription and email
- Security baseline and RLS defense in depth
- Backup and restore scripts
- CI and Docker development configuration
- Staging/production runbook
- Payment-safety messaging prepared but disabled by feature flag

The existing HTML pages remain the product/UI reference until they are wired to authenticated production state.

## Supabase deployment

BET is now prepared for Supabase as the initial managed PostgreSQL/Auth/Storage provider.

The repository root contains `supabase/`, so the Supabase GitHub integration should use:

- **Repository:** `1Magdalena/bet`
- **Working directory:** `.`
- **Deploy to production:** enabled when intentionally deploying migrations from `main`

The production migration order is:

1. `supabase/migrations/0001_core.sql`
2. `supabase/migrations/0002_functions.sql`
3. `supabase/migrations/0003_rls.sql`
4. `supabase/migrations/0004_owner_analytics_consent_billing.sql`
5. `supabase/migrations/0005_member_origin_admin_filters.sql`
6. `supabase/migrations/0006_owner_analytics_rls.sql`

## What still requires owner-authorized external services

- Managed provider account authorization and production secrets
- Private storage bucket
- Domain / DNS / WAF
- AI provider
- Transcription provider
- Transactional email
- Later: billing

See `OWNER-ACTIONS.md`.

## Important

Do not send the current static HTML URL to beta users as if BET were already live. The next stage is infrastructure deployment, authenticated end-to-end wiring, and security/E2E testing.

Never commit database passwords, service-role keys, access tokens, or other production secrets to GitHub.

## Core commands

Once dependencies are installed:

`npm run check`

Local PostgreSQL:

`infra/docker/docker-compose.yml`

Environment template:

`.env.example`

Deployment instructions:

`docs/DEPLOYMENT-RUNBOOK.md`


## Owner filters v0.3
The Owner Control Center now supports composable filters for signup country, payment state, plan, activity, verification, business geography/status and acquisition source, plus selectable visible columns. Apply `supabase/migrations/0005_member_origin_admin_filters.sql` after the existing 0001-0004 migrations.
