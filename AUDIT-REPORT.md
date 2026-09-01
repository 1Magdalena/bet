# BET Production Skeleton — self-audit 2026-09-01

Automated repository checks completed after generation.

- HTML pages checked: 17
- Broken local HTML links: 0
- Canonical SQL tables: 45
- TypeScript source files: 30
- Required architecture/security/deployment files present: yes
- Obvious committed production-secret patterns found: 0
- Canonical Experience model: one separate ExperienceRecord per Experience, versioned with ExperienceVersion
- Private Notes domain separated from Ask BET/Support AI: yes
- Support AI and Ask BET separated: yes
- Payment safety messaging default: disabled
- Group Discussions default: disabled
- Live Research default: disabled until production pipeline is connected/tested

## Deliberately not claimed as completed

This repository has not yet been connected to real external provider accounts. Therefore it does not claim live managed authentication, live managed PostgreSQL, real private object storage, real AI/transcription calls, transactional email delivery, Cloudflare rules, or production backups. Those require owner authorization/credentials and staging deployment.

The package is ready for the provider-connection stage without redesigning the product architecture.
