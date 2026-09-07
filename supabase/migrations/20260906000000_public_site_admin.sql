-- Public school website content, contact messages, and admin media.
create table if not exists public.site_config (
  id boolean primary key default true check (id),
  school_name text not null,
  short_name text not null,
  locality text not null,
  tagline text not null,
  contact_address text not null,
  contact_phone text not null,
  contact_email text not null,
  contact_hours text not null,
  hero_image text not null,
  logo_image text not null,
  hero_alt text not null,
  logo_alt text not null,
  about_title text not null,
  about_text text not null,
  mission text not null,
  vision text not null,
  page_content jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.site_config add column if not exists page_content jsonb not null default '{}'::jsonb;

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  subject text not null,
  message text not null,
  status text not null default 'new' check (status in ('new', 'replied', 'archived')),
  created_at timestamptz not null default now(),
  replied_at timestamptz
);

alter table public.site_config enable row level security;
alter table public.contact_messages enable row level security;

-- Minimal role table for this public-site admin area.
-- It is intentionally independent from the old student/teacher schema.
create table if not exists public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null check (role in ('admin', 'super_admin', 'system_admin')),
  created_at timestamptz not null default now(),
  unique (user_id, role)
);

alter table public.user_roles enable row level security;
revoke all on public.user_roles from anon;
grant select on public.user_roles to authenticated;

drop policy if exists "users can read own admin role" on public.user_roles;
create policy "users can read own admin role" on public.user_roles
  for select to authenticated using (user_id = auth.uid());

-- Keep this migration usable even when the older role helper function was not deployed.
create or replace function public.is_admin(_user_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.user_roles
    where user_id = _user_id
      and role::text in ('admin', 'super_admin', 'system_admin')
  );
$$;

revoke all on function public.is_admin(uuid) from public, anon;
grant execute on function public.is_admin(uuid) to authenticated, service_role;

-- The public website can read its published configuration and submit contact messages.
drop policy if exists "public can read site config" on public.site_config;
drop policy if exists "public can submit contact messages" on public.contact_messages;
drop policy if exists "admins manage site config" on public.site_config;
drop policy if exists "admins manage contact messages" on public.contact_messages;
create policy "public can read site config" on public.site_config
  for select to anon, authenticated using (true);
create policy "public can submit contact messages" on public.contact_messages
  for insert to anon, authenticated with check (true);

-- Admins use Supabase Auth and must have an admin role in user_roles.
create policy "admins manage site config" on public.site_config
  for all to authenticated
  using (public.is_admin(auth.uid()))
  with check (public.is_admin(auth.uid()));
create policy "admins manage contact messages" on public.contact_messages
  for all to authenticated
  using (public.is_admin(auth.uid()))
  with check (public.is_admin(auth.uid()));

insert into public.site_config (
  id, school_name, short_name, locality, tagline,
  contact_address, contact_phone, contact_email, contact_hours,
  hero_image, logo_image, hero_alt, logo_alt,
  about_title, about_text, mission, vision
) values (
  true,
  'École Secour d''en haut',
  'École Secour d''en haut',
  'Puit-Sales, Haïti',
  'Former, accompagner et préparer les jeunes pour l''avenir.',
  'Adresse à confirmer', 'Téléphone à confirmer', 'Email à confirmer', 'Horaires à confirmer',
  '/school-hero.jpg', '/school-logo.png',
  'Photo d''illustration d''une école', 'Logo de l''école',
  'Un établissement au service des familles',
  'Une école qui accompagne chaque élève dans son développement, sa formation et son avenir.',
  'Favoriser la réussite scolaire, le développement des compétences et l''épanouissement de chaque élève dans un cadre bienveillant et exigeant.',
  'Construire une école de qualité, ouverte sur les besoins des familles et engagée dans la réussite de ses élèves.'
) on conflict (id) do nothing;

insert into storage.buckets (id, name, public)
values ('site-media', 'site-media', true)
on conflict (id) do update set public = true;

drop policy if exists "public can view site media" on storage.objects;
drop policy if exists "admins upload site media" on storage.objects;
drop policy if exists "admins update site media" on storage.objects;
drop policy if exists "admins delete site media" on storage.objects;
create policy "public can view site media" on storage.objects
  for select to anon, authenticated using (bucket_id = 'site-media');
create policy "admins upload site media" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'site-media' and public.is_admin(auth.uid()));
create policy "admins update site media" on storage.objects
  for update to authenticated
  using (bucket_id = 'site-media' and public.is_admin(auth.uid()))
  with check (bucket_id = 'site-media' and public.is_admin(auth.uid()));
create policy "admins delete site media" on storage.objects
  for delete to authenticated
  using (bucket_id = 'site-media' and public.is_admin(auth.uid()));
