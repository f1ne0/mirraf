create extension if not exists pgcrypto;

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  address text not null,
  description text,
  category text not null default 'other' check (
    category in ('kitchen', 'bedroom', 'children', 'living_room', 'hallway', 'office', 'other')
  ),
  price bigint not null check (price >= 0),
  design_image_url text not null,
  result_image_url text not null,
  design_image_path text not null,
  result_image_path text not null,
  panorama_url text,
  is_published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  user_id uuid not null references auth.users(id) on delete cascade
);

create index if not exists projects_user_id_idx on public.projects(user_id);
create index if not exists projects_created_at_idx on public.projects(created_at desc);
create index if not exists projects_is_published_idx on public.projects(is_published);
create index if not exists projects_category_idx on public.projects(category);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_projects_updated_at on public.projects;

create trigger trg_projects_updated_at
before update on public.projects
for each row
execute function public.set_updated_at();

alter table public.projects enable row level security;

drop policy if exists "projects_select_own" on public.projects;
drop policy if exists "projects_select_published_public" on public.projects;
drop policy if exists "projects_insert_own" on public.projects;
drop policy if exists "projects_update_own" on public.projects;
drop policy if exists "projects_delete_own" on public.projects;

create policy "projects_select_own"
on public.projects
for select
to authenticated
using (auth.uid() = user_id);

create policy "projects_select_published_public"
on public.projects
for select
to anon
using (is_published = true);

create policy "projects_insert_own"
on public.projects
for insert
to authenticated
with check (auth.uid() = user_id);

create policy "projects_update_own"
on public.projects
for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "projects_delete_own"
on public.projects
for delete
to authenticated
using (auth.uid() = user_id);

drop policy if exists "storage_projects_insert_own" on storage.objects;
drop policy if exists "storage_projects_update_own" on storage.objects;
drop policy if exists "storage_projects_delete_own" on storage.objects;

create policy "storage_projects_insert_own"
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'projects'
  and (storage.foldername(name))[1] = auth.uid()::text
);

create policy "storage_projects_update_own"
on storage.objects
for update
to authenticated
using (
  bucket_id = 'projects'
  and (storage.foldername(name))[1] = auth.uid()::text
)
with check (
  bucket_id = 'projects'
  and (storage.foldername(name))[1] = auth.uid()::text
);

create policy "storage_projects_delete_own"
on storage.objects
for delete
to authenticated
using (
  bucket_id = 'projects'
  and (storage.foldername(name))[1] = auth.uid()::text
);
