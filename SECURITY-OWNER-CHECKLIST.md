# BET — Security & Owner Checklist

Status: operational companion to `ARCHITECTURE.md`.

## What the owner must do as accounts/providers are created

- Use a password manager and unique passwords.
- Enable MFA/passkeys on: primary email, domain registrar, GitHub/Git provider, hosting/edge, database/storage, payment provider and BET admin.
- Store recovery codes offline in a safe place.
- Keep production secrets out of frontend code, public repositories, screenshots and support tickets.
- Keep development/staging/production credentials separate.
- Turn on registrar/domain lock.
- Keep an independent encrypted copy of important BET release ZIPs/tags.
- Ensure production database backups are enabled before real users are admitted.
- Keep a periodic independent encrypted database export in a separate location/provider.
- Test restore before launch and after major infrastructure changes.
- Review infrastructure access regularly; remove people/tools no longer needed.
- Rotate secrets immediately if leakage is suspected.
- Keep a short incident runbook and emergency contact list.

## Minimum backup plan before real users

1. Source code: Git history + tagged releases + independent encrypted release copy.
2. PostgreSQL: automated daily managed backup.
3. PostgreSQL: independent encrypted export at least weekly while volume is small.
4. Source media/audio: private durable object storage with recovery/versioning strategy.
5. Restore: perform and record at least one full restore test before launch.

## What ChatGPT/developer must tell the owner later

Whenever a provider is actually chosen, give exact click-by-click instructions for:
- MFA and recovery-code setup;
- domain lock;
- database backup configuration;
- independent export destination;
- secret creation and safe placement;
- staging vs production separation;
- monitoring/alert destination;
- restore testing;
- access review;
- incident response/secret rotation.
