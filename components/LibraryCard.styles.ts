// LibraryCard.styles.ts
import { StyleSheet, ViewStyle, TextStyle, ImageStyle } from 'react-native';
import Colors from '@/constants/Colors';
import Typography from '@/constants/Typography';
import Layout from '@/constants/Layout';

interface Styles {
  container: ViewStyle;
  image: ImageStyle;
  content: ViewStyle;
  header: ViewStyle;
  name: TextStyle;
  ratingContainer: ViewStyle;
  rating: TextStyle;
  infoRow: ViewStyle;
  infoText: TextStyle;
  tagsContainer: ViewStyle;
  tag: ViewStyle;
  tagText: TextStyle;
  moreTag: ViewStyle;
  moreTagText: TextStyle;
}

const styles = StyleSheet.create<Styles>({
  container: {
    backgroundColor: Colors.background.primary,
    borderRadius: Layout.borderRadius.lg,
    overflow: 'hidden',
    marginBottom: Layout.spacing.lg,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  image: {
    width: '100%',
    height: 150, // ← obligatoire
    borderRadius: 10,
    backgroundColor: '#ccc', // pour voir s'il y a un trou d'affichage
  },
  content: {
    padding: Layout.spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Layout.spacing.sm,
  },
  name: {
    fontFamily: Typography.fontFamily.semiBold,
    fontSize: Typography.fontSize.lg,
    color: Colors.text.primary,
    flex: 1,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.accent[50],
    paddingHorizontal: Layout.spacing.sm,
    paddingVertical: Layout.spacing.xs,
    borderRadius: Layout.borderRadius.sm,
  },
  rating: {
    fontFamily: Typography.fontFamily.medium,
    fontSize: Typography.fontSize.sm,
    color: Colors.accent[700],
    marginLeft: 4,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Layout.spacing.xs,
  },
  infoText: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: Typography.fontSize.sm,
    color: Colors.text.secondary,
    marginLeft: Layout.spacing.xs,
    flex: 1,
  },
  tagsContainer: {
    flexDirection: 'row',
    marginTop: Layout.spacing.sm,
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: Colors.primary[50],
    paddingHorizontal: Layout.spacing.sm,
    paddingVertical: Layout.spacing.xs,
    borderRadius: Layout.borderRadius.sm,
    marginRight: Layout.spacing.xs,
  },
  tagText: {
    fontFamily: Typography.fontFamily.medium,
    fontSize: Typography.fontSize.xs,
    color: Colors.primary[700],
  },
  moreTag: {
    backgroundColor: Colors.gray[100],
  },
  moreTagText: {
    fontFamily: Typography.fontFamily.medium,
    fontSize: Typography.fontSize.xs,
    color: Colors.gray[600],
  },
});

export default styles;
