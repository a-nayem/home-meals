import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        base: "#241812",
        baseRaised: "#2E2018",
        parchment: "#F4E9D6",
        parchmentDim: "#C9B99C",
        gold: "#D9A02C",
        brick: "#B14328",
        brickDim: "#8A3320",
        green: "#6E8E5C",
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
        mono: ["var(--font-mono)"],
      },
    },
  },
  plugins: [],
};
export default config;
