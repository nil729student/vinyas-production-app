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
        'bg-primary': '#FFFFFF',
        'bg-secondary': '#F7FAFC',
        'bg-nav': '#0FD1C5',
        'text-primary': '#333333',
        'text-secondary': '#4A5568',
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
