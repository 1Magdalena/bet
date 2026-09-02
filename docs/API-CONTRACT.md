# BET API v1 Contract

All non-health routes require authenticated bearer identity. Browser access never gets service credentials.

Core routes prepared in the skeleton:
- `POST /v1/auth/sync` — create/synchronize canonical Member after managed auth.
- `GET /v1/me` and `POST /v1/me/onboarding`.
- `GET|POST /v1/businesses`.
- `POST /v1/business-snapshots`, `GET /v1/businesses/:id/snapshots`.
- `GET|POST /v1/experiences`.
- `GET|POST /v1/questions`, `GET /v1/questions/:id`.
- `GET /v1/notifications`, `POST /v1/notifications/:id/read`.
- `GET|POST|PATCH|DELETE /v1/notes...` (Private Notes domain).
- `GET|POST /v1/conversations...` and messages; creation is MatchPool-gated.
- `POST /v1/support/chat` and `POST /v1/support/escalate`.
- `/v1/admin/*` requires admin authorization.

The first production release should add OpenAPI generation from route schemas; current route validation is implemented with Zod.

## Owner Control Center / analytics v0.2
- `GET /v1/admin/overview?from=YYYY-MM-DD&to=YYYY-MM-DD`
- `GET /v1/admin/metrics?from=YYYY-MM-DD&to=YYYY-MM-DD`
- `GET /v1/admin/filter-options` — available country/plan/source values for filter controls.
- `GET /v1/admin/members?from=&to=&country=&paymentStatus=&plan=&accountStatus=&verificationStatus=&activity=&businessCountry=&businessStatus=&acquisitionSource=&sort=&order=`
- `GET /v1/admin/members/:memberId`
- `GET /v1/admin/billing-summary?from=YYYY-MM-DD&to=YYYY-MM-DD`
- `POST /v1/activity/session`
- `POST /v1/activity/event`
- `POST /v1/activity/heartbeat`

Admin reads require server-side admin authorization and create an admin access audit event. Activity metadata must never contain Private Notes, keystrokes, draft content or raw message/question content.

### Owner member-directory filter semantics
`paymentStatus` supports `all|paid|free|past_due|cancelled`; `activity` supports `all|today|7d|30d|inactive30d`. Country filters use ISO alpha-2 codes. Member-directory responses expose `signup_country_code`, subscription status/plan and selected usage counts, but not Private Notes or question/message text. Filters are composable and parameterized server-side.
