/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme")

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // Note the addition of the `app` directory.
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    {
      pattern: /(grid-cols|grid-rows|min-h)-./,
    },
  ],
  theme: {
    extend: {
      colors: {
        ...defaultTheme.colors,
        ...{
          background: "#0f0b15",
          subBackground: "#323232",
          primary: "#FFC400",
          secondary: "#830ff8",
          customGrayHeavy: "#424242",
          customGrayLight: "#999999",
          text: "#CCCCCC",
          input: "#453b55",
          subInput: "#524a5e",
          placeholder: "#7F788D",
        },
      },
      minHeight: {
        10: "40px",
      },
      minWidth: {
        10: "40px",
      },
      fontFamily: {
        maledpan: ["Maledpan"],
      },
    },
  },
  plugins: [],
}
