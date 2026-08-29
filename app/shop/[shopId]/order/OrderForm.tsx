"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { submitOrderRequest } from "@/lib/appsScript";
import { MenuItem } from "@/lib/types";

export default function OrderForm({ shopId, item }: { shopId: string; item: MenuItem }) {
  const router = useRouter();
  const [qty, setQty] = useState(1);
  const [buyerName, setBuyerName] = useState("");
  const [contact, setContact] = useState("");
  const [location, setLocation] = useState("");
  const [notes, setNotes] = useState("");
  const [website, setWebsite] = useState(""); // honeypot - stays empty for real users
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    const result = await submitOrderRequest({
      shopId,
      itemId: item.ItemID,
      qty,
      buyerName,
      contact,
      location,
      notes,
      website,
    });

    setSubmitting(false);

    if (!result.success) {
      setError(result.error);
      return;
    }
    router.push(`/shop/${shopId}/confirmed?code=${encodeURIComponent(result.orderCode || "")}`);
  }

  return (
    <div className="max-w-lg rounded-xl border border-white/10 bg-baseRaised p-8">
      {error && <div className="mb-5 rounded-md border border-brick/40 bg-brick/15 px-4 py-3 text-sm text-red-200">{error}</div>}

      <form onSubmit={handleSubmit}>
        {/* honeypot field - hidden from real users, bots tend to fill every input */}
        <input
          type="text"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
          className="hidden"
        />

        <div className="mb-4">
          <label className="mb-1.5 block font-mono text-xs uppercase tracking-wide text-parchmentDim">Quantity</label>
          <input
            type="number"
            min={1}
            required
            value={qty}
            onChange={(e) => setQty(parseInt(e.target.value, 10) || 1)}
            className="w-full rounded-md border border-white/10 bg-base px-3 py-2.5 text-parchment focus:border-gold focus:outline-none"
          />
        </div>

        <div className="mb-4">
          <label className="mb-1.5 block font-mono text-xs uppercase tracking-wide text-parchmentDim">Your name</label>
          <input
            type="text"
            required
            value={buyerName}
            onChange={(e) => setBuyerName(e.target.value)}
            placeholder="e.g. Tanvir Rahman"
            className="w-full rounded-md border border-white/10 bg-base px-3 py-2.5 text-parchment focus:border-gold focus:outline-none"
          />
        </div>

        <div className="mb-4">
          <label className="mb-1.5 block font-mono text-xs uppercase tracking-wide text-parchmentDim">Phone / contact</label>
          <input
            type="tel"
            required
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            placeholder="e.g. 01710000000"
            className="w-full rounded-md border border-white/10 bg-base px-3 py-2.5 text-parchment focus:border-gold focus:outline-none"
          />
        </div>

        <div className="mb-4">
          <label className="mb-1.5 block font-mono text-xs uppercase tracking-wide text-parchmentDim">Delivery location</label>
          <input
            type="text"
            required
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="e.g. North Hall, Room 214"
            className="w-full rounded-md border border-white/10 bg-base px-3 py-2.5 text-parchment focus:border-gold focus:outline-none"
          />
        </div>

        <div className="mb-5">
          <label className="mb-1.5 block font-mono text-xs uppercase tracking-wide text-parchmentDim">Notes (optional)</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Less spicy, extra egg, etc."
            className="min-h-[70px] w-full rounded-md border border-white/10 bg-base px-3 py-2.5 text-parchment focus:border-gold focus:outline-none"
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-md bg-brick py-3 font-semibold hover:bg-brickDim disabled:opacity-40"
        >
          {submitting ? "Submitting…" : "Submit order request"}
        </button>
        <p className="mt-3 text-xs text-parchmentDim">You will get an order code next - no payment happens on this step.</p>
      </form>
    </div>
  );
}
