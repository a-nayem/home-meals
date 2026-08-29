import type { Metadata } from "next";
import { Fraunces, Work_Sans, IBM_Plex_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const display = Fraunces({ subsets: ["latin"], weight: ["600", "700"], variable: "--font-display" });
const body = Work_Sans({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-body" });
const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "Home Meals - home cooked food, ordered by students",
  description: "Order home cooked meals from student-run kitchens on campus.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${body.variable} ${mono.variable} font-body bg-base text-parchment`}>
        <nav className="sticky top-0 z-40 border-b border-white/10 bg-base/90 backdrop-blur">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
            <Link href="/" className="flex items-center gap-2 font-display text-xl font-bold">
              <span className="h-7 w-7 rounded-full bg-[conic-gradient(from_200deg,#D9A02C,#B14328,#D9A02C)]" />
              Home Meals
            </Link>
            <div className="flex items-center gap-5 font-mono text-sm text-parchmentDim">
              <Link href="/how-it-works" className="hover:text-gold">How it works</Link>
              <Link href="/list-your-kitchen" className="hover:text-gold">List your kitchen</Link>
            </div>
          </div>
        </nav>
        {children}
        <footer className="border-t border-white/10 py-8 text-sm text-parchmentDim">
          <div className="mx-auto max-w-5xl px-6">Home Meals - home cooked food, ordered from your own campus.</div>
        </footer>
      </body>
    </html>
  );
}
