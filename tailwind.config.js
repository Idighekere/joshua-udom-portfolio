/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'primary-500': '#0095c7',
        'primary-400': '#00bce9',
        'secondary-500': '#002b31',
        black: '#050505',
        white: 'white',
        'neutral-500': '#e0e5e6',
        'neutral-300': '#f5f4f3'
      },
      fontFamily: {
        sans: `"Satoshi", sans-serif`,
        satoshi: `"Satoshi", sans-serif`,
        serif: `"Instrument Serif", serif`
      },
      animation: {
        bounce200: 'bounce 1s infinite 200ms',
        bounce400: 'bounce 1s infinite 400ms',
        marquee: 'marquee-left 45s linear infinite',
        'marquee-reverse': 'marquee-right 45s linear infinite'
      }
    }
  },
  plugins: []
}
