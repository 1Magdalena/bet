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
