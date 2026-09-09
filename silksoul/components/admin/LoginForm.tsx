"use client";

import { useState } from "react";
import { signInAdmin } from "@/app/actions/auth";
import { Logo } from "@/components/Logo";
import { Lock, Mail, ArrowRight } from "lucide-react";

const fieldStyles =
  "w-full px-sm bg-surface-container-low text-on-surface rounded-lg h-12 font-body-md text-body-md focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-on-surface-variant/50 transition-shadow";

export function LoginForm({
  demoMode = false,
  demoEmail,
  demoPassword,
}: {
  demoMode?: boolean;
  demoEmail?: string;
  demoPassword?: string;
}) {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setPending(true);
    const data = new FormData(e.currentTarget);
    const result = await signInAdmin({
      email: String(data.get("email") ?? ""),
      password: String(data.get("password") ?? ""),
    });
    setPending(false);
    if (!result.success && result.error) setError(result.error);
  }

  return (
    <div className="w-full max-w-md">
      <div className="bg-surface-container-lowest rounded-2xl shadow-overlay border border-surface-variant p-lg md:p-xl">
        <div className="flex justify-center mb-lg">
          <div className="px-md py-sm bg-surface-container-low rounded-xl inline-flex">
            <Logo className="h-8" />
          </div>
        </div>

        <h1 className="font-display text-headline-md text-on-surface text-center">
          Admin Sign In
        </h1>
        <p className="font-body-sm text-body-sm text-on-surface-variant text-center mt-xs">
          Sign in with your SilkSoul staff account to manage orders and the catalog.
        </p>

        <form onSubmit={handleSubmit} className="mt-lg space-y-md">
          <div className="space-y-1">
            <label htmlFor="email" className="font-label-sm text-label-sm text-on-surface uppercase tracking-wider">
              Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-on-surface-variant absolute left-sm top-1/2 -translate-y-1/2" />
              <input id="email" name="email" type="email" required className={`${fieldStyles} pl-10`} placeholder="admin@silksoul.com" />
            </div>
          </div>

          <div className="space-y-1">
            <label htmlFor="password" className="font-label-sm text-label-sm text-on-surface uppercase tracking-wider">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-on-surface-variant absolute left-sm top-1/2 -translate-y-1/2" />
              <input id="password" name="password" type="password" required minLength={8} className={`${fieldStyles} pl-10`} placeholder="••••••••" />
            </div>
          </div>

          {error && (
            <p className="font-body-sm text-body-sm text-error bg-error/10 rounded-lg p-sm">{error}</p>
          )}

          <button
            type="submit"
            disabled={pending}
            className="w-full h-12 rounded-lg bg-primary text-on-primary hover:bg-[#2E2D2B] disabled:opacity-50 disabled:cursor-not-allowed font-label-md text-label-md uppercase tracking-wider flex items-center justify-center gap-xs transition-all shadow-md active:scale-[0.99]"
          >
            {pending ? (
              <span className="inline-flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-on-primary/40 border-t-on-primary rounded-full animate-spin" />
                Signing in...
              </span>
            ) : (
              <>
                Sign In <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      </div>
      <p className="font-body-sm text-body-sm text-on-surface-variant text-center mt-md px-sm">
        {demoMode ? (
          <>
            Demo credentials: <code className="text-secondary">{demoEmail}</code> /{" "}
            <code className="text-secondary">{demoPassword}</code>
          </>
        ) : (
          <>
            Connect your Supabase keys and sign in with an ADMIN profile. Override demo
            credentials anytime via <code className="text-secondary">ADMIN_EMAIL</code> and{" "}
            <code className="text-secondary">ADMIN_PASSWORD</code>.
          </>
        )}
      </p>
    </div>
  );
}