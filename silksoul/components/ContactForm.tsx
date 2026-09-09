"use client";

import { useState } from "react";
import { useToast } from "@/components/toast";
import { submitQuery } from "@/app/actions/queries";

const fieldStyles =
  "w-full px-sm bg-surface-container-low text-on-surface rounded-lg h-11 font-body-md text-body-md focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-on-surface-variant/50 transition-shadow";
const textareaStyles =
  "w-full px-sm py-sm bg-surface-container-low text-on-surface rounded-lg font-body-md text-body-md focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-on-surface-variant/50 resize-none transition-shadow";

export function ContactForm() {
  const { toast } = useToast();
  const [pending, setPending] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    const data = new FormData(e.currentTarget);
    const result = await submitQuery({
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      phone: String(data.get("phone") ?? ""),
      subject: String(data.get("subject") ?? ""),
      message: String(data.get("message") ?? ""),
    });
    setPending(false);
    if (result.success) {
      toast("Message sent — we'll be in touch within 24 hours.");
      e.currentTarget.reset();
    } else {
      toast(result.error, "error");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-surface-container-lowest rounded-xl p-lg shadow-card border border-surface-variant space-y-md"
    >
      <div className="flex items-center gap-xs">
        <span className="w-6 h-6 rounded-full bg-primary text-on-primary flex items-center justify-center text-[12px] font-bold">
          1
        </span>
        <h2 className="font-display text-headline-sm text-on-surface">Send a Message</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-md">
        <div className="space-y-1">
          <label htmlFor="q-name" className="font-label-sm text-label-sm text-on-surface uppercase tracking-wider">
            Name
          </label>
          <input id="q-name" name="name" required minLength={2} maxLength={100} placeholder="Your full name" className={fieldStyles} />
        </div>
        <div className="space-y-1">
          <label htmlFor="q-email" className="font-label-sm text-label-sm text-on-surface uppercase tracking-wider">
            Email
          </label>
          <input id="q-email" name="email" type="email" required placeholder="you@example.com" className={fieldStyles} />
        </div>
        <div className="space-y-1">
          <label htmlFor="q-phone" className="font-label-sm text-label-sm text-on-surface uppercase tracking-wider">
            Phone <span className="text-on-surface-variant normal-case">(optional)</span>
          </label>
          <input id="q-phone" name="phone" placeholder="03XX-XXXXXXX" className={fieldStyles} />
        </div>
        <div className="space-y-1">
          <label htmlFor="q-subject" className="font-label-sm text-label-sm text-on-surface uppercase tracking-wider">
            Subject
          </label>
          <input id="q-subject" name="subject" required minLength={3} maxLength={200} placeholder="How can we help?" className={fieldStyles} />
        </div>
        <div className="space-y-1 sm:col-span-2">
          <label htmlFor="q-message" className="font-label-sm text-label-sm text-on-surface uppercase tracking-wider">
            Message
          </label>
          <textarea id="q-message" name="message" required minLength={10} rows={5} placeholder="Tell us about your query or ritual..." className={textareaStyles} />
        </div>
      </div>

      <button
        type="submit"
        disabled={pending}
        className="w-full h-12 rounded-lg bg-primary text-on-primary hover:bg-[#2E2D2B] disabled:opacity-50 disabled:cursor-not-allowed font-label-md text-label-md uppercase tracking-wider transition-all shadow-md active:scale-[0.99]"
      >
        {pending ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}