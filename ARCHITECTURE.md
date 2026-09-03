# BET — MASTER PRODUCT & TECHNICAL ARCHITECTURE

**Version:** 2026-09-01 — Post Product Audit / Build-Small-Architect-Large  
**Status:** canonical master for product, UX, data and implementation decisions  
**Product:** BET — Business Experience Together  
**Category:** Business Experience Intelligence  
**Core line:** **See what happened before you decide.**

---

## 1. What BET is

BET turns real business experience into structured evidence that helps entrepreneurs make better decisions.

The core user job is:

> **I have a business problem or decision. Show me what actually happened in businesses that faced something relevant before I decide.**

BET is not a social network, content platform, expert marketplace, generic founder community or AI advice product. The source of knowledge is human experience. AI is infrastructure that captures, structures, retrieves, compares and synthesizes that experience without rewriting it.

**The intelligence is powered by AI. The experience is human.**

The primary proprietary asset is the longitudinal **Experience Graph**: structured, source-traceable records of real business situations, decisions, actions and outcomes.

---

## 2. Product architecture

BET has four layers, in this order:

1. **EXPERIENCE** — real entrepreneurs contribute what actually happened.
2. **INTELLIGENCE** — BET finds relevant prior experience for a current problem or decision.
3. **AUTHORITY** — useful experience builds evidence-based business reputation.
4. **NETWORK** — relevant experience can bring the right people together around a concrete problem.

The order is intentional. BET does not start with people and hope they may someday help each other. It starts with a real problem and relevant experience.

**Value first. Relationship second.**

---

# PART I — PRODUCT PRINCIPLES

## 3. Human source fidelity

The canonical Experience chain is:

**BUSINESS / CONTEXT → SITUATION / PROBLEM → DECISION → ACTION → RESULT → WHAT HAPPENED LATER**

The richer internal chain may include:

**IDEA / CONTEXT → PROBLEM → INTERPRETATION → OPTIONS → DECISION → MICRO-ACTION → RESULT → REACTION → NEXT PROBLEM / DECISION → …**

Not every record needs every stage. Open and unresolved situations are valid.

BET must preserve the source reality, including failed attempts, uncertainty, irrational decisions, reversals and no-result outcomes.

### Non-negotiable source rules

- AI may structure a fact; it may not upgrade it into an interpretation.
- `Member-reported` is not `Verified` unless BET verified it.
- “Tried entering Germany three times” must not become “successful international expansion experience.”
- “Sales improved” must not become a numeric increase unless the source supplied a number.
- Unknown is better than invented.
- Contradictory evidence remains contradictory.
- Material synthesis claims must trace to source Experience records.

**AI organizes reality. It does not rewrite reality.**  
**Minimal transformation. Maximum fidelity to the human source.**

---

## 4. Utility first, not engagement first

BET should be useful even if a member opens it for eight minutes, makes a better decision and leaves.

Do not optimize for feed consumption, followers, streaks, vanity metrics or time spent. Do not add engagement noise merely to make the product feel active.

BET is permanently ad-free in its decision environment:

- no sponsored Ask BET results,
- no promoted Experience records,
- no paid profile boosting,
- no vendor placements,
- no pay-to-rank,
- no cold sales messaging.

**Your business belongs on your profile. Your sales pitch does not belong in your experience.**

---

## 5. Account-gated knowledge

No BET knowledge is publicly available without an account.

Unauthenticated visitors may see only marketing/product explanation and signup/login surfaces. They cannot read Experience records, Ask BET answers, member profiles, Business Journeys or the Experience Graph corpus.

A direct link never bypasses entitlements.

---

# PART II — MEMBERS, BUSINESSES, VERIFICATION AND PRIVACY

## 6. Membership eligibility

BET is for people who run or have run a real business.

Eligible roles include current or former founder, cofounder, owner or genuine business operator where operating experience can be verified. Sold, closed and failed businesses remain valid sources of experience.

**Success is not required. Real business experience is.**

Payment never bypasses verification.

---

## 7. One member, multiple businesses

One person has one **Member Account** and, when applicable, one subscription. The account may contain multiple independently verified businesses with no artificial product limit on the number of genuine businesses.

Each business has its own:

- verification and MemberBusinessRole,
- Business DNA,
- historical Business Snapshots,
- Business Journey,
- Experiences,
- Open Decisions / Problems,
- Outcomes,
- conversations attached to its problems,
- helpful-experience/Authority history.

Ask BET must visibly show the active business context, for example:

`Asking for: Company C ▾`

A future **Portfolio View** may compare the member's own businesses, but it is not required for v0.1. Architecture must allow it without mixing business records.

---

## 8. Verification is not disclosure

BET may need a member's real identity, company, role and period to verify experience. That does not mean other members must see those details.

Separate:

1. **BET Knowledge Layer** — full permitted data used internally for verification, retrieval and matching.
2. **Match Card** — minimum relevant context and why the match exists.
3. **Member Profile / Shared Experience** — verified information the owner chooses to disclose.

A member may hide name, exact company, photo, links and other identifying details while BET still uses the underlying permitted business context internally.

**BET always knows who is behind verified experience. Other members do not necessarily have to.**

Registration numbers and verification evidence are never normal profile fields.

---

## 9. Full data for BET, selective disclosure to humans

Matching quality depends on sufficient truthful context. A member who joins BET is expected to provide enough accurate business context for the service to work.

Internal matching may use all service-permitted context regardless of member-facing visibility, including:

- industry and specialization,
- business type/model,
- customer type,
- company stage and age,
- employee and revenue bands,
- profitability/loss state,
- markets and locations,
- sales motion and distribution,
- regulatory context,
- historical Business Snapshots,
- previous attempts,
- problems, decisions, actions and outcomes.

Hidden from humans does not mean unknown to BET.

---

## 10. Business Snapshots

Business context is historical. Never overwrite the past with today's company state.

A **BusinessSnapshot** captures the business at a point in time. Matching an Experience uses the Snapshot relevant to when that Experience happened.

Suggested revenue bands:

`<100k`, `100–250k`, `250–500k`, `500k–1M`, `1–2.5M`, `2.5–5M`, `5–10M`, `10–25M`, `25–50M`, `50M+`

Use the company's local currency for member input/display where practical and normalize internally for comparison.

Employees use bands. Financial state can use qualitative bands such as:

`Strongly profitable / Profitable / Around break-even / Moderate loss / Significant loss`

Exact financials may remain optional.

When updating context, prefer: **“Has anything important changed since the last snapshot?”** rather than making the member re-enter everything.

---

## 11. Open-ended Business Context

Structured fields cannot capture everything. Every business may have persistent **Add business context / Tell BET more about your business** capture via voice or text.

Preserve:

`Original source → faithful transcript/text → structured representation`

Context entries are timestamped and additive. New context may update Business DNA projections or create a new Snapshot but does not silently overwrite historical source material.

Provenance states:

- `verified`
- `member_reported`
- `bet_structured`
- `derived`

Derived analysis must remain distinguishable from source facts.

---

# PART III — EXPERIENCE CAPTURE AND JOURNEY

## 12. Experience Record

An **ExperienceRecord** is an atomic business episode. It can be historical, current, successful, failed, incomplete or unresolved.

Event date and creation date are distinct. A story from 2019 added in 2026 belongs in the 2019 position of the Business Journey.

A current problem can begin as:

**CURRENT SITUATION / PROBLEM → OPTIONS / DECISION TO MAKE**

and later accumulate Decision, Action and Outcome observations.

---

## 13. Voice capture

Voice is a first-class input for Experience, Business Context, Ask BET problems and updates.

Canonical source flow:

`Original audio → Original machine transcript → User-approved transcript → structured representations`

Rules:

- keep original audio subject to lifecycle/retention rules,
- transcript must be faithful, not polished copywriting,
- user may correct transcription errors without overwriting the original audio,
- `Send to BET` is the explicit boundary between draft/private capture and submitted BET data,
- driving/walking use may save without forcing immediate review,
- AI may ask one high-value clarification when the source is too vague to be useful,
- never force or invent numbers.

Prefer evidence in this order when available:

**fact → number if known → concrete observation → general assessment**.

---

## 14. Experience quality gate

There is no manual pre-approval queue for every Experience and no rigid “4 of 6 fields” form requirement.

After `Send to BET`, the record enters the BET data pipeline. The system automatically checks whether it understands **what concretely happened and in what business context** well enough to index/match the record.

If a critical element is too vague, BET may ask one concise clarification. An incomplete real situation remains valid when missing stages have not happened yet or are genuinely unknown.

Quality gate exists to prevent unusably vague records, not to sanitize human reality.

---

## 15. Business Journey

Business Journey is a living record of actual business decisions, not an ornamental company timeline.

Primary spine:

**Problem → relevant evidence/people → Decision → Action → Outcome observations → current state → next Problem**

Business Snapshots are a secondary contextual layer.

Journey should be built as much as possible from normal BET use rather than requiring diary work.

A member may record that a specific Experience or conversation influenced a decision, but BET must avoid causal overclaim. Prefer:

`This experience helped inform my decision.`

not:

`This person solved my problem.`

Outcome observations may be longitudinal and may include “nothing changed”, “not implemented”, “reversed” or “failed”.

Default follow-up cadence when no update exists:

- approximately 1 month,
- approximately 3 months,
- approximately 12 months.

If the member already supplied the relevant update, suppress or shift redundant follow-up.

---

# PART IV — ASK BET INTELLIGENCE

## 16. Ask BET is problem-first

Ask BET begins with a concrete business problem, decision, action, goal or opportunity the member is trying to handle.

Teach the model explicitly:

**Not:** Who do you want to meet?  
**Instead:** What are you trying to solve, do or decide, and whose lived experience could help?

Good example:

> I run a beauty salon in Poland and I'm considering opening a location in Dubai. I want to understand what operators who entered Dubai encountered and what they would do differently.

Not enough:

> I want to meet beauty entrepreneurs in Dubai.

The user should not need prompt engineering. Natural language and voice are valid. If critical context is missing, BET may ask one high-value clarification.

---

## 17. Product Support is separate from Ask BET

BET Support helps a member understand the product or faithfully formulate a usable problem. It is not the Intelligence engine and is not a copywriter.

Support may transform:

`original user wording → faithful proposed formulation → user acceptance → accepted query sent to Ask BET`

It must not invent intent, strategy or facts.

---

## 18. Query understanding

Retain the original query. Build a typed **QueryProfile** containing, where available:

- normalized problem,
- decision/action sought,
- domain/object,
- goal,
- timing/urgency,
- active Business Snapshot / Business DNA,
- Decision DNA,
- constraints and options,
- previous attempts,
- hard/soft filters,
- dimension importance,
- missing high-value information,
- confidence.

Structured interpretation is a retrieval aid, not a replacement for the original source.

---

## 19. Business DNA and Decision DNA

### Business DNA

Versioned dimensions may include industry, specialization, business type, business model, scale/stage, markets, customer type, revenue model, sales motion, operations, founder dependence, capital intensity, regulatory environment and other relevant context.

Taxonomy hierarchy may evolve:

**Industry → Sector/Specialization → Business Type → Business Model → Scale/Stage → Markets**

Preserve original member wording even when mapping it to taxonomy concepts.

### Decision DNA

Decision structure is independent of industry. Dimensions may include:

- problem/opportunity class,
- object/domain,
- stage/trigger,
- goal,
- alternatives,
- constraints/trade-offs,
- risk/reversibility/commitment,
- horizon/urgency,
- dependencies,
- resource change,
- target function/geography,
- metric under pressure,
- previous attempt/reaction,
- next-move pattern.

---

## 20. Retrieval and match quality

Pipeline:

`USER INPUT → QUERY UNDERSTANDING → QUERY PROFILE → CANDIDATE GENERATION → COHORT BUILDING → RERANKING → EVIDENCE PACK → GROUNDED SYNTHESIS → SOURCE TRACEABILITY → FEEDBACK`

Use hybrid retrieval:

- structured filters,
- vector/semantic retrieval,
- lexical retrieval,
- graph relationships.

Use multiple embeddings/representations for problem, decision, action, outcome, full Experience and DNA projections.

Missing data is not automatically a mismatch.

Match strength is multidimensional and query-dependent. Geography can be critical for market entry and irrelevant for another problem. Internal scoring/ranking is allowed; **do not show artificial match percentages to members.**

### Quality threshold

BET has a real presentation threshold. Candidates below it are not shown merely to fill the screen.

**If it is not sufficiently relevant, it is not a match.**

Do not show 10% matches, “maybe useful” clutter or ever-widening weak results.

When qualified matches exist, show them in relevance order and explain **why this matches** using factual dimensions rather than fake precision.

---

## 21. Ask BET response contract

When evidence exists, lead with useful evidence rather than dashboards:

1. What the evidence shows.
2. What relevant businesses/people actually did.
3. What happened afterward.
4. What differed where outcomes differed.
5. Underlying matched Experiences/sources available according to entitlement and visibility.

Contradictions remain visible. Grounded synthesis must not invent causal certainty.

When no qualified evidence exists, say so clearly. Do not generate generic internet-style advice to hide the gap.

Example:

> **No relevant matches yet.**  
> BET doesn't currently have a qualified match for this question. We'll notify you if that changes.

The problem remains saved and can be re-matched later.

---

# PART V — OPEN DECISIONS, MATCHING AND LIVE RESEARCH

## 22. Open Decision / Problem Record

A substantive Ask BET query may create a private **OpenDecisionRecord** for the active business.

It represents a real current problem/decision/action context, not a public post by default.

Questions/problems are **private by default**. A member may explicitly share a particular problem under supported visibility settings, but asking BET never silently publishes it to the profile or network.

Each record has lifecycle states such as:

`draft → active → closed → reopened`

An active problem remains eligible for new matching. A closed problem stops proactive matching and match notifications. Reopening resumes them.

`My Questions / My Problems` is the persistent member view of these records and their current match state.

---

## 23. Problem-specific matching

Every human connection originates from a concrete Problem/Open Decision.

Conceptual chain:

`OpenDecisionRecord → MatchPool → Match → Conversation → Messages`

A match pool is specific to one problem. A different problem produces a different pool.

BET can identify:

- members currently facing a relevantly similar problem,
- members with existing Experience that qualifies for this problem,
- members who may possess missing Experience and can be asked through Live Research.

Do not confuse “same industry” with a match. Use full relevant Business Snapshot + Decision/Problem DNA + Experience content/outcome maturity.

Failure is valid evidence. A person whose approach failed may be highly relevant; do not describe them as someone who “solved” the problem.

---

## 24. Free pre-match and future monetization

After paid Intelligence launches, a Free verified member may submit a problem and receive only the **availability of qualified value**, not the underlying collective knowledge.

Examples:

`No matches yet.`

or

`3 relevant matches found.`

The exact identities, Experience content, synthesis, source drill-down and paid Intelligence remain locked.

If there are zero matches, do not pressure the member to upgrade. BET should not sell a promise that value might exist.

If a qualified match later appears for a saved Free problem, BET may notify the member. That gives a concrete reason to consider paid access.

Direct links do not bypass the paywall.

---

## 25. Context Re-Matching

Active unresolved problems remain eligible for future matching as the Experience Graph grows.

Flow:

`Problem saved → no/current matches → new Experience arrives → automatic re-match → threshold met → notify member`

The member does not need to remember to repeat the question.

Re-matching may also use faithful prior Business Context where appropriate, but it must be based on what the member actually said, not an AI-invented narrative.

---

## 26. Live Research

**Live Research is targeted, demand-triggered capture of missing human experience.** It is not web research and not a broadcast community question.

When Ask BET finds no existing qualified Experience, it may first identify a **small plausible cohort** of verified members who could reasonably have the missing experience based on their known business context/history.

Example: a problem combines `beauty salon + Pakistan`. Plausible candidates may include members with relevant beauty operating experience and members with real operating experience in Pakistan. Do not keep widening the cohort merely to force an answer.

### Live Research flow

1. Ask BET searches existing Experience Graph.
2. No qualified match exists.
3. System identifies plausible experience holders.
4. Selected members receive a concise qualification request such as: **“Have you experienced this?”**
5. `No` ends the request and can improve cohort selection.
6. `Yes` means only **potential experience holder**, not a match.
7. The member supplies a short voice/text description of what actually happened.
8. BET structures and evaluates the submitted Experience against the original problem.
9. Only if it crosses the normal quality/relevance threshold does it become a qualified match.
10. The original asker is notified that a match is now available.
11. The new Experience remains in the Experience Graph subject to its permissions and lifecycle.

The original asker does not need to see how many people BET contacted or receive false progress signals. While research is running, the question may show a neutral `Researching` state and the member can leave the screen.

Live Research must protect member attention. Requests are prioritized/throttled so plausible members are not flooded. The scarce resource is member attention, not the number of legitimate questions.

---

# PART VI — NETWORK AND COMMUNICATION

## 27. Network is problem-gated

BET has no generic people search for networking, no open member directory, no topic groups, no boards and no “connect because we might help someday” model.

**Problem is the gateway to Network. Business similarity is a matching mechanism behind that gateway.**

A member cannot search for a person and open an arbitrary chat.

Every BET conversation belongs to exactly one Problem/Open Decision context:

`Member A ↔ Member B ↔ Problem A`

A new unrelated problem requires a new Ask BET context and a new qualifying match, even if the members already know each other.

---

## 28. First-contact rules

### Free launch

Verified launch members with the relevant full-access grant may initiate within a valid problem match.

### Later Paid ↔ Paid

Either side may initiate within a valid problem-specific match.

### Later Paid ↔ Free

Paid may initiate first contact to a matched Free member. Free may reply and continue that existing problem-context conversation normally. Free cannot use Contacts/My Network to bypass paid initiation/Intelligence for a new unrelated problem.

### Free ↔ Free later

Do not create a free bypass to paid Intelligence/network initiation through systematic matching access.

External relationships are allowed. Members may exchange phone numbers, email or WhatsApp. BET does not own the relationship.

---

## 29. My Network / Contacts

My Network is **memory of relationships created through real BET value**, not a permission system for unrestricted messaging.

It may preserve:

- who the member met,
- through which problem,
- through which relevant Experience,
- when the relationship started,
- existing conversations in their original contexts.

Old conversations remain available under their original problem. Contacts do not automatically gain access to new private problems or the member's private business diary.

If an existing contact is genuinely relevant to a new problem, BET may match them again and create a new problem-context conversation.

---

## 30. 1:1 and Group Discussion

A problem owner may invite multiple qualified members from the **same MatchPool** into a problem-specific **Group Discussion**.

Rules:

- only qualified members from that problem's pool,
- invitees accept/decline,
- participants cannot add arbitrary outsiders,
- no persistent generic community life outside the problem,
- 1:1 conversations remain available.

---

## 31. Topic Guard

Conversation should stay on the problem that created it while allowing normal clarifying context.

If a member clearly starts a different business problem, BET should intercept the outgoing message and offer to move the unsent text into a new Ask BET question.

Example: team size is valid context inside a hiring problem. “By the way, has anyone expanded to Germany?” is a new problem.

---

## 32. No Track / Follow feature

**Track is removed from BET.**

Do not implement `Track Person`, `Track Business`, `Track Experience`, follower counts, tracking digests or follow-style activity notifications.

The current product model already supplies the needed relationship through problem-specific matches, My Network and saved Experiences. Track would duplicate those concepts and pull BET toward social-media behavior.

A member may **Save** a specific Experience for personal retrieval, but Save does not create follow notifications or new access rights.

---

# PART VII — AUTHORITY

## 33. Simple Authority signal for v0.1

Do not build stars, levels, XP, leaderboards, “Top Contributor” badges or points for every activity.

The initial Authority signal is intentionally simple:

**Count the number of distinct business problems in which another member marked this person's Experience as helpful.**

The unit is a **problem**, not a unique user and not the number of Experience clicks. If the same person's Experience is helpful in five different problems for one member, that can count as five problems. Multiple Experiences from the same author used in the same problem should not inflate the count.

Do not publicly count negative feedback as reputation punishment. `Not helpful` can remain an internal quality/matching signal.

Suggested neutral microcopy (final wording can be refined in UI design):

`Experience helpful in 77 business problems`

This may be visible on a profile or Match Card even when identity details are hidden, subject to privacy rules.

Do not claim the person “solved 77 problems” unless BET later has evidence that supports that stronger claim.

---

# PART VIII — NOTES, NOTIFICATIONS AND FEEDBACK

## 34. Persistent Private Notes

BET may include a simple persistent private Notes workspace, not a Notion clone.

Desktop: persistent side panel. Mobile: state-preserving sheet/panel. Notes may be typed or voice-created while viewing Experiences, matches or conversations.

Keep it simple: chronological notes + search + optional reference to a BET object.

### Hard privacy boundary

**Private Notes are a closed drawer. BET Intelligence does not read them.**

No:

- AI reading,
- embeddings,
- indexing,
- matching,
- automatic extraction/classification,
- Intelligence use.

Only an explicit action on a specific note crosses the boundary, e.g.:

`Use in BET → Ask BET about this / Add to Business Context / Add to Experience`

That action creates a submitted copy. The original private note remains private.

UI should state clearly:

> **Your Notes are private. BET doesn't read or use them unless you choose to send a note to BET.**

---

## 35. Notifications

BET notifies members about **relevant action/value**, not general platform activity.

Core notification classes:

1. **New qualified match for my active problem/question.** This includes a first match after previously having zero and additional new matches while the problem remains active.
2. **I am a match for another member's problem** because my existing Experience qualifies.
3. **Live Research request** because BET has a reasonable basis to think I may possess relevant experience that is not yet recorded. This is explicitly not called a match until Experience is captured and qualifies.
4. **Problem-context contact/message/invitation** that requires my attention.
5. **Outcome follow-up** at the agreed Journey cadence where an update is still missing.

Do not send engagement notifications such as:

- “people in your industry are asking…”,
- “five similar businesses joined”,
- “what's new in BET”,
- “someone you know added an Experience”,
- Track/follow updates.

Aggregated emerging business problems may someday become an Intelligence product, but not a notification gimmick.

Closed problems stop proactive new-match notifications until reopened.

---

## 36. Feedback

Useful lightweight feedback includes:

- `helpful` / `not_helpful` for an Experience in the context of a specific problem,
- retrieval relevance feedback,
- whether a suggested Live Research request was relevant to the recipient,
- later decision/action/outcome updates.

Feedback should improve retrieval and Authority without becoming social popularity mechanics.

---

# PART IX — ACCESS AND MONETIZATION

## 37. Launch access

During the initial free launch, eligible verified members receive full core access without payment so BET can build Experience density, observe real use and tune retrieval.

Do not impose visible product quotas on legitimate Ask BET use during this phase.

**Quality gate instead of quantity gate.**

A member may ask as many genuine business questions as needed. Use background technical anti-abuse/rate protection for bots, spam and pathological load.

Live Research is separately throttled to protect recipients from request fatigue; do not punish the asker for asking a legitimate question.

Every qualified unanswered problem is useful unmet-demand data for improving Experience coverage.

---

## 38. Future Free Member

After paid Intelligence launches, a verified Free member can:

- maintain account/profile and verified businesses,
- add Business Context,
- capture Experience via text/voice,
- maintain own Business Journey,
- create/update own Problems/Open Decisions,
- choose supported Experience/problem visibility,
- be discoverable through qualified matching where permitted,
- receive/respond to legitimate Paid-initiated problem-context contact,
- submit Ask BET questions for pre-match availability/counts,
- retain My Questions/My Network/history according to product rules.

Free cannot systematically inspect the collective Experience corpus, receive full Ask BET synthesis/source drill-down or initiate paid Intelligence/network access through a workaround.

---

## 39. Future Paid Intelligence Member

Paid includes Free capabilities plus collective Intelligence access, including:

- full Ask BET retrieval/synthesis,
- qualified matches and underlying eligible Experience,
- source drill-down,
- paid discovery/intelligence capabilities,
- later advanced Intelligence features where released.

One subscription covers all independently verified businesses in the Member Account.

Contribution and own business memory must not require Paid Intelligence. Systematic access to collective BET knowledge can be paid.

---

## 40. Entitlements

Do not scatter `is_paid` checks across product code. Use centralized capability/entitlement policy.

Canonical capability keys for the current architecture:

- `contribute_experience`
- `manage_own_journey`
- `publish_open_decision`
- `receive_problem_matches`
- `member_contact`
- `collective_discovery`
- `ask_bet_intelligence`
- `source_drilldown`
- `live_research`
- `behavioral_patterns` (future)

**Removed:** `track_members`.

Launch full access is an **EntitlementGrant**, not a fake paid subscription. Feature flags and entitlements are separate concepts.

Future billing provider events update internal Subscription/Entitlement state. Ask BET and retrieval depend on BET's internal access state, not direct payment-provider calls.

---

# PART X — ACCOUNT AND DATA LIFECYCLE

## 41. Subscription cancellation, hibernation and deletion

**Cancel subscription ≠ Delete account.**

Default lifecycle:

`Paid → cancel → Free`

Account, history and permitted data remain; paid capabilities stop.

Optional `Hibernate` may suppress normal use/notifications while retaining the account/history for later return.

`Permanent Delete Account` is separate and deliberate.

---

## 42. Deletion transparency

Before permanent deletion, BET must clearly show:

- **What will be deleted**
- **What the member may choose to leave in BET**
- **What may remain as part of another member's independent history, and why**

Separate data categories:

1. **Personal Account Data**
2. **Contributed Knowledge / Experience**
3. **Shared Interaction History**

A member may separately choose whether eligible contributed Experience can remain after account deletion. Consent to retain Experience does not imply consent to retain unnecessary identity data.

If the member requests full removal, remove contributed data where required/allowed by applicable law and do not secretly retain the full corpus.

Where another member's independent Journey truthfully records that a now-deleted source influenced a historical decision, preserve only the minimum legally permitted/necessary historical trace without exposing the deleted member's profile or deleted Experience.

Exact legal retention rules require production legal review. Do not encode a universal “retain everything for N years” rule.

**No hidden retention. No unexpected use of data.**

---

## 43. Experience edit, versioning and withdrawal

User UX stays simple: `Edit` or `Delete/Withdraw`.

Architecture must know source currency.

An Experience has a stable logical ID and can have version records/statuses such as:

`v1 active → v1 superseded → v2 active`

or

`active → withdrawn/deleted`

Rules:

- new retrieval/matching uses only the current active version,
- superseded versions are removed from active search/index eligibility,
- a material edit triggers re-structuring/re-indexing,
- Evidence Packs record the exact Experience version used at the time,
- historical Ask BET answers can therefore identify that their source was later updated/withdrawn,
- withdrawal stops future use,
- deleting/withdrawing a source does not rewrite another member's independent historical Journey, but it does not preserve access to deleted content merely because it was used before.

For v0.1, implement only the minimum needed, but keep the schema extensible so mature version/audit tooling can be added later without rebuilding the core model.

---

# PART XI — CANONICAL DATA MODEL

## 44. Core logical objects

Physical tables may differ, but preserve these logical distinctions.

### Identity and business

- `Member`
- `Business`
- `MemberBusinessRole`
- `BusinessSnapshot`
- `BusinessContextEntry`
- `VerificationCase`

### Source capture

- `MediaAsset`
- `VoiceCapture`
- `TranscriptVersion`
- `SourceProvenance`

### Experience / Journey

- `ExperienceRecord`
- `ExperienceVersion`
- `DecisionEpisode`
- `OutcomeObservation`
- `JourneyEvent`

### Ask BET / problems

- `AskQuery`
- `QueryProfile`
- `OpenDecisionRecord`
- `MatchPool`
- `ProblemMatch`
- `LiveResearchRequest`
- `LiveResearchCandidate`

### Intelligence

- `TaxonomyConcept`
- `EmbeddingRecord`
- `RetrievalRun`
- `EvidencePack`
- `EvidenceItem`
- `SynthesisClaim`
- `FeedbackEvent`

### Network

- `Conversation`
- `ConversationParticipant`
- `Message`
- `NetworkRelationship`
- optional `TopicGuardDecision`

### Private Notes — isolated domain

- `PrivateNote`
- `PrivateNoteReference`
- `SubmittedNoteCopy`

Private Notes storage/indexing must remain outside AI/retrieval pipelines until explicit submission.

### Access / lifecycle

- `Plan`
- `Subscription`
- `Entitlement`
- `EntitlementGrant`
- `FeatureFlag`
- `AccountLifecycleState`
- `DataDeletionRequest`
- `RetentionChoice`

No Track/Follow objects belong in the canonical model.

---

## 45. Key relationships

Conceptually:

`Member 1—N MemberBusinessRole N—1 Business`

`Business 1—N BusinessSnapshot`

`Business 1—N ExperienceRecord 1—N ExperienceVersion`

`Business 1—N OpenDecisionRecord`

`OpenDecisionRecord 1—1 MatchPool 1—N ProblemMatch`

`ProblemMatch → eligible ExperienceVersion and/or matched MemberBusinessRole`

`OpenDecisionRecord 1—N Conversation`

`Conversation N—1 OpenDecisionRecord`

`Conversation 1—N Message`

`RetrievalRun 1—1 EvidencePack 1—N EvidenceItem`

`EvidenceItem → exact ExperienceVersion`

`SynthesisClaim N—N EvidenceItem`

`FeedbackEvent → OpenDecisionRecord + ExperienceRecord/Member where relevant`

Authority helpful-problem count is derived from qualifying `FeedbackEvent(helpful)` grouped by distinct `OpenDecisionRecord` per contributing member.

---

# PART XII — AI, RETRIEVAL AND SOURCE TRACEABILITY

## 46. AI boundaries

AI may:

- transcribe,
- map free text to taxonomy/DNA concepts,
- structure source material,
- generate schema-constrained Query Profiles,
- rerank candidates,
- synthesize an answer from an authorized Evidence Pack,
- ask a single useful clarification,
- help Support faithfully formulate a query.

AI may not:

- decide authorization,
- expose private data,
- invent Experience facts,
- convert reported facts into verified facts,
- silently publish questions,
- read Private Notes,
- create network rights outside a valid problem match,
- decide billing entitlements.

Backend/application policy owns those boundaries.

---

## 47. Evidence Packs and grounded synthesis

The synthesis model receives a compact authorized **EvidencePack**, not unrestricted database access.

Each EvidenceItem carries stable source identifiers and relevant provenance. Synthesis claims should be linkable to the supporting EvidenceItems.

Authorization happens **before** evidence is supplied to the model.

When evidence is insufficient, return insufficient evidence. Do not fabricate an answer.

---

## 48. Retrieval observability and evaluation

Log/replay enough non-sensitive metadata to evaluate:

- candidate generation,
- filters,
- reranking,
- threshold decisions,
- source versions,
- latency,
- model/provider version,
- user relevance feedback,
- Live Research candidate quality.

Maintain an evaluation harness with representative queries and expected relevant/irrelevant cases. Optimize first-5/first-10 quality, not corpus size shown.

---

# PART XIII — TECHNICAL ARCHITECTURE

## 49. Build small, architect large

The core engineering rule is:

> **Implement the smallest product needed now, but model foundational objects so future capability can be added without rebuilding BET from scratch.**

Do not prematurely implement enterprise complexity. Do not create architectural dead ends either.

Typical future change should look like adding a status/table/relation/worker/capability to an existing boundary, not rewriting the entire data model.

Refactoring will still happen; the goal is to avoid avoidable foundational rewrites.

---

## 50. Application shape

A **modular monolith** is preferred for v0.1. Do not create microservices for appearance.

Keep clear internal module boundaries for:

- auth/member identity,
- verification,
- business/context,
- Experience/Journey,
- Ask BET/problems,
- retrieval/indexing,
- AI orchestration,
- matching/Live Research,
- network/messaging,
- notifications,
- Private Notes,
- entitlements/billing,
- lifecycle/privacy administration.

Use stateless application instances where practical and managed durable stores.

---

## 51. Asynchronous pipeline

Long-running work should use durable jobs/queues rather than blocking web requests.

Example Experience flow:

`voice saved → transcription job → transcript saved → structuring job → structured representation → quality check → indexing job → eligible for matching`

Example edit flow:

`edit submitted → new ExperienceVersion → structure → index → atomically activate new version → supersede old version → invalidate old active retrieval projections`

Example Ask BET flow:

`query saved → QueryProfile → retrieval → rerank/threshold → EvidencePack → synthesis`

If no qualified evidence:

`no match → optional Live Research candidate selection → targeted requests → new Experience capture → qualification → match → notification`

Queues need bounded concurrency, retries/backoff and dead-letter visibility.

---

## 52. Idempotency and data integrity

Every retriable write/job must be idempotent or protected by an idempotency key so retries do not create duplicate Experiences, Outcomes, messages, subscriptions or notifications.

Use:

- stable opaque IDs,
- explicit timestamps/statuses,
- foreign-key/relationship integrity where supported,
- migrations from the first production schema,
- canonical queryable objects rather than unversioned free-form JSON as the sole source of truth.

Flexible JSON/document fields are acceptable for evolving model payloads/projections, not as the only canonical storage for core entities.

---

## 53. Search/index consistency

Search/embedding records are projections of canonical data, not the source of truth.

Each index entry should carry at minimum:

- canonical object ID,
- source version ID,
- eligibility/status,
- visibility/access metadata needed for pre-filtering,
- embedding/model version,
- created/updated timestamp.

When a source is superseded or withdrawn, deactivate/invalidate its search projections so new retrieval cannot use stale content.

---

## 54. Graceful degradation

Under provider failure or load:

- preserve user submissions durably,
- queue AI work rather than lose it,
- show processing state rather than fake completion,
- Ask BET may return a clear temporary failure rather than unsupported synthesis,
- Live Research may wait rather than broadcast widely,
- non-critical notifications can be delayed.

---

## 55. Provider abstraction

Keep replaceable interfaces around:

- LLM/synthesis,
- embeddings,
- transcription,
- email/push notification,
- auth,
- payments.

Do not let provider-specific payloads become canonical business objects.

---

# PART XIV — SECURITY AND PRIVACY ENGINEERING

## 56. Security baseline

Use managed infrastructure and mature providers for security-critical capabilities rather than custom implementations where possible.

Engineering baseline:

- TLS,
- secure managed auth,
- least privilege,
- server-side authorization,
- secrets management,
- rate limiting/anti-abuse,
- backups and restore testing,
- dependency scanning,
- audit/security logs appropriate to risk,
- OWASP ASVS as implementation checklist.

Do not collect unnecessary sensitive identity data. PESEL is not currently needed.

---

## 57. Data separation

Keep strong logical/technical boundaries among:

1. **Identity / Verification Vault**
2. **Experience Graph / Intelligence data**
3. **Member-visible presentation layer**
4. **Private Notes Vault**

Private Notes must not be routed to AI/indexing infrastructure before explicit submission.

Send only the minimum necessary identity/context to external AI providers.

---

# PART XV — NOTIFICATIONS, COST AND OPERATIONS

## 58. Operational observability

Monitor at minimum:

- registrations and verification queue age,
- AI job success/failure/latency,
- queue age/backlog,
- Ask BET stage latency,
- retrieval threshold/no-match rate,
- Live Research request/response/qualification rate,
- DB/search saturation,
- provider errors/rate limits,
- AI/transcription cost,
- media storage growth,
- entitlement denials,
- billing/webhook failures when billing launches,
- notification delivery/fatigue indicators.

---

## 59. Verification operations

Early launch may use a human verification queue. Suggested states:

`pending_verification → verified → verification_issue`

“Usually up to 24 hours” can be product guidance, not a hard SLA.

Each added business is independently verified. Business existence alone does not prove the member's role; verify role/period through appropriate evidence/public corroboration where possible.

---

# PART XVI — ACCOUNT STATES AND FEATURE FLAGS

## 60. Feature flags

Capabilities not ready for launch may be disabled through feature flags without removing their architecture.

Flags may support environment and later controlled cohort rollout.

**Feature flag ≠ entitlement.** A feature can be globally unavailable despite entitlement, or enabled only for a test cohort.

Track is not a disabled future feature; it is a product decision to remove it unless a future product review explicitly reintroduces it.

---

# PART XVII — v0.1 SCOPE

## 61. Required v0.1 product path

1. Public marketing landing only.
2. Signup/login.
3. Eligibility and Human Verification.
4. Member account + one/multiple verified businesses.
5. Business Snapshot / Business Context capture.
6. Experience capture via text and voice.
7. Faithful transcript/source preservation.
8. AI structuring + quality clarification when necessary.
9. `Send to BET` and visibility controls.
10. Business Journey.
11. Ask BET against real stored Experience.
12. Query Profile + hybrid retrieval + relevance threshold.
13. Evidence Pack + grounded synthesis + source traceability.
14. OpenDecisionRecord / My Questions.
15. MatchPool / qualified problem matches.
16. Context Re-Matching.
17. Targeted Live Research when appropriate.
18. Problem-context 1:1 communication; Group Discussion if feasible.
19. My Network as relationship memory.
20. Helpful feedback per problem + simple Authority count.
21. Outcome follow-ups ~1/3/12 months.
22. Notifications limited to relevant match/action events.
23. Entitlement layer from day one; launch full-access grant.
24. Admin/verification/moderation tools sufficient for launch operations.
25. Privacy/Terms/consent/data lifecycle implementation.
26. Backups, monitoring, analytics/error monitoring and e2e testing.
27. Private Notes if feasible without compromising the privacy boundary.

Explicitly **not** required for v0.1:

- public Experience browsing,
- generic people search,
- Track/Follow,
- feed/community groups,
- vanity dashboards,
- leaderboards/gamification,
- cross-member generic networking,
- portfolio analytics across own businesses,
- Behavioral Patterns/Decision Behavior Intelligence,
- teams,
- exact financial benchmarking,
- complex enterprise version-management UI.

---

# PART XVIII — HOME / INTERFACE STATUS

## 62. Home remains visually open

The exact logged-in Home/dashboard composition is not yet visually locked. Do not treat the current static prototype as final UX.

Functional direction is stable:

- Ask BET/problem entry must be prominent for full-Intelligence users.
- My Questions/Problems should expose active questions and match states without becoming a feed.
- Capture Experience/Business Context must remain easy.
- Notes may be globally accessible as a private side workspace.
- No Track widgets or generic industry activity feed.
- No fake KPI dashboard.

Final Home design should use professional institutional/strategy-intelligence references and the established premium editorial visual language.

---

# PART XIX — VISUAL SYSTEM

## 63. Visual direction

BET should feel closer to private banking, strategy intelligence, institutional research and high-end editorial business information than to generic AI SaaS.

Direction:

- burgundy + beige + ivory,
- restrained density,
- editorial/data-record hierarchy,
- lines, tables, indexes and structured evidence,
- light sidebar preferred,
- burgundy as accent/status rather than giant surfaces,
- gender-neutral,
- low visual fatigue.

Avoid:

- giant AI cards,
- gradients/glows,
- robot/sparkle AI symbolism everywhere,
- social-feed patterns,
- generic startup-SaaS aesthetics,
- decorative charts without decision value.

The first association should be **credible business information**. AI should feel secondary/invisible.

---

# PART XX — LAUNCH AND GROWTH OF THE EXPERIENCE GRAPH

## 64. Initial density strategy

Launch global and English-only initially, while seeding the graph with real verified entrepreneurs available to the founder.

A useful early target pattern is multiple records per entrepreneur rather than one polished founder story, e.g. 10 entrepreneurs × 5 real decision episodes = 50 Experience records.

Historical Experience is valuable. Capture failures, reversals and long-term outcomes, not just wins.

The primary product risk is weak evidence density. Solve it by collecting more real Experience and using targeted Live Research, not by lowering match thresholds and showing irrelevant material.

---

## 65. Knowledge flywheel

Core loop:

**Problem → Ask BET → relevant Experience → Decision → Action → Outcome → new Experience**

When no Experience exists:

**Problem → unmet demand → targeted Live Research → newly captured Experience → qualified match → future reusable evidence**

Network loop:

**real problem → relevant experience/person → help → relationship → My Network → future problem → new/repeated qualified match**

Reputation loop:

**Experience → helpful in a real problem → Authority signal → more trusted context for future members**

---

# PART XXI — CANONICAL PRODUCT RULES

## 66. Rules that should not drift during implementation

1. BET knowledge is account-gated.
2. Human Experience is the source; AI is the structuring/intelligence layer.
3. Source meaning may not be rewritten or upgraded.
4. Questions/problems are private by default.
5. A weak candidate is not shown merely to avoid a zero-result state.
6. Internal scoring may exist; user-facing match percentages do not.
7. `0 matches` is a valid and trustworthy answer.
8. Active unanswered problems remain eligible for future re-matching.
9. Live Research asks only plausible experience holders, never the whole network.
10. `Yes` to a Live Research qualification question is not yet a match.
11. Every human-to-human BET conversation belongs to a concrete problem.
12. Contacts do not create unrestricted messaging rights.
13. Network relationships may continue off-platform; BET does not create lock-in.
14. Track/Follow is removed.
15. Authority starts with one simple factual signal: distinct business problems where the member's Experience was marked helpful.
16. Private Notes are inaccessible to BET Intelligence until explicit submission.
17. Free launch has no visible legitimate-query quota; quality and anti-abuse controls replace arbitrary caps.
18. Free future users may see qualified match availability, not paid collective knowledge.
19. No value means no upgrade pressure.
20. Notifications are about relevant match/action events, not platform engagement.
21. Edit/withdraw must invalidate stale source use in new retrieval.
22. Evidence Packs record exact source versions.
23. Cancel subscription does not delete the account.
24. Permanent deletion is transparent and separate from billing state.
25. Build small, architect large: simple v0.1, extensible foundations.

---

# PART XXII — IMPLEMENTATION CHECKLIST BEFORE REAL BACKEND BUILD

## 67. Before coding production data flows

Confirm and freeze:

- canonical IDs and status enums,
- business/membership/verification relations,
- ExperienceRecord vs ExperienceVersion separation,
- OpenDecisionRecord lifecycle,
- MatchPool/ProblemMatch schema,
- Conversation bound to OpenDecisionRecord,
- visibility/authorization matrix,
- entitlement keys,
- Private Notes isolation,
- EvidencePack/source-version traceability,
- queue/job boundaries,
- deletion/withdrawal propagation to search indexes,
- notification event types,
- audit/legal requirements with counsel before paid scale.

The current static HTML is a prototype and must not dictate the production data model.

---

## 68. Final architecture principle

BET should become more capable by **adding modules and relationships to a stable core**, not by repeatedly rebuilding the core.

The stable core is:

**verified member/business context + faithful Experience + historical Snapshot + concrete Problem + qualified Match + source-traceable Intelligence + outcome over time.**

Everything else should extend that core without changing what BET fundamentally is.

---

# POST-AUDIT ADDENDUM — GUIDED CONTRIBUTION, ONBOARDING, HELP, SUPPORT AI & PORTABILITY

Status: **LOCKED — 2026-09-01**. This addendum is canonical and supersedes any earlier wording that conflicts with it.

## 1. Contextual Example Placeholders — every member-authored input
Every text input or textarea where a member is expected to contribute meaningful content MUST contain a realistic contextual example in the empty state. The example is a placeholder, not pre-filled data: it disappears as soon as the member starts typing and is never submitted as member content.

Rules:
- examples show the desired level of specificity rather than instructing with abstract form language;
- examples must fit the exact field (Ask BET question, Experience, Business Context, outcome update, Live Research response, etc.);
- use natural founder/operator language;
- rotate examples where useful to avoid training members into one narrow template;
- examples may demonstrate approximate dates, amounts, percentages, ranges, time-to-result, increases/decreases, losses/gains, actions, failures and reversals;
- never imply that exact numbers are mandatory; estimates/ranges are useful and members must never invent numbers they do not know;
- placeholder content is UI guidance only and MUST NOT enter the Experience Graph, embeddings, analytics as member content, or AI evidence.

## 2. One-time first-use BET onboarding
After verification / first authenticated entry, show a short, skippable first-use onboarding. It appears automatically once, not on every visit. A member can reopen the same guide later from Help.

Purpose: explain not merely where to click, but why BET works differently and why concrete human experience improves the system.

Required concepts:
1. **What BET is:** real business experience, not generic advice. Bring a real problem/decision; BET finds what actually happened in relevant businesses.
2. **How to ask well:** concrete situation + decision/problem beats generic questions. Show `Instead of / Try` examples.
3. **How to contribute useful Experience:** what happened, what the member did, what happened afterward. Dates, ranges, amounts, increases/decreases, time and concrete observations are useful when remembered. Failure and non-results are as valuable as success.
4. **Voice lowers effort:** members may speak naturally; even a short answer can be useful. BET structures it faithfully rather than rewriting the meaning.
5. **Why context matters:** the more accurately BET understands what actually happened, the better it can match the member's Experience to someone who needs it and match the member to Experience that can help them.
6. **Privacy boundary:** data available to BET for permitted matching/intelligence is distinct from what other members can see.

Canonical principle:
**Explain the value exchange: better truthful context → better matching for me and for others.**

Persist `onboarding_status = not_started | completed | skipped` plus timestamps. `skipped` must not trigger repeated automatic onboarding. Help may restart it manually.

## 3. Initial Business Journey seeding during setup
During initial business setup, invite the member to add **2–3 significant situations** from the history of that business. This is an invitation and quality prompt, not a completion barrier.

Explain what counts:
- a meaningful problem, decision, experiment, change, success, failure, loss, reversal or turning point;
- it may be recent or many years old;
- a business closure/failure is valid evidence;
- the member can write or speak naturally;
- useful shape: **what happened → what I/we did → what happened afterward**;
- if remembered, include approximate date/period, scale, amount/range, percentage/range, increase/decrease, gain/loss, duration or other concrete observation;
- never guess or manufacture missing numbers.

Do not ask for the entire life story. Copy should communicate: **Start with 2–3 situations you remember. You can add more anytime.**

The purpose must be visible: past Experience may become useful evidence for another business facing a similar situation, and it gives BET historical context for better future matching.

Each situation becomes its own draft/source capture and, only after explicit `Send to BET`, follows the normal Experience pipeline.

## 4. Progressive quality guidance — not forms
BET should improve source quality with minimal friction:
- prefer examples over long instructions;
- prefer voice/text freedom over mandatory multi-field case-study forms;
- after capture, ask at most one concise, high-value clarification when the record is too vague for useful matching;
- do not equate length with quality: ten seconds of concrete Experience may be more valuable than ten minutes of vague narrative;
- never force a number;
- preserve original audio/transcript and source meaning.

## 5. Help & Guide — discoverable, not prominent
Create a persistent **Help & Guide** area reachable from a low-prominence Help entry / contextual `?` links. It must not dominate Home or become a permanent tutorial panel.

Initial guide index:
- How to ask BET a good question
- How to share a useful Experience
- What counts as an Experience?
- How matching works
- Voice or text?
- What other members can see
- Live Research
- My Questions & matches
- Profiles, My Network & conversations
- Editing or deleting Experience/data
- Technical help

Guide content should use concise concrete examples. Repeated real support questions should later inform new/updated guide entries.

## 6. Support AI — technical/product support ONLY
Support AI is a separate bounded system from Ask BET.

Support AI MAY:
- explain navigation and product controls;
- explain how to add/edit/delete content and adjust visibility;
- explain statuses and feature mechanics;
- troubleshoot supported product usage using approved Help/Product documentation;
- collect a technical problem description and relevant non-sensitive diagnostic context;
- escalate unresolved issues to human support.

Support AI MUST NOT:
- answer business questions;
- provide Business Experience Intelligence;
- query the Experience Graph for business evidence;
- use Evidence Packs / Ask BET retrieval;
- make business recommendations;
- silently transform a support conversation into an Ask BET query;
- access Private Notes.

If a user asks a business question in Support, Support routes them to Ask BET. If Support cannot resolve a technical/product issue, it offers **Contact Support / Send to support** and creates a human-support escalation containing the user's description, conversation context needed to solve the issue, product route/version and safe diagnostics. Do not include secrets or unrelated private data.

Support AI and Ask BET MUST have separate prompts, permissions, APIs/logical modules and data access. Support AI knowledge source = approved Help & Guide + product documentation/release metadata, not the Experience Graph.

Minimum schema foundation:
- `SupportConversation`
- `SupportMessage`
- `SupportKnowledgeArticle`
- `SupportEscalation`
- `SupportDiagnosticContext`

Support escalation states: `open → acknowledged → resolved | closed`.

## 7. Ask BET remains the core intelligence machine
Ask BET remains the Business Experience Intelligence engine defined elsewhere in this MASTER. Nothing in Help or Support AI replaces, shortcuts or dilutes Ask BET. Business questions belong to Ask BET.

## 8. Low-cost production architecture with migration path
The product must be built **small and inexpensive now, but portable from day one**. The target early architecture should comfortably support the first ~1,000–2,000 members/subscribers without requiring a rewrite solely because that count is reached.

Rules:
- frontend calls a BET-owned API contract; do not couple UI directly to a single hosting vendor;
- use standard PostgreSQL-compatible canonical storage for relational core data where practical;
- use migrations checked into source control;
- storage, email/notifications, transcription, LLM, embeddings, payments and search sit behind BET-owned provider interfaces/adapters;
- secrets remain server-side;
- environment configuration is externalized;
- use stable opaque IDs and exportable canonical data;
- asynchronous AI/transcription/indexing jobs are idempotent and retryable;
- search/vector indexes are rebuildable projections, never the sole source of truth;
- media/source assets have explicit ownership, retention and export/migration procedures;
- avoid provider-only primitives in core domain logic when an adapter boundary can contain them;
- document backup, restore and provider migration runbooks before paid launch;
- production paid launch requires monitoring, alerting, tested backups/restores, access review and security review.

The initial managed infrastructure may change without changing BET's domain model. A later migration is an infrastructure project, not a product rewrite.

## 9. Remaining product decisions after the 18-point audit + this addendum
Outside the intentionally open exact logged-in Home visual layout, the product model is sufficiently specified to continue implementation. The following are **implementation/operational decisions still to be finalized**, not missing core product concepts:

1. Exact production vendor stack and region/data-residency configuration.
2. Exact human-support destination/workflow and support response expectations.
3. Exact transactional email provider/templates and notification channel preferences.
4. Exact payment provider/tax/VAT implementation before monetization.
5. Exact legal copy and jurisdiction-specific Terms/Privacy/DPA; legal review is required before production handling of real member data.
6. Exact verification admin workflow/evidence retention rules.
7. Exact abuse/moderation appeals and incident-response procedures.
8. Exact retention periods for operational logs, raw audio and support diagnostics consistent with privacy/legal requirements.
9. Exact disaster-recovery targets (RPO/RTO) before paid launch.
10. Accessibility, keyboard/mobile and end-to-end usability pass before public launch.
11. Corpus seeding and quality-validation protocol: prove that the first real Experiences produce Ask BET results users could not reasonably get from generic web/AI/random peers.

These do **not** justify adding more member-facing features now. Priority remains: high-quality Experience capture → qualified matching → grounded Ask BET value.

# POST-AUDIT ADDENDUM II — SECURITY OPERATIONS, MEMBER DATABASE & OWNER RESPONSIBILITIES

Status: **LOCKED — 2026-09-01**. This addendum is canonical and extends the security, data-model and operations sections above.

## 10. Canonical database choice
BET should use **PostgreSQL-compatible relational storage as the canonical operational database** for the core product. PostgreSQL is SQL-based, mature, portable and well suited to the relationships BET needs.

The canonical database stores product truth. Other systems are projections or specialized stores:
- PostgreSQL: members, businesses, roles, verification, Experiences, versions, problems, matches, conversations, entitlements, support, audit metadata and lifecycle state;
- object/media storage: original voice/audio and other binary files;
- search/vector indexes: rebuildable retrieval projections derived from canonical data;
- queues/jobs: asynchronous work state;
- logs/monitoring: operational/security telemetry with explicit retention.

Do not store large audio files directly in relational rows. Store a private object-storage reference in `MediaAsset` with ownership/access metadata.

## 11. Member registration must create canonical records immediately
When a person creates an account, the signup flow must write to the canonical backend/database immediately after the identity provider confirms the account.

Minimum registration transaction:
`AuthIdentity created → Member created → AccountLifecycleState created → default EntitlementGrant/launch access created → onboarding_status initialized → audit event written`.

If business setup follows, create:
`Business → MemberBusinessRole → BusinessSnapshot/BusinessContextEntry as supplied → VerificationCase`.

A member must never exist only in a frontend browser state. The backend owns canonical account creation.

Use stable opaque IDs. Identity-provider IDs may be stored as external references but must not become the only domain identifier.

## 12. Owner/Admin member directory
BET requires an authenticated admin-only member directory for operational use. It is not a public people search and must be unavailable to normal members.

Minimum admin list columns/filterable fields:
- internal Member ID;
- name / verified identity fields available to authorized admin;
- primary email;
- account created date;
- account lifecycle state (`active/free/paid/hibernated/deletion_pending/deleted` as applicable);
- verification status;
- associated businesses and role;
- current plan/launch grant;
- onboarding status;
- last successful login/activity timestamp where permitted;
- support/escalation indicator;
- moderation/security flag if present.

Admin may open a member detail view containing only data necessary for operations. High-risk identity/verification data must be separately permissioned and audited.

Every sensitive admin action must create an `AdminAuditEvent` with actor, action, target, timestamp and safe metadata.

## 13. Additional canonical operational objects
Add to the canonical model:
- `AuthIdentityRef`
- `MemberContactPoint`
- `MemberConsent`
- `AdminUser`
- `AdminRole`
- `AdminAuditEvent`
- `SecurityEvent`
- `SessionMetadata` (minimal, provider-linked where practical)
- `ApiRateLimitEvent` or equivalent telemetry projection
- `BackupRecord`
- `RestoreTestRecord`
- `IncidentRecord`
- `SupportConversation`
- `SupportMessage`
- `SupportEscalation`
- `SupportDiagnosticContext`

These objects support safe operations and must not be exposed to member-facing retrieval/Ask BET unless explicitly authorized by product logic.

## 14. What is stored about a member
The exact physical schema may evolve, but the data domains must remain separated.

### Account / identity
- canonical member ID;
- login identity reference from the auth provider;
- email/contact point needed for account operation;
- name/identity information voluntarily supplied or required for verification;
- timestamps and lifecycle state;
- consent/Terms/Privacy version acceptance.

### Business membership
- businesses associated with the member;
- role/title and relationship period;
- verification state for each business/role;
- current and historical Business Snapshots;
- Business Context entries.

### Experience Graph contribution
- each Experience as a separate `ExperienceRecord`;
- one or more `ExperienceVersion` objects per Experience;
- original source/audio/transcript references;
- structured facts, provenance and quality state;
- outcomes and later updates;
- visibility/eligibility state.

### Ask BET / problem history
- member questions/problems;
- Query Profiles;
- OpenDecision state;
- retrieval runs and source/evidence references needed for traceability;
- matches and match status;
- Live Research state.

### Network / communication
- problem-scoped conversations;
- participants;
- messages;
- relationship memory/My Network state.

### Access / billing
- plan/subscription state;
- entitlements and grants;
- billing-provider references when introduced;
- never store raw payment card data in BET.

### Support / operations
- technical support conversations and escalations;
- safe diagnostic context;
- verification/moderation/admin history where required;
- audit/security events with limited retention.

### Private Notes
Private Notes remain a separate privacy domain and are not readable by Ask BET, Support AI, matching or indexing until explicit `Use in BET` submission creates a separate submitted copy.

## 15. Security architecture — mandatory implementation controls
The following controls are architectural requirements, not future optional hardening:

1. **Server-side authorization for every protected read/write.** Never rely on hidden buttons or frontend checks.
2. **Deny by default.** Access is granted explicitly by role, ownership, relationship and entitlement.
3. **Object-level authorization.** Changing an object ID must never reveal another member's data.
4. **Admin separation.** Admin routes/actions require separate admin permissions and strong authentication.
5. **MFA required for owner/admin accounts.** Prefer phishing-resistant MFA/passkeys where supported.
6. **Secrets server-side only.** API keys, service credentials and database secrets never ship to the browser or public repository.
7. **Environment separation.** Development, staging and production use separate credentials and preferably separate data stores/projects.
8. **Rate limits and abuse controls** on login, signup, password reset, Ask BET, Support AI, uploads, source drill-down and expensive endpoints.
9. **Private object storage** for source media. Use short-lived signed access URLs where access is required.
10. **Upload validation** for allowed type/size/duration; never execute uploaded content.
11. **Encryption in transit and managed encryption at rest** for production stores.
12. **Minimal data to AI providers.** Do not send unnecessary identity or unrelated private context.
13. **AI cannot authorize.** Backend policy decides what evidence Support AI/Ask BET receives.
14. **Experience Graph anti-exfiltration.** No unrestricted corpus endpoint; retrieval is query-scoped, entitlement-scoped and rate-limited. Detect unusual systematic extraction.
15. **Audit logging** for admin access, permission changes, deletion/export actions and other sensitive operations.
16. **Security monitoring** for suspicious authentication, authorization denials, abnormal API consumption and unusual data-access patterns.
17. **Dependency/security scanning** in CI and before deployment.
18. **Backups plus restore tests.** A backup is not considered operationally valid until restoration has been tested.
19. **Origin/API protection.** Production origin should not be unnecessarily exposed around the chosen edge/WAF layer.
20. **External security review/pentest before material paid scale or sensitive enterprise use.**

## 16. Backup and disaster-recovery model
BET must have independent recovery paths for code, canonical data and media.

### Code
- canonical Git repository with full history;
- protected main branch/release tags once production begins;
- owner keeps an additional encrypted offline/local export of release packages at meaningful milestones.

### Database
- managed automated production backups;
- point-in-time recovery when economically justified/available;
- periodic encrypted database exports to a separate backup location/account/provider;
- documented restore procedure;
- restore tests recorded in `RestoreTestRecord`.

### Media / source audio
- private durable object storage;
- lifecycle/versioning/replication strategy appropriate to cost and risk;
- separate metadata in PostgreSQL so assets can be reconciled and migrated.

### Minimum early cadence
Before public real-user launch:
- automated daily database backup;
- periodic independent encrypted export (initially at least weekly while volume is small);
- backup of every production release/tag;
- restore test before launch and after material infrastructure change.

Before paid launch, define explicit RPO/RTO targets and increase cadence where needed.

## 17. Owner security checklist — actions the founder must personally control
The product must surface/remind the owner about these operational actions when the relevant provider/account is created. Do not assume the founder already knows them.

Mandatory owner actions:
- use a password manager and unique strong passwords for BET infrastructure accounts;
- enable MFA/passkeys on primary email, domain registrar, Git host, hosting/edge provider, database/storage provider, payment provider and admin account;
- store recovery codes securely offline and verify they are recoverable;
- never paste production API/database secrets into public code, screenshots, tickets or member-facing content;
- use separate production credentials from development/test credentials;
- keep at least one independent encrypted copy of important release artifacts and database exports;
- enable domain registrar lock and strong account recovery controls;
- periodically review who has access to Git, hosting, database, analytics, payment and admin systems;
- immediately revoke access/rotate secrets after staff/vendor access ends or a secret may have leaked;
- test that backups can actually restore;
- keep a simple incident contact/runbook: what to disable, where logs live, how to rotate credentials, how to communicate with users if required.

The assistant/developer workflow must explicitly tell the owner when one of these actions becomes necessary and provide exact step-by-step instructions for the chosen service. Do not defer critical founder-side security actions silently.

## 18. Portability and migration rules for security/data
BET must be movable without redesigning the product:
- PostgreSQL schema migrations remain in source control;
- canonical data export format is documented;
- provider IDs are external references, not sole domain identities;
- storage paths/asset metadata are portable;
- vector/search indexes can be regenerated;
- provider-specific auth/payment/email/AI implementations sit behind adapters;
- secrets/configuration are externalized;
- backup/export procedures are tested before a major provider migration;
- migration can be rehearsed in staging using restored data before production cutover.

The aim is not zero migration work. The aim is that a migration changes infrastructure/adapters, not BET's business model or core data relationships.

## 19. Payment & impersonation safety messaging
Status: **LOCKED — architecture present now; member-facing payment warnings disabled during free launch.**

BET must ship with payment/impersonation safety messaging already implemented behind a dedicated feature flag so monetization does not depend on remembering to add it later.

Canonical flag:
- `payment_safety_messaging` — default `false` during the fully free launch; enable when paid subscriptions/billing are introduced or earlier if an impersonation/phishing incident requires it.

When enabled, member-facing guidance must communicate that:
- official BET charges are disclosed through BET's official billing/account flow before acceptance;
- BET does not ask members to send money to another member, representative, personal bank account, crypto wallet, gift card, or unofficial payment link to unlock plan-included functionality;
- a suspicious or inconsistent payment request should not be acted on;
- the member can send the concern to Technical Support / Report suspicious activity;
- wording must not promise that BET will never introduce separately priced products or higher plans in the future.

Prepared paid-stage copy:
**Payments on BET**
Your subscription covers the BET features included in your plan. Official BET charges are shown through your BET account and official payment flow before you accept them. BET will not ask you to send money directly to another member or representative to unlock features included in your plan. If you receive a different or suspicious payment request, do not pay. Contact BET Support.

Prepared action label: `Report suspicious activity`.

Placement when enabled:
- Help & Guide → Safety & Security;
- Billing/subscription screen as a persistent low-emphasis safety block;
- Technical Support as a report/escalation route;
- optional temporary global security alert only during a real active phishing/impersonation campaign.

During free launch the normal payment-warning UI remains hidden (`payment_safety_messaging=false`), but the code, copy, routes and flag remain in the product. This is intentionally different from removing the feature.

---
# FINAL PRE-LAUNCH INFORMATION ARCHITECTURE LOCK — 2026-09-01

## Logged-in Home is now functionally locked
The logged-in Home is not a conventional dashboard. Its dominant job is immediate problem entry.

Primary prompt:
**What are you dealing with today?**
Supporting copy makes clear this may be a business problem, decision or situation. Text and voice are first-class inputs. A contextual example placeholder disappears when the member starts entering their own content.

Home may show only a restrained continuation layer below the primary prompt: recent/active Questions, new qualified match states, and a Business Journey follow-up when action is genuinely useful. No activity feed, generic industry news, vanity KPIs, trending content or engagement widgets.

## Primary member navigation
The intended primary logged-in information architecture is deliberately short:
- Home
- My Business
- My Network
- Notes

Low-prominence utility navigation:
- Help & Guide
- Technical Support
- Notifications bell in the top utility area
- Account/settings/avatar

Ask BET is the intelligence mechanism entered primarily from Home and from relevant contextual actions; it does not need to duplicate Home as a permanent primary navigation destination.

## My Business
My Business is the durable operating memory of the selected business. It contains internal tabs/views:
- Journey
- Experiences
- Questions
- Business Profile

For members with multiple verified businesses, a business switcher changes the active business context without mixing records between businesses.

## Notifications interaction contract
The bell is the unified in-app inbox for relevant BET events. A notification is actionable and deep-links to the exact underlying object rather than opening a dead-end notification detail screen.

Example: `New matches for your question` → click → exact Question detail → all currently qualified matches for that Question.

The same state is also visible contextually inside My Business / Questions. Email may notify the member outside BET and deep-link back to the same object.

## Question detail and matched people
A Question detail view contains the original problem/question, its state, relevant Experience evidence and all currently qualified matched people/Experience holders. It explains factual `Why this matches` dimensions and never displays user-facing match percentages.

Where communication entitlements permit it, the asker may:
- start a problem-bound 1:1 conversation with a qualified matched person;
- start separate 1:1 conversations with multiple qualified matched people;
- create a Group Discussion by inviting selected qualified people from that same Question's MatchPool.

Invitees accept or decline. A Group Discussion does not permit adding arbitrary outsiders. All conversations remain attached to the originating business problem. My Network later remembers relationships created through this value but does not create unrestricted messaging rights.

## Final launch rule
This information architecture is the canonical implementation direction. Exact visual composition, typography, spacing and component treatment may continue to be refined during launch testing without changing these product semantics.
\n\n# PRODUCTION SKELETON ADDENDUM — 2026-09-01\n\nThe repository now contains a real implementation skeleton rather than only a static prototype. Canonical production direction:\n\n- PostgreSQL is the source of truth; canonical migrations are under `db/migrations`.\n- The v0.1 backend is a portable TypeScript modular monolith (`apps/api`).\n- Browser code never receives database/service-role/AI secrets.\n- Managed auth is adapted through a server-side JWT/JWKS boundary; Supabase is an initial low-cost option, not a permanent dependency.\n- Member signup synchronizes an authenticated identity to a canonical `members` row and grants launch entitlements.\n- Each business and each Experience is a separate canonical record. Each material Experience edit creates a new version.\n- Private Notes remain a separate domain and are never read by Ask BET/Support AI without explicit submission.\n- Ask BET jobs, Experience structuring and future Live Research use a durable PostgreSQL job queue with retries/dead-letter status; this avoids requiring a separate queue service at closed-beta scale.\n- Search starts with portable PostgreSQL retrieval and is designed to add vector/reranking projections without changing canonical records. Public beta must not rely on lexical overlap alone: Business DNA + Decision DNA + quality threshold + evidence provenance are required before Ask BET is considered validated.\n- Support AI is strictly technical. Business questions route to Ask BET. Unresolved technical issues create a human support ticket.\n- Conversation creation is query-scoped and requires qualified MatchPool membership. Group Discussions are feature-flagged.\n- Notifications deep-link to the exact object/question.\n- Payment-safety messaging exists behind a disabled feature flag until billing exists.\n- The repository contains deployment, backup/restore, security, RLS defense-in-depth, CI and owner-action runbooks.\n\n## Owner/legal entity timing\nThe technical build does not require the BET operating company to be registered now. A paid billing entity can be added before paid launch. However, a free closed beta that processes real personal/business data still requires an identified data controller, Terms/Privacy and lawful processing disclosures before external users are invited. This is a launch/legal checkpoint, not a reason to create the paid company solely for writing code.\n\n## Production readiness meaning\nThis skeleton is designed so external providers can be connected without rewriting the product. It is not considered live until the owner authorizes external accounts/credentials and staging passes authentication, authorization, backup/restore, cross-user isolation and end-to-end tests.\n
## Owner Control Center, telemetry, consent and revenue history (v0.2)
BET has one restricted Owner Control Center combining company growth, user/product analytics, database/product-object health, operations and—when monetization is enabled—subscriptions/revenue. All aggregate views support day/month/year/custom ranges. Member drill-down is keyed by Member ID; question content is not an overview KPI. Private Notes remain outside admin visibility.

Telemetry is first-party and data-minimized. Active time is measured by bounded heartbeats only while genuinely active, not by open-tab duration. Browser-side non-essential analytics is consent-aware. Core server-side product events and security/operational logs are separated from optional marketing/analytics tracking.

Revenue reporting is based on immutable billing events, not only current subscription rows, so historical gross collected, refunds, fees and net collected can be reconstructed. Gross revenue must never be presented as profit.


### Owner filtering v0.3
The Owner Control Center supports composable filters across time range, signup country, payment/subscription state, plan, account state, verification state, activity cohort, business country/status and first-party acquisition source/campaign. The owner can choose visible columns. User-origin reporting uses coarse country codes; exact IP storage is not required. Payment state is derived from the canonical subscription record rather than duplicated in analytics.

## Public landing visual freeze — 03 Sep 2026

The public BET landing must read as an established global business-intelligence institution, not as an AI/SaaS landing-page template. The public page therefore uses editorial hierarchy, strong typography, ruled sections, restrained spacing and factual product language. Avoid fabricated activity metrics, floating cards, glowing/gradient surfaces, generic feature-card grids, AI iconography, decorative automation cues and over-explaining the technology. AI is infrastructure, not the visual identity. The public page may state that AI structures/retrieves/compares/synthesises, but the primary brand story remains human business experience and decision intelligence.
