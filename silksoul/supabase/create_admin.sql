-- ============================================================
-- SILKSOUL ADMIN AUTH USER
-- Creates a Supabase auth user + ADMIN profile row in one run.
-- Run once in the Supabase SQL Editor, then sign in at
-- /admin/login with the email/password below.
-- ============================================================

do $$
declare
  v_id    uuid        := gen_random_uuid();
  v_email text        := 'admin@silksoul.com';
  v_pass  text        := 'Admin@1234';  -- change this!
begin
  if not exists (select 1 from auth.users where email = v_email) then
    insert into auth.users (
      instance_id, id, aud, role, email, encrypted_password,
      email_confirmed_at, raw_app_meta_data, raw_user_meta_data,
      created_at, updated_at
    ) values (
      '00000000-0000-0000-0000-000000000000', v_id,
      'authenticated', 'authenticated', v_email,
      crypt(v_pass, gen_salt('bf', 10)),
      now(),
      '{"provider":"email","providers":["email"]}'::jsonb,
      '{}'::jsonb,
      now(), now()
    );
  else
    select id into v_id from auth.users where email = v_email;
  end if;

  insert into auth.identities (
    provider_id, user_id, identity_data, provider, last_sign_in_at, created_at, updated_at
  ) values (
    v_id::text, v_id,
    jsonb_build_object('sub', v_id::text, 'email', v_email),
    'email', now(), now(), now()
  )
  on conflict (provider_id, provider) do nothing;

  insert into public.profiles (id, full_name, email, role)
  values (v_id, 'Store Admin', v_email, 'ADMIN')
  on conflict (id) do nothing;
end $$;