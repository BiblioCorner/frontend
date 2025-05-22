import React, { useEffect, useState } from 'react';
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
import { useTranslation } from 'react-i18next';
import { getEventById } from '@/services/event.service';
import { getLibraryById } from '@/services/library.service';
import { EventType } from '@/types/event';
import { LibraryType } from '@/types/library';

const EVENT_IMAGES = [
  "https://images.pexels.com/photos/1587927/pexels-photo-1587927.jpeg",
  "https://images.pexels.com/photos/1038916/pexels-photo-1038916.jpeg",
  "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg",
  "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg",
  "https://images.pexels.com/photos/7092613/pexels-photo-7092613.jpeg",
  "https://images.pexels.com/photos/8534187/pexels-photo-8534187.jpeg",
  "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg",
  "https://images.pexels.com/photos/7681731/pexels-photo-7681731.jpeg",
  "https://images.pexels.com/photos/2925304/pexels-photo-2925304.jpeg"
];

export default function EventDetailScreen() {
  const { t } = useTranslation();
  const { id } = useLocalSearchParams();
  const [event, setEvent] = useState<EventType>();
  const [library, setLibrary] = useState<LibraryType>();
  const [isJoined, setIsJoined] = useState(false);
  const [status, setStatus] = useState<'Open' | 'Limited' | 'Full'>('Open');

  const getImageIndex = (eventId: string) => {
    let sum = 0;
    for (let i = 0; i < eventId.length; i++) {
      sum += eventId.charCodeAt(i) * (i + 1);
    }
    return sum % EVENT_IMAGES.length;
  };

  const fetchEvent = async () => {
    try {
      const data = await getEventById(id as string);
      setEvent(data);
      setLibrary(data.library_id);

      const start = new Date(data.start_time);
      const end = new Date(data.end_time);
      const now = new Date();

      if (start > now) {
        setStatus('Open');
      } else if (now > end) {
        setStatus('Full');
      } else {
        setStatus('Limited');
      }
    } catch (error) {
      console.error('Error fetching event:', error);
    }
  };

  useEffect(() => {
    fetchEvent();
  }, [id]);

  if (!event || !library) {
    return (
      <SafeAreaView style={styles.errorContainer}>
        <Text style={styles.errorText}>
          {t('events.notFound', 'Event not found')}
        </Text>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>{t('common.back')}</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  const handleJoinEvent = () => {
    if (status === 'Full') {
      Alert.alert(
        t('common.sorry', 'Sorry'),
        t('events.eventFull', 'This event is already full')
      );
      return;
    }

    setIsJoined(!isJoined);
    Alert.alert(
      isJoined
        ? t('events.leftEvent', 'Left Event')
        : t('events.joinedEvent', 'Joined Event'),
      isJoined
        ? t('events.leftEventMessage', 'You have left {{title}}', {
          title: event.name,
        })
        : t(
          'events.joinedEventMessage',
          'You have successfully joined {{title}}',
          { title: event.name }
        )
    );
  };

  const handleShare = () => {
    Alert.alert('Share', `Sharing ${event.name} with friends`);
  };

  const handleViewLibrary = () => {
    router.push(`/library/${library._id}`);
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
            source={{ uri: EVENT_IMAGES[getImageIndex(event._id)] }}
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

            <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
              <Share2 size={24} color={Colors.white} />
            </TouchableOpacity>
          </SafeAreaView>
        </View>

        <View style={styles.contentContainer}>
          <View style={styles.statusContainer}>
            <View
              style={[
                styles.statusBadge,
                { backgroundColor: getStatusColor(status) },
              ]}
            >
              <Text
                style={[
                  styles.statusText,
                  { color: getStatusTextColor(status) },
                ]}
              >
                {status}
              </Text>
            </View>
          </View>

          <Text style={styles.title}>{event.name}</Text>

          <TouchableOpacity
            style={styles.libraryContainer}
            onPress={handleViewLibrary}
          >
            <Text style={styles.libraryLabel}>
              {t('events.hostedBy', 'Hosted by')}
            </Text>
            <Text style={styles.libraryName}>{library.name}</Text>
          </TouchableOpacity>

          <View style={styles.infoContainer}>
            <View style={styles.infoItem}>
              <Calendar
                size={20}
                color={Colors.primary[600]}
                style={styles.infoIcon}
              />
              <Text style={styles.infoText}>
                {new Date(event.start_time).toLocaleDateString('fr-FR', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric'
                })}
              </Text>
            </View>

            <View style={styles.infoItem}>
              <Clock
                size={20}
                color={Colors.primary[600]}
                style={styles.infoIcon}
              />
              <Text style={styles.infoText}>
                {new Date(event.start_time).toLocaleTimeString('fr-FR', { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })} - {new Date(event.end_time).toLocaleTimeString('fr-FR', { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </Text>
            </View>

            <TouchableOpacity style={styles.infoItem} onPress={handleOpenMap}>
              <MapPin
                size={20}
                color={Colors.primary[600]}
                style={styles.infoIcon}
              />
              <Text style={[styles.infoText, styles.infoTextLink]}>
                {event.address || library.address}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionTitle}>
              {t('events.aboutThisEvent', 'About this event')}
            </Text>
            <Text style={styles.description}>{event.description}</Text>
          </View>

          <TouchableOpacity
            style={[
              styles.joinButton,
              isJoined && styles.leaveButton,
              status === 'Full' && !isJoined && styles.disabledButton,
            ]}
            onPress={handleJoinEvent}
            disabled={status === 'Full' && !isJoined}
          >
            <Text
              style={[
                styles.joinButtonText,
                isJoined && styles.leaveButtonText,
                status === 'Full' && !isJoined && styles.disabledButtonText,
              ]}
            >
              {isJoined
                ? t('events.leaveEvent', 'Leave Event')
                : status === 'Full'
                  ? t('events.eventFull', 'Event Full')
                  : t('events.joinEvent', 'Join Event')}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.libraryButton}
            onPress={handleViewLibrary}
          >
            <BookOpen size={20} color={Colors.primary[600]} />
            <Text style={styles.libraryButtonText}>
              {t('events.viewLibrary', 'View Library')}
            </Text>
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