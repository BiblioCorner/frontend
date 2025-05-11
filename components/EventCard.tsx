import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Calendar, Clock, Users } from 'lucide-react-native';
import { router } from 'expo-router';
import Colors from '@/constants/Colors';
import { EventType } from '@/types/event';
import styles from './EvenCard.styles';

interface EventCardProps {
  event: EventType;
}

export default function EventCard({ event }: EventCardProps) {
  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={() => router.push(`/event/${event.id}`)}
      activeOpacity={0.7}
    >
      <Image
        source={{ uri: event.imageUrl }}
        style={styles.image}
        resizeMode="cover"
      />
      
      <View style={styles.content}>
        <View style={styles.libraryRow}>
          <Text style={styles.libraryName}>{event.libraryName}</Text>
          <View style={[styles.badge, { backgroundColor: getStatusColor(event.status) }]}>
            <Text style={styles.badgeText}>{event.status}</Text>
          </View>
        </View>
        
        <Text style={styles.title}>{event.title}</Text>
        
        <View style={styles.infoContainer}>
          <View style={styles.infoRow}>
            <Calendar size={14} color={Colors.gray[500]} style={styles.infoIcon} />
            <Text style={styles.infoText}>{event.date}</Text>
          </View>
          
          <View style={styles.infoRow}>
            <Clock size={14} color={Colors.gray[500]} style={styles.infoIcon} />
            <Text style={styles.infoText}>{event.time}</Text>
          </View>
          
          {event.attendees && (
            <View style={styles.infoRow}>
              <Users size={14} color={Colors.gray[500]} style={styles.infoIcon} />
              <Text style={styles.infoText}>{event.attendees} attendees</Text>
            </View>
          )}
        </View>
        
        <View style={styles.footer}>
          <TouchableOpacity 
            style={[
              styles.button,
              event.status === 'Full' ? styles.buttonDisabled : null
            ]}
            disabled={event.status === 'Full'}
          >
            <Text style={[
              styles.buttonText,
              event.status === 'Full' ? styles.buttonTextDisabled : null
            ]}>
              {event.status === 'Full' ? 'Full' : 'Join Event'}
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