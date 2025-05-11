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

