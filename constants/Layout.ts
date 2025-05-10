import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default {
  window: {
    width,
    height,
  },
  screen: {
    width,
    height,
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  borderRadius: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    full: 9999,
  },
  iconSize: {
    xs: 16,
    sm: 20,
    md: 24,
    lg: 32,
    xl: 48,
  },
  isSmallDevice: width < 375,
};