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
      <div className="mx-auto max-w-md">
        <p className="mb-1 text-center font-mono text-xs uppercase tracking-widest text-gold">Step 1 of 2 · Order Request</p>
        <h1 className="mb-6 text-center font-display text-2xl font-semibold">{shop.name}</h1>

        <div className="mb-5 flex items-center justify-between rounded-lg bg-cream px-4 py-4 text-creamInk shadow-lg">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-creamMuted">Selected item</p>
            <p className="font-display font-semibold">{item.Name}</p>
          </div>
          <p className="font-mono text-lg font-semibold text-brick">৳{item.Price}</p>
        </div>

        <OrderForm shopId={shop.id} item={item} />
      </div>
    </main>
  );
}
