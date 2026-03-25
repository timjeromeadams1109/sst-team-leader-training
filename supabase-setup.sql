-- SST Team Leader Training — Supabase Setup
-- Run this in the SQL Editor at: https://supabase.com/dashboard/project/ckiqiihzjmhaebyybbhr/sql

-- 1. User accounts (registration/login)
create table if not exists sst_users (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text unique not null,
  password_hash text not null,
  role text default 'learner',
  created_at timestamptz default now()
);
create index if not exists idx_sst_users_email on sst_users(email);

-- 2. Training events (analytics tracking)
create table if not exists sst_events (
  id uuid default gen_random_uuid() primary key,
  learner_id text not null,
  event_type text not null,
  course_id text,
  module_id text,
  lesson_id text,
  score integer,
  test_type text,
  passed boolean,
  document_id text,
  metadata jsonb,
  created_at timestamptz default now()
);
create index if not exists idx_sst_events_learner on sst_events(learner_id);
create index if not exists idx_sst_events_type on sst_events(event_type);
create index if not exists idx_sst_events_created on sst_events(created_at);

-- 3. Suggestions box
create table if not exists sst_suggestions (
  id uuid default gen_random_uuid() primary key,
  name text default 'Anonymous',
  category text not null,
  message text not null,
  status text default 'new',
  created_at timestamptz default now()
);
create index if not exists idx_sst_suggestions_status on sst_suggestions(status);
