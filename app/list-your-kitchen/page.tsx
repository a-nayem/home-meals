import SignupForm from "./SignupForm";

export default function ListYourKitchenPage() {
  return (
    <main>
      <section className="border-b border-white/10 px-6 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-3 font-mono text-xs uppercase tracking-widest text-gold">For student home cooks</p>
          <h1 className="font-display text-4xl font-semibold leading-tight md:text-5xl">
            Cook for your campus. Keep your earnings.
          </h1>
          <p className="mx-auto mt-5 max-w-[52ch] text-parchmentDim">
            Home Meals is built for students who want to start a small food business from their own kitchen without a
            delivery app taking a heavy cut of every order.
          </p>
        </div>
      </section>

      <section className="px-6 py-14">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-8 text-center font-display text-2xl font-semibold">What you get</h2>
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="rounded-xl border border-white/10 bg-baseRaised p-6">
              <p className="font-display font-semibold">Own menu page</p>
              <p className="mt-2 text-sm text-parchmentDim">A page buyers browse on campus, showing your dishes, photos and prices.</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-baseRaised p-6">
              <p className="font-display font-semibold">Orders in Discord</p>
              <p className="mt-2 text-sm text-parchmentDim">Every order lands straight in your own channel so you know what to cook and how much.</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-baseRaised p-6">
              <p className="font-display font-semibold">Private order record</p>
              <p className="mt-2 text-sm text-parchmentDim">A spreadsheet only you can see, with buyer details and every order logged.</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-baseRaised p-6">
              <p className="font-display font-semibold">Simple two step payment</p>
              <p className="mt-2 text-sm text-parchmentDim">Buyers only pay after you confirm you can make it, so you're never stuck with an unpaid order.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 px-6 py-14">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-3 font-display text-2xl font-semibold">Shop charter</h2>
          <p className="mx-auto mb-8 max-w-[56ch] text-parchmentDim">
            It costs nothing to join and there is no commission on your orders. Discord order automation is free too.
          </p>
          <div className="mx-auto max-w-sm rounded-xl border border-gold/30 bg-baseRaised p-8">
            <p className="font-mono text-xs uppercase tracking-widest text-gold">First 5 shops offer</p>
            <p className="mt-3 font-display text-lg font-semibold">6 months of extra privileges</p>
            <p className="mt-2 text-sm text-parchmentDim">Plus a free first month of reports and every paid feature, so you know exactly what you'd be paying for.</p>
          </div>
          <p className="mx-auto mt-8 max-w-[56ch] text-sm text-parchmentDim">
            A small monthly charge applies to managing your shop profile on the site. Weekly and monthly reports and
            technical support are paid add-ons on top of that, entirely optional.
          </p>
        </div>
      </section>

      <section className="px-6 py-14">
        <div className="mx-auto max-w-lg">
          <h2 className="mb-2 text-center font-display text-2xl font-semibold">Start your kitchen</h2>
          <p className="mb-8 text-center text-parchmentDim">Tell us a bit about what you cook and we'll get you set up.</p>
          <SignupForm />
        </div>
      </section>
    </main>
  );
}
