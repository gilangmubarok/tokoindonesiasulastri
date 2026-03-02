/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#C62828',
          accent: '#F4C430',
        },
        text: { DEFAULT: '#222222' },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 2px 8px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)',
        'card-hover': '0 8px 24px rgba(198,40,40,0.12), 0 4px 12px rgba(0,0,0,0.08)',
      },
      transitionDuration: {
        '250': '250ms',
      },
    },
  },
  plugins: [],
}

