/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    fontFamily: {
      primary: ["Montserrat", "sans-serif"],
    },
    container: {
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        md: "1.5rem",
        lg: "4rem",
        xl: "5rem",
        "2xl": "5rem",
      },
    },
  },
  plugins: [],
};
