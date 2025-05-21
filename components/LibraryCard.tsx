import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Clock, MapPin, Star } from 'lucide-react-native';
import { router } from 'expo-router';
import Colors from '@/constants/Colors';
import { LibraryType } from '@/types/library';
import styles from './LibraryCard.styles';

interface LibraryCardProps {
  library: LibraryType;
}

export default function LibraryCard({ library }: LibraryCardProps) {
  console.log({library});
  
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => router.push(`/library/${library._id}`)}
      activeOpacity={0.7}
    >
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.name}>{library.name}</Text>
          <View style={styles.ratingContainer}>
            <Star
              size={14}
              color={Colors.accent[500]}
              fill={Colors.accent[500]}
            />
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
            {/* Show open/closed status for today if available */}
            {library.opening_hours && library.opening_hours.length > 0
              ? (() => {
                  const today = new Date().toLocaleDateString('fr-FR', {
                    weekday: 'long',
                  });

                  const todayHours = library.opening_hours.find(
                    (h) => h.day.toLowerCase() === today.toLowerCase()
                  );

                  if (todayHours) {
                    return `${
                      todayHours.is_open === 'Ouvert' ? 'Open now' : 'Closed'
                    } • Closes ${todayHours.close_time}`;
                  }
                  // If no hours for today, show the next available hours
                  const nextOpen = library.opening_hours.find((h) => {
                    return h.is_open === 'Ouvert';
                  });
                  if (nextOpen) {
                    return `Closed, next open: ${nextOpen.day} ${nextOpen.open_time}`;
                  }
                  return 'Closed';
                })()
              : 'No hours info'}
          </Text>
        </View>

        <View style={styles.tagsContainer}>
          <View style={styles.tag}>
            <Text style={styles.tagText}>{library.services}</Text>
          </View>
          <View style={styles.tag}>
            <Text style={styles.tagText}>{library.accessibility}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
