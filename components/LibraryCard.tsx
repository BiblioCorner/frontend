import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Clock, MapPin, Star } from 'lucide-react-native';
import { router } from 'expo-router';
import Colors from '@/constants/Colors';
import Typography from '@/constants/Typography';
import Layout from '@/constants/Layout';
import { LibraryType } from '@/types/library';

interface LibraryCardProps {
  library: LibraryType;
}

export default function LibraryCard({ library }: LibraryCardProps) {
  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={() => router.push(`/library/${library.id}`)}
      activeOpacity={0.7}
    >
      <Image
        source={{ uri: library.imageUrl }}
        style={styles.image}
        resizeMode="cover"
      />
      
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.name}>{library.name}</Text>
          <View style={styles.ratingContainer}>
            <Star size={14} color={Colors.accent[500]} fill={Colors.accent[500]} />
            <Text style={styles.rating}>{library.rating.toFixed(1)}</Text>
          </View>
        </View>
        
        <View style={styles.infoRow}>
          <MapPin size={14} color={Colors.gray[500]} />
          <Text style={styles.infoText} numberOfLines={1}>
            {library.address}
          </Text>
        </View>
        
        <View style={styles.infoRow}>
          <Clock size={14} color={Colors.gray[500]} />
          <Text style={styles.infoText}>
            {library.isOpen ? 'Open now' : 'Closed'} • Closes {library.closingTime}
          </Text>
        </View>

        <View style={styles.tagsContainer}>
          {library.tags.slice(0, 2).map((tag, index) => (
            <View key={index} style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
          {library.tags.length > 2 && (
            <View style={[styles.tag, styles.moreTag]}>
              <Text style={styles.moreTagText}>+{library.tags.length - 2}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
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
    height: 160,
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