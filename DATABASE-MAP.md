# BET — Canonical Database Map

Canonical operational database: **PostgreSQL-compatible SQL**.

## Core domains

### Identity / access
`Member`, `AuthIdentityRef`, `MemberContactPoint`, `MemberConsent`, `AccountLifecycleState`, `Plan`, `Subscription`, `Entitlement`, `EntitlementGrant`, `FeatureFlag`

### Business / verification
`Business`, `MemberBusinessRole`, `BusinessSnapshot`, `BusinessContextEntry`, `VerificationCase`

### Experience / Journey
`ExperienceRecord`, `ExperienceVersion`, `MediaAsset`, `VoiceCapture`, `TranscriptVersion`, `SourceProvenance`, `DecisionEpisode`, `OutcomeObservation`, `JourneyEvent`

**Rule:** every distinct business situation is a separate `ExperienceRecord`; during multi-Experience entry, every Experience has its own field/card/source capture and its own `Send to BET` action/state.

### Ask BET / matching
`AskQuery`, `QueryProfile`, `OpenDecisionRecord`, `MatchPool`, `ProblemMatch`, `LiveResearchRequest`, `LiveResearchCandidate`, `RetrievalRun`, `EvidencePack`, `EvidenceItem`, `SynthesisClaim`, `FeedbackEvent`

### Network
`Conversation`, `ConversationParticipant`, `Message`, `NetworkRelationship`, optional `TopicGuardDecision`

### Private Notes
`PrivateNote`, `PrivateNoteReference`, `SubmittedNoteCopy`

### Support
`SupportConversation`, `SupportMessage`, `SupportKnowledgeArticle`, `SupportEscalation`, `SupportDiagnosticContext`

### Admin/security/operations
`AdminUser`, `AdminRole`, `AdminAuditEvent`, `SecurityEvent`, `BackupRecord`, `RestoreTestRecord`, `IncidentRecord`

## Registration path

`Auth provider confirms identity`
→ `Member`
→ `AccountLifecycleState`
→ launch/default `EntitlementGrant`
→ onboarding state
→ audit event
→ business setup
→ `Business`
→ `MemberBusinessRole`
→ `VerificationCase`

The founder/admin member directory reads from these canonical records. It is admin-only; it is not the member-facing My Network or People discovery.

## What is not stored directly in PostgreSQL

Large audio/media bytes should live in private object storage. PostgreSQL stores `MediaAsset` metadata, owner, status and object reference. Search/vector indexes are rebuildable projections; they are never the only copy of Experience data.

## v0.2 owner/analytics/privacy/billing additions
- `consent_preferences` — versioned necessary/product-analytics/analytics/marketing choices.
- `member_sessions` — authenticated sessions and bounded active-time accumulation.
- `product_activity_events` — data-minimized product events; no Private Notes, keystrokes or draft content.
- `member_activity_daily` — fast per-member daily usage aggregates.
- `owner_metric_daily` — historical KPI series for day/month/year/custom-range Control Center views.
- `billing_events` — immutable provider billing ledger for collected/refunded/fee/net history.
- `admin_access_events` — audit trail for sensitive owner/admin reads and drill-downs.

## Owner reporting additions v0.3
`members` also carries optional coarse `signup_country_code`, `signup_country_source`, `acquisition_source` and `acquisition_campaign` fields for owner reporting/filtering. Exact IP addresses are not required for this feature. `subscriptions` is joined server-side to classify Paid/Free/Past due/Cancelled views.

## Owner analytics, consent and revenue
- `consent_preferences` — versioned member privacy choices; necessary=true, analytics off by default.
- `member_sessions` / `product_activity_events` / `member_activity_daily` — first-party product telemetry. Active-time collection requires `product_analytics=true`; idle/open-tab time is not counted.
- `admin_access_events` — audited owner/admin reads of sensitive operational views.
- `billing_events` — immutable raw provider event history for reconciliation/debugging.
- `billing_transactions` — canonical deduplicated money ledger, unique by provider + provider transaction ID. Owner revenue metrics aggregate this table, not raw webhook events.
- `owner_metric_daily` — rebuildable historical aggregates for day/month/year/custom-range views.
- `members.signup_country_code` — coarse country for owner filters; no exact IP is stored in this field.
