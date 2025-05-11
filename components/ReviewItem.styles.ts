// ReviewItem.styles.ts
import { StyleSheet, ViewStyle, TextStyle, ImageStyle } from 'react-native';
import Colors from '@/constants/Colors';
import Typography from '@/constants/Typography';
import Layout from '@/constants/Layout';

interface Styles {
  container: ViewStyle;
  header: ViewStyle;
  userInfo: ViewStyle;
  avatar: ImageStyle;
  username: TextStyle;
  starsRow: ViewStyle;
  moreButton: ViewStyle;
  date: TextStyle;
  content: TextStyle;
  actions: ViewStyle;
  reportButton: ViewStyle;
  reportText: TextStyle;
}

const styles = StyleSheet.create<Styles>({
  container: {
    backgroundColor: Colors.background.primary,
    borderRadius: Layout.borderRadius.lg,
    padding: Layout.spacing.md,
    marginBottom: Layout.spacing.md,
    borderWidth: 1,
    borderColor: Colors.border.light,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Layout.spacing.xs,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: Layout.spacing.sm,
  },
  username: {
    fontFamily: Typography.fontFamily.medium,
    fontSize: Typography.fontSize.md,
    color: Colors.text.primary,
    marginBottom: 2,
  },
  starsRow: {
    flexDirection: 'row',
  },
  moreButton: {
    padding: Layout.spacing.xs,
  },
  date: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: Typography.fontSize.sm,
    color: Colors.text.tertiary,
    marginBottom: Layout.spacing.sm,
  },
  content: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: Typography.fontSize.md,
    color: Colors.text.primary,
    lineHeight: Typography.fontSize.md * Typography.lineHeight.base,
    marginBottom: Layout.spacing.md,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  reportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Layout.spacing.sm,
  },
  reportText: {
    fontFamily: Typography.fontFamily.medium,
    fontSize: Typography.fontSize.sm,
    color: Colors.text.tertiary,
    marginLeft: Layout.spacing.xs,
  },
});

export default styles;
