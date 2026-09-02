-- BET v0.2: owner analytics, consent, billing ledger, operational snapshots.
-- Additive migration for projects that already ran 0001-0003.

create table if not exists consent_preferences (
  id uuid primary key default gen_random_uuid(),
  member_id uuid references members(id) on delete cascade,
  anonymous_id uuid,
  necessary boolean not null default true,
  product_analytics boolean not null default false,
  analytics boolean not null default false,
  marketing boolean not null default false,
  policy_version text not null,
  source text not null default 'consent_banner',
  updated_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  check (member_id is not null or anonymous_id is not null)
);
create unique index if not exists uq_consent_member on consent_preferences(member_id) where member_id is not null;
create unique index if not exists uq_consent_anon on consent_preferences(anonymous_id) where anonymous_id is not null;

create table if not exists member_sessions (
  id uuid primary key default gen_random_uuid(),
  member_id uuid not null references members(id) on delete cascade,
  started_at timestamptz not null default now(),
  last_activity_at timestamptz not null default now(),
  ended_at timestamptz,
  active_seconds integer not null default 0 check(active_seconds >= 0),
  entry_module text,
  last_module text,
  country_code char(2),
  device_class text,
  app_version text,
  consented_product_analytics boolean not null default false,
  created_at timestamptz not null default now()
);
create index if not exists idx_member_sessions_member_time on member_sessions(member_id,started_at desc);
create index if not exists idx_member_sessions_time on member_sessions(started_at desc);

create table if not exists product_activity_events (
  id bigserial primary key,
  member_id uuid references members(id) on delete cascade,
  session_id uuid references member_sessions(id) on delete set null,
  event_name text not null,
  module text,
  object_type text,
  object_id uuid,
  metadata jsonb not null default '{}'::jsonb,
  occurred_at timestamptz not null default now()
);
create index if not exists idx_activity_member_time on product_activity_events(member_id,occurred_at desc);
create index if not exists idx_activity_event_time on product_activity_events(event_name,occurred_at desc);

create table if not exists member_activity_daily (
  member_id uuid not null references members(id) on delete cascade,
  activity_date date not null,
  session_count integer not null default 0,
  active_seconds integer not null default 0,
  event_count integer not null default 0,
  modules_used jsonb not null default '{}'::jsonb,
  first_active_at timestamptz,
  last_active_at timestamptz,
  primary key(member_id,activity_date)
);
create index if not exists idx_member_activity_daily_date on member_activity_daily(activity_date desc);

create table if not exists billing_events (
  id uuid primary key default gen_random_uuid(),
  member_id uuid references members(id) on delete set null,
  subscription_id uuid references subscriptions(id) on delete set null,
  provider text not null,
  provider_event_id text unique,
  event_type text not null,
  currency char(3),
  gross_amount_minor bigint,
  fee_amount_minor bigint,
  refund_amount_minor bigint,
  net_amount_minor bigint,
  effective_at timestamptz not null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);
create index if not exists idx_billing_events_time on billing_events(effective_at desc);
create index if not exists idx_billing_events_member on billing_events(member_id,effective_at desc);

create table if not exists billing_transactions (
  id uuid primary key default gen_random_uuid(),
  member_id uuid references members(id) on delete set null,
  subscription_id uuid references subscriptions(id) on delete set null,
  provider text not null,
  provider_transaction_id text not null,
  currency char(3) not null,
  gross_amount_minor bigint not null default 0,
  refund_amount_minor bigint not null default 0,
  fee_amount_minor bigint not null default 0,
  net_amount_minor bigint not null default 0,
  status text not null check(status in ('pending','succeeded','partially_refunded','refunded','failed','disputed')),
  paid_at timestamptz,
  updated_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  unique(provider,provider_transaction_id)
);
create index if not exists idx_billing_transactions_paid on billing_transactions(paid_at desc) where status in ('succeeded','partially_refunded','refunded');

create table if not exists owner_metric_daily (
  metric_date date not null,
  metric_key text not null,
  dimension_key text not null default 'all',
  dimension_value text not null default 'all',
  metric_value numeric not null,
  metadata jsonb not null default '{}'::jsonb,
  computed_at timestamptz not null default now(),
  primary key(metric_date,metric_key,dimension_key,dimension_value)
);
create index if not exists idx_owner_metric_daily_key_date on owner_metric_daily(metric_key,metric_date desc);

create table if not exists admin_access_events (
  id bigserial primary key,
  admin_member_id uuid not null references members(id) on delete restrict,
  action text not null,
  target_type text,
  target_id text,
  purpose text,
  request_id text,
  created_at timestamptz not null default now()
);
create index if not exists idx_admin_access_time on admin_access_events(admin_member_id,created_at desc);
