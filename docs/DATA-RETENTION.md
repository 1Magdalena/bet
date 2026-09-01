# Data Retention Implementation Notes

- Cancel subscription does not delete the account.
- Hibernate is a reversible lifecycle state.
- Permanent deletion is separate and auditable.
- Experience withdrawal stops future retrieval.
- Superseded Experience versions cannot be used by new retrieval runs.
- Evidence Packs keep exact version provenance for historical answers, but deleted/withdrawn source content must not remain newly accessible merely because a historical pack references it.
- Shared conversation/history deletion semantics require final legal review before production.
- Retention jobs must be idempotent and operate by explicit category.
