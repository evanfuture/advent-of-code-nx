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
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        orange: '#fb8b24',
        rose: '#d90368',
        byzantium: '#820263',
        'dark-purple': '#291720',
        green: '#04a777',
      },
    },
  },
  plugins: [],
};
