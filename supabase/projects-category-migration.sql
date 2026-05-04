alter table public.projects
add column if not exists category text not null default 'other';

alter table public.projects
add column if not exists description text;

alter table public.projects
drop constraint if exists projects_category_check;

alter table public.projects
add constraint projects_category_check
check (
  category in ('kitchen', 'bedroom', 'children', 'living_room', 'hallway', 'office', 'other')
);

create index if not exists projects_category_idx on public.projects(category);
