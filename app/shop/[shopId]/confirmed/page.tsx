import { notFound } from "next/navigation";
import Link from "next/link";
import { getShopById } from "@/lib/shops";

export default function ConfirmedPage({
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
        <div className="mx-auto mb-5 flex h-11 w-11 items-center justify-center rounded-full border-2 border-brick text-brick">✓</div>

        <div className="rounded-t-lg bg-cream px-6 pb-5 pt-5 text-creamInk shadow-xl">
          <span className="inline-block rounded-full bg-gold/20 px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-gold">
            Order Requested
          </span>
          <p className="mt-4 font-mono text-[10px] uppercase tracking-widest text-creamMuted">Order Code</p>
          <p className="font-display text-3xl font-bold">{code}</p>

          <div className="mt-4 space-y-1.5 border-t border-dashed border-creamInk/25 pt-4 text-left text-xs">
            <div className="flex justify-between"><span className="text-creamMuted">Shop</span><span className="font-medium">{shop.name}</span></div>
            <div className="flex justify-between"><span className="text-creamMuted">Status</span><span className="font-medium text-brick">Awaiting availability</span></div>
          </div>

          <p className="mt-4 border-t border-dashed border-creamInk/25 pt-4 text-xs italic text-creamMuted">
            "Save this code. You'll need it to pay once your order is confirmed available."
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

        <div className="mt-6 flex gap-3">
          <Link href={`/shop/${shop.id}`} className="flex-1 rounded-md border border-white/15 py-3 text-center text-sm font-semibold hover:border-gold/40">
            Back to menu
          </Link>
          <Link href={`/shop/${shop.id}/pay?code=${encodeURIComponent(code)}`} className="flex-1 rounded-md bg-brick py-3 text-center text-sm font-semibold hover:bg-brickDim">
            Pay now
          </Link>
        </div>
      </div>
    </main>
  );
}
