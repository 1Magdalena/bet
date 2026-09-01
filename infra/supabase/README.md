# Supabase adapter

The canonical database schema is portable PostgreSQL. Supabase can supply managed PostgreSQL, Auth and private Storage for the low-cost beta.

- Apply canonical migrations first.
- Configure Auth and use its JWKS URL in the API.
- Keep the service-role key server-side only.
- Create a private `bet-private-media` bucket.
- Apply `rls.sql` as defense in depth after testing with staging users.
- The frontend should normally call BET API, not query Experience Graph tables directly.
