const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        inter: ["var(--font-inter)", "sans-serif"],
        nacelle: ["var(--font-nacelle)", "sans-serif"],
      },
      fontSize: {
        xs: ["0.75rem", { lineHeight: "1.5" }],
        sm: ["0.875rem", { lineHeight: "1.5715" }],
        base: ["1rem", { lineHeight: "1.5", letterSpacing: "-0.01em" }],
        lg: ["1.125rem", { lineHeight: "1.5", letterSpacing: "-0.01em" }],
        xl: ["1.25rem", { lineHeight: "1.5", letterSpacing: "-0.01em" }],
        "2xl": ["1.5rem", { lineHeight: "1.415", letterSpacing: "-0.0268em" }],
        "3xl": ["1.75rem", { lineHeight: "1.3571", letterSpacing: "-0.0268em" }],
        "4xl": ["2.5rem", { lineHeight: "1.1", letterSpacing: "-0.0268em" }],
        "5xl": ["3.5rem", { lineHeight: "1", letterSpacing: "-0.0268em" }],
        "6xl": ["4rem", { lineHeight: "1", letterSpacing: "-0.0268em" }],
        "7xl": ["4.5rem", { lineHeight: "1", letterSpacing: "-0.0268em" }],
      },
      animation: {
        shine: "shine 5s ease-in-out 500ms infinite",
      },
      keyframes: {
        shine: {
          "0%": { top: "0", transform: "scaleY(5)", opacity: "0" },
          "10%": { opacity: ".8" },
          "20%": { top: "100%", transform: "scaleY(10)", opacity: "0" },
          "100%": { top: "100%", transform: "scaleY(1)", opacity: "0" },
        },
        gradient: {
          to: { "background-position": "200% center" },
        },
      },
      boxShadow: {
        sm: '0 1px 1px 0 rgb(0 0 0 / 0.05), 0 1px 2px 0 rgb(0 0 0 / 0.02)',
      },
      colors: {
        gray: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#BFC4CD',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
          950: '#030712',
        },
        violet: {
          50: '#F1EEFF',
          100: '#E6E1FF',
          200: '#D2CBFF',
          300: '#B7ACFF',
          400: '#9C8CFF',
          500: '#8470FF',
          600: '#755FF8',
          700: '#5D47DE',
          800: '#4634B1',
          900: '#2F227C',
          950: '#1C1357',
        },
        sky: {
          50: '#E3F3FF',
          100: '#D1ECFF',
          200: '#B6E1FF',
          300: '#A0D7FF',
          400: '#7BC8FF',
          500: '#67BFFF',
          600: '#56B1F3',
          700: '#3193DA',
          800: '#1C71AE',
          900: '#124D79',
          950: '#0B324F',
        },
        green: {
          50: '#D2FFE2',
          100: '#B1FDCD',
          200: '#8BF0B0',
          300: '#67E294',
          400: '#4BD37D',
          500: '#3EC972',
          600: '#34BD68',
          700: '#239F52',
          800: '#15773A',
          900: '#0F5429',
          950: '#0A3F1E',
        },
        red: {
          50: '#FFE8E8',
          100: '#FFD1D1',
          200: '#FFB2B2',
          300: '#FF9494',
          400: '#FF7474',
          500: '#FF5656',
          600: '#FA4949',
          700: '#E63939',
          800: '#C52727',
          900: '#941818',
          950: '#600F0F',
        },
        yellow: {
          50: '#FFF2C9',
          100: '#FFE7A0',
          200: '#FFE081',
          300: '#FFD968',
          400: '#F7CD4C',
          500: '#F0BB33',
          600: '#DFAD2B',
          700: '#BC9021',
          800: '#816316',
          900: '#4F3D0E',
          950: '#342809',
        },
      },
      screens: {
        xs: '480px',
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    plugin(({ addVariant, e }) => {
      addVariant('sidebar-expanded', ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => `.sidebar-expanded .${e(`sidebar-expanded${separator}${className}`)}`);
      });
    }),
  ],
};