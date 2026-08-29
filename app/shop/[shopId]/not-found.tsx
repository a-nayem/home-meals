import Link from "next/link";

export default function ShopNotFound() {
  return (
    <main className="flex min-h-[60vh] items-center justify-center px-6">
      <div className="max-w-md rounded-xl border border-white/10 bg-baseRaised p-10 text-center">
        <h1 className="font-display text-2xl font-semibold">We couldn't find that shop</h1>
        <p className="mt-3 text-parchmentDim">
          This shop or item link may be out of date, or the item may not be available anymore.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block rounded-md bg-brick px-6 py-3 font-semibold hover:bg-brickDim"
        >
          Browse shops
        </Link>
      </div>
    </main>
  );
}
