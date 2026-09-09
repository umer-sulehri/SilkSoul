"use client";

import { useState } from "react";
import { useToast } from "./toast";

export function NewsletterForm() {
  const { toast } = useToast();
  const [email, setEmail] = useState("");

  return (
    <form
      className="pt-sm flex flex-col sm:flex-row items-center gap-xs max-w-md mx-auto"
      onSubmit={(e) => {
        e.preventDefault();
        toast("Thank you for entering the circle. A welcome ritual guide is on its way.");
        setEmail("");
      }}
    >
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email address"
        className="w-full h-12 px-4 bg-surface-container-lowest text-on-surface placeholder:text-on-surface-variant/60 rounded-lg text-body-md shadow-sm focus:outline-none focus:ring-1 focus:ring-primary"
      />
      <button
        type="submit"
        className="w-full sm:w-auto h-12 px-8 bg-primary hover:bg-[#2E2D2B] text-on-primary font-label-md text-label-md rounded-lg flex items-center justify-center transition-colors shadow-md flex-shrink-0"
      >
        Subscribe
      </button>
    </form>
  );
}