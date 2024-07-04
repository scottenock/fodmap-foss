/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        bottom: "0px 6px 11px -7px rgba(0, 0, 0, 0.3)",
      },
    },
  },
  plugins: [],
};
