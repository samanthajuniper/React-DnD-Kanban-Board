import { extendTheme } from '@chakra-ui/react';

const primaryLightTheme = extendTheme({
  colors: {
    primary: {
      main: '#1463FF', // brand primary color, used for primary actions
      dark: '#0030CC',
    },
    white: '#FFF',
    black: '#000',
    gray: {
      100: '#F1F1F1', // note: this is gray-05 in Figma
      200: '#DDD',
      300: '#303030',
    },
  },
  fonts: {
    heading: 'sans-serif',
    body: 'system-ui, sans-serif',
  },
  fontSizes: {
    h1: '1.875rem',
    h2: '1.5rem',
    h3: '1.125rem',
    label: '0.875rem',
    text: '0.875rem',
  },
  fontWeights: {
    boldHeader: 700,
    label: 600,
    text: 400,
  },
  lineHeights: {
    h1: '2.5rem',
    h2: '2rem',
    h3: '1.125rem',
    label: '1rem',
    text: '1.25rem',
  },
});

export default primaryLightTheme;
