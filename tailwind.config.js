/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "selector",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-color": "var(--primary-color)",
        "secondary-color": "var(--secondary-color)",
        "tertiary-color": "var(--tertiary-color)",
        "dark-text": "var(--dark-text)",
        sepia: "var(--sepia)",
        "dark-sepia": "var(--dark-sepia)",
        bar: "var(--bar)",
        "light-bar": "var(--light-bar)",
        brown: "var(--brown)",
      },
    },
  },
  plugins: [],
};
