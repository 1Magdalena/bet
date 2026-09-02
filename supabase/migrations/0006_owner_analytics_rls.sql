-- Supabase-only defense in depth for owner analytics and consent tables.
-- The BET-owned API uses server authorization; direct member access is limited to own consent only.
alter table consent_preferences enable row level security;
alter table member_sessions enable row level security;
alter table product_activity_events enable row level security;
alter table member_activity_daily enable row level security;
alter table billing_events enable row level security;
alter table billing_transactions enable row level security;
alter table owner_metric_daily enable row level security;
alter table admin_access_events enable row level security;

drop policy if exists consent_select_own on consent_preferences;
create policy consent_select_own on consent_preferences for select using (member_id = bet_current_member_id());
drop policy if exists consent_insert_own on consent_preferences;
create policy consent_insert_own on consent_preferences for insert with check (member_id = bet_current_member_id());
drop policy if exists consent_update_own on consent_preferences;
create policy consent_update_own on consent_preferences for update using (member_id = bet_current_member_id()) with check (member_id = bet_current_member_id());
