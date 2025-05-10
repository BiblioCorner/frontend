import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Calendar, Clock, Users } from 'lucide-react-native';
import { router } from 'expo-router';
import Colors from '@/constants/Colors';
import Typography from '@/constants/Typography';
import Layout from '@/constants/Layout';
import { EventType } from '@/types/event';

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
  libraryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Layout.spacing.xs,
  },
  libraryName: {
    fontFamily: Typography.fontFamily.medium,
    fontSize: Typography.fontSize.sm,
    color: Colors.primary[600],
  },
  badge: {
    paddingHorizontal: Layout.spacing.sm,
    paddingVertical: 2,
    borderRadius: Layout.borderRadius.full,
  },
  badgeText: {
    fontFamily: Typography.fontFamily.medium,
    fontSize: Typography.fontSize.xs,
    color: Colors.text.primary,
  },
  title: {
    fontFamily: Typography.fontFamily.semiBold,
    fontSize: Typography.fontSize.lg,
    color: Colors.text.primary,
    marginBottom: Layout.spacing.sm,
  },
  infoContainer: {
    marginBottom: Layout.spacing.md,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  infoIcon: {
    marginRight: Layout.spacing.xs,
  },
  infoText: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: Typography.fontSize.sm,
    color: Colors.text.secondary,
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: Colors.border.light,
    paddingTop: Layout.spacing.sm,
  },
  button: {
    backgroundColor: Colors.primary[600],
    paddingVertical: Layout.spacing.sm,
    borderRadius: Layout.borderRadius.md,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: Colors.gray[200],
  },
  buttonText: {
    fontFamily: Typography.fontFamily.medium,
    fontSize: Typography.fontSize.sm,
    color: Colors.white,
  },
  buttonTextDisabled: {
    color: Colors.gray[500],
  },
});