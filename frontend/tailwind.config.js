/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#2F1B52',      // Roxo Profundo Espiritual
          purple: '#6C4A8E',    // Ametista / Violeta Suave
          cream: '#F6F1EB',     // Areia / Creme Confortável
          gold: '#D9C7A7',      // Dourado Sagrado / Areia Dourada
          sage: '#6E8B6B',      // Verde Ervas / Natureza
          light: '#FAF7F4',
        }
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'Inter', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        'site': '1440px',
      }
    },
  },
  plugins: [],
};
