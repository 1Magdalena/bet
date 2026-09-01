-- BET canonical PostgreSQL schema v0.1
-- Portable core. Supabase-specific hardening lives in infra/supabase.
create extension if not exists pgcrypto;
create extension if not exists citext;

create type account_status as enum ('pending','active','hibernated','suspended','deletion_requested','deleted');
create type onboarding_status as enum ('not_started','in_progress','completed','skipped');
create type verification_status as enum ('pending_verification','verified','verification_issue','rejected');
create type experience_status as enum ('draft','processing','active','withdrawn','deleted');
create type experience_version_status as enum ('active','superseded','withdrawn');
create type visibility_scope as enum ('private','matched_members','shared');
create type ask_status as enum ('draft','processing','matched','no_match','researching','closed','reopened','error');
create type match_status as enum ('candidate','qualified','dismissed','withdrawn');
create type job_status as enum ('queued','running','done','dead');
create type support_status as enum ('open','in_progress','resolved','closed');
create type notification_channel as enum ('in_app','email');
create type conversation_type as enum ('one_to_one','group');
create type conversation_status as enum ('active','closed');
create type subscription_status as enum ('none','trial','active','past_due','cancelled');
create type lifecycle_state as enum ('active','hibernated','deletion_pending','deleted');

create table members (
  id uuid primary key default gen_random_uuid(),
  auth_subject text unique,
  email citext unique not null,
  display_name text,
  account_status account_status not null default 'pending',
  onboarding_status onboarding_status not null default 'not_started',
  locale text not null default 'en',
  timezone text,
  is_admin boolean not null default false,
  lifecycle_state lifecycle_state not null default 'active',
  terms_version text,
  terms_accepted_at timestamptz,
  privacy_version text,
  privacy_accepted_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create table businesses (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  country_code char(2),
  website text,
  status text not null default 'current' check(status in('current','former','sold','closed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create table member_business_roles (
  id uuid primary key default gen_random_uuid(),
  member_id uuid not null references members(id) on delete restrict,
  business_id uuid not null references businesses(id) on delete restrict,
  role_type text not null,
  role_started_at date,
  role_ended_at date,
  verification_status verification_status not null default 'pending_verification',
  verified_at timestamptz,
  verification_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz,
  unique(member_id,business_id,role_type)
);

create table verification_cases (
  id uuid primary key default gen_random_uuid(),
  member_business_role_id uuid not null references member_business_roles(id) on delete cascade,
  status verification_status not null default 'pending_verification',
  evidence_json jsonb not null default '{}'::jsonb,
  reviewer_member_id uuid references members(id) on delete set null,
  reviewer_notes text,
  created_at timestamptz not null default now(),
  reviewed_at timestamptz
);

create table business_snapshots (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references businesses(id) on delete restrict,
  member_id uuid not null references members(id) on delete restrict,
  effective_at timestamptz not null default now(),
  industry text,
  specialization text,
  business_model text,
  customer_type text,
  employee_band text,
  revenue_band text,
  revenue_currency char(3),
  financial_state text,
  markets jsonb not null default '[]'::jsonb,
  locations jsonb not null default '[]'::jsonb,
  sales_motion jsonb not null default '[]'::jsonb,
  distribution jsonb not null default '[]'::jsonb,
  context_json jsonb not null default '{}'::jsonb,
  provenance text not null default 'member_reported',
  created_at timestamptz not null default now()
);

create table business_context_entries (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references businesses(id) on delete restrict,
  member_id uuid not null references members(id) on delete restrict,
  source_kind text not null check(source_kind in('text','voice')),
  source_text text,
  media_asset_id uuid,
  structured_json jsonb,
  provenance text not null default 'member_reported',
  created_at timestamptz not null default now(),
  deleted_at timestamptz
);

create table media_assets (
  id uuid primary key default gen_random_uuid(),
  member_id uuid not null references members(id) on delete restrict,
  business_id uuid references businesses(id) on delete restrict,
  storage_provider text not null,
  storage_key text not null unique,
  content_type text not null,
  size_bytes bigint not null check(size_bytes>=0),
  sha256 text,
  purpose text not null,
  status text not null default 'active',
  created_at timestamptz not null default now(),
  deleted_at timestamptz
);

alter table business_context_entries add constraint fk_business_context_media foreign key(media_asset_id) references media_assets(id) on delete set null;

create table voice_captures (
  id uuid primary key default gen_random_uuid(),
  member_id uuid not null references members(id) on delete restrict,
  media_asset_id uuid not null references media_assets(id) on delete restrict,
  capture_context text not null,
  status text not null default 'uploaded',
  created_at timestamptz not null default now()
);

create table transcript_versions (
  id uuid primary key default gen_random_uuid(),
  voice_capture_id uuid not null references voice_captures(id) on delete cascade,
  version_no int not null check(version_no>0),
  transcript_text text not null,
  kind text not null check(kind in('machine_original','user_approved')),
  created_at timestamptz not null default now(),
  unique(voice_capture_id,version_no)
);

create table experience_records (
  id uuid primary key default gen_random_uuid(),
  member_id uuid not null references members(id) on delete restrict,
  business_id uuid not null references businesses(id) on delete restrict,
  business_snapshot_id uuid references business_snapshots(id) on delete set null,
  active_version_id uuid,
  status experience_status not null default 'draft',
  visibility visibility_scope not null default 'matched_members',
  occurred_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create table experience_versions (
  id uuid primary key default gen_random_uuid(),
  experience_id uuid not null references experience_records(id) on delete cascade,
  version_no int not null check(version_no>0),
  source_kind text not null check(source_kind in('text','voice','imported')),
  source_text text not null,
  transcript_version_id uuid references transcript_versions(id) on delete set null,
  structured_json jsonb,
  structured_at timestamptz,
  provenance text not null default 'member_reported',
  status experience_version_status not null default 'active',
  created_at timestamptz not null default now(),
  superseded_at timestamptz,
  unique(experience_id,version_no)
);

alter table experience_records add constraint fk_active_experience_version foreign key(active_version_id) references experience_versions(id) on delete set null;

create table outcome_observations (
  id uuid primary key default gen_random_uuid(),
  experience_id uuid not null references experience_records(id) on delete restrict,
  member_id uuid not null references members(id) on delete restrict,
  observed_at timestamptz not null default now(),
  horizon text,
  source_text text not null,
  structured_json jsonb,
  provenance text not null default 'member_reported',
  created_at timestamptz not null default now(),
  deleted_at timestamptz
);

create table decision_episodes (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references businesses(id) on delete restrict,
  member_id uuid not null references members(id) on delete restrict,
  title text,
  problem_text text,
  decision_text text,
  action_text text,
  state text not null default 'open',
  created_at timestamptz not null default now(),
  closed_at timestamptz
);

create table journey_events (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references businesses(id) on delete restrict,
  member_id uuid not null references members(id) on delete restrict,
  event_type text not null,
  event_at timestamptz not null default now(),
  reference_type text,
  reference_id uuid,
  summary text,
  visibility visibility_scope not null default 'private',
  created_at timestamptz not null default now()
);

create table ask_queries (
  id uuid primary key default gen_random_uuid(),
  member_id uuid not null references members(id) on delete restrict,
  business_id uuid not null references businesses(id) on delete restrict,
  question_text text not null,
  query_profile jsonb,
  status ask_status not null default 'draft',
  match_count int not null default 0 check(match_count>=0),
  closed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create table open_decision_records (
  id uuid primary key default gen_random_uuid(),
  query_id uuid not null unique references ask_queries(id) on delete cascade,
  status text not null default 'active' check(status in('draft','active','closed','reopened')),
  visibility visibility_scope not null default 'private',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table retrieval_runs (
  id uuid primary key default gen_random_uuid(),
  query_id uuid not null references ask_queries(id) on delete cascade,
  algorithm_version text not null,
  started_at timestamptz not null default now(),
  finished_at timestamptz,
  candidate_count int,
  qualified_count int,
  metadata jsonb not null default '{}'::jsonb
);

create table problem_matches (
  id uuid primary key default gen_random_uuid(),
  query_id uuid not null references ask_queries(id) on delete cascade,
  experience_id uuid not null references experience_records(id) on delete restrict,
  experience_version_id uuid references experience_versions(id) on delete restrict,
  status match_status not null default 'candidate',
  internal_score numeric(8,6),
  rank_order int,
  why_match text,
  created_at timestamptz not null default now(),
  unique(query_id,experience_id)
);

create table evidence_packs (
  id uuid primary key default gen_random_uuid(),
  query_id uuid not null references ask_queries(id) on delete cascade,
  retrieval_run_id uuid references retrieval_runs(id) on delete set null,
  created_at timestamptz not null default now(),
  synthesis_text text,
  synthesis_model text,
  status text not null default 'building'
);

create table evidence_items (
  id uuid primary key default gen_random_uuid(),
  evidence_pack_id uuid not null references evidence_packs(id) on delete cascade,
  experience_id uuid not null references experience_records(id) on delete restrict,
  experience_version_id uuid not null references experience_versions(id) on delete restrict,
  source_excerpt text,
  relevance_reason text,
  ordinal int not null,
  unique(evidence_pack_id,ordinal)
);

create table synthesis_claims (
  id uuid primary key default gen_random_uuid(),
  evidence_pack_id uuid not null references evidence_packs(id) on delete cascade,
  claim_text text not null,
  evidence_item_ids uuid[] not null default '{}',
  created_at timestamptz not null default now()
);

create table live_research_requests (
  id uuid primary key default gen_random_uuid(),
  query_id uuid not null references ask_queries(id) on delete cascade,
  status text not null default 'pending',
  cohort_strategy jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  closed_at timestamptz
);

create table live_research_candidates (
  id uuid primary key default gen_random_uuid(),
  request_id uuid not null references live_research_requests(id) on delete cascade,
  member_id uuid not null references members(id) on delete restrict,
  business_id uuid references businesses(id) on delete restrict,
  qualification_reason text not null,
  response text check(response in('yes','no','no_response') or response is null),
  supplied_experience_id uuid references experience_records(id) on delete set null,
  qualified_match_id uuid references problem_matches(id) on delete set null,
  contacted_at timestamptz,
  responded_at timestamptz,
  created_at timestamptz not null default now(),
  unique(request_id,member_id,business_id)
);

create table conversations (
  id uuid primary key default gen_random_uuid(),
  query_id uuid not null references ask_queries(id) on delete restrict,
  type conversation_type not null,
  status conversation_status not null default 'active',
  created_by uuid not null references members(id) on delete restrict,
  created_at timestamptz not null default now(),
  closed_at timestamptz
);

create table conversation_participants (
  conversation_id uuid not null references conversations(id) on delete cascade,
  member_id uuid not null references members(id) on delete restrict,
  invitation_status text not null default 'accepted' check(invitation_status in('invited','accepted','declined')),
  joined_at timestamptz,
  left_at timestamptz,
  primary key(conversation_id,member_id)
);

create table messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references conversations(id) on delete cascade,
  sender_member_id uuid not null references members(id) on delete restrict,
  body text not null,
  created_at timestamptz not null default now(),
  deleted_at timestamptz
);

create table network_relationships (
  id uuid primary key default gen_random_uuid(),
  member_a uuid not null references members(id) on delete restrict,
  member_b uuid not null references members(id) on delete restrict,
  origin_query_id uuid not null references ask_queries(id) on delete restrict,
  created_at timestamptz not null default now(),
  unique(member_a,member_b,origin_query_id),
  check(member_a<>member_b)
);

create table feedback_events (
  id uuid primary key default gen_random_uuid(),
  member_id uuid not null references members(id) on delete restrict,
  query_id uuid references ask_queries(id) on delete set null,
  experience_id uuid references experience_records(id) on delete set null,
  kind text not null check(kind in('helpful','not_helpful','report','informed_decision')),
  created_at timestamptz not null default now()
);

create table private_notes (
  id uuid primary key default gen_random_uuid(),
  member_id uuid not null references members(id) on delete cascade,
  body text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create table private_note_references (
  id uuid primary key default gen_random_uuid(),
  note_id uuid not null references private_notes(id) on delete cascade,
  reference_type text not null,
  reference_id uuid not null,
  created_at timestamptz not null default now()
);

create table submitted_note_copies (
  id uuid primary key default gen_random_uuid(),
  note_id uuid references private_notes(id) on delete set null,
  member_id uuid not null references members(id) on delete restrict,
  destination_type text not null check(destination_type in('ask_query','business_context','experience')),
  destination_id uuid not null,
  submitted_body text not null,
  created_at timestamptz not null default now()
);

create table notifications (
  id uuid primary key default gen_random_uuid(),
  member_id uuid not null references members(id) on delete cascade,
  type text not null,
  title text not null,
  body text not null,
  deep_link text,
  read_at timestamptz,
  created_at timestamptz not null default now()
);

create table notification_preferences (
  member_id uuid primary key references members(id) on delete cascade,
  new_matches_in_app boolean not null default true,
  new_matches_email boolean not null default true,
  messages_in_app boolean not null default true,
  messages_email boolean not null default true,
  live_research_in_app boolean not null default true,
  live_research_email boolean not null default true,
  outcome_followup_in_app boolean not null default true,
  outcome_followup_email boolean not null default true,
  security_email boolean not null default true,
  updated_at timestamptz not null default now()
);

create table support_tickets (
  id uuid primary key default gen_random_uuid(),
  member_id uuid not null references members(id) on delete restrict,
  message text not null,
  page text,
  error_code text,
  status support_status not null default 'open',
  assigned_to uuid references members(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  resolved_at timestamptz
);

create table plans (
  id text primary key,
  name text not null,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);
create table subscriptions (
  id uuid primary key default gen_random_uuid(),
  member_id uuid not null unique references members(id) on delete restrict,
  plan_id text references plans(id),
  status subscription_status not null default 'none',
  provider text,
  provider_customer_id text,
  provider_subscription_id text,
  current_period_end timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create table entitlements (
  key text primary key,
  description text not null
);
create table entitlement_grants (
  id uuid primary key default gen_random_uuid(),
  member_id uuid not null references members(id) on delete cascade,
  entitlement_key text not null references entitlements(key) on delete cascade,
  source text not null,
  starts_at timestamptz not null default now(),
  ends_at timestamptz,
  unique(member_id,entitlement_key,source)
);
create table feature_flags (
  key text primary key,
  enabled boolean not null default false,
  config jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

create table data_deletion_requests (
  id uuid primary key default gen_random_uuid(),
  member_id uuid not null references members(id) on delete restrict,
  status text not null default 'requested',
  retain_eligible_experience boolean,
  requested_at timestamptz not null default now(),
  processed_at timestamptz,
  processing_notes text
);
create table retention_choices (
  id uuid primary key default gen_random_uuid(),
  deletion_request_id uuid not null references data_deletion_requests(id) on delete cascade,
  category text not null,
  retain boolean not null,
  created_at timestamptz not null default now()
);

create table audit_events (
  id bigserial primary key,
  actor_member_id uuid references members(id) on delete set null,
  event_type text not null,
  target_type text,
  target_id text,
  request_id text,
  ip_hash text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table security_events (
  id bigserial primary key,
  member_id uuid references members(id) on delete set null,
  event_type text not null,
  severity text not null check(severity in('info','warning','critical')),
  request_id text,
  ip_hash text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table job_queue (
  id uuid primary key default gen_random_uuid(),
  job_type text not null,
  payload jsonb not null default '{}'::jsonb,
  dedupe_key text unique,
  status job_status not null default 'queued',
  attempts int not null default 0,
  run_after timestamptz not null default now(),
  locked_at timestamptz,
  finished_at timestamptz,
  last_error text,
  created_at timestamptz not null default now()
);

create table outbox_events (
  id uuid primary key default gen_random_uuid(),
  event_type text not null,
  payload jsonb not null,
  status text not null default 'pending',
  attempts int not null default 0,
  available_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  delivered_at timestamptz
);

create index idx_member_roles_member on member_business_roles(member_id) where deleted_at is null;
create index idx_member_roles_business on member_business_roles(business_id) where deleted_at is null;
create index idx_business_snapshots_business_time on business_snapshots(business_id,effective_at desc);
create index idx_experience_member on experience_records(member_id,created_at desc) where deleted_at is null;
create index idx_experience_business on experience_records(business_id,created_at desc) where deleted_at is null;
create index idx_experience_active on experience_records(status,created_at desc) where status='active' and deleted_at is null;
create index idx_experience_version_fts on experience_versions using gin(to_tsvector('simple',coalesce(source_text,''))) where status='active';
create index idx_ask_member on ask_queries(member_id,created_at desc) where deleted_at is null;
create index idx_ask_active on ask_queries(status,updated_at desc) where status in('processing','no_match','researching','reopened');
create index idx_matches_query on problem_matches(query_id,status,rank_order);
create index idx_notifications_member on notifications(member_id,created_at desc);
create index idx_unread_notifications on notifications(member_id,created_at desc) where read_at is null;
create index idx_messages_conversation on messages(conversation_id,created_at asc) where deleted_at is null;
create index idx_jobs_claim on job_queue(status,run_after,created_at) where status='queued';
create index idx_support_status on support_tickets(status,created_at);
create index idx_audit_actor_time on audit_events(actor_member_id,created_at desc);
create index idx_security_severity_time on security_events(severity,created_at desc);

insert into plans(id,name) values ('launch_full_access','Launch full access'),('future_free','Future Free'),('future_paid','Future Paid') on conflict do nothing;
insert into entitlements(key,description) values
('contribute_experience','Create and manage own Experience'),
('manage_own_journey','Manage own Business Journey'),
('publish_open_decision','Create active business problems/questions'),
('receive_problem_matches','Receive qualified problem matches'),
('member_contact','Problem-bound member contact'),
('collective_discovery','Collective Experience discovery'),
('ask_bet_intelligence','Full Ask BET intelligence'),
('source_drilldown','Eligible source drill-down'),
('live_research','Targeted Live Research'),
('behavioral_patterns','Future Behavioral Patterns capability')
on conflict do nothing;
insert into feature_flags(key,enabled) values
('support_ai',false),('live_research',false),('email_notifications',false),('payment_safety_messaging',false),('group_discussions',false)
on conflict do nothing;
