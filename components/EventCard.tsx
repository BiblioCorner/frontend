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
