/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0077c0",   // Deep Blue
        accent: "#00c896",    // Green
        light: "#f8fafc",     // Background
        dark: "#374151",      // Text Gray
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
      boxShadow: {
        soft: "0 4px 10px rgba(0,0,0,0.08)",
      },
    },
  },
  plugins: [],
};
