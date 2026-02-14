/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/app/**/*.{js,jsx}', './src/components/**/*.{js,jsx}', './src/data/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: 'var(--color-bg)',
        text: 'var(--color-text)',
        muted: 'var(--color-muted)',
        accent: 'var(--color-accent)',
        line: 'var(--color-line)'
      },
      boxShadow: {
        soft: '0 8px 24px rgba(15, 23, 42, 0.06)',
        lift: '0 14px 36px rgba(15, 23, 42, 0.10)',
        glow: '0 10px 35px rgba(20, 184, 166, 0.28)'
      }
    }
  },
  plugins: []
};
