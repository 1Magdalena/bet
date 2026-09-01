insert into members(id,email,display_name,account_status,onboarding_status,is_admin,terms_version,terms_accepted_at,privacy_version,privacy_accepted_at)
values('00000000-0000-4000-8000-000000000001','owner@bet.local','BET Owner','active','completed',true,'dev',now(),'dev',now())
on conflict(id) do nothing;
