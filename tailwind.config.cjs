/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    fontSize: {
      xs: [
        "0.75rem",
        {
          lineHeight: "1rem",
        },
      ],
      sm: [
        "0.875rem",
        {
          lineHeight: "1.5rem",
        },
      ],
      base: [
        "1rem",
        {
          lineHeight: "1.75rem",
        },
      ],
      lg: [
        "1.125rem",
        {
          lineHeight: "2rem",
        },
      ],
      xl: [
        "1.25rem",
        {
          lineHeight: "2rem",
        },
      ],
      "2xl": [
        "1.5rem",
        {
          lineHeight: "2rem",
        },
      ],
      "3xl": [
        "2rem",
        {
          lineHeight: "2.5rem",
        },
      ],
      "4xl": [
        "2.5rem",
        {
          lineHeight: "3.5rem",
        },
      ],
      "5xl": [
        "3rem",
        {
          lineHeight: "3.5rem",
        },
      ],
      "6xl": [
        "3.75rem",
        {
          lineHeight: "1",
        },
      ],
      "7xl": [
        "4.5rem",
        {
          lineHeight: "1.1",
        },
      ],
      "8xl": [
        "6rem",
        {
          lineHeight: "1",
        },
      ],
      "9xl": [
        "8rem",
        {
          lineHeight: "1",
        },
      ],
    },
    extend: {
      boxShadow: {
        thick: "0px 7px 32px rgb(0 0 0 / 35%);",
      },
      colors: {
        logoBlue: "#385d67",
        dynamicBlack: "#161415",
        honeyBeige: "#F3E1C7",
        eggLiqueur: "#DCCAA8",
        apocalypticOrange: "#F45325",
        primary: {
          DEFAULT: "#161415",
          50: "#f8f7f8",
          100: "#f0eeef",
          200: "#dddadc",
          300: "#c0b9bd",
          400: "#9e9299",
          500: "#82757d",
          600: "#6a5f65",
          700: "#574d52",
          800: "#4a4246",
          900: "#403a3d",
          950: "#161415",
        },
        secondary: {
          DEFAULT: "#3d3d3d",
          50: "#f6f7f9",
          100: "#eceef2",
          200: "#d4dae3",
          300: "#afbaca",
          400: "#8495ac",
          500: "#647793",
          600: "#506079",
          700: "#414e63",
          800: "#374151",
          900: "#333b47",
          950: "#22272f",
        },
        saffron: {
          DEFAULT: "#e9c46a",
          100: "#3b2c09",
          200: "#755912",
          300: "#b0851a",
          400: "#e0ad2e",
          500: "#e9c46a",
          600: "#edd086",
          700: "#f1dca4",
          800: "#f6e7c3",
          900: "#faf3e1",
        },
        accent: {
          DEFAULT: "#f4a261",
          100: "#401f04",
          200: "#803e09",
          300: "#c05e0d",
          400: "#f07e22",
          500: "#f4a261",
          600: "#f6b681",
          700: "#f8c8a1",
          800: "#fbdac0",
          900: "#fdede0",
        },
        neutral: {
          DEFAULT: "#e76f51",
          100: "#371107",
          200: "#6e220f",
          300: "#a43316",
          400: "#db441e",
          500: "#e76f51",
          600: "#ec8b73",
          700: "#f1a896",
          800: "#f5c5b9",
          900: "#fae2dc",
        },
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "3rem",
        "6xl": "5rem",
      },
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/aspect-ratio")
    // ...
  ],
};
