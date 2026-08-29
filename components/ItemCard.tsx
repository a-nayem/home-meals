import Link from "next/link";
import { MenuItem } from "@/lib/types";

export default function ItemCard({ item, shopId }: { item: MenuItem; shopId: string }) {
  const available = item.Available === "Y";

  return (
    <div className="flex flex-col gap-2 rounded-xl border border-white/10 bg-baseRaised p-5 transition hover:-translate-y-0.5 hover:border-gold/40">
      <span className="font-mono text-xs uppercase tracking-widest text-gold">{item.Category}</span>
      <p className="font-display text-lg font-semibold">{item.Name}</p>
      <p className="flex-1 text-sm text-parchmentDim">{item.Description}</p>
      <div className="mt-1 flex items-center justify-between">
        <span className="font-mono text-lg font-semibold text-gold">৳{item.Price}</span>
        <span
          className={`rounded-full px-2.5 py-1 font-mono text-xs ${
            available ? "bg-green/20 text-green" : "bg-brick/20 text-brick"
          }`}
        >
          {available ? "Available" : "Sold out"}
        </span>
      </div>
      {available ? (
        <Link
          href={`/shop/${shopId}/order?item=${item.ItemID}`}
          className="mt-2 block rounded-md bg-brick py-3 text-center font-semibold hover:bg-brickDim"
        >
          Place order
        </Link>
      ) : (
        <button disabled className="mt-2 block rounded-md border border-white/10 py-3 text-center text-parchmentDim opacity-50">
          Sold out
        </button>
      )}
    </div>
  );
}
