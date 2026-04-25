/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Inter', 'Helvetica Neue', 'Arial', 'sans-serif'],
        'display': ['Inter', 'Helvetica Neue', 'Arial', 'sans-serif'],
        'body': ['Inter', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      colors: {
        'swiss-white': '#f8f9fa',
        'swiss-black': '#111111',
        'swiss-red': '#e63946',
        'swiss-red-dark': '#d62828',
        'swiss-gray': '#6c757d',
        'swiss-gray-light': '#adb5bd',
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: '#111827',
            h1: {
              fontSize: '4rem',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '-0.02em',
            },
            h2: {
              fontSize: '2.5rem',
              fontWeight: '600',
            },
            h3: {
              fontSize: '1.875rem',
              fontWeight: '600',
            },
            p: {
              fontSize: '1.25rem',
              lineHeight: '1.6',
              color: '#6b7280',
            },
            strong: {
              color: '#111827',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
