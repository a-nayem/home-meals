import Link from "next/link";
import { SHOPS } from "@/lib/shops";

export default function HomePage() {
  return (
    <main>
      <section className="border-b border-white/10 px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <p className="mb-3 font-mono text-xs uppercase tracking-widest text-gold">Home Meals</p>
          <h1 className="max-w-[16ch] font-display text-4xl font-semibold leading-tight md:text-5xl">
            Home cooked meals, ordered from your dorm, made on your own campus.
          </h1>
          <p className="mt-5 max-w-[52ch] text-parchmentDim">
            No app to install and no account to make. Pick a dish, submit your order and pay once the cook confirms it is
            actually available.
          </p>
        </div>
      </section>

      <section className="px-6 py-14">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-6 font-display text-2xl font-semibold">Shops on campus</h2>
          <div className="grid gap-5 sm:grid-cols-2">
            {SHOPS.map((shop) => (
              <Link
                key={shop.id}
                href={`/shop/${shop.id}`}
                className="rounded-xl border border-white/10 bg-baseRaised p-5 transition hover:-translate-y-0.5 hover:border-gold/40"
              >
                <p className="font-mono text-xs uppercase tracking-widest text-gold">{shop.tagline}</p>
                <p className="mt-2 font-display text-xl font-semibold">{shop.name}</p>
                <p className="mt-3 font-mono text-sm text-parchmentDim">View menu →</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
