import Link from "next/link";
import { MenuItem } from "@/lib/types";

function placeholderImage(name: string, available: boolean) {
  const bg = available ? "2E2018" : "3A332E";
  const fg = available ? "D9A02C" : "8A8078";
  return `https://placehold.co/500x360/${bg}/${fg}?text=${encodeURIComponent(name)}&font=playfair-display`;
}

export default function ItemCard({ item, shopId }: { item: MenuItem; shopId: string }) {
  const available = item.Available === "Y";
  const img = item.ImageURL || placeholderImage(item.Name, available);

  return (
    <div className="group overflow-hidden rounded-xl border border-white/10 bg-baseRaised transition hover:-translate-y-0.5 hover:border-gold/40">
      <div className="relative">
        <img
          src={img}
          alt={item.Name}
          className={`h-44 w-full object-cover ${available ? "" : "grayscale opacity-60"}`}
        />
        <span
          className={`absolute right-3 top-3 rounded-full px-2.5 py-1 font-mono text-[11px] font-semibold uppercase tracking-wide ${
            available ? "bg-green text-baseRaised" : "bg-brick text-parchment"
          }`}
        >
          {available ? "Open" : "Sold Out"}
        </span>
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-baseRaised via-baseRaised/90 to-transparent px-4 pb-3 pt-8">
          <div className="flex items-end justify-between gap-2">
            <p className="font-display text-lg font-semibold leading-tight text-parchment">{item.Name}</p>
            <p className="whitespace-nowrap font-mono text-sm font-semibold text-gold">৳{item.Price}</p>
          </div>
        </div>
      </div>

      <div className="p-4">
        <span className="font-mono text-[11px] uppercase tracking-widest text-gold">{item.Category}</span>
        <p className="mt-1 text-sm text-parchmentDim">{item.Description}</p>

        {available ? (
          <Link
            href={`/shop/${shopId}/order?item=${item.ItemID}`}
            className="mt-4 block rounded-md bg-brick py-2.5 text-center text-sm font-semibold hover:bg-brickDim"
          >
            Place order
          </Link>
        ) : (
          <button disabled className="mt-4 block w-full rounded-md bg-white/5 py-2.5 text-center text-sm text-parchmentDim opacity-60">
            Sold out
          </button>
        )}
      </div>
    </div>
  );
}
