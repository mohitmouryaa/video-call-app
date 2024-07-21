/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "landing-page-img": "url('/img/background.png')",
      },
    },
  },
  plugins: [import("@tailwindcss/forms")],
};
