"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { submitPayment } from "@/lib/appsScript";

const inputClass =
  "w-full rounded-md border border-creamInk/15 bg-white px-3 py-2.5 text-creamInk placeholder:text-creamMuted focus:border-brick focus:outline-none";
const labelClass = "mb-1.5 block font-mono text-xs uppercase tracking-wide text-creamMuted";

export default function PayForm({ shopId, prefillCode, shopName }: { shopId: string; prefillCode?: string; shopName: string }) {
  const router = useRouter();
  const [orderCode, setOrderCode] = useState(prefillCode || "");
  const [method, setMethod] = useState<"bKash" | "Cash">("bKash");
  const [transactionId, setTransactionId] = useState("");
  const [website, setWebsite] = useState("");
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
    <div className="rounded-lg bg-cream p-6 text-creamInk shadow-lg">
      <div className="mb-4 flex items-start gap-2 rounded-md bg-brick/10 px-3 py-2.5 text-xs text-brick">
        <span>⚠</span>
        <span>Only submit payment after your order code has been marked available in order status.</span>
      </div>

      {error && <div className="mb-5 rounded-md border border-brick/40 bg-brick/10 px-4 py-3 text-sm text-brick">{error}</div>}

      <form onSubmit={handleSubmit}>
        <input type="text" value={website} onChange={(e) => setWebsite(e.target.value)} tabIndex={-1} autoComplete="off" className="hidden" />

        <div className="mb-4">
          <label className={labelClass}>Order ID</label>
          <input type="text" required value={orderCode} onChange={(e) => setOrderCode(e.target.value)} placeholder="e.g. AK-260828-K3X9" className={`${inputClass} font-mono`} />
        </div>

        <div className="mb-4">
          <label className={labelClass}>Payment method</label>
          <div className="flex gap-2">
            <button type="button" onClick={() => setMethod("bKash")} className={`flex-1 rounded-md border py-2.5 text-sm font-semibold ${method === "bKash" ? "border-brick bg-brick/10 text-brick" : "border-creamInk/15 bg-white text-creamMuted"}`}>
              bKash
            </button>
            <button type="button" onClick={() => setMethod("Cash")} className={`flex-1 rounded-md border py-2.5 text-sm font-semibold ${method === "Cash" ? "border-brick bg-brick/10 text-brick" : "border-creamInk/15 bg-white text-creamMuted"}`}>
              Cash on Delivery
            </button>
          </div>
        </div>

        {method === "bKash" && (
          <div className="mb-5">
            <label className={labelClass}>bKash Transaction ID</label>
            <input type="text" value={transactionId} onChange={(e) => setTransactionId(e.target.value)} placeholder="e.g. 8X4K2P9Q1Z" className={`${inputClass} font-mono`} />
          </div>
        )}

        <button type="submit" disabled={submitting} className="w-full rounded-md bg-brick py-3 font-semibold text-parchment hover:bg-brickDim disabled:opacity-40">
          {submitting ? "Submitting…" : "Submit Payment →"}
        </button>
        <p className="mt-3 text-center text-[11px] text-creamMuted">{shopName} checks this amount before confirming.</p>
      </form>
    </div>
  );
}
