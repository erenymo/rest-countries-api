/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  darkMode: "class",
  theme: {
    extend: {
      height: {
        86: "22rem",
      },
      colors: {
        input: "hsl(0, 0%, 52%)",
        text: "hsl(200, 15%, 8%)",
        background: "hsl(0, 0%, 98%)",
        elements: "hsl(0, 0%, 100%)",
        darkModeElements: "hsl(209, 23%, 22%)",
        darkModeBackground: "hsl(207, 26%, 17%)",
      },
      fontFamily: {
        primary: ["Nunito Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
