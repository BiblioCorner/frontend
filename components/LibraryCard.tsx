import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Clock, MapPin, Star } from 'lucide-react-native';
import { router } from 'expo-router';
import Colors from '@/constants/Colors';
import { LibraryType } from '@/types/library';
import styles from './LibraryCard.styles';

interface LibraryCardProps {
  library: LibraryType;
  index?: number; 
}

export default function LibraryCard({ library, index }: LibraryCardProps) {

  const libraryImages = [
    "https://images.pexels.com/photos/590493/pexels-photo-590493.jpeg",
    "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg",
    "https://images.pexels.com/photos/256541/pexels-photo-256541.jpeg",
    "https://images.pexels.com/photos/2041540/pexels-photo-2041540.jpeg",
    "https://images.pexels.com/photos/694740/pexels-photo-694740.jpeg"
  ];

  const getImageIndex = (id: string, index?: number) => {
    if (typeof index !== 'undefined') {
      return index % libraryImages.length;
    }
    
    const lastChars = id.slice(-3); 
    let hash = 0;
    for (let i = 0; i < lastChars.length; i++) {
      hash += lastChars.charCodeAt(i) * (i + 1);
    }
    return hash % libraryImages.length;
  };

  const imageUrl = libraryImages[getImageIndex(library._id, index)];

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => router.push(`/library/${library._id}`)}
      activeOpacity={0.7}
    >
      <Image
        source={{ uri: imageUrl }}
        style={styles.image}
        resizeMode="cover"
      />
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