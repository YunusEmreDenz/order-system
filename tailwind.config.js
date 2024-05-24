/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors:{
        siyah:"#353535",
        mavi:"#2272B0",
        gri:"#bfbdbd",
        kırmızı:"#d7cad3",
        admin_notu:"#efefee",
        border_color:"#6f6a6c",
        yeşil:"#E6FBD3",
      }
    },
  },
  plugins: [],
};