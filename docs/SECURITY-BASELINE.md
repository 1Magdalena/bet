# BET Security Baseline

This is a launch gate, not optional documentation.

## Identity and admin
- Managed authentication; no custom password storage.
- MFA/passkey required for owner/admin accounts before production.
- Admin authorization is enforced server-side on every admin route.
- No service-role keys, AI keys or database credentials in browser code or Git.

## Data boundaries
- Identity/verification data, Experience Graph data and Private Notes are separate logical domains.
- Private Notes are never supplied to Ask BET or Support AI unless the member explicitly creates a submitted copy.
- AI receives only authorized, minimal context. It never receives unrestricted database access.
- Audio is private object storage; SQL stores metadata and references.

## Authorization
- Every object lookup is scoped to the authenticated member, business relationship or explicit matched-problem permission.
- Conversation creation requires a qualified match in the same Query/MatchPool.
- Direct links never elevate entitlements.
- Production deployment must enable database defense-in-depth policies in `infra/supabase/rls.sql` when using Supabase.

## Abuse / exfiltration
- No bulk Experience Graph endpoint.
- Ask BET retrieval is query-scoped and entitlement-scoped.
- Global and expensive-route rate limits are mandatory.
- Log suspicious enumeration, repeated authorization failures and high-volume source drill-down.
- Add Cloudflare/WAF before public exposure.

## Uploads
- Accept only allow-listed audio MIME types and enforce size/duration limits.
- Generate storage keys server-side. Never trust original filenames as paths.
- Private bucket only; signed URLs should be short-lived.

## Operations
- Separate dev/staging/prod.
- Daily managed database backup plus independent encrypted export on a schedule.
- Restore test before beta and after material backup changes.
- Dependency scanning and CI checks on each main-branch change.
- Security and audit events have retention appropriate to incident response and legal requirements.

## Launch blockers
Do not invite real external users until: auth, authorization, private storage, backup, restore test, production secrets, Terms/Privacy, admin MFA, rate limiting, logging, and staging E2E tests are complete.
