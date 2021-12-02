function guessProductionMode() {
  const argv = process.argv.join(' ').toLowerCase();
  const isProdEnv = process.env.NODE_ENV === 'production';
  return isProdEnv || [' build', ':build', 'ng b', '--prod'].some((command) => argv.includes(command));
}

process.env.TAILWIND_MODE = guessProductionMode() ? 'build' : 'watch';

module.exports = {
  mode: 'jit',
  purge: {
    content: ['./apps/**/*.{html,ts,css}', './libs/**/*.{html,ts,css}'],
  },
  darkMode: false,
  theme: {
    extend: {
      colors: {
        burgundy: '#9d0707',
      },
      fontFamily: {
        title: ['Eczar', 'serif'],
        content: ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
