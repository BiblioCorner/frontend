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
  TextInput,
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import {
  ArrowLeft,
  Share2,
  Bookmark,
  MapPin,
  Clock,
  Phone,
  Globe,
  Star,
  Calendar,
  Heart,
  Send,
} from 'lucide-react-native';
import Colors from '@/constants/Colors';
import Typography from '@/constants/Typography';
import Layout from '@/constants/Layout';
import type { LibraryType } from '@/types/library';
import { events } from '@/data/events';
import { reviews } from '@/data/reviews';
import ReviewItem from '@/components/ReviewItem';
import { useTranslation } from 'react-i18next';
import { getLibraryById } from '@/services/library.service';

export default function LibraryDetailScreen() {
  const { t } = useTranslation();
  const { id } = useLocalSearchParams();
  const [library, setLibrary] = useState<LibraryType | null>(null);
  const libraryReviews = reviews.filter((review) => review.libraryId === '1');
  const libraryEvents = events.filter((event) => event.libraryId === '1');

  const [isSaved, setIsSaved] = useState(false);
  const [activeTab, setActiveTab] = useState('info');
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [reviewText, setReviewText] = useState('');
  const [isLiked, setIsLiked] = useState(false);

  // Fetch library data by ID
  const fetchLibraryData = async () => {
    try {
      console.log({id});
      
      const library = await getLibraryById(id as string);
      setLibrary(library);
    } catch (error) {
      console.error('Error fetching library data:', error);
    }
  };

  useEffect(() => {
    fetchLibraryData();
  }, [id]);

  if (!library) {
    return (
      <SafeAreaView style={styles.errorContainer}>
        <Text style={styles.errorText}>
          {t('library.notFound', 'Library not found')}
        </Text>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color={Colors.primary[600]} />
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  const handleOpenMap = () => {
    const encodedAddress = encodeURIComponent(library.address);
    const url = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
    Linking.openURL(url);
  };

  const handleCall = () => {
    if (library.phone) {
      Linking.openURL(`tel:${library.phone}`);
    }
  };

  const handleVisitWebsite = () => {
    if (library.website) {
      Linking.openURL(library.website);
    }
  };

  const handleShare = () => {
    Alert.alert('Share', `Sharing ${library.name} with friends`);
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
    Alert.alert(
      isSaved
        ? t('library.removedFromBookmarks', 'Removed from Bookmarks')
        : t('library.addedToBookmarks', 'Added to Bookmarks'),
      isSaved
        ? t(
            'library.removedFromBookmarksMessage',
            `{{name}} has been removed from your bookmarks`,
            { name: library.name }
          )
        : t(
            'library.addedToBookmarksMessage',
            `{{name}} has been added to your bookmarks`,
            { name: library.name }
          )
    );
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    Alert.alert(
      isLiked ? 'Removed Like' : 'Added Like',
      isLiked
        ? `You no longer like ${library.name}`
        : `You now like ${library.name}`
    );
  };

  const handleSubmitReview = () => {
    if (reviewText.trim().length > 0) {
      Alert.alert('Review Submitted', 'Thank you for your review!');
      setReviewText('');
    } else {
      Alert.alert('Error', 'Please write a review before submitting');
    }
  };

  const displayedReviews = showAllReviews
    ? libraryReviews
    : libraryReviews.slice(0, 2);

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          {/* <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
          >
            {library.images.map((image, index) => (
              <Image
                key={index}
                source={{ uri: image }}
                style={styles.image}
                resizeMode="cover"
              />
            ))}
          </ScrollView> */}

          <SafeAreaView style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <ArrowLeft size={24} color={Colors.white} />
            </TouchableOpacity>

            <View style={styles.headerActions}>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={handleShare}
              >
                <Share2 size={24} color={Colors.white} />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.actionButton}
                onPress={handleSave}
              >
                <Bookmark
                  size={24}
                  color={Colors.white}
                  fill={isSaved ? Colors.white : 'none'}
                />
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </View>

        <View style={styles.contentContainer}>
          <View style={styles.mainInfo}>
            <Text style={styles.name}>{library.name}</Text>

            <View style={styles.ratingContainer}>
              <Star
                size={16}
                color={Colors.accent[500]}
                fill={Colors.accent[500]}
              />
              <Text style={styles.rating}>
                {library.rating.toFixed(1)} ({reviews.length} {t('library.reviews').toLowerCase()})
              </Text>
            </View>

            <TouchableOpacity
              style={styles.addressContainer}
              onPress={handleOpenMap}
            >
              <MapPin size={16} color={Colors.gray[500]} style={styles.icon} />
              <Text style={styles.address}>{library.address}</Text>
            </TouchableOpacity>
            <View style={styles.hoursContainer}>
              <Clock size={16} color={Colors.gray[500]} style={styles.icon} />
              <View>
                {library.opening_hours && library.opening_hours.length > 0 ? (
                  <View>
                  {library.opening_hours.map((hours, index) => (
                    <Text key={index} style={styles.hours}>
                    {hours.day}: {hours.is_open === 'Ouvert' 
                      ? `${hours.open_time} - ${hours.close_time}`
                      : t('library.closed')}
                    </Text>
                  ))}
                  </View>
                ) : (
                  <Text style={styles.hours}>
                  {t('library.noHoursInfo', 'No hours information available')}
                  </Text>
                )}
              </View>
            </View>
          </View>

          <View style={styles.actionButtonsContainer}>
            {library.phone && (
              <TouchableOpacity
                style={styles.actionButtonLarge}
                onPress={handleCall}
              >
                <Phone size={20} color={Colors.primary[600]} />
                <Text style={styles.actionButtonText}>{t('library.call')}</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={styles.actionButtonLarge}
              onPress={handleOpenMap}
            >
              <MapPin size={20} color={Colors.primary[600]} />
              <Text style={styles.actionButtonText}>{t('library.viewMaps')}</Text>
            </TouchableOpacity>

            {library.website && (
              <TouchableOpacity
                style={styles.actionButtonLarge}
                onPress={handleVisitWebsite}
              >
                <Globe size={20} color={Colors.primary[600]} />
                <Text style={styles.actionButtonText}>{t('library.website')}</Text>
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.tabsContainer}>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'info' && styles.activeTab]}
              onPress={() => setActiveTab('info')}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === 'info' && styles.activeTabText,
                ]}
              >
                {t('library.info', 'Info')}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.tab, activeTab === 'events' && styles.activeTab]}
              onPress={() => setActiveTab('events')}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === 'events' && styles.activeTabText,
                ]}
              >
                {t('events.title')}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.tab, activeTab === 'reviews' && styles.activeTab]}
              onPress={() => setActiveTab('reviews')}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === 'reviews' && styles.activeTabText,
                ]}
              >
                {t('library.reviews')}
              </Text>
            </TouchableOpacity>
          </View>

       {activeTab === 'info' && (
  <View style={styles.infoContainer}>
    <View>
      <Text style={styles.sectionTitle}>
        {t('library.about', 'About')}
      </Text>
      <Text style={styles.description}>{library.name}</Text>
    </View>

    <View style={styles.servicesContainer}>
      <Text style={styles.sectionTitle}>
        {t('library.services', 'Services')}
      </Text>
      <View style={styles.servicesList}>
        <View style={styles.serviceItem}>
          <Text style={styles.serviceText}>{library.services}</Text>
        </View>
      </View>
    </View>

    <View style={styles.tagsContainer}>
      <Text style={styles.sectionTitle}>
        {t('library.accessibility', 'Accessibility')}
      </Text>
      <View style={styles.tagsList}>
        <View style={styles.tagItem}>
          <Text style={styles.tagText}>{library.accessibility}</Text>
        </View>
      </View>
    </View>
  </View>
)}

{activeTab === 'events' && (
  <View style={styles.eventsContainer}>
    <Text style={styles.sectionTitle}>
      {t('library.upcomingEvents', 'Upcoming Events')}
    </Text>
    {libraryEvents.length > 0 ? (
      libraryEvents.map((event) => (
        <TouchableOpacity
          key={event.id}
          style={styles.eventCard}
          onPress={() => router.push(`/event/${event.id}`)}
        >
          <Image
            source={{ uri: event.imageUrl }}
            style={styles.eventImage}
            resizeMode="cover"
          />
          <View style={styles.eventInfo}>
            <Text style={styles.eventTitle}>{event.title}</Text>
            <View style={styles.eventDetails}>
              <Calendar
                size={14}
                color={Colors.gray[500]}
                style={styles.icon}
              />
              <Text style={styles.eventDate}>
                {event.date} • {event.time}
              </Text>
            </View>
            <View
              style={[
                styles.eventStatus,
                { backgroundColor: getStatusColor(event.status) },
              ]}
            >
              <Text style={styles.eventStatusText}>
                {event.status}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      ))
    ) : (
      <Text style={styles.noEventsText}>
        {t('library.noUpcomingEvents', 'No upcoming events')}
      </Text>
    )}
  </View>
)}

{activeTab === 'reviews' && (
  <View style={styles.reviewsContainer}>
    <View style={styles.reviewsHeader}>
      <Text style={styles.sectionTitle}>
        {t('library.reviews', 'Reviews')}
      </Text>
    </View>

    <View style={styles.reviewInputContainer}>
      <TextInput
        style={styles.reviewInput}
        placeholder={t('library.writeReview', 'Write your review here...')}
        placeholderTextColor={Colors.gray[400]}
        value={reviewText}
        onChangeText={setReviewText}
        multiline
      />
      <TouchableOpacity
        style={styles.submitButton}
        onPress={handleSubmitReview}
      >
        <Send size={20} color={Colors.white} />
      </TouchableOpacity>
    </View>

    {displayedReviews.map((review) => (
      <ReviewItem
        key={review.id}
        review={review}
        onReport={() => {}}
      />
    ))}

    {libraryReviews.length > 2 && !showAllReviews && (
      <TouchableOpacity
        style={styles.showMoreButton}
        onPress={() => setShowAllReviews(true)}
      >
        <Text style={styles.showMoreButtonText}>
          {t('library.showAllReviews', {
            defaultValue: 'Show All {{count}} Reviews',
            count: libraryReviews.length,
          })}
        </Text>
      </TouchableOpacity>
    )}
  </View>
)}
        </View>
      </ScrollView>
    </View>
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
  imageContainer: {
    height: 250,
    position: 'relative',
  },
  image: {
    width: Layout.window.width,
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
  headerActions: {
    flexDirection: 'row',
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: Layout.spacing.sm,
  },
  contentContainer: {
    padding: Layout.spacing.lg,
    paddingBottom: Layout.spacing.xxl,
  },
  mainInfo: {
    marginBottom: Layout.spacing.lg,
  },
  name: {
    fontFamily: Typography.fontFamily.semiBold,
    fontSize: Typography.fontSize.xxl,
    color: Colors.text.primary,
    marginBottom: Layout.spacing.sm,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Layout.spacing.sm,
  },
  rating: {
    fontFamily: Typography.fontFamily.medium,
    fontSize: Typography.fontSize.md,
    color: Colors.text.primary,
    marginLeft: Layout.spacing.xs,
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Layout.spacing.xs,
  },
  icon: {
    marginRight: Layout.spacing.xs,
  },
  address: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: Typography.fontSize.md,
    color: Colors.text.secondary,
    flex: 1,
  },
  hoursContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  hours: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: Typography.fontSize.md,
    color: Colors.text.secondary,
  },
  openStatusOpen: {
    color: Colors.success[600],
    fontFamily: Typography.fontFamily.medium,
  },
  openStatusClosed: {
    color: Colors.error[600],
    fontFamily: Typography.fontFamily.medium,
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: Layout.spacing.lg,
  },
  actionButtonLarge: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: Layout.spacing.md,
  },
  actionButtonText: {
    fontFamily: Typography.fontFamily.medium,
    fontSize: Typography.fontSize.sm,
    color: Colors.primary[600],
    marginTop: Layout.spacing.xs,
  },
  tabsContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: Colors.border.light,
    marginBottom: Layout.spacing.lg,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: Layout.spacing.md,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.primary[600],
  },
  tabText: {
    fontFamily: Typography.fontFamily.medium,
    fontSize: Typography.fontSize.md,
    color: Colors.text.secondary,
  },
  activeTabText: {
    color: Colors.primary[600],
  },
  infoContainer: {
    gap: Layout.spacing.xl,
  },
  sectionTitle: {
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
  servicesContainer: {},
  servicesList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -Layout.spacing.xs,
  },
  serviceItem: {
    backgroundColor: Colors.mint[50],
    paddingHorizontal: Layout.spacing.md,
    paddingVertical: Layout.spacing.sm,
    borderRadius: Layout.borderRadius.md,
    marginHorizontal: Layout.spacing.xs,
    marginBottom: Layout.spacing.sm,
  },
  serviceText: {
    fontFamily: Typography.fontFamily.medium,
    fontSize: Typography.fontSize.sm,
    color: Colors.mint[700],
  },
  tagsContainer: {},
  tagsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -Layout.spacing.xs,
  },
  tagItem: {
    backgroundColor: Colors.primary[50],
    paddingHorizontal: Layout.spacing.md,
    paddingVertical: Layout.spacing.sm,
    borderRadius: Layout.borderRadius.md,
    marginHorizontal: Layout.spacing.xs,
    marginBottom: Layout.spacing.sm,
  },
  tagText: {
    fontFamily: Typography.fontFamily.medium,
    fontSize: Typography.fontSize.sm,
    color: Colors.primary[700],
  },
  eventsContainer: {
    gap: Layout.spacing.md,
  },
  eventCard: {
    backgroundColor: Colors.background.primary,
    borderRadius: Layout.borderRadius.lg,
    overflow: 'hidden',
    marginBottom: Layout.spacing.md,
    borderWidth: 1,
    borderColor: Colors.border.light,
  },
  eventImage: {
    width: '100%',
    height: 120,
  },
  eventInfo: {
    padding: Layout.spacing.md,
  },
  eventTitle: {
    fontFamily: Typography.fontFamily.medium,
    fontSize: Typography.fontSize.md,
    color: Colors.text.primary,
    marginBottom: Layout.spacing.xs,
  },
  eventDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Layout.spacing.xs,
  },
  eventDate: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: Typography.fontSize.sm,
    color: Colors.text.secondary,
    marginLeft: Layout.spacing.xs,
  },
  eventStatus: {
    alignSelf: 'flex-start',
    paddingHorizontal: Layout.spacing.sm,
    paddingVertical: Layout.spacing.xs,
    borderRadius: Layout.borderRadius.full,
  },
  eventStatusText: {
    fontFamily: Typography.fontFamily.medium,
    fontSize: Typography.fontSize.xs,
    color: Colors.text.primary,
  },
  noEventsText: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: Typography.fontSize.md,
    color: Colors.text.secondary,
    textAlign: 'center',
    marginTop: Layout.spacing.xl,
  },
  reviewsContainer: {},
  reviewsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Layout.spacing.md,
  },
  likeButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.background.primary,
    paddingHorizontal: Layout.spacing.md,
    paddingVertical: Layout.spacing.sm,
    borderRadius: Layout.borderRadius.md,
    borderWidth: 1,
    borderColor: Colors.primary[600],
  },
  likeButtonActive: {
    backgroundColor: Colors.primary[600],
  },
  reviewInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Layout.spacing.lg,
    backgroundColor: Colors.background.secondary,
    borderRadius: Layout.borderRadius.lg,
    padding: Layout.spacing.sm,
    borderWidth: 1,
    borderColor: Colors.border.light,
  },
  reviewInput: {
    flex: 1,
    fontFamily: Typography.fontFamily.regular,
    fontSize: Typography.fontSize.md,
    color: Colors.text.primary,
    padding: Layout.spacing.sm,
    maxHeight: 100,
  },
  submitButton: {
    backgroundColor: Colors.primary[600],
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  showMoreButton: {
    paddingVertical: Layout.spacing.md,
    alignItems: 'center',
  },
  showMoreButtonText: {
    fontFamily: Typography.fontFamily.medium,
    fontSize: Typography.fontSize.md,
    color: Colors.primary[600],
  },
});
