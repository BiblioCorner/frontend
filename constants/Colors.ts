const palette = {
  purple: {
    50: '#f5f3fa',
    100: '#e9e4f5',
    200: '#d5caeb',
    300: '#b7a3dc',
    400: '#9775ca',
    500: '#7554b5',
    600: '#664199',
    700: '#53347d',
    800: '#462e67',
    900: '#3d2a55',
  },
  mint: {
    50: '#f0f9f4',
    100: '#dcf1e5',
    200: '#bfe3ce',
    300: '#a2d6a8',
    400: '#7bbf83',
    500: '#59a464',
    600: '#40814d',
    700: '#366740',
    800: '#2e5236',
    900: '#27442f',
  },
  amber: {
    50: '#fff9eb',
    100: '#fef0c7',
    200: '#fce28c',
    300: '#f9cd50',
    400: '#f5b461',
    500: '#f09c39',
    600: '#e2741d',
    700: '#bb4f1a',
    800: '#983e1c',
    900: '#7c351c',
  },
  gray: {
    50: '#f9f9fa',
    100: '#f0f0f2',
    200: '#e4e5e9',
    300: '#d2d3d9',
    400: '#a9aab3',
    500: '#8c8e9a',
    600: '#717280',
    700: '#5e5f6b',
    800: '#4e4f5b',
    900: '#3f3f4b',
  },
  red: {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d',
  },
  green: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e',
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d',
  },
  white: '#ffffff',
  black: '#000000',
  transparent: 'transparent',
};

export default {
  primary: palette.purple,
  secondary: palette.mint,
  accent: palette.amber,
  success: palette.green,
  error: palette.red,
  gray: palette.gray,
  
  // Semantic colors
  text: {
    primary: palette.gray[900],
    secondary: palette.gray[700],
    tertiary: palette.gray[500],
    inverse: palette.white,
    error: palette.red[600],
    success: palette.green[600],
  },
  
  background: {
    primary: palette.white,
    secondary: palette.gray[50],
    tertiary: palette.gray[100],
    accent: palette.purple[50],
    card: palette.white,
  },
  
  border: {
    light: palette.gray[200],
    medium: palette.gray[300],
    dark: palette.gray[400],
  },
  
  button: {
    primary: {
      background: palette.purple[500],
      text: palette.white,
      pressed: palette.purple[600],
    },
    secondary: {
      background: palette.mint[100],
      text: palette.mint[800],
      pressed: palette.mint[200],
    },
    tertiary: {
      background: palette.gray[100],
      text: palette.gray[800],
      pressed: palette.gray[200],
    },
    danger: {
      background: palette.red[500],
      text: palette.white,
      pressed: palette.red[600],
    },
  },
  
  // Platform specific colors
  light: {
    tabIconDefault: palette.gray[400],
    tabIconSelected: palette.purple[500],
  },
  dark: {
    tabIconDefault: palette.gray[500],
    tabIconSelected: palette.purple[400],
  },
  ...palette
};