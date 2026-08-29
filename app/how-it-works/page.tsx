import Link from "next/link";

const STEPS = [
  {
    title: "Request your order",
    body: "Pick an item and submit your details, name, contact and delivery location. No payment yet. This just tells the seller what you'd like.",
  },
  {
    title: "Seller checks stock",
    body: "Home cooking is made to order, so the seller confirms they can actually make it before any money changes hands. This protects you from paying for something that turns out to be sold out.",
  },
  {
    title: "You pay once it's confirmed available",
    body: "Only after hearing back do you pay, by bKash or cash, using the same order code from step one.",
  },
  {
    title: "Seller verifies and confirms",
    body: "The seller checks the payment against their own records and confirms. That's the final signal your order is on.",
  },
];

export default function HowItWorksPage() {
  return (
    <main>
      <section className="border-b border-white/10 px-6 py-16">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-3 font-mono text-xs uppercase tracking-widest text-gold">How Home Meals works</p>
          <h1 className="font-display text-4xl font-semibold">A simple order flow, built around trust.</h1>
        </div>
      </section>

      <section className="px-6 py-14">
        <div className="mx-auto max-w-2xl space-y-4">
          {STEPS.map((step, i) => (
            <div key={step.title} className="flex gap-4 rounded-xl border border-white/10 bg-baseRaised p-6">
              <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border border-gold font-mono text-sm text-gold">
                {i + 1}
              </div>
              <div>
                <h3 className="font-display font-semibold">{step.title}</h3>
                <p className="mt-1 text-sm text-parchmentDim">{step.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-white/10 px-6 py-14">
        <div className="mx-auto max-w-2xl">
          <h2 className="mb-3 font-display text-xl font-semibold">If something goes wrong with a payment</h2>
          <p className="text-parchmentDim">
            Since payment only happens after a seller has confirmed they can make your order, mismatches are rare and
            usually just come down to a wrong amount or a transaction ID typo. If that happens, the seller reaches out
            directly to sort it out, the same way any small home seller would.
          </p>
        </div>
      </section>

      <section className="border-t border-white/10 px-6 py-14">
        <div className="mx-auto grid max-w-2xl gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-white/10 bg-baseRaised p-6 text-center">
            <p className="font-display font-semibold">Hungry?</p>
            <Link href="/" className="mt-3 inline-block rounded-md bg-brick px-5 py-2.5 text-sm font-semibold hover:bg-brickDim">
              Browse shops
            </Link>
          </div>
          <div className="rounded-xl border border-white/10 bg-baseRaised p-6 text-center">
            <p className="font-display font-semibold">Cook at home?</p>
            <Link href="/list-your-kitchen" className="mt-3 inline-block rounded-md border border-gold px-5 py-2.5 text-sm font-semibold text-gold hover:bg-gold/10">
              List your kitchen
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
