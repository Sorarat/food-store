/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js}",
    "./index.html",
    "./cart.html",
    "./js/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        backgroundColor: "#FAF9F4",
        customGreen: "#129575",
        customDarkGreen: "#0f7e63",
      },
    },
  },
  plugins: [],
};
