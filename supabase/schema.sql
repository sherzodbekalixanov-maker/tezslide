create table public.presentations(id uuid primary key default gen_random_uuid(),user_id uuid not null references auth.users(id) on delete cascade default auth.uid(),title text not null,theme text default 'neon',slides jsonb not null,created_at timestamptz default now());
alter table public.presentations enable row level security;
create policy "own rows" on public.presentations for all using(auth.uid()=user_id) with check(auth.uid()=user_id);
