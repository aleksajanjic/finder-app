-- Run this in the Supabase SQL Editor (Dashboard → SQL Editor) to create tables and RLS.
-- If you already created sessions/swipes/matches without restaurants, run 02_restaurants_seed_and_fks.sql after creating the restaurants table.

-- Restaurants: master list (create first; seed via 02_restaurants_seed_and_fks.sql or run that file)
create table if not exists public.restaurants (
  id integer primary key,
  name text not null,
  description text not null default '',
  cuisine text not null default '',
  price_range text not null default '',
  image_url text not null default '',
  location text not null default '',
  rating numeric(3,2) not null default 0,
  lat numeric(10,6),
  lng numeric(10,6)
);

-- Sessions: one row per "game" with a unique join code
create table if not exists public.sessions (
  id uuid primary key default gen_random_uuid(),
  join_code text not null unique,
  creator_device_id text not null,
  status text not null default 'waiting' check (status in ('waiting', 'active', 'completed')),
  created_at timestamptz not null default now(),
  expires_at timestamptz not null default (now() + interval '24 hours'),
  restaurant_deck integer[] not null default '{}'
);

-- Participants: who joined which session (creator + friend)
create table if not exists public.session_participants (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references public.sessions(id) on delete cascade,
  device_id text not null,
  joined_at timestamptz not null default now(),
  unique(session_id, device_id)
);

-- Swipes: one row per (session, device, restaurant)
create table if not exists public.swipes (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references public.sessions(id) on delete cascade,
  device_id text not null,
  restaurant_id integer not null references public.restaurants(id) on delete restrict,
  direction text not null check (direction in ('left', 'right')),
  swiped_at timestamptz not null default now(),
  unique(session_id, device_id, restaurant_id)
);

-- Matches: mutual likes (both participants swiped right on same restaurant)
create table if not exists public.matches (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references public.sessions(id) on delete cascade,
  restaurant_id integer not null references public.restaurants(id) on delete restrict,
  matched_at timestamptz not null default now(),
  unique(session_id, restaurant_id)
);

-- Indexes for common lookups
create index if not exists idx_sessions_join_code on public.sessions(join_code);
create index if not exists idx_session_participants_session_id on public.session_participants(session_id);
create index if not exists idx_swipes_session_device on public.swipes(session_id, device_id);
create index if not exists idx_matches_session on public.matches(session_id);

-- Enable Row Level Security
alter table public.restaurants enable row level security;
alter table public.sessions enable row level security;
alter table public.session_participants enable row level security;
alter table public.swipes enable row level security;
alter table public.matches enable row level security;

-- Allow anonymous read/write for anon key (so frontend can work without auth)
-- For production you may want to restrict by device_id or add auth.
create policy "Allow all for anon" on public.restaurants for all using (true) with check (true);
create policy "Allow all for anon" on public.sessions for all using (true) with check (true);
create policy "Allow all for anon" on public.session_participants for all using (true) with check (true);
create policy "Allow all for anon" on public.swipes for all using (true) with check (true);
create policy "Allow all for anon" on public.matches for all using (true) with check (true);

-- Enable Realtime for "waiting for friend" and swipe sync (Dashboard → Database → Replication)
-- Turn on for: session_participants, swipes
