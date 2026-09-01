# Observability

Minimum signals for closed beta:
- API request rate, error rate and p95 latency.
- database connection pool saturation and slow queries.
- job queue age, retries and dead jobs.
- signup/auth-sync failures.
- Experience processing time and failures.
- Ask BET processing time, candidate count, qualified match count and no-match rate.
- notification delivery failures.
- support escalation count.
- authorization denials and suspicious enumeration patterns.
- AI/transcription request count, latency, errors and cost once enabled.

Alerts should page/email the owner only for actionable problems; avoid alert fatigue.
