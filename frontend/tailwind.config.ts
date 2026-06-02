/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-bg': '#ffffff',         // Light mode base background (White)
        'brand-blue': '#2563eb',       // Primary functional accent (Royal Blue)
        'brand-blueHover': '#1d4ed8',  // Active interactive dark overlay state
        'brand-text': '#4b5563',       // Clear body text readability layer (Slate Gray)
        'brand-navy': '#030712',       // Premium bold headline weight color (Charcoal Black)
        'brand-teal': '#0d9488',       // Strategic technical callouts (Tech Teal)
      },
    },
  },
  plugins: [],
}