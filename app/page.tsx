import Link from "next/link";
import { SHOPS } from "@/lib/shops";

const HERO_IMG = "https://placehold.co/900x700/2E2018/D9A02C?text=Home+Cooking&font=playfair-display";
const SHOP_IMG = "https://placehold.co/500x360/2E2018/D9A02C?text=Amma%27s+Kitchen&font=playfair-display";

const STEPS = [
  { title: "Browse", body: "Explore daily menus from student kitchens near you." },
  { title: "Request", body: "Place a request for the portions you need, no payment yet." },
  { title: "Pay", body: "Pay only once the seller confirms it's available." },
  { title: "Enjoy", body: "Pick up or get it delivered, fresh from a home kitchen." },
];

export default function HomePage() {
  return (
    <main>
      <section className="border-b border-white/10 px-6 py-14">
        <div className="mx-auto grid max-w-5xl items-center gap-10 md:grid-cols-2">
          <div>
            <h1 className="font-display text-4xl font-semibold leading-tight md:text-5xl">
              Home-cooked food, from one student to another.
            </h1>
            <p className="mt-5 max-w-[46ch] text-parchmentDim">
              Homemade, handmade meals cooked with care by campus kitchens. Support your fellow students and taste
              the comfort of home.
            </p>
            <Link href="#kitchens" className="mt-6 inline-block rounded-md bg-brick px-6 py-3 font-semibold hover:bg-brickDim">
              Browse Kitchens
            </Link>
            <div className="mt-8 flex gap-8 font-mono text-xs text-parchmentDim">
              <div><strong className="block font-body text-base text-parchment">{SHOPS.length}</strong>Campus kitchens</div>
              <div><strong className="block font-body text-base text-parchment">7+</strong>Menu items</div>
              <div><strong className="block font-body text-base text-parchment">0</strong>Accounts required</div>
            </div>
          </div>
          <img src={HERO_IMG} alt="Home cooking" className="rounded-xl object-cover" />
        </div>
      </section>

      <section id="kitchens" className="px-6 py-14">
        <div className="mx-auto max-w-5xl">
          <div className="mb-6 flex items-baseline justify-between">
            <h2 className="font-display text-2xl font-semibold">Campus Kitchens</h2>
            <Link href="/list-your-kitchen" className="font-mono text-xs text-gold hover:underline">List yours →</Link>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SHOPS.map((shop) => (
              <Link key={shop.id} href={`/shop/${shop.id}`} className="group overflow-hidden rounded-xl border border-white/10 bg-baseRaised transition hover:-translate-y-0.5 hover:border-gold/40">
                <div className="relative">
                  <img src={SHOP_IMG} alt={shop.name} className="h-36 w-full object-cover" />
                  <span className="absolute right-3 top-3 rounded-full bg-green px-2.5 py-1 font-mono text-[10px] font-semibold uppercase text-baseRaised">Open Now</span>
                </div>
                <div className="p-4">
                  <p className="font-display font-semibold">{shop.name}</p>
                  <p className="mt-1 text-xs text-parchmentDim">{shop.tagline}</p>
                  <p className="mt-3 font-mono text-xs text-gold">View menu →</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 px-6 py-14">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-8 font-display text-2xl font-semibold">How an order moves</h2>
          <div className="grid gap-4 sm:grid-cols-4">
            {STEPS.map((s, i) => (
              <div key={s.title} className="rounded-lg border border-white/10 bg-baseRaised p-5">
                <div className="mx-auto mb-3 flex h-8 w-8 items-center justify-center rounded-full border border-gold font-mono text-xs text-gold">{i + 1}</div>
                <p className="font-display font-semibold">{s.title}</p>
                <p className="mt-1 text-xs text-parchmentDim">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
