# Cloudflare production baseline

When a domain is connected:
- proxy production web/API records through Cloudflare;
- Full (strict) TLS;
- do not expose the API origin IP/hostname unnecessarily;
- WAF managed rules;
- rate-limit login/auth endpoints and AI/Ask BET endpoints;
- bot/challenge rules for obviously automated enumeration;
- cache only public static assets, never authenticated API responses;
- add a temporary security banner only for a real incident/phishing campaign.

Exact rules are provider-account work and should be applied after the owner authorizes the Cloudflare account.
