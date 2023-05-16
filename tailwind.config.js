/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    colors: {
      transparent: 'transparent',
      neutral: {
        100: '#f2f2f2',
        200: '#e4e4e4',
        300: '#c6c6c6',
        400: '#a3a3a3',
        500: '#525252',
        600: '#242424',
        700: '#202020',
        800: '#1b1b1b',
        900: '#161616',
        1000: '#101010',
      },
      primary: {
        100: '#fbf4f3',
        200: '#f8e9e6',
        300: '#f2d0cb',
        400: '#ecb5ac',
        500: '#e59586',
        600: '#df6c4f',
        700: '#c76046',
        800: '#ac533d',
        900: '#8d4431',
        1000: '#633023',
      },
      secondary: {
        100: '#f2f5f3',
        200: '#e5ece7',
        300: '#c7d8cd',
        400: '#a5c1ae',
        500: '#79a88a',
        600: '#2e8b57',
        700: '#297c4d',
        800: '#236b43',
        900: '#1d5737',
        1000: '#143e26',
      },
      tertiary: {
        100: '#fdfaf4',
        200: '#fbf6e9',
        300: '#f7edd1',
        400: '#f3e3b6',
        500: '#efda97',
        600: '#ecd06f',
        700: '#d3ba63',
        800: '#b6a155',
        900: '#958346',
        1000: '#695d31',
      },
      trans: {
        20: '#24242433',
        35: '#24242459',
        50: '#24242480',
        70: '#242424B3',
        80: '#242424CC',
        90: '#242424E6',
      },
      danger: {
        100: '#fee2e2',
        700: '#E02D3C',
        600: '#BA2532',
        800: '#981B25',
      },
    },
    extend: {},
  },
  plugins: [require('@tailwindcss/typography')],
};
