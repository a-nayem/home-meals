import { notFound } from "next/navigation";
import { getShopById } from "@/lib/shops";
import { getMenu, getReviews } from "@/lib/sheets";
import ItemCard from "@/components/ItemCard";

export default async function ShopPage({ params }: { params: { shopId: string } }) {
  const shop = getShopById(params.shopId);
  if (!shop) notFound();

  const [menu, reviews] = await Promise.all([getMenu(shop.publicSheetId), getReviews(shop.publicSheetId)]);

  return (
    <main>
      <section className="border-b border-white/10 px-6 py-14">
        <div className="mx-auto max-w-5xl">
          <p className="mb-3 font-mono text-xs uppercase tracking-widest text-gold">{shop.tagline}</p>
          <h1 className="font-display text-4xl font-semibold">{shop.name}</h1>
        </div>
      </section>

      <section className="px-6 py-12">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-6 font-display text-2xl font-semibold">Menu</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {menu.map((item) => (
              <ItemCard key={item.ItemID} item={item} shopId={shop.id} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 px-6 py-12">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-6 font-display text-2xl font-semibold">Reviews</h2>
          {reviews.length === 0 ? (
            <p className="text-parchmentDim">No reviews yet - be the first to order and share how it was.</p>
          ) : (
            <div className="space-y-3">
              {reviews.map((r, i) => (
                <div key={i} className="rounded-lg border border-white/10 bg-baseRaised p-5">
                  <div className="flex items-center justify-between">
                    <p className="font-display font-semibold">{r.BuyerName}</p>
                    <p className="font-mono text-sm text-gold">{"★".repeat(r.Rating)}{"☆".repeat(Math.max(0, 5 - r.Rating))}</p>
                  </div>
                  <p className="mt-1 text-xs text-parchmentDim">{r.Item}</p>
                  <p className="mt-2 text-sm text-parchmentDim">{r.Comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
