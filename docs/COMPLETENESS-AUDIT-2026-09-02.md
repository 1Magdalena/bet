# BET completeness audit — 2026-09-02

## Result
The prior package was a strong production skeleton but was not complete enough to truthfully call launch-complete. The largest omissions were owner product analytics, historical owner metrics, explicit cookie/consent management, and a billing event ledger suitable for revenue history. This update closes those architectural gaps.

## Covered in the architecture/codebase
- account/authentication and multiple-business model
- verification and provenance
- Experience capture/versioning/outcomes/Journey
- Ask BET queries/retrieval/evidence/matching/zero-match behavior
- Live Research data model
- problem-bound network/conversations
- notifications and technical support separation
- Private Notes isolation/submitted copies
- entitlements, lifecycle/deletion/retention
- audit/security events, jobs/outbox, backup/restore docs
- Supabase portability/RLS baseline
- Owner Control Center specification and admin API baseline
- member sessions, active-time telemetry and daily aggregates
- consent preferences and cookie/storage implementation baseline
- future billing event ledger and historical revenue reporting

## Still requires external configuration or launch validation — not more product architecture
- configure Supabase Auth/JWKS and production API credentials
- configure private Storage bucket/policies
- deploy BET API and wire frontend to it
- transactional email provider/domain
- AI/transcription provider credentials and production quality evaluation
- DNS/domain/TLS/WAF/hosting configuration
- owner/admin MFA and recovery process
- scheduled backups plus a real restore test
- observability/error alert destination
- Terms, Privacy, Cookie notice and controller identity for launch jurisdictions
- abuse/spam and rate-limit tuning using beta traffic
- accessibility/browser/device QA
- cross-user authorization and RLS penetration tests
- payment provider/webhooks/reconciliation when paid launch is enabled
- external security review before paid scale

## Launch gates
Closed beta should not open merely because migrations run. It opens after end-to-end auth, persistence, isolation, Experience capture, Ask BET, matching, support, owner operations, consent behavior, backup restore and critical security tests pass in the deployed environment.

## Deliberately not collected in owner analytics
Private Notes content, keystrokes, draft text, raw message content, unnecessary sensitive payloads. Question text is not surfaced as an owner KPI; product records may be deliberately retrieved by Member ID for a legitimate operational purpose and that access should be logged.

## v0.3 owner filters
Added composable Owner Control Center filters for signup country, payment/subscription state, plan, account/verification/activity state, business country/status and acquisition source. Added selectable member-directory columns plus coarse signup-country fields. Payment state is derived from subscriptions; exact IP storage is not required.
