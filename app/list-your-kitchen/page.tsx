import SignupForm from "./SignupForm";

const HERO_IMG = "https://placehold.co/1000x500/2E2018/D9A02C?text=Cook+From+Home&font=playfair-display";

const FEATURES = [
  { icon: "📋", title: "Own Menu Page", body: "A dedicated, beautifully formatted page for your offerings, with photos and your own prices." },
  { icon: "💬", title: "Orders on Discord", body: "Real-time order notifications sent directly to your kitchen's channel." },
  { icon: "📊", title: "Ledger Tracking", body: "Every order automatically logged to a private spreadsheet only you can see." },
  { icon: "💳", title: "Simple Two-Step Payment", body: "Buyers only pay once you've confirmed availability, bKash or cash on pickup." },
];

export default function ListYourKitchenPage() {
  return (
    <main>
      <section className="px-6 py-14 text-center">
        <div className="mx-auto max-w-2xl">
          <h1 className="font-display text-4xl font-semibold leading-tight">Cook for your campus. Keep your earnings.</h1>
          <p className="mx-auto mt-4 max-w-[52ch] text-parchmentDim">
            Tired of commercial delivery apps taking a massive cut? Join our community of student home cooks, serve
            your peers with handmade meals and build your own campus kitchen.
          </p>
          <a href="#apply" className="mt-6 inline-block rounded-md bg-brick px-6 py-3 font-semibold hover:bg-brickDim">Apply to Join</a>
        </div>
      </section>

      <section className="px-6 pb-8">
        <div className="mx-auto max-w-4xl">
          <img src={HERO_IMG} alt="Home cook in kitchen" className="w-full rounded-xl object-cover" />
        </div>
      </section>

      <section className="px-6 py-14">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-1 font-mono text-xs uppercase tracking-widest text-gold">What you get</p>
          <h2 className="mb-8 font-display text-2xl font-semibold">Everything you need to run a small kitchen</h2>
          <div className="grid gap-4 text-left sm:grid-cols-2">
            {FEATURES.map((f) => (
              <div key={f.title} className="rounded-lg border border-white/10 bg-baseRaised p-5">
                <span className="mb-2 flex h-8 w-8 items-center justify-center rounded-md bg-gold/15 text-sm">{f.icon}</span>
                <p className="font-display font-semibold">{f.title}</p>
                <p className="mt-1 text-sm text-parchmentDim">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 px-6 py-14">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-2 font-mono text-xs uppercase tracking-widest text-brick">Shop Charter</p>
          <p className="mx-auto mb-8 max-w-[56ch] text-parchmentDim">
            It costs nothing to join, and there is no commission on your orders. Discord order automation is free too.
          </p>
          <div className="mx-auto max-w-sm rounded-xl border border-gold/30 bg-baseRaised p-8">
            <p className="font-mono text-xs uppercase tracking-widest text-gold">First 5 Shops Offer!</p>
            <p className="mt-3 font-display text-lg font-semibold">6 months of extra privileges</p>
            <p className="mt-2 text-sm text-parchmentDim">Plus a free first month of reports and every paid feature.</p>
          </div>
          <p className="mx-auto mt-8 max-w-[56ch] text-sm text-parchmentDim">
            A small monthly charge applies to managing your shop profile. Weekly and monthly reports and technical
            support are paid add-ons, entirely optional.
          </p>
        </div>
      </section>

      <section id="apply" className="px-6 py-14">
        <div className="mx-auto max-w-lg">
          <h2 className="mb-2 text-center font-display text-2xl font-semibold">Start Your Kitchen</h2>
          <p className="mb-8 text-center text-sm text-parchmentDim">Fill out the form below to request to join our campus food collective.</p>
          <SignupForm />
        </div>
      </section>
    </main>
  );
}
