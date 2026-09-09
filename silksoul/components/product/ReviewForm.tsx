"use client";

import { useState } from "react";
import { useToast } from "@/components/toast";
import { submitReview } from "@/app/actions/queries";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export function ReviewForm({ productId }: { productId: string }) {
  const { toast } = useToast();
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [pending, setPending] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    if (rating === 0) {
      toast("Please select a star rating", "error");
      return;
    }
    setPending(true);
    const result = await submitReview({
      productId,
      name: String(data.get("name") ?? ""),
      rating,
      title: String(data.get("title") ?? ""),
      comment: String(data.get("comment") ?? ""),
    });
    setPending(false);
    if (result.success) {
      toast("Thanks! Your review has been submitted for approval.");
      form.reset();
      setRating(0);
    } else {
      toast(result.error, "error");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-surface-container-lowest rounded-xl p-lg shadow-sm border border-surface-variant space-y-sm"
    >
      <p className="font-label-caps text-label-caps text-secondary uppercase tracking-widest">
        Share Your Ritual
      </p>
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            aria-label={`Rate ${star} stars`}
            onClick={() => setRating(star)}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
            className="p-0.5"
          >
            <Star
              className={cn(
                "w-6 h-6 transition-colors",
                (hover || rating) >= star ? "text-gold" : "text-outline-variant",
              )}
              fill={((hover || rating) >= star) ? "currentColor" : "none"}
            />
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-sm">
        <input
          name="name"
          required
          minLength={2}
          placeholder="Your name"
          className="w-full h-11 px-sm bg-surface-container-low text-on-surface rounded-lg text-body-md focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-on-surface-variant/60"
        />
        <input
          name="title"
          required
          minLength={2}
          placeholder="Review title"
          className="w-full h-11 px-sm bg-surface-container-low text-on-surface rounded-lg text-body-md focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-on-surface-variant/60"
        />
      </div>
      <textarea
        name="comment"
        required
        minLength={5}
        rows={4}
        placeholder="Tell us about your experience with this ritual..."
        className="w-full px-sm py-sm bg-surface-container-low text-on-surface rounded-lg text-body-md focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-on-surface-variant/60 resize-none"
      />
      <button
        type="submit"
        disabled={pending}
        className="h-11 px-6 rounded-lg bg-primary text-on-primary font-label-md text-label-md hover:bg-[#2E2D2B] disabled:opacity-50 transition-colors"
      >
        {pending ? "Submitting..." : "Submit Review"}
      </button>
    </form>
  );
}