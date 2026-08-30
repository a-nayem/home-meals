"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function ShopError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-[60vh] items-center justify-center px-6">
      <div className="max-w-lg rounded-xl border border-brick/30 bg-baseRaised p-8 text-center">
        <p className="font-mono text-xs uppercase tracking-widest text-brick">Something went wrong loading this shop</p>
        <p className="mt-3 text-sm text-parchmentDim">{error.message}</p>
        <div className="mt-6 flex justify-center gap-3">
          <button
            onClick={() => reset()}
            className="rounded-md border border-white/10 px-5 py-2.5 text-sm font-semibold hover:border-gold/40"
          >
            Try again
          </button>
          <Link href="/" className="rounded-md bg-brick px-5 py-2.5 text-sm font-semibold hover:bg-brickDim">
            Back to shops
          </Link>
        </div>
      </div>
    </main>
  );
}
