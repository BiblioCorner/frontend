import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Calendar, Clock, Users } from 'lucide-react-native';
import { router } from 'expo-router';
import Colors from '@/constants/Colors';
import { EventType } from '@/types/event';
import styles from './EvenCard.styles';

interface EventCardProps {
  event: EventType;
  index?: number; 
}

export default function EventCard({ event, index }: EventCardProps) {

  const eventImages = [
    "https://images.pexels.com/photos/1587927/pexels-photo-1587927.jpeg", 
    "https://images.pexels.com/photos/1038916/pexels-photo-1038916.jpeg",
    "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg", 
    "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg",
    "https://images.pexels.com/photos/7092613/pexels-photo-7092613.jpeg",
    "https://images.pexels.com/photos/8534187/pexels-photo-8534187.jpeg",
    "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg",
    "https://images.pexels.com/photos/7681731/pexels-photo-7681731.jpeg",
    "https://images.pexels.com/photos/2925304/pexels-photo-2925304.jpeg",
    "https://images.pexels.com/photos/1587927/pexels-photo-1587927.jpeg"
    
  ];

 
  const getImageIndex = (id: string, index?: number) => {
    if (typeof index !== 'undefined') {
      return index % eventImages.length;
    }
    
    const lastChars = id.slice(-3); 
    let hash = 0;
    for (let i = 0; i < lastChars.length; i++) {
      hash += lastChars.charCodeAt(i) * (i + 1);
    }
    return hash % eventImages.length;
  };


  
  const imageUrl = eventImages[getImageIndex(event._id, index)];


  const start = new Date(event.start_time);
  const end = new Date(event.end_time);
  const now = new Date();

  let status: 'Open' | 'Limited' | 'Full';
  if (start > now && now < end) {
    status = 'Open';
  } else if (end < now) {
    status = 'Full';
  } else {
    status = 'Limited';
  }

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => router.push(`/event/${event._id}`)}
      activeOpacity={0.7}
    >
      <Image
        source={{ uri: imageUrl }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.content}>
        <View style={styles.libraryRow}>
          <Text style={styles.libraryName}>{event.name}</Text>
          <View
            style={[
              styles.badge,
              {
                backgroundColor: getStatusColor(status),
              },
            ]}
          >
            <Text style={styles.badgeText}>
              {status}
            </Text>
          </View>
        </View>
        <View style={styles.infoContainer}>
          <View style={styles.infoRow}>
            <Calendar
              size={14}
              color={Colors.gray[500]}
              style={styles.infoIcon}
            />
            <Text style={styles.infoText}>{start.toLocaleDateString()}</Text>
          </View>
          <View style={styles.infoRow}>
            <Clock size={14} color={Colors.gray[500]} style={styles.infoIcon} />
            <Text style={styles.infoText}>{start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
          </View>
        </View>
        <View style={styles.footer}>
          <TouchableOpacity
            style={[
              styles.button,
              status === 'Full' ? styles.buttonDisabled : null,
            ]}
            disabled={status === 'Full'}
          >
            <Text
              style={[
                styles.buttonText,
                status === 'Full' ? styles.buttonTextDisabled : null,
              ]}
            >
              {status === 'Full' ? 'Full' : 'Join Event'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Open':
      return Colors.success[100];
    case 'Limited':
      return Colors.amber[100];
    case 'Full':
      return Colors.red[100];
    default:
      return Colors.gray[100];
  }
};