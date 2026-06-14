/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    // 8px-based spacing rhythm (4 / 8 / 16 / 24 / 32 / 48 / 64 / 96 / 128)
    extend: {
      colors: {
        // Semantic tokens — driven by CSS variables so light/dark stay in sync.
        bg: 'rgb(var(--bg) / <alpha-value>)',
        surface: 'rgb(var(--surface) / <alpha-value>)',
        elevated: 'rgb(var(--elevated) / <alpha-value>)',
        border: 'rgb(var(--border) / <alpha-value>)',
        fg: 'rgb(var(--fg) / <alpha-value>)',
        muted: 'rgb(var(--muted) / <alpha-value>)',
        primary: 'rgb(var(--primary) / <alpha-value>)',
        'primary-fg': 'rgb(var(--primary-fg) / <alpha-value>)',
        secondary: 'rgb(var(--secondary) / <alpha-value>)',
        accent: 'rgb(var(--accent) / <alpha-value>)',
        success: 'rgb(var(--success) / <alpha-value>)',
        warning: 'rgb(var(--warning) / <alpha-value>)',
        error: 'rgb(var(--error) / <alpha-value>)',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk"', 'Inter', 'ui-sans-serif', 'sans-serif'],
      },
      fontSize: {
        // Fluid type scale (clamp): mobile-first, scales smoothly to desktop.
        'display-xl': ['clamp(2.75rem, 1.6rem + 5.6vw, 6rem)', { lineHeight: '0.98', letterSpacing: '-0.035em', fontWeight: '600' }],
        'display-lg': ['clamp(2.25rem, 1.5rem + 3.6vw, 4rem)', { lineHeight: '1.02', letterSpacing: '-0.03em', fontWeight: '600' }],
        'display-md': ['clamp(1.75rem, 1.3rem + 2.2vw, 2.75rem)', { lineHeight: '1.08', letterSpacing: '-0.025em', fontWeight: '600' }],
        'title': ['clamp(1.25rem, 1.1rem + 0.8vw, 1.6rem)', { lineHeight: '1.2', letterSpacing: '-0.02em', fontWeight: '600' }],
        'lead': ['clamp(1.0625rem, 1rem + 0.4vw, 1.3125rem)', { lineHeight: '1.55', letterSpacing: '-0.01em' }],
      },
      maxWidth: {
        container: '80rem', // 1280px
        prose: '42rem',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.75rem',
      },
      boxShadow: {
        // Consistent elevation scale.
        'glass': '0 1px 0 0 rgb(255 255 255 / 0.06) inset, 0 8px 32px -8px rgb(0 0 0 / 0.6)',
        'glow': '0 0 0 1px rgb(var(--primary) / 0.35), 0 12px 40px -8px rgb(var(--primary) / 0.45)',
        'elevated': '0 24px 80px -24px rgb(0 0 0 / 0.7)',
        'soft': '0 2px 8px -2px rgb(0 0 0 / 0.3)',
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.22, 1, 0.36, 1)',
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        aurora: {
          '0%, 100%': { transform: 'translate3d(0,0,0) scale(1)' },
          '33%': { transform: 'translate3d(4%, -3%, 0) scale(1.08)' },
          '66%': { transform: 'translate3d(-3%, 4%, 0) scale(0.96)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'gradient-pan': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.8)', opacity: '0.5' },
          '100%': { transform: 'scale(2.4)', opacity: '0' },
        },
      },
      animation: {
        aurora: 'aurora 18s ease-in-out infinite',
        'aurora-slow': 'aurora 26s ease-in-out infinite',
        float: 'float 6s ease-in-out infinite',
        shimmer: 'shimmer 2s infinite',
        marquee: 'marquee 38s linear infinite',
        'gradient-pan': 'gradient-pan 8s ease infinite',
        'pulse-ring': 'pulse-ring 2.4s ease-out infinite',
      },
    },
  },
  plugins: [],
};
