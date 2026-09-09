-- ============================================================================
-- SILKSOUL E-COMMERCE PLATFORM — SCHEMA
-- Run in the Supabase SQL editor. Includes Row Level Security.
-- ============================================================================

create extension if not exists "pgcrypto";

-- ----------------------------------------------------------------------------
-- ENUMS
-- ----------------------------------------------------------------------------
do $$ begin
  create type user_role as enum ('CUSTOMER', 'ADMIN');
exception when duplicate_object then null; end $$;

do $$ begin
  create type product_status as enum ('DRAFT', 'PUBLISHED', 'ARCHIVED');
exception when duplicate_object then null; end $$;

do $$ begin
  create type order_status as enum (
    'PENDING', 'APPROVED', 'PROCESSING', 'SHIPPED', 'DELIVERED',
    'REJECTED', 'CANCELLED'
  );
exception when duplicate_object then null; end $$;

do $$ begin
  create type query_status as enum ('NEW', 'IN_PROGRESS', 'RESOLVED', 'CLOSED');
exception when duplicate_object then null; end $$;

do $$ begin
  create type review_status as enum ('PENDING', 'APPROVED', 'REJECTED');
exception when duplicate_object then null; end $$;

do $$ begin
  create type entity_status as enum ('ACTIVE', 'DISABLED');
exception when duplicate_object then null; end $$;

-- ----------------------------------------------------------------------------
-- PROFILES (extends auth.users)
-- ----------------------------------------------------------------------------
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null default '',
  email text not null,
  phone text,
  role user_role not null default 'CUSTOMER',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ----------------------------------------------------------------------------
-- BRANDS
-- ----------------------------------------------------------------------------
create table if not exists public.brands (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text,
  logo_url text,
  banner_url text,
  status entity_status not null default 'ACTIVE',
  seo_title text,
  seo_description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ----------------------------------------------------------------------------
-- CATEGORIES (self-referencing for subcategories)
-- ----------------------------------------------------------------------------
create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text,
  image_url text,
  parent_id uuid references public.categories(id) on delete set null,
  status entity_status not null default 'ACTIVE',
  sort_order integer not null default 0,
  seo_title text,
  seo_description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ----------------------------------------------------------------------------
-- TAGS
-- ----------------------------------------------------------------------------
create table if not exists public.tags (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  created_at timestamptz not null default now()
);

-- ----------------------------------------------------------------------------
-- PRODUCTS
-- ----------------------------------------------------------------------------
create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  brand_id uuid references public.brands(id) on delete set null,
  category_id uuid references public.categories(id) on delete set null,
  subcategory_id uuid references public.categories(id) on delete set null,
  sku text,
  short_description text,
  description text,
  price numeric(12,2) not null check (price >= 0),
  sale_price numeric(12,2) check (sale_price is null or sale_price >= 0),
  stock_quantity integer not null default 0 check (stock_quantity >= 0),
  low_stock_threshold integer not null default 5,
  status product_status not null default 'DRAFT',
  featured boolean not null default false,
  best_seller boolean not null default false,
  new_arrival boolean not null default false,
  seo_title text,
  seo_description text,
  benefits jsonb not null default '[]'::jsonb,
  ingredients jsonb not null default '[]'::jsonb,
  how_to_use text,
  suitable_for jsonb not null default '[]'::jsonb,
  specifications jsonb not null default '[]'::jsonb,
  faqs jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ----------------------------------------------------------------------------
-- PRODUCT IMAGES
-- ----------------------------------------------------------------------------
create table if not exists public.product_images (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  image_url text not null,
  alt_text text,
  sort_order integer not null default 0,
  is_primary boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists product_images_product_idx on public.product_images(product_id, sort_order);

-- ----------------------------------------------------------------------------
-- PRODUCT <-> TAGS
-- ----------------------------------------------------------------------------
create table if not exists public.product_tags (
  product_id uuid not null references public.products(id) on delete cascade,
  tag_id uuid not null references public.tags(id) on delete cascade,
  primary key (product_id, tag_id)
);

-- ----------------------------------------------------------------------------
-- COLLECTIONS + PRODUCTS
-- ----------------------------------------------------------------------------
create table if not exists public.collections (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text,
  image_url text,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.collection_products (
  collection_id uuid not null references public.collections(id) on delete cascade,
  product_id uuid not null references public.products(id) on delete cascade,
  sort_order integer not null default 0,
  primary key (collection_id, product_id)
);

-- ----------------------------------------------------------------------------
-- CUSTOMERS (public-facing order/profile identity, separate from auth)
-- ----------------------------------------------------------------------------
create table if not exists public.customers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  city text,
  address text,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists customers_email_idx on public.customers(email);

-- ----------------------------------------------------------------------------
-- ORDERS (Order Request / Quotation workflow — no online payment)
-- ----------------------------------------------------------------------------
create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  order_number text not null unique,
  user_id uuid references public.profiles(id) on delete set null,
  customer_name text not null,
  email text not null,
  phone text, 
  address text,
  city text,
  notes text,
  subtotal numeric(12,2) not null default 0,
  delivery_fee numeric(12,2) not null default 0,
  grand_total numeric(12,2) not null default 0,
  status order_status not null default 'PENDING',
  admin_note text,
  coupon_code text,
  coupon_discount numeric(12,2) not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ----------------------------------------------------------------------------
-- ORDER ITEMS
-- ----------------------------------------------------------------------------
create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id uuid not null references public.products(id),
  product_name text not null,
  product_image text,
  unit_price numeric(12,2) not null,
  quantity integer not null check (quantity > 0),
  line_total numeric(12,2) not null,
  created_at timestamptz not null default now()
);

-- ----------------------------------------------------------------------------
-- QUERIES (customer contact / support tickets)
-- ----------------------------------------------------------------------------
create table if not exists public.queries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  subject text not null,
  message text not null,
  status query_status not null default 'NEW',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ----------------------------------------------------------------------------
-- REVIEWS
-- ----------------------------------------------------------------------------
create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  customer_id uuid references public.customers(id) on delete set null,
  rating integer not null check (rating between 1 and 5),
  title text,
  comment text,
  status review_status not null default 'PENDING',
  created_at timestamptz not null default now()
);

-- ----------------------------------------------------------------------------
-- SITE SETTINGS (key/value)
-- ----------------------------------------------------------------------------
create table if not exists public.site_settings (
  key text primary key,
  value text
);

-- ============================================================================
-- TRIGGER: updated_at auto-update
-- ============================================================================
create or replace function public.set_updated_at()
returns trigger language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end $$;

do $$
declare t text;
begin
  foreach t in array array[
    'profiles', 'brands', 'categories', 'products',
    'customers', 'orders', 'queries'
  ]
  loop
    if exists (select 1 from pg_tables where schemaname = 'public' and tablename = t)
       and not exists (
         select 1 from pg_trigger where tgname = 'set_updated_at_' || t
       )
    then
      execute format(
        'create trigger set_updated_at_%s before update on public.%I
         for each row execute function public.set_updated_at()',
        t, t
      );
    end if;
  end loop;
end $$;

-- ============================================================================
-- ROW LEVEL SECURITY
-- ============================================================================
alter table public.profiles enable row level security;
alter table public.customers enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.queries enable row level security;
alter table public.reviews enable row level security;

-- Public catalog is readable by everyone (anon role gets it via authenticated, but
-- we allow the anon key to read catalog tables too since products are public).
alter table public.brands enable row level security;
alter table public.categories enable row level security;
alter table public.tags enable row level security;
alter table public.products enable row level security;
alter table public.product_images enable row level security;
alter table public.product_tags enable row level security;
alter table public.collections enable row level security;
alter table public.collection_products enable row level security;
alter table public.site_settings enable row level security;

-- ---- PUBLIC READS (anon + authenticated) ----
create policy "Public catalog read" on public.brands for select using (true);
create policy "Public catalog read" on public.categories for select using (true);
create policy "Public catalog read" on public.tags for select using (true);
create policy "Public catalog read" on public.products for select using (true);
create policy "Public catalog read" on public.product_images for select using (true);
create policy "Public catalog read" on public.product_tags for select using (true);
create policy "Public catalog read" on public.collections for select using (true);
create policy "Public catalog read" on public.collection_products for select using (true);
create policy "Public read" on public.site_settings for select using (true);
create policy "Public approved reviews" on public.reviews for select using (status = 'APPROVED');

-- ---- ORDER REQUESTS: anyone can create ----
create policy "Create order request" on public.orders for insert with check (true);
create policy "Create order items" on public.order_items for insert with check (true);

-- ---- QUERIES: anyone can create ----
create policy "Create query" on public.queries for insert with check (true);

-- ---- CUSTOMERS: anyone can create ----
create policy "Create customer" on public.customers for insert with check (true);

-- ---- ADMIN FULL ACCESS (role = ADMIN on the connected profile) ----
create or replace function public.is_admin()
returns boolean language sql stable security definer set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'ADMIN'
  );
$$;

do $$
declare policy_name text;
begin
  foreach policy_name in array array[
    'brands', 'categories', 'tags', 'products', 'product_images',
    'product_tags', 'collections', 'collection_products', 'customers',
    'orders', 'order_items', 'queries', 'reviews', 'profiles',
    'site_settings'
  ]
  loop
    execute format(
      'create policy "Admin full access" on public.%I
       for all using (public.is_admin()) with check (public.is_admin())',
      policy_name
    );
  end loop;
end $$;

-- ---- USERS: can read/update their own order requests ----
create policy "Read own orders" on public.orders
  for select using (auth.uid() = user_id);

create policy "Read own profile" on public.profiles
  for select using (auth.uid() = id);

create policy "Update own profile" on public.profiles
  for update using (auth.uid() = id) with check (auth.uid() = id);

-- ---- REVIEWS: authenticated users can create ----
create policy "Authenticated create review" on public.reviews
  for insert with check (auth.uid() is not null);