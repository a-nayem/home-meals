"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { submitPayment } from "@/lib/appsScript";

export default function PayForm({ shopId, prefillCode }: { shopId: string; prefillCode?: string }) {
  const router = useRouter();
  const [orderCode, setOrderCode] = useState(prefillCode || "");
  const [method, setMethod] = useState<"bKash" | "Cash">("bKash");
  const [transactionId, setTransactionId] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (method === "bKash" && !transactionId.trim()) {
      setError("Please enter your bKash Transaction ID.");
      return;
    }

    setSubmitting(true);
    const result = await submitPayment({
      shopId,
      orderCode: orderCode.trim(),
      paymentMethod: method,
      transactionId: method === "bKash" ? transactionId.trim() : undefined,
      website,
    });
    setSubmitting(false);

    if (!result.success) {
      setError(result.error);
      return;
    }
    router.push(`/shop/${shopId}/payment-submitted?code=${encodeURIComponent(orderCode.trim())}`);
  }

  return (
    <div className="rounded-xl border border-white/10 bg-baseRaised p-8">
      {error && <div className="mb-5 rounded-md border border-brick/40 bg-brick/15 px-4 py-3 text-sm text-red-200">{error}</div>}

      <form onSubmit={handleSubmit}>
        <input type="text" value={website} onChange={(e) => setWebsite(e.target.value)} tabIndex={-1} autoComplete="off" className="hidden" />

        <div className="mb-5">
          <label className="mb-1.5 block font-mono text-xs uppercase tracking-wide text-parchmentDim">Order ID</label>
          <input
            type="text"
            required
            value={orderCode}
            onChange={(e) => setOrderCode(e.target.value)}
            placeholder="e.g. AK-260828-K3X9"
            className="w-full rounded-md border border-white/10 bg-base px-3 py-2.5 font-mono text-parchment focus:border-gold focus:outline-none"
          />
        </div>

        <div className="mb-5">
          <label className="mb-1.5 block font-mono text-xs uppercase tracking-wide text-parchmentDim">Payment method</label>
          <div className="flex gap-2.5">
            <button
              type="button"
              onClick={() => setMethod("bKash")}
              className={`flex-1 rounded-md border py-3 text-sm font-semibold ${
                method === "bKash" ? "border-gold bg-gold/10 text-gold" : "border-white/10 text-parchmentDim"
              }`}
            >
              bKash
            </button>
            <button
              type="button"
              onClick={() => setMethod("Cash")}
              className={`flex-1 rounded-md border py-3 text-sm font-semibold ${
                method === "Cash" ? "border-gold bg-gold/10 text-gold" : "border-white/10 text-parchmentDim"
              }`}
            >
              Cash on delivery
            </button>
          </div>
        </div>

        {method === "bKash" && (
          <div className="mb-5">
            <label className="mb-1.5 block font-mono text-xs uppercase tracking-wide text-parchmentDim">bKash Transaction ID</label>
            <input
              type="text"
              value={transactionId}
              onChange={(e) => setTransactionId(e.target.value)}
              placeholder="e.g. 8X4K2P9Q1Z"
              className="w-full rounded-md border border-white/10 bg-base px-3 py-2.5 font-mono text-parchment focus:border-gold focus:outline-none"
            />
          </div>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-md bg-brick py-3 font-semibold hover:bg-brickDim disabled:opacity-40"
        >
          {submitting ? "Submitting…" : "Submit payment"}
        </button>
        <p className="mt-3 text-xs text-parchmentDim">
          The seller checks this transaction ID and amount against their own bKash app before confirming.
        </p>
      </form>
    </div>
  );
}
