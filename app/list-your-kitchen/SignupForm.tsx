"use client";

import { useState } from "react";
import { submitSellerSignup } from "@/lib/appsScript";

export default function SignupForm() {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [notes, setNotes] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    const result = await submitSellerSignup({ name, contact, cuisine, notes, website });
    setSubmitting(false);

    if (!result.success) {
      setError(result.error);
      return;
    }
    setDone(true);
  }

  if (done) {
    return (
      <div className="rounded-xl border border-white/10 bg-baseRaised p-10 text-center">
        <h3 className="font-display text-xl font-semibold">Thanks, we've got your details</h3>
        <p className="mt-2 text-parchmentDim">We'll reach out soon to get your kitchen set up.</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-white/10 bg-baseRaised p-8">
      {error && <div className="mb-5 rounded-md border border-brick/40 bg-brick/15 px-4 py-3 text-sm text-red-200">{error}</div>}

      <form onSubmit={handleSubmit}>
        <input type="text" value={website} onChange={(e) => setWebsite(e.target.value)} tabIndex={-1} autoComplete="off" className="hidden" />

        <div className="mb-4 grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block font-mono text-xs uppercase tracking-wide text-parchmentDim">Your name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Farzana Akter"
              className="w-full rounded-md border border-white/10 bg-base px-3 py-2.5 text-parchment focus:border-gold focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-1.5 block font-mono text-xs uppercase tracking-wide text-parchmentDim">Contact (phone or email)</label>
            <input
              type="text"
              required
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              placeholder="How do we reach you?"
              className="w-full rounded-md border border-white/10 bg-base px-3 py-2.5 text-parchment focus:border-gold focus:outline-none"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="mb-1.5 block font-mono text-xs uppercase tracking-wide text-parchmentDim">What do you cook?</label>
          <input
            type="text"
            required
            value={cuisine}
            onChange={(e) => setCuisine(e.target.value)}
            placeholder="e.g. Home style Bengali, Chinese, Bakes"
            className="w-full rounded-md border border-white/10 bg-base px-3 py-2.5 text-parchment focus:border-gold focus:outline-none"
          />
        </div>

        <div className="mb-6">
          <label className="mb-1.5 block font-mono text-xs uppercase tracking-wide text-parchmentDim">Anything else? (optional)</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="A note about your kitchen, or a question before you join"
            className="min-h-[70px] w-full rounded-md border border-white/10 bg-base px-3 py-2.5 text-parchment focus:border-gold focus:outline-none"
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-md bg-brick py-3 font-semibold hover:bg-brickDim disabled:opacity-40"
        >
          {submitting ? "Submitting…" : "Request to join"}
        </button>
      </form>
    </div>
  );
}
