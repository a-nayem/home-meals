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
        <nav className="sticky top-0 z-40 border-b border-white/10 bg-baseRaised">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-3.5">
            <Link href="/" className="font-display text-lg font-bold text-brick">
              Home Meals
            </Link>
            <div className="hidden items-center gap-6 font-mono text-xs uppercase tracking-wide text-parchmentDim sm:flex">
              <Link href="/" className="hover:text-gold">Explore</Link>
              <Link href="/how-it-works" className="hover:text-gold">How It Works</Link>
              <Link href="/list-your-kitchen" className="hover:text-gold">Kitchens</Link>
            </div>
          </div>
        </nav>
        {children}
        <footer className="border-t border-white/10 bg-baseRaised py-6 text-xs text-parchmentDim">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-6">
            <span className="select-none">© 2026 Home Meals. Real food cooked with love on campus.</span>
            <div className="flex select-none gap-4">
              <span>Terms</span>
              <span>Privacy</span>
              <span>Support</span>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
