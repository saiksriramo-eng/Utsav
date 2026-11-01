/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FAF7F4',
          100: '#F5EFEA', // Main warm cream
          200: '#EFE7E0',
          300: '#E4D8CE',
        },
        slateNavy: '#2C3844',
        sageTeal: {
          DEFAULT: '#4A7B76',
          dark: '#3B6460',
          light: '#619691',
          50: '#F0F6F5',
        },
        terracotta: {
          DEFAULT: '#D96B52',
          dark: '#C2573F',
          light: '#E2846E',
          50: '#FDF5F3',
        },
        coralAccent: '#DE7356', // User-specified nested surface / accent
        goldenOchre: {
          DEFAULT: '#E59852',
          dark: '#D08139',
          light: '#ECAC73',
          50: '#FEF8F2',
        },
        charcoal: {
          DEFAULT: '#1E262D',
          muted: '#7A8288',
          light: '#A0A7AD',
        },
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'serif'],
        serif: ['"Cormorant Garamond"', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'card': '22px',
        'subcard': '14px',
      },
      boxShadow: {
        'ambient': '0 4px 16px rgba(0, 0, 0, 0.04)',
        'ambient-sm': '0 2px 8px rgba(0, 0, 0, 0.03)',
        'ambient-md': '0 6px 20px rgba(0, 0, 0, 0.06)',
      },
    },
  },
  plugins: [],
}
