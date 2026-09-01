-- Defense-in-depth policies for a Supabase deployment.
-- Canonical authorization remains in BET API. These policies prevent accidental direct-client exposure.
alter table members enable row level security;
alter table private_notes enable row level security;
alter table notifications enable row level security;
alter table ask_queries enable row level security;
alter table experience_records enable row level security;

create policy members_self_select on members for select using (id = auth.uid());
create policy members_self_update on members for update using (id = auth.uid()) with check (id = auth.uid());
create policy notes_self_all on private_notes for all using (member_id = auth.uid()) with check (member_id = auth.uid());
create policy notifications_self_select on notifications for select using (member_id = auth.uid());
create policy notifications_self_update on notifications for update using (member_id = auth.uid()) with check (member_id = auth.uid());
create policy ask_self_select on ask_queries for select using (member_id = auth.uid());
create policy experiences_self_select on experience_records for select using (member_id = auth.uid());

-- No general public/direct-client select policy for collective Experience Graph, matches, evidence packs, admin tables or verification evidence.
