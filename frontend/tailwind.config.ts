import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: "#0F172A",       // Primary Deep Navy
          blue: "#1D4ED8",       // Accent Blue / Primary CTA
          blueHover: "#1E40AF",  // CTA Hover State
          teal: "#0D9488",       // Highlight Teal (Innovation/AI)
          bg: "#F8FAFC",         // Off-white Clean Background
          text: "#475569",       // Slate Gray Body Text
          error: "#DC2626"       // Error States
        }
      },
    },
  },
  plugins: [],
};
export default config;