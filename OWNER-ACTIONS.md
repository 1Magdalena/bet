# BET — OWNER ACTIONS (only things the owner must personally do)

The technical implementation should be completed by the build process wherever possible. The owner should only be asked for account ownership, legal acceptance, payment identity or secret authorization that cannot safely be delegated.

## Before closed beta
1. **Choose/authorize the database + auth + private storage account** (recommended low-cost path: a Supabase project).
2. **Enable MFA/passkey** on the database/auth provider account, GitHub, hosting account, domain registrar/DNS account and owner email. Save recovery codes offline.
3. **Authorize Cloudflare/DNS** when the custom domain is connected.
4. **Choose/authorize an AI provider account** only when Ask BET/Support AI is ready to make real model calls.
5. **Choose/authorize transactional email** and verify the sending domain.
6. Review the public Terms/Privacy/controller identity before inviting external users. A paid company is not technically required for this repository skeleton, but real personal-data processing still needs a valid controller identity and legal basis before beta.

## Backups — owner responsibility checkpoint
- Confirm daily managed backups are enabled.
- Store one independent encrypted export outside the primary provider on the agreed cadence.
- Keep the encryption/recovery secret separate from the backup.
- Confirm a restore test has been completed; do not assume a backup works because a dashboard says it exists.

## Only before paid launch
- Register/activate the operating business entity as required for billing/tax setup.
- Authorize billing provider and payout account.
- Update Terms/Privacy/billing disclosures and enable payment-safety messaging.

The assistant/build process should stop and ask the owner only at these checkpoints or if a provider requires human verification/card/legal acceptance.

## Before external beta — privacy/analytics owner actions
- Approve final Privacy Policy, Cookie Notice and controller identity for actual launch jurisdictions.
- Approve the exact cookie/storage inventory after production auth/analytics providers are chosen.
- Confirm whether optional product analytics is enabled at beta launch; marketing tracking remains off unless separately approved.
