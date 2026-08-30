import { notFound } from "next/navigation";
import { getShopById } from "@/lib/shops";
import PayForm from "./PayForm";

export default function PayPage({
  params,
  searchParams,
}: {
  params: { shopId: string };
  searchParams: { code?: string };
}) {
  const shop = getShopById(params.shopId);
  if (!shop) notFound();

  return (
    <main className="px-6 py-12">
      <div className="mx-auto max-w-md">
        <p className="mb-1 text-center font-mono text-xs uppercase tracking-widest text-gold">Step 2 of 2</p>
        <h1 className="mb-6 text-center font-display text-2xl font-semibold">Payment</h1>
        <PayForm shopId={shop.id} prefillCode={searchParams.code} shopName={shop.name} />
        <p className="mt-4 text-center text-xs text-parchmentDim">Cancel &amp; return to menu</p>
      </div>
    </main>
  );
}
