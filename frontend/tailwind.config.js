/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "alpha-pink": "#E31959",
        "beta-pink": "#f42e9f",
        "alpha-grey": "#888888",
        "alpha-red": "#CC0C39",
        "alpha-yellow": "#FFD814",
        "alpha-liteyellow": "#fafaf1",
        "border-color": "#e6e7eb",
        "beta-yellow": "#fbecea",
        "bg-grey": "#f4f4f5",
        "alpha-green": "#1c9550",
        "alpha-gold": "#a9802a",
      },
    },
  },
  plugins: [],
};
