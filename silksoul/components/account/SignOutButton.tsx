"use client";

import { signOutUser } from "@/app/actions/user-auth";
import { LogOut } from "lucide-react";

export function SignOutButton({ className = "" }: { className?: string }) {
  return (
    <form action={signOutUser}>
      <button
        type="submit"
        className={`inline-flex items-center gap-xs font-label-md text-label-md text-on-surface-variant hover:text-error transition-colors cursor-pointer ${className}`}
      >
        <LogOut className="w-4 h-4" />
        Sign Out
      </button>
    </form>
  );
}