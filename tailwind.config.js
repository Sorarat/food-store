/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}", "./index.html", "./cart.html"], // Add your HTML files here
  theme: {
    extend: {
      colors: {
        backgroundColor: "#FAF9F4",
        customGreen: "#129575",
      },
    },
  },
  plugins: [],
};
