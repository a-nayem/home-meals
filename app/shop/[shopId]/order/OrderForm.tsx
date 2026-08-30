"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { submitOrderRequest } from "@/lib/appsScript";
import { MenuItem } from "@/lib/types";

const inputClass =
  "w-full rounded-md border border-creamInk/15 bg-white px-3 py-2.5 text-creamInk placeholder:text-creamMuted focus:border-brick focus:outline-none";
const labelClass = "mb-1.5 block font-mono text-xs uppercase tracking-wide text-creamMuted";

export default function OrderForm({ shopId, item }: { shopId: string; item: MenuItem }) {
  const router = useRouter();
  const [qty, setQty] = useState(1);
  const [buyerName, setBuyerName] = useState("");
  const [contact, setContact] = useState("");
  const [location, setLocation] = useState("");
  const [notes, setNotes] = useState("");
  const [website, setWebsite] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    const result = await submitOrderRequest({ shopId, itemId: item.ItemID, qty, buyerName, contact, location, notes, website });
    setSubmitting(false);

    if (!result.success) {
      setError(result.error);
      return;
    }
    router.push(`/shop/${shopId}/confirmed?code=${encodeURIComponent(result.orderCode || "")}`);
  }

  return (
    <div className="rounded-lg bg-cream p-6 text-creamInk shadow-lg">
      {error && <div className="mb-5 rounded-md border border-brick/40 bg-brick/10 px-4 py-3 text-sm text-brick">{error}</div>}

      <p className="mb-4 font-display font-semibold">Delivery Details</p>

      <form onSubmit={handleSubmit}>
        <input type="text" value={website} onChange={(e) => setWebsite(e.target.value)} tabIndex={-1} autoComplete="off" className="hidden" />

        <div className="mb-4">
          <label className={labelClass}>Quantity</label>
          <div className="flex w-28 items-center rounded-md border border-creamInk/15 bg-white">
            <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))} className="w-9 py-2 text-center text-creamInk">−</button>
            <span className="flex-1 text-center font-mono">{qty}</span>
            <button type="button" onClick={() => setQty((q) => q + 1)} className="w-9 py-2 text-center text-creamInk">+</button>
          </div>
        </div>

        <div className="mb-4">
          <label className={labelClass}>Your name</label>
          <input type="text" required value={buyerName} onChange={(e) => setBuyerName(e.target.value)} placeholder="e.g. Tanvir Rahman" className={inputClass} />
        </div>

        <div className="mb-4">
          <label className={labelClass}>Phone contact</label>
          <input type="tel" required value={contact} onChange={(e) => setContact(e.target.value)} placeholder="e.g. 01710000000" className={inputClass} />
        </div>

        <div className="mb-4">
          <label className={labelClass}>Delivery location (Hall/Building)</label>
          <input type="text" required value={location} onChange={(e) => setLocation(e.target.value)} placeholder="e.g. North Hall, Room 214" className={inputClass} />
        </div>

        <div className="mb-5">
          <label className={labelClass}>Notes (optional)</label>
          <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Less spicy, extra egg, etc." className={`${inputClass} min-h-[70px]`} />
        </div>

        <div className="mb-4 flex items-start gap-2 rounded-md bg-gold/10 px-3 py-2.5 text-xs text-creamInk">
          <span className="text-gold">●</span>
          <span>This payment request is only sent after seller confirms availability, no payment is processed yet.</span>
        </div>

        <button type="submit" disabled={submitting} className="w-full rounded-md bg-brick py-3 font-semibold text-parchment hover:bg-brickDim disabled:opacity-40">
          {submitting ? "Submitting…" : "Submit Order Request →"}
        </button>
      </form>
    </div>
  );
}
