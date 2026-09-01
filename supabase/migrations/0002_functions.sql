create or replace function bet_set_updated_at() returns trigger language plpgsql as $$
begin new.updated_at=now(); return new; end $$;

create trigger trg_members_updated before update on members for each row execute function bet_set_updated_at();
create trigger trg_businesses_updated before update on businesses for each row execute function bet_set_updated_at();
create trigger trg_roles_updated before update on member_business_roles for each row execute function bet_set_updated_at();
create trigger trg_experience_updated before update on experience_records for each row execute function bet_set_updated_at();
create trigger trg_ask_updated before update on ask_queries for each row execute function bet_set_updated_at();
create trigger trg_support_updated before update on support_tickets for each row execute function bet_set_updated_at();
create trigger trg_subscription_updated before update on subscriptions for each row execute function bet_set_updated_at();

create or replace view authority_problem_counts as
select er.member_id, count(distinct f.query_id)::int as helpful_problem_count
from feedback_events f join experience_records er on er.id=f.experience_id
where f.kind='helpful' and f.query_id is not null and er.deleted_at is null
group by er.member_id;
