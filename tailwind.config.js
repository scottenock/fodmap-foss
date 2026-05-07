/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        bottom: "0px 6px 11px -7px rgba(0, 0, 0, 0.3)",
      },
      colors: {
        "background-primary":   "var(--background-primary)",
        "background-secondary": "var(--background-secondary)",
        "background-tertiary":  "var(--background-tertiary)",
        "foreground-primary":   "var(--foreground-primary)",
        "foreground-secondary": "var(--foreground-secondary)",
        "foreground-muted":     "var(--foreground-muted)",
        "divider":              "var(--divider)",
      },
    },
  },
  plugins: [],
};
