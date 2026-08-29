import { notFound } from "next/navigation";
import { getShopById } from "@/lib/shops";
import { getMenuItem } from "@/lib/sheets";
import OrderForm from "./OrderForm";

export default async function OrderPage({
  params,
  searchParams,
}: {
  params: { shopId: string };
  searchParams: { item?: string };
}) {
  const shop = getShopById(params.shopId);
  if (!shop || !searchParams.item) notFound();

  const item = await getMenuItem(shop.publicSheetId, searchParams.item);
  if (!item || item.Available !== "Y") notFound();

  return (
    <main className="px-6 py-12">
      <div className="mx-auto max-w-lg">
        <p className="mb-2 font-mono text-xs uppercase tracking-widest text-gold">Step 1 of 2 · Order request</p>
        <h1 className="mb-2 font-display text-3xl font-semibold">Request your order</h1>
        <p className="mb-8 max-w-[52ch] text-parchmentDim">
          No payment yet. {shop.name} will confirm it is available before you pay anything.
        </p>

        <div className="mb-6 flex items-center justify-between rounded-lg border border-dashed border-white/15 bg-base px-4 py-4">
          <div>
            <p className="font-display font-semibold">{item.Name}</p>
            <p className="text-sm text-parchmentDim">{item.Category}</p>
          </div>
          <p className="font-mono text-lg text-gold">৳{item.Price}</p>
        </div>

        <OrderForm shopId={shop.id} item={item} />
      </div>
    </main>
  );
}
