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
