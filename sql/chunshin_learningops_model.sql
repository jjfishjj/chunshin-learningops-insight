-- Chun Shin LearningOps Insight
-- BI-oriented relational model for interview demonstration.
-- Dialect: ANSI-style SQL with notes for Power BI semantic modeling.

create table dim_account (
  account_id varchar(40) primary key,
  account_name varchar(200) not null,
  account_type varchar(40) not null, -- university, enterprise, high_school, retail_consumer
  region varchar(80),
  industry_or_school_type varchar(120),
  owner_consultant varchar(120),
  created_at timestamp not null
);

create table dim_contact (
  contact_id varchar(40) primary key,
  account_id varchar(40) not null references dim_account(account_id),
  contact_name varchar(120),
  role_title varchar(120),
  email_hash varchar(128),
  phone_hash varchar(128),
  consent_status varchar(40),
  created_at timestamp not null
);

create table fact_consulting_activity (
  activity_id varchar(40) primary key,
  account_id varchar(40) not null references dim_account(account_id),
  contact_id varchar(40) references dim_contact(contact_id),
  activity_type varchar(60) not null, -- call, meeting, seminar, proposal, renewal_review
  activity_date date not null,
  project_stage varchar(60) not null, -- lead, discovery, proposal, won, active, renewal, lost
  next_action varchar(200),
  expected_value numeric(14, 2),
  renewal_probability numeric(5, 4)
);

create table dim_learner (
  learner_id varchar(40) primary key,
  account_id varchar(40) references dim_account(account_id),
  learner_segment varchar(80), -- freshman, senior, job_seeker, employee, manager
  cefr_goal varchar(10),
  consent_status varchar(40),
  created_at timestamp not null
);

create table fact_exam_event (
  exam_event_id varchar(40) primary key,
  learner_id varchar(40) not null references dim_learner(learner_id),
  exam_family varchar(40) not null, -- TOEIC, TOEIC Bridge, TOEFL
  exam_type varchar(80) not null, -- Listening Reading, Speaking Writing, ITP, Junior
  registration_channel varchar(80),
  registration_date date not null,
  exam_date date not null,
  score_total numeric(8, 2),
  cefr_level varchar(10),
  late_registration_flag integer default 0
);

create table fact_app_event (
  app_event_id varchar(40) primary key,
  learner_id varchar(40) not null references dim_learner(learner_id),
  event_time timestamp not null,
  event_name varchar(100) not null, -- app_open, speaking_practice, mock_test, registration_click
  event_value numeric(12, 2),
  source_campaign varchar(120)
);

create table dim_course_program (
  program_id varchar(40) primary key,
  account_id varchar(40) not null references dim_account(account_id),
  program_name varchar(200) not null,
  target_exam varchar(80),
  cefr_target varchar(10),
  start_date date not null,
  end_date date not null,
  instructor_name varchar(120),
  status varchar(40)
);

create table fact_course_session (
  session_id varchar(40) primary key,
  program_id varchar(40) not null references dim_course_program(program_id),
  session_date date not null,
  planned_minutes integer not null,
  actual_minutes integer,
  material_code varchar(80),
  issue_flag integer default 0,
  instructor_note varchar(1000)
);

create table fact_course_enrollment (
  enrollment_id varchar(40) primary key,
  program_id varchar(40) not null references dim_course_program(program_id),
  learner_id varchar(40) not null references dim_learner(learner_id),
  enrollment_status varchar(40), -- active, completed, dropped
  attendance_rate numeric(5, 4),
  assignment_completion_rate numeric(5, 4),
  satisfaction_score numeric(4, 2),
  pre_score numeric(8, 2),
  post_score numeric(8, 2)
);

create table fact_finance_summary (
  finance_id varchar(40) primary key,
  account_id varchar(40) references dim_account(account_id),
  program_id varchar(40) references dim_course_program(program_id),
  revenue_type varchar(80), -- exam, course, material, app, consulting
  revenue_month date not null,
  revenue_amount numeric(14, 2) not null,
  cost_amount numeric(14, 2)
);

create table fact_data_quality_issue (
  issue_id varchar(40) primary key,
  source_table varchar(120) not null,
  source_key varchar(120),
  issue_type varchar(80) not null, -- duplicate, missing_key, invalid_score, consent_missing
  severity varchar(20) not null,
  detected_at timestamp not null,
  resolved_at timestamp
);

create view vw_account_pipeline as
select
  a.account_id,
  a.account_name,
  a.account_type,
  a.region,
  a.owner_consultant,
  count(ca.activity_id) as activity_count,
  max(ca.activity_date) as last_activity_date,
  max(ca.project_stage) as latest_project_stage,
  sum(coalesce(ca.expected_value, 0)) as pipeline_value,
  avg(ca.renewal_probability) as avg_renewal_probability
from dim_account a
left join fact_consulting_activity ca
  on a.account_id = ca.account_id
group by
  a.account_id,
  a.account_name,
  a.account_type,
  a.region,
  a.owner_consultant;

create view vw_learner_journey as
select
  l.learner_id,
  l.account_id,
  l.learner_segment,
  count(distinct e.exam_event_id) as exam_count,
  min(e.registration_date) as first_registration_date,
  max(e.exam_date) as latest_exam_date,
  max(e.cefr_level) as latest_cefr_level,
  count(distinct app.app_event_id) as app_event_count,
  sum(case when app.event_name = 'speaking_practice' then 1 else 0 end) as speaking_practice_events,
  sum(case when e.late_registration_flag = 1 then 1 else 0 end) as late_registration_count
from dim_learner l
left join fact_exam_event e
  on l.learner_id = e.learner_id
left join fact_app_event app
  on l.learner_id = app.learner_id
group by
  l.learner_id,
  l.account_id,
  l.learner_segment;

create view vw_course_health as
select
  p.program_id,
  p.account_id,
  p.program_name,
  p.target_exam,
  p.status,
  count(distinct s.session_id) as session_count,
  avg(en.attendance_rate) as avg_attendance_rate,
  avg(en.assignment_completion_rate) as avg_assignment_completion_rate,
  avg(en.satisfaction_score) as avg_satisfaction_score,
  avg(en.post_score - en.pre_score) as avg_score_lift,
  sum(case when s.issue_flag = 1 then 1 else 0 end) as issue_count
from dim_course_program p
left join fact_course_session s
  on p.program_id = s.program_id
left join fact_course_enrollment en
  on p.program_id = en.program_id
group by
  p.program_id,
  p.account_id,
  p.program_name,
  p.target_exam,
  p.status;

create view vw_consultant_next_action as
select
  account_id,
  account_name,
  account_type,
  owner_consultant,
  latest_project_stage,
  pipeline_value,
  avg_renewal_probability,
  case
    when latest_project_stage = 'lead' then 'Schedule needs discovery meeting'
    when latest_project_stage = 'discovery' then 'Prepare language assessment proposal'
    when latest_project_stage = 'active' and avg_renewal_probability < 0.55 then 'Run renewal risk review'
    when latest_project_stage = 'renewal' then 'Send outcome dashboard and renewal package'
    else 'Maintain relationship and monitor next trigger'
  end as recommended_action
from vw_account_pipeline;

-- Power BI measure examples:
-- Lead to Proposal Rate = DIVIDE([Proposal Accounts], [Lead Accounts])
-- Course Completion Rate = DIVIDE([Completed Enrollments], [Total Enrollments])
-- App Activation Rate = DIVIDE([Learners With App Open], [Registered Learners])
-- Average Score Lift = AVERAGE(vw_course_health[avg_score_lift])
-- Renewal Risk Accounts = COUNTROWS(FILTER(vw_account_pipeline, [avg_renewal_probability] < 0.55))

-- Data quality checks for scheduled monitoring.
create view dq_missing_consent as
select 'dim_learner' as source_table, learner_id as source_key, 'consent_missing' as issue_type
from dim_learner
where consent_status is null
union all
select 'dim_contact' as source_table, contact_id as source_key, 'consent_missing' as issue_type
from dim_contact
where consent_status is null;

create view dq_invalid_scores as
select exam_event_id as source_key, score_total
from fact_exam_event
where score_total < 0 or score_total > 990;

