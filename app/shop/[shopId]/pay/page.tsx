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
      <div className="mx-auto max-w-lg">
        <p className="mb-2 font-mono text-xs uppercase tracking-widest text-gold">Step 2 of 2 · Payment</p>
        <h1 className="mb-2 font-display text-3xl font-semibold">Pay for a confirmed order</h1>
        <p className="mb-8 max-w-[52ch] text-parchmentDim">
          Only pay after your order code has been marked "Available." This should only happen once {shop.name} has
          confirmed they can make it.
        </p>
        <PayForm shopId={shop.id} prefillCode={searchParams.code} />
      </div>
    </main>
  );
}
