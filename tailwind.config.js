/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#0B0D17',
        primary: '#5D3FD3',
        'text-light': '#F8FAFC',
        'text-muted': '#94A3B8',
        highlight: '#FFD700',
        accent1: '#3B82F6',
        accent2: '#8B5CF6',
      },
      animation: {
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce': 'bounce 1s infinite',
      }
    },
  },
  plugins: [],
}
