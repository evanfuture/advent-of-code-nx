module.exports = {
  mode: 'jit',
  purge: {
    content: ['./apps/**/*.{html,ts,css}', './libs/**/*.{html,ts,css}'],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
