# BET Deployment Runbook

## Phase 0 — repository only (can be completed before any external account)
1. Keep this repository private while production credentials or unpublished implementation details exist.
2. Run config validation and code review.
3. Never commit `.env`.

## Phase 1 — staging
Owner actions are listed separately in `OWNER-ACTIONS.md`. Once PostgreSQL/Auth/Storage credentials exist:
1. Copy `.env.example` to a local secret store; fill staging values.
2. Apply every file in `db/migrations/` in numeric order. On Supabase use every file in `supabase/migrations/` in numeric order; `0003_rls.sql` is provider-specific.
3. Create a private media bucket.
4. Configure auth/JWKS.
5. Deploy API with `NODE_ENV=production` to staging and a staging origin.
6. Run `/health/ready`.
7. Run signup → auth sync → business → snapshot → Experience → Ask query → notification → support escalation.
8. Test cross-user access denial using two accounts.
9. Test backup + restore into a disposable database.

## Phase 2 — closed beta production
1. Use a distinct production database/project.
2. Enable admin MFA and owner recovery codes.
3. Put public traffic behind Cloudflare/WAF/rate limits.
4. Set production CORS to the exact web origin.
5. Configure email domain authentication before sending transactional mail.
6. Enable only features proven in staging. Payment safety messaging remains disabled until billing exists.
7. Invite 10–20 users.

## Phase 3 — paid transition
Before charging money: register the operating entity if required for the chosen jurisdiction/business setup, complete billing provider onboarding, update Terms/Privacy/invoices/tax handling, and enable the billing + payment-safety feature set.

## Rollback
- Application rollback: redeploy previous immutable build.
- Database rollback: prefer forward-fix migrations. For destructive incident recovery, restore a tested backup to a new database and switch connection only after verification.
- Never run destructive schema commands manually in production without a backup and reviewed migration.

## Supabase GitHub integration (current provider choice)

For the connected `1Magdalena/bet` repository, use repository root as the working directory (`.`). The root contains `supabase/migrations/`, which is the deployable Supabase migration path.

Before an intentional production migration from `main`:

1. Confirm no secrets are present in the commit.
2. Confirm `db/migrations/0001_core.sql` matches `supabase/migrations/0001_core.sql`.
3. Run `npm run check:supabase-migrations` to verify every portable/provider mirror.
4. Review `supabase/migrations/0003_rls.sql` for provider-specific RLS.
5. Confirm consent defaults to necessary-only and product analytics remains off until opt-in.
6. Deploy only after the target project and branch are confirmed.
