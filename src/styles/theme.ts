import { extendTheme } from 'native-base';

export const THEME = extendTheme({
  colors: {
    gray: {
      950: '#09090A',
      900: '#121214',
      800: '#202024',
      600: '#6c6c6c',
      300: '#808080',
      200: '#D4D4D4',
    },
    green: {
      500: '#047C3F'
    },
    purple:{
      100: '#9D23AB',
      200: '#800c80',
      300: '#6c0775',
      400: '#540059',
      500: '#2F0033',
    },
    yellow: {
      500: '#F7DD43',
      600: '#BBA317',
    },
    red: {
      500: '##e80f2b',
      700: '#A10925',
    },
    white: '#FFFFFF'
  },
  pink:{
    100: '#FF808F',
    300: '#FF4867'
  },
  fonts: {
    heading: 'Roboto_700Bold',
    body: 'Roboto_400Regular',
    medium: 'Roboto_500Medium'
  },
  fontSizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 20,
    xl: 24,
  },
  sizes: {
    14: 56
  }
});