/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        input: "hsl(0, 0%, 52%)",
        text: "hsl(200, 15%, 8%)",
        background: "hsl(0, 0%, 98%)",
        elements: "hsl(0, 0%, 100%)",
      },
      fontFamily: {
        primary: ["Nunito Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
