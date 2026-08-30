import { notFound } from "next/navigation";
import Link from "next/link";
import { getShopById } from "@/lib/shops";

export default function PaymentSubmittedPage({
  params,
  searchParams,
}: {
  params: { shopId: string };
  searchParams: { code?: string };
}) {
  const shop = getShopById(params.shopId);
  if (!shop || !searchParams.code) notFound();

  const code = searchParams.code;

  return (
    <main className="flex min-h-[80vh] items-center justify-center px-6 py-14">
      <div className="w-full max-w-sm text-center">
        <div className="mx-auto mb-5 flex h-11 w-11 items-center justify-center rounded-full bg-brick text-parchment">✓</div>

        <div className="rounded-t-lg bg-cream px-6 pb-5 pt-5 text-creamInk shadow-xl">
          <p className="font-mono text-[10px] uppercase tracking-widest text-creamMuted">Payment Submitted</p>
          <p className="mt-1 font-display text-2xl font-bold">{code}</p>

          <div className="mt-4 space-y-1.5 border-t border-dashed border-creamInk/25 pt-4 text-left text-xs">
            <div className="flex justify-between"><span className="text-creamMuted">Shop</span><span className="font-medium">{shop.name}</span></div>
            <div className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-green" />
              <span className="text-creamMuted">Awaiting seller verification</span>
            </div>
          </div>

          <p className="mt-4 border-t border-dashed border-creamInk/25 pt-4 text-xs text-creamMuted">
            {shop.name} is checking this against their own payment records. You'll see the final result under your
            order's status.
          </p>
        </div>
        <div
          className="h-4 bg-cream"
          style={{
            maskImage: "radial-gradient(circle at 10px 0, transparent 9px, black 9.5px)",
            maskSize: "20px 20px",
            maskRepeat: "repeat-x",
            WebkitMaskImage: "radial-gradient(circle at 10px 0, transparent 9px, black 9.5px)",
            WebkitMaskSize: "20px 20px",
            WebkitMaskRepeat: "repeat-x",
          }}
        />

        <div className="mt-6">
          <Link href={`/shop/${shop.id}`} className="block rounded-md border border-white/15 py-3 text-center text-sm font-semibold hover:border-gold/40">
            Back to menu
          </Link>
        </div>
      </div>
    </main>
  );
}
