/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      screens: {
        xxs: "0px",
        xs: "360px",
        sm: "480px",
        msm: "540px",
        lsm: "640px",
        md: "720px",
        lg: "960px",
        xl: "1140px",
        "2xl": "1365px",
        "3xl": "1536px",
        "4xl": "1920px"
      },
      colors: {
        main: "#FA4F00",
        primary: "#111826",
        secondary: "#EEEEEE"
      },
      boxShadow: {
        "3xl": "3px 0px 15px rgba(235, 249, 243, 0.8)",
        "4xl": "0 20px 30px 0 rgba(0,37,19,.2)",
        "5xl": "0 0 5px 1px rgba(0,0,0,.05)",
        "6xl": "0 4px 24px 8px rgba(238,234,234,1)"
      },
      fontFamily: {
        domaine: ["var(--font-domaine)"]
      }
    }
  },
  plugins: [
    require("@tailwindcss/typography")
  ]
}