import { notFound } from "next/navigation";
import { getShopById } from "@/lib/shops";
import { getMenu, getReviews } from "@/lib/sheets";
import ItemCard from "@/components/ItemCard";

export default async function ShopPage({ params }: { params: { shopId: string } }) {
  const shop = getShopById(params.shopId);
  if (!shop) notFound();

  const [menu, reviews] = await Promise.all([getMenu(shop.publicSheetId), getReviews(shop.publicSheetId)]);
  const avgRating = reviews.length ? Math.round(reviews.reduce((s, r) => s + r.Rating, 0) / reviews.length) : 0;

  return (
    <main className="bg-cream text-creamInk">
      <section className="px-6 py-10">
        <div className="mx-auto flex max-w-5xl items-end justify-between border-b border-creamInk/10 pb-6">
          <div>
            <h1 className="font-display text-3xl font-semibold text-brick">{shop.name}</h1>
            <p className="mt-1 text-sm text-creamMuted">{shop.tagline}</p>
          </div>
          {reviews.length > 0 && (
            <p className="whitespace-nowrap font-mono text-sm text-gold">
              {"★".repeat(avgRating)}
              {"☆".repeat(5 - avgRating)} <span className="text-creamMuted">({reviews.length})</span>
            </p>
          )}
        </div>
      </section>

      <section className="px-6 pb-12">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {menu.map((item) => (
              <ItemCard key={item.ItemID} item={item} shopId={shop.id} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-creamInk/10 px-6 py-12">
        <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-[280px_1fr]">
          <div>
            <h2 className="mb-4 font-display text-xl font-semibold text-brick">Meet the Chef</h2>
            <div className="flex items-center gap-4 rounded-lg border border-creamInk/10 bg-baseRaised p-5 text-parchment">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-brick font-display text-lg font-semibold">
                {shop.seller.charAt(0)}
              </div>
              <div>
                <p className="font-display font-semibold">{shop.seller}</p>
                <p className="text-xs text-parchmentDim">Runs {shop.name}</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="mb-4 font-display text-xl font-semibold text-brick">Reviews</h2>
            {reviews.length === 0 ? (
              <p className="text-creamMuted">No reviews yet - be the first to order and share how it was.</p>
            ) : (
              <div className="grid gap-3 sm:grid-cols-2">
                {reviews.map((r, i) => (
                  <div key={i} className="rounded-lg border border-creamInk/10 bg-baseRaised p-4 text-parchment">
                    <div className="flex items-center justify-between">
                      <p className="font-display font-semibold">{r.BuyerName}</p>
                      <p className="font-mono text-xs text-gold">
                        {"★".repeat(r.Rating)}
                        {"☆".repeat(Math.max(0, 5 - r.Rating))}
                      </p>
                    </div>
                    <p className="mt-1 text-xs text-parchmentDim">{r.Item}</p>
                    <p className="mt-2 text-sm text-parchmentDim">{r.Comment}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
