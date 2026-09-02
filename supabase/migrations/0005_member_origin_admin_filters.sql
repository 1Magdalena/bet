-- BET v0.3: coarse member origin fields used by the Owner Control Center filters.
-- Additive and safe after the owner analytics migration.

alter table members
  add column if not exists signup_country_code char(2),
  add column if not exists signup_country_source text,
  add column if not exists acquisition_source text,
  add column if not exists acquisition_campaign text;

create index if not exists idx_members_signup_country on members(signup_country_code) where deleted_at is null;
create index if not exists idx_members_acquisition_source on members(acquisition_source) where deleted_at is null;

comment on column members.signup_country_code is 'Coarse ISO-3166-1 alpha-2 country at registration; do not store exact IP here.';
comment on column members.signup_country_source is 'How signup country was obtained, e.g. edge_country or member_reported.';
comment on column members.acquisition_source is 'Optional first-party acquisition source such as direct, referral, campaign or partner.';
comment on column members.acquisition_campaign is 'Optional first-party campaign identifier; no ad-tech profile is required.';
