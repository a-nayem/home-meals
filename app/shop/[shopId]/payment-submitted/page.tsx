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
    <main className="px-6 py-14">
      <div className="mx-auto max-w-md">
        <div className="rounded-t-xl border border-white/10 bg-baseRaised px-8 pb-6 pt-9 text-center">
          <div className="mx-auto mb-3 flex h-9 w-9 items-center justify-center rounded-full border border-green text-green">✓</div>
          <p className="font-mono text-xs uppercase tracking-widest text-gold">Payment submitted</p>
          <p className="mt-3 font-mono text-3xl font-semibold text-gold">{code}</p>
          <p className="mt-4 text-sm text-parchmentDim">
            {shop.name} is checking this against their own payment records. You'll see the final result under this
            order's status.
          </p>
          <p className="mt-3 font-mono text-xs uppercase tracking-wide text-parchmentDim">Awaiting seller verification</p>
        </div>
        <div
          className="h-5"
          style={{
            background: "radial-gradient(circle at 10px 0, transparent 11px, #2E2018 11.5px) repeat-x",
            backgroundSize: "22px 22px",
          }}
        />

        <div className="mt-6">
          <Link
            href={`/shop/${shop.id}`}
            className="block rounded-md border border-white/10 py-3 text-center font-semibold hover:border-gold/40"
          >
            Back to menu
          </Link>
        </div>
      </div>
    </main>
  );
}
