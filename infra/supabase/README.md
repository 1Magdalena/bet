# Supabase adapter

Supabase supplies managed PostgreSQL, Auth and private Storage for the initial BET beta.

The deployable Supabase GitHub-integration layout now lives at repository root:

`supabase/migrations/`

Use the root `supabase/` directory for production migrations. The portable canonical SQL remains in `db/migrations/`.

Security rules:

- Keep the service-role key server-side only.
- Never commit database passwords or provider secrets.
- Create a private `bet-private-media` bucket before enabling voice/media uploads.
- The frontend should normally call the BET API, not query the collective Experience Graph directly.
- RLS is defense in depth; server-side BET authorization remains canonical.
