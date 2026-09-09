# SilkSoul E-Commerce Platform

A complete Next.js 15 + TypeScript + Tailwind CSS e-commerce platform with an admin
dashboard. Built around an **Order Request / Quotation** workflow — no online payment.
Customers submit order requests; the admin reviews, adjusts, and confirms them.

- **Storefront**: home, shop (filter/sort), product details with gallery + tabs +
  reviews, collections, cart, checkout, order confirmation, contact.
- **Admin**: dashboard, order management, product CRUD, customers, queries, reviews,
  brands, categories, collections.
- **Data**: Supabase (Postgres) with a bundled **sample-data fallback**, so the site
  runs instantly without any credentials and switches to the full database automatically
  once configured.

## Stack

- Next.js 15 (App Router, RSC + Server Actions)
- React 19, TypeScript (strict)
- Tailwind CSS 3 with a Material-style SilkSoul design token system
- Supabase (`@supabase/ssr` + `@supabase/supabase-js` service/client)
- Zod validation

## Getting started

```bash
npm install
cp .env.example .env.local    # optional — app runs with sample data without it
npm run dev
```

Open http://localhost:3000.

### Demo mode (default)

With no Supabase env vars set, the app serves bundled sample data (8 products, 6
reviews, demo orders/queries). The admin dashboard is protected by an email/password
login using the demo credentials `admin@silksoul.com` / `admin1234` (override with
`ADMIN_EMAIL` / `ADMIN_PASSWORD`; sessions are signed with `ADMIN_SESSION_SECRET`).
Order/query/review/product actions return success but are not persisted.

### Connecting Supabase

1. Create a project at https://supabase.com.
2. In **SQL Editor**, run `supabase/migrations/0001_initial_schema.sql`, then
   `supabase/migrations/0002_seed.sql` (seed inserts a Clearix + SilkSoul catalog,
   categories, collections, reviews, and site settings).
3. Add env vars to `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key   # server-only; used by the admin
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_CURRENCY=PKR
```

4. Create an admin: in **Authentication → Users** add a user, then in SQL Editor:

   ```sql
   insert into public.profiles (id, role)
   values (
     'REPLACE_WITH_USER_UUID',
     'ADMIN'
   )
   on conflict (id) do nothing;
   ```

5. Sign in at `/admin/login` with that user. Every admin route is guarded server-side
   (via `requireAdmin()` in `lib/auth.ts`) and redirects to `/admin/login` when signed
   out. Demo mode uses its own signed session cookie with the `ADMIN_EMAIL` /
   `ADMIN_PASSWORD` credentials, and signs in through Supabase automatically once the
   keys above are set.

## Project structure

```
app/
  (storefront)/         # public storefront group (navbar + footer shell)
    page.tsx            # home
    shop/               # /shop with URL-driven filters
    products/[slug]/    # product details
    collections/[slug]/
    cart/  checkout/  contact/
  admin/
    layout.tsx          # sidebar shell + auth guard
    login/  orders/  products/  customers/  queries/  reviews/
    brands/  categories/  collections/
  actions/              # server actions (orders, queries, admin, auth)
components/
  cart/                 # CartProvider, drawer, add-to-cart
  product/              # gallery, buy box, tabs, review form
  admin/                # sidebar, forms, status controls, badges
lib/
  data/                 # loader (supabase <-> sample), sample data, demo admin data
  supabase/             # browser, server (ssr), service clients
  utils.ts  validations.ts  auth.ts
supabase/migrations/    # 0001 schema + RLS, 0002 seed
types/                  # shared domain types + statuses
```

## Order workflow

1. Customer adds items → cart (localStorage) → `/checkout`.
2. Checkout posts an **order request** (`app/actions/orders.ts`): server re-validates
   prices against the DB, computes subtotal + delivery fee, generates an order number
   (`SSL-YYYYMMDD-NNNN`), inserts the order + items, and decrements stock.
3. Admin reviews in `/admin/orders`, updates status (PENDING → ACCEPTED → SHIPPED →
   DELIVERED, or REJECTED/CANCELLED) and leaves internal notes.
4. Support queries (`/contact`) and reviews are queued in `/admin/queries` and
   `/admin/reviews` for moderation.

## Design tokens

Follows the SilkSoul style guide: warm-white background `#FAF9F6`, charcoal ink
`#171717`/`#1A1C1A`, deep wheat secondary `#725B2F`, gold `#B69A68`, Playfair Display
(display serif) + Plus Jakarta Sans. All scale values (spacing, type, radius, shadow)
use the extended Tailwind theme in `tailwind.config.ts`.

## Scripts

| Command         | Purpose                          |
| --------------- | -------------------------------- |
| `npm run dev`   | Start dev server                 |
| `npm run build` | Production build (lint + types)  |
| `npm run start` | Serve the production build       |
| `npm run typecheck` | `tsc --noEmit` strict check  |