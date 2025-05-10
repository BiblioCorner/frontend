import { Platform } from 'react-native';

export default {
  fontFamily: {
    regular: Platform.select({
      web: 'Inter, system-ui, sans-serif',
      default: 'Inter-Regular',
    }),
    medium: Platform.select({
      web: 'Inter-Medium, system-ui, sans-serif',
      default: 'Inter-Medium',
    }),
    semiBold: Platform.select({
      web: 'Inter-SemiBold, system-ui, sans-serif',
      default: 'Inter-SemiBold',
    }),
    bold: Platform.select({
      web: 'Inter-Bold, system-ui, sans-serif',
      default: 'Inter-Bold',
    }),
    serif: Platform.select({
      web: 'PlayfairDisplay-Regular, Georgia, serif',
      default: 'PlayfairDisplay-Regular',
    }),
    serifBold: Platform.select({
      web: 'PlayfairDisplay-Bold, Georgia, serif',
      default: 'PlayfairDisplay-Bold',
    }),
  },
  fontSize: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 30,
    display: 36,
  },
  lineHeight: {
    tight: 1.2, // For headings
    base: 1.5, // For body text
    loose: 1.8, // For reading content
  },
};