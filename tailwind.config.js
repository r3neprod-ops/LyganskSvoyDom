/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,jsx}',
    './src/components/**/*.{js,jsx}',
    './src/data/**/*.{js,jsx}'
  ],
  theme: {
    extend: {
      colors: {
        bg: 'var(--color-bg)',
        text: 'var(--color-text)',
        muted: 'var(--color-muted)',
        accent: 'var(--color-accent)',
        accentSoft: 'var(--color-accent-soft)'
      },
      boxShadow: {
        premium: '0 10px 35px rgba(15, 23, 42, 0.08)'
      }
    }
  },
  plugins: []
};
