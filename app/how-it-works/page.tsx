import Link from "next/link";

const STEPS = [
  { icon: "🔍", title: "1. Browse", body: "Explore daily menus from your neighborhood. Discover family recipes, regional specialties and dietary-friendly options listed by cooks down the street." },
  { icon: "📝", title: "2. Request", body: "Place a request for the portions you need. Because our cooks prepare small batches, availability is limited and first-come, first-served." },
];

export default function HowItWorksPage() {
  return (
    <main className="bg-cream text-creamInk">
      <section className="px-6 py-14 text-center">
        <div className="mx-auto max-w-2xl">
          <h1 className="font-display text-3xl font-semibold text-brick">How Home Meals Works</h1>
          <p className="mx-auto mt-3 max-w-[52ch] text-creamMuted">
            We connect the best meals and treats in home kitchens, not commercial storefronts. Our platform
            prioritizes hungry neighbors with talented local cooks, focusing on small batches, fresh ingredients and
            a fair exchange.
          </p>
        </div>
      </section>

      <section className="px-6 pb-6">
        <div className="mx-auto grid max-w-3xl gap-4 sm:grid-cols-2">
          {STEPS.map((s) => (
            <div key={s.title} className="rounded-lg bg-baseRaised p-5 text-parchment">
              <span className="mb-2 flex h-8 w-8 items-center justify-center rounded-md bg-gold/15 text-sm">{s.icon}</span>
              <p className="font-display font-semibold">{s.title}</p>
              <p className="mt-1 text-sm text-parchmentDim">{s.body}</p>
            </div>
          ))}

          <div className="rounded-lg bg-baseRaised p-5 text-parchment sm:col-span-2">
            <span className="mb-2 flex h-8 w-8 items-center justify-center rounded-md bg-brick/20 text-sm">📦</span>
            <p className="font-display font-semibold">3. Pay Only When Confirmed</p>
            <p className="mt-1 max-w-[46ch] text-sm text-parchmentDim">
              You don't charge until the cook confirms they have enough ingredients and portions to fulfill your
              request. This removes surprises and eliminates the frustration of canceled orders.
            </p>
            <div className="mt-3 flex items-center justify-between rounded-md bg-base px-4 py-2 text-xs">
              <span className="text-parchmentDim">Status</span>
              <span className="font-mono text-gold">Awaiting Confirm</span>
            </div>
            <div className="mt-2 flex items-center justify-between rounded-md bg-base px-4 py-2 text-xs">
              <span className="text-parchmentDim">Total Held</span>
              <span className="font-mono">৳0.00</span>
            </div>
            <p className="mt-3 rounded-md bg-gold/10 px-3 py-2 text-xs text-gold">
              Trust &amp; Transparency: the cook never sees your unfulfilled order until they've confirmed your
              request and never charged automatically until they've responded.
            </p>
          </div>

          <div className="rounded-lg bg-baseRaised p-5 text-parchment sm:col-span-2">
            <span className="mb-2 flex h-8 w-8 items-center justify-center rounded-md bg-green/20 text-sm">🍽️</span>
            <p className="font-display font-semibold">4. Enjoy</p>
            <p className="mt-1 text-sm text-parchmentDim">
              Pick up your warm, home-cooked meal at the designated time, or wait for hand delivery from the taste of
              real food made with care.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-creamInk/10 px-6 py-14 text-center">
        <p className="mb-1 font-mono text-xs uppercase tracking-widest text-brick">Ready to start?</p>
        <div className="mt-4 flex justify-center gap-3">
          <Link href="/" className="rounded-md bg-brick px-6 py-3 text-sm font-semibold text-parchment hover:bg-brickDim">Browse Kitchens Now</Link>
          <Link href="/list-your-kitchen" className="rounded-md border border-brick px-6 py-3 text-sm font-semibold text-brick hover:bg-brick/10">List Your Kitchen</Link>
        </div>
      </section>
    </main>
  );
}
