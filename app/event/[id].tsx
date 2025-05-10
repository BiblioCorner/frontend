import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Linking,
  SafeAreaView,
  Alert,
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import {
  ArrowLeft,
  Share2,
  Calendar,
  Clock,
  MapPin,
  Users,
  BookOpen,
} from 'lucide-react-native';
import Colors from '@/constants/Colors';
import Typography from '@/constants/Typography';
import Layout from '@/constants/Layout';
import { events } from '@/data/events';
import { libraries } from '@/data/libraries';
import { useTranslation } from 'react-i18next';

export default function EventDetailScreen() {
  const { t } = useTranslation();
  const { id } = useLocalSearchParams();
  const event = events.find(evt => evt.id === id);
  const library = event ? libraries.find(lib => lib.id === event.libraryId) : null;
  
  const [isJoined, setIsJoined] = useState(false);
  
  if (!event || !library) {
    return (
      <SafeAreaView style={styles.errorContainer}>
        <Text style={styles.errorText}>{t('events.notFound', 'Event not found')}</Text>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>{t('common.back')}</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  const handleJoinEvent = () => {
    if (event.status === 'Full') {
      Alert.alert(t('common.sorry', 'Sorry'), t('events.eventFull', 'This event is already full'));
      return;
    }
    
    setIsJoined(!isJoined);
    Alert.alert(
      isJoined ? t('events.leftEvent', 'Left Event') : t('events.joinedEvent', 'Joined Event'),
      isJoined 
        ? t('events.leftEventMessage', 'You have left {{title}}', { title: event.title }) 
        : t('events.joinedEventMessage', 'You have successfully joined {{title}}', { title: event.title })
    );
  };

  const handleShare = () => {
    Alert.alert('Share', `Sharing ${event.title} with friends`);
  };

  const handleViewLibrary = () => {
    router.push(`/library/${library.id}`);
  };

  const handleOpenMap = () => {
    const encodedAddress = encodeURIComponent(library.address);
    const url = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
    Linking.openURL(url);
  };

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

  const getStatusTextColor = (status: string) => {
    switch (status) {
      case 'Open':
        return Colors.success[700];
      case 'Limited':
        return Colors.amber[700];
      case 'Full':
        return Colors.error[700];
      default:
        return Colors.gray[700];
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: event.imageUrl }}
            style={styles.image}
            resizeMode="cover"
          />
          
          <SafeAreaView style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <ArrowLeft size={24} color={Colors.white} />
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.shareButton}
              onPress={handleShare}
            >
              <Share2 size={24} color={Colors.white} />
            </TouchableOpacity>
          </SafeAreaView>
        </View>
        
        <View style={styles.contentContainer}>
          <View style={styles.statusContainer}>
            <Text style={styles.category}>{event.category}</Text>
            <View style={[
              styles.statusBadge,
              { backgroundColor: getStatusColor(event.status) }
            ]}>
              <Text style={[
                styles.statusText,
                { color: getStatusTextColor(event.status) }
              ]}>
                {event.status}
              </Text>
            </View>
          </View>
          
          <Text style={styles.title}>{event.title}</Text>
          
          <TouchableOpacity
            style={styles.libraryContainer}
            onPress={handleViewLibrary}
          >
            <Text style={styles.libraryLabel}>{t('events.hostedBy', 'Hosted by')}</Text>
            <Text style={styles.libraryName}>{library.name}</Text>
          </TouchableOpacity>
          
          <View style={styles.infoContainer}>
            <View style={styles.infoItem}>
              <Calendar size={20} color={Colors.primary[600]} style={styles.infoIcon} />
              <Text style={styles.infoText}>{event.date}</Text>
            </View>
            
            <View style={styles.infoItem}>
              <Clock size={20} color={Colors.primary[600]} style={styles.infoIcon} />
              <Text style={styles.infoText}>{event.time}</Text>
            </View>
            
            <TouchableOpacity style={styles.infoItem} onPress={handleOpenMap}>
              <MapPin size={20} color={Colors.primary[600]} style={styles.infoIcon} />
              <Text style={[styles.infoText, styles.infoTextLink]}>
                {event.location || library.address}
              </Text>
            </TouchableOpacity>
            
            {event.attendees && event.maxAttendees && (
              <View style={styles.infoItem}>
                <Users size={20} color={Colors.primary[600]} style={styles.infoIcon} />
                <Text style={styles.infoText}>
                  {event.attendees} / {event.maxAttendees} {t('events.attendees', 'attendees')}
                </Text>
              </View>
            )}
          </View>
          
          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionTitle}>{t('events.aboutThisEvent', 'About this event')}</Text>
            <Text style={styles.description}>{event.description}</Text>
          </View>
          
          <TouchableOpacity
            style={[
              styles.joinButton,
              isJoined && styles.leaveButton,
              event.status === 'Full' && !isJoined && styles.disabledButton
            ]}
            onPress={handleJoinEvent}
            disabled={event.status === 'Full' && !isJoined}
          >
            <Text style={[
              styles.joinButtonText,
              isJoined && styles.leaveButtonText,
              event.status === 'Full' && !isJoined && styles.disabledButtonText
            ]}>
              {isJoined 
                ? t('events.leaveEvent', 'Leave Event') 
                : event.status === 'Full' 
                  ? t('events.eventFull', 'Event Full') 
                  : t('events.joinEvent', 'Join Event')
              }
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.libraryButton}
            onPress={handleViewLibrary}
          >
            <BookOpen size={20} color={Colors.primary[600]} />
            <Text style={styles.libraryButtonText}>{t('events.viewLibrary', 'View Library')}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Layout.spacing.xl,
  },
  errorText: {
    fontFamily: Typography.fontFamily.medium,
    fontSize: Typography.fontSize.lg,
    color: Colors.text.primary,
    marginBottom: Layout.spacing.lg,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButtonText: {
    fontFamily: Typography.fontFamily.medium,
    fontSize: Typography.fontSize.md,
    color: Colors.primary[600],
  },
  imageContainer: {
    height: 250,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 250,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: Layout.spacing.lg,
  },
  shareButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    padding: Layout.spacing.lg,
    paddingBottom: Layout.spacing.xxl,
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Layout.spacing.sm,
  },
  category: {
    fontFamily: Typography.fontFamily.medium,
    fontSize: Typography.fontSize.md,
    color: Colors.primary[600],
  },
  statusBadge: {
    paddingHorizontal: Layout.spacing.md,
    paddingVertical: Layout.spacing.xs,
    borderRadius: Layout.borderRadius.full,
  },
  statusText: {
    fontFamily: Typography.fontFamily.medium,
    fontSize: Typography.fontSize.sm,
  },
  title: {
    fontFamily: Typography.fontFamily.semiBold,
    fontSize: Typography.fontSize.xxl,
    color: Colors.text.primary,
    marginBottom: Layout.spacing.md,
  },
  libraryContainer: {
    marginBottom: Layout.spacing.lg,
  },
  libraryLabel: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: Typography.fontSize.sm,
    color: Colors.text.secondary,
    marginBottom: 2,
  },
  libraryName: {
    fontFamily: Typography.fontFamily.medium,
    fontSize: Typography.fontSize.md,
    color: Colors.primary[600],
  },
  infoContainer: {
    backgroundColor: Colors.background.secondary,
    borderRadius: Layout.borderRadius.lg,
    padding: Layout.spacing.lg,
    marginBottom: Layout.spacing.lg,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Layout.spacing.md,
  },
  infoIcon: {
    marginRight: Layout.spacing.md,
  },
  infoText: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: Typography.fontSize.md,
    color: Colors.text.primary,
  },
  infoTextLink: {
    color: Colors.primary[600],
    textDecorationLine: 'underline',
  },
  descriptionContainer: {
    marginBottom: Layout.spacing.xl,
  },
  descriptionTitle: {
    fontFamily: Typography.fontFamily.semiBold,
    fontSize: Typography.fontSize.lg,
    color: Colors.text.primary,
    marginBottom: Layout.spacing.md,
  },
  description: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: Typography.fontSize.md,
    color: Colors.text.primary,
    lineHeight: Typography.fontSize.md * Typography.lineHeight.base,
  },
  joinButton: {
    backgroundColor: Colors.primary[600],
    padding: Layout.spacing.md,
    borderRadius: Layout.borderRadius.md,
    alignItems: 'center',
    marginBottom: Layout.spacing.md,
  },
  joinButtonText: {
    fontFamily: Typography.fontFamily.semiBold,
    fontSize: Typography.fontSize.md,
    color: Colors.white,
  },
  leaveButton: {
    backgroundColor: Colors.error[100],
    borderWidth: 1,
    borderColor: Colors.error[600],
  },
  leaveButtonText: {
    color: Colors.error[600],
  },
  disabledButton: {
    backgroundColor: Colors.gray[200],
  },
  disabledButtonText: {
    color: Colors.gray[600],
  },
  libraryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: Layout.spacing.md,
    borderRadius: Layout.borderRadius.md,
    borderWidth: 1,
    borderColor: Colors.primary[600],
  },
  libraryButtonText: {
    fontFamily: Typography.fontFamily.medium,
    fontSize: Typography.fontSize.md,
    color: Colors.primary[600],
    marginLeft: Layout.spacing.sm,
  },
});