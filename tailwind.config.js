/** @type {import('tailwindcss').Config} */
// import nextui typescript


// imoport 
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'color-primary': '#FFFFFF',
        'color-secondary': '#f0c375',
        'color-secondary-vinas': '#8B734A',
        'color-nav': '#0A2240',
        'color-button': '#0A2240',
        'color-button-secondary': '#0A2240',
        'text-accent': '#3182CE',
        'accent': '#E53E3E',
        'success': '#38A169',
        'warning': '#F6E05E',
        'error': '#DC2626',
      },
    },
    darkMode: "class",
  },
  plugins: [],
}
