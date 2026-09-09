import { createClient as createSupabaseClient } from "@supabase/supabase-js";

// Server-only admin client with the service role key.
// Never import this from client components.
export function createServiceClient() {
  console.log(
    "[supabase-service] host=",
    process.env.NEXT_PUBLIC_SUPABASE_URL
      ? new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).host
      : "(missing URL)",
    "serviceKey=",
    process.env.SUPABASE_SERVICE_ROLE_KEY ? "set" : "(missing)",
  );
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    },
  );
}