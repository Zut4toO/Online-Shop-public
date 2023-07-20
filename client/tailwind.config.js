module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      keyframes: {
        flipVertrical: {
          '100%': { transform: 'rotateX(180deg)' },
        },
      },
      animation: {
        vflip: 'flipVertrical 1200ms ease-in-out',
      },
    },
  },
  plugins: [],
};
