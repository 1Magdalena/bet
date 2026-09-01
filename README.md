# BET — Business Experience Together

**Business Experience Intelligence** — **See what happened before you decide.**

This is the current canonical production-preparation package for BET. It contains the final product and architecture MASTER, the existing visual prototype, and a portable backend, database and security skeleton intended to become the real closed-beta system rather than being thrown away.

## What is already prepared

- Canonical `ARCHITECTURE.md`
- `DATABASE-MAP.md`
- PostgreSQL migrations in `db/migrations`
- TypeScript modular-monolith API in `apps/api`
- Managed-auth adapter boundary
- Member sync, businesses and Business Snapshots
- Separate Experiences
- Ask queries
- Notifications
- Private Notes
- MatchPool-gated conversations
- Technical Support and human escalation
- Admin list and verification queue
- Durable PostgreSQL job queue
- Provider boundaries for AI, auth, storage, transcription and email
- Security baseline and RLS defense-in-depth
- Backup and restore scripts
- CI and Docker development configuration
- Staging and production runbook
- Payment-safety messaging prepared but disabled by feature flag

The existing HTML pages remain the product/UI reference until they are wired to authenticated production state.

## What still requires external services

The remaining production connection stage requires owner-authorized external accounts and credentials for:

- managed PostgreSQL
- authentication
- private storage
- domain / DNS / WAF
- AI provider
- transcription
- transactional email
- later: billing

See `OWNER-ACTIONS.md`.

## Important

Do not send the current static HTML URL to beta users as if BET were already live.

The next stage is provider authorization, staging deployment and end-to-end/security testing.

The architecture and code are intentionally structured so this connection stage does not require a rewrite.

## Core commands

Once dependencies are installed:

`npm run check`

Local PostgreSQL:

`infra/docker/docker-compose.yml`

Environment template:

`.env.example`

Deployment instructions:
