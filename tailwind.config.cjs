/* eslint-disable @typescript-eslint/no-require-imports */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './content/**/*.{md,mdx}',
    './lib/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '24px',
      },
      screens: {
        xl: '1200px',
        '2xl': '1200px',
      },
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
      },

      colors: {
        bg: 'rgb(var(--color-bg-rgb) / <alpha-value>)',
        surface: 'rgb(var(--color-surface-rgb) / <alpha-value>)',
        ui: 'rgb(var(--color-ui-rgb) / <alpha-value>)',
        muted: 'rgb(var(--color-muted-rgb) / <alpha-value>)',
        text: 'rgb(var(--color-text-rgb) / <alpha-value>)',

        black: 'rgb(var(--color-black-rgb) / <alpha-value>)',
        white: 'rgb(var(--color-white-rgb) / <alpha-value>)',

        stroke: 'var(--color-stroke)',
        'stroke-strong': 'var(--color-stroke-strong, rgba(255, 255, 255, 0.16))',
      },

      borderRadius: {
        panel: 'var(--radius-panel)',
        card: 'var(--radius-card)',
        tile: 'var(--radius-tile)',
        pill: 'var(--radius-pill)',
      },

      spacing: {
        tile: 'var(--spacing-tile)',
        card: 'var(--spacing-card)',
        section: 'var(--spacing-section)',
        page: 'var(--spacing-page)',
      },

      boxShadow: {
        panel: 'var(--shadow-panel)',
        card: 'var(--shadow-card)',
        tile: 'var(--shadow-tile)',
      },

      fontSize: {
        crumbs: ['12px', { lineHeight: '16px' }],
        small: ['14px', { lineHeight: '20px' }],
        body: ['18px', { lineHeight: '28px' }],
        h3: ['20px', { lineHeight: '28px' }],
        h2: ['clamp(26px, 2.2vw, 36px)', { lineHeight: '1.15' }],
        h1: ['clamp(40px, 3.6vw, 56px)', { lineHeight: '1.05' }],
      },

      letterSpacing: {
        crumbs: '0.14em',
        tightish: '-0.02em',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
