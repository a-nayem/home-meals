import { notFound } from "next/navigation";
import Link from "next/link";
import { getShopById } from "@/lib/shops";

// NOTE: this reads the order back from the Private Sheet via the shared
// Apps Script Web App (a GET-style lookup), since the frontend itself
// never has direct write access to the Private Sheet. Wire ORDER_LOOKUP_URL
// once that read-only endpoint exists on the backend; until then this page
// renders straight from the order code in the URL, which is enough for the
// buyer's immediate confirmation.

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
    <main className="px-6 py-14">
      <div className="mx-auto max-w-md">
        <div className="rounded-t-xl border border-white/10 bg-baseRaised px-8 pb-6 pt-9 text-center">
          <p className="font-mono text-xs uppercase tracking-widest text-gold">Order requested</p>
          <p className="mt-3 font-mono text-3xl font-semibold text-gold">{code}</p>
          <p className="mt-4 text-sm text-parchmentDim">
            Save this code. Once {shop.name} confirms it is available, come back and pay using it.
          </p>
        </div>
        <div
          className="h-5"
          style={{
            background:
              "radial-gradient(circle at 10px 0, transparent 11px, #2E2018 11.5px) repeat-x",
            backgroundSize: "22px 22px",
          }}
        />

        <div className="mt-6 flex gap-3">
          <Link
            href={`/shop/${shop.id}`}
            className="flex-1 rounded-md border border-white/10 py-3 text-center font-semibold hover:border-gold/40"
          >
            Back to menu
          </Link>
          <Link
            href={`/shop/${shop.id}/pay?code=${encodeURIComponent(code)}`}
            className="flex-1 rounded-md bg-brick py-3 text-center font-semibold hover:bg-brickDim"
          >
            Pay now
          </Link>
        </div>
      </div>
    </main>
  );
}
