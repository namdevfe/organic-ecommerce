/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem'
      }
    },
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif']
      },
      colors: {
        primary: {
          100: '#84D187',
          200: '#00B207',
          300: '#2C742F'
        },
        warning: '#FF8A00',
        danger: '#EA4B48'
      },
      height: {
        'top-header': '42px',
        'middle-header': '92px',
        'bottom-header': '60px'
      }
    }
  },
  plugins: []
}
