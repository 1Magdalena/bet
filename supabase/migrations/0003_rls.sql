-- BET Supabase defense-in-depth RLS.
-- Canonical authorization remains in the BET API. Direct client access is intentionally narrow.

create or replace function public.bet_current_member_id()
returns uuid
language sql
stable
security definer
set search_path = public
as $$
  select m.id
  from public.members m
  where m.auth_subject = auth.uid()::text
    and m.deleted_at is null
  limit 1
$$;

revoke all on function public.bet_current_member_id() from public;
grant execute on function public.bet_current_member_id() to authenticated;

alter table public.members enable row level security;
alter table public.private_notes enable row level security;
alter table public.notifications enable row level security;
alter table public.ask_queries enable row level security;
alter table public.experience_records enable row level security;

create policy members_self_select
on public.members
for select
to authenticated
using (id = public.bet_current_member_id());

create policy members_self_update
on public.members
for update
to authenticated
using (id = public.bet_current_member_id())
with check (id = public.bet_current_member_id());

create policy notes_self_all
on public.private_notes
for all
to authenticated
using (member_id = public.bet_current_member_id())
with check (member_id = public.bet_current_member_id());

create policy notifications_self_select
on public.notifications
for select
to authenticated
using (member_id = public.bet_current_member_id());

create policy notifications_self_update
on public.notifications
for update
to authenticated
using (member_id = public.bet_current_member_id())
with check (member_id = public.bet_current_member_id());

create policy ask_self_select
on public.ask_queries
for select
to authenticated
using (member_id = public.bet_current_member_id());

create policy experiences_self_select
on public.experience_records
for select
to authenticated
using (member_id = public.bet_current_member_id());

-- No broad client policies are created for collective Experience Graph data,
-- matches, evidence packs, verification/admin data, or other members' records.
-- The server-side BET API remains the authorization boundary for those resources.
