"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signInAdmin, signInDemo } from "@/app/actions/auth";
import { signInUser, signInUserDemo } from "@/app/actions/user-auth";
import { Logo } from "@/components/Logo";
import { Lock, Mail, ArrowRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const fieldStyles =
  "w-full px-sm bg-surface-container-low text-on-surface rounded-lg h-12 font-body-md text-body-md focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-on-surface-variant/50 transition-shadow";

type Role = "user" | "admin";

export function UserLoginForm({
  demoMode = false,
  userEmail = "user@silksoul.com",
  userPassword = "user1234",
  adminEmail = "admin@silksoul.com",
  adminPassword = "admin1234",
}: {
  demoMode?: boolean;
  userEmail?: string;
  userPassword?: string;
  adminEmail?: string;
  adminPassword?: string;
}) {
  const [role, setRole] = useState<Role>("user");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const isAdmin = role === "admin";
  const demoEmail = isAdmin ? adminEmail : userEmail;
  const demoPassword = isAdmin ? adminPassword : userPassword;

  function switchRole(next: Role) {
    setRole(next);
    setError(null);
  }

  async function handleDemoLogin() {
    setEmail(demoEmail);
    setPassword(demoPassword);
    setError(null);
    setPending(true);
    const result = isAdmin ? await signInDemo(demoEmail) : await signInUserDemo(demoEmail);
    if (result.success) {
      router.push(isAdmin ? "/admin" : "/account");
      router.refresh();
      return;
    }
    setPending(false);
    if (result.error) setError(result.error);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setPending(true);
    const result = isAdmin ? await signInAdmin({ email, password }) : await signInUser({ email, password });
    if (result.success) {
      router.push(isAdmin ? "/admin" : "/account");
      router.refresh();
      return;
    }
    setPending(false);
    if (result.error) setError(result.error);
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-surface-container-lowest rounded-2xl shadow-overlay border border-surface-variant p-lg md:p-xl">
        <div className="flex justify-center mb-lg">
          <div className="px-md py-sm bg-surface-container-low rounded-xl inline-flex">
            <Logo className="h-8" />
          </div>
        </div>

        <h1 className="font-display text-headline-md text-on-surface text-center">
          {isAdmin ? "Admin Sign In" : "Customer Sign In"}
        </h1>
        <p className="font-body-sm text-body-sm text-on-surface-variant text-center mt-xs">
          {isAdmin
            ? "Sign in to manage orders, customers and the catalog."
            : "Sign in to track your orders, queries and review history."}
        </p>

        {/* Role selector */}
        <div className="grid grid-cols-2 gap-sm mt-lg bg-surface-container-high rounded-xl p-1">
          <button
            type="button"
            onClick={() => switchRole("user")}
            className={cn(
              "py-2.5 rounded-lg font-label-md text-label-md uppercase tracking-wider transition-all cursor-pointer",
              !isAdmin
                ? "bg-surface text-on-surface shadow-sm"
                : "text-on-surface-variant hover:text-on-surface",
            )}
          >
            User
          </button>
          <button
            type="button"
            onClick={() => switchRole("admin")}
            className={cn(
              "py-2.5 rounded-lg font-label-md text-label-md uppercase tracking-wider transition-all cursor-pointer",
              isAdmin
                ? "bg-surface text-on-surface shadow-sm"
                : "text-on-surface-variant hover:text-on-surface",
            )}
          >
            Admin
          </button>
        </div>

        <div className="mt-md">
          <button
            type="button"
            onClick={handleDemoLogin}
            disabled={pending}
            className="w-full py-2.5 px-md bg-secondary/10 hover:bg-secondary/20 text-secondary border border-secondary/30 rounded-xl text-body-sm font-medium flex items-center justify-center gap-xs transition-all active:scale-[0.98] cursor-pointer disabled:opacity-50"
          >
            <Sparkles className="w-4 h-4 text-secondary animate-pulse" />
            <span>
              {pending
                ? "Signing in... (demo session)"
                : `One-tap Demo Login → ${isAdmin ? "Admin Dashboard" : "User Dashboard"}`}
            </span>
          </button>
        </div>

        <div className="flex items-center gap-md my-md">
          <span className="flex-1 h-px bg-surface-variant" />
          <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
            or use your account
          </span>
          <span className="flex-1 h-px bg-surface-variant" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-md">
          <div className="space-y-1">
            <label htmlFor="email" className="font-label-sm text-label-sm text-on-surface uppercase tracking-wider">
              Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-on-surface-variant absolute left-sm top-1/2 -translate-y-1/2" />
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`${fieldStyles} pl-10`}
                placeholder={isAdmin ? "admin@silksoul.com" : "you@example.com"}
              />
            </div>
          </div>

          <div className="space-y-1">
            <label htmlFor="password" className="font-label-sm text-label-sm text-on-surface uppercase tracking-wider">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-on-surface-variant absolute left-sm top-1/2 -translate-y-1/2" />
              <input
                id="password"
                name="password"
                type="password"
                required
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`${fieldStyles} pl-10`}
                placeholder="••••••••"
              />
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
                Sign In as {isAdmin ? "Admin" : "Customer"} <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      </div>

      <p className="font-body-sm text-body-sm text-on-surface-variant text-center mt-md px-sm">
        {demoMode ? (
          <>
            {isAdmin ? "Admin" : "User"} demo credentials:{" "}
            <code className="text-secondary">{demoEmail}</code> /{" "}
            <code className="text-secondary">{demoPassword}</code>
          </>
        ) : (
          <>
            One-tap Demo Login above works without a database — or sign in with a real{" "}
            {isAdmin ? "admin" : "account"}.
          </>
        )}
      </p>
      <p className="font-body-sm text-body-sm text-on-surface-variant text-center mt-sm">
        New here? No account needed —{" "}
        <Link href="/shop" className="text-secondary font-medium underline underline-offset-2">
          just browse and order as a guest
        </Link>
        .
      </p>
    </div>
  );
}