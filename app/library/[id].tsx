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
  Bookmark,
  MapPin,
  Clock,
  Phone,
  Globe,
  Star,
  Calendar,
} from 'lucide-react-native';
import Colors from '@/constants/Colors';
import Typography from '@/constants/Typography';
import Layout from '@/constants/Layout';
import { libraries } from '@/data/libraries';
import { events } from '@/data/events';
import { reviews } from '@/data/reviews';
import ReviewItem from '@/components/ReviewItem';

export default function LibraryDetailScreen() {
  const { id } = useLocalSearchParams();
  const library = libraries.find(lib => lib.id === id);
  const libraryReviews = reviews.filter(review => review.libraryId === id);
  const libraryEvents = events.filter(event => event.libraryId === id);
  
  const [isSaved, setIsSaved] = useState(false);
  const [activeTab, setActiveTab] = useState('info');
  const [showAllReviews, setShowAllReviews] = useState(false);
  
  if (!library) {
    return (
      <SafeAreaView style={styles.errorContainer}>
        <Text style={styles.errorText}>Library not found</Text>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>Go Back</Text>
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
      isSaved ? 'Removed from Bookmarks' : 'Added to Bookmarks',
      isSaved ? `${library.name} has been removed from your bookmarks` : `${library.name} has been added to your bookmarks`
    );
  };

  const displayedReviews = showAllReviews ? libraryReviews : libraryReviews.slice(0, 2);

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <ScrollView
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
          </ScrollView>
          
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
              <Star size={16} color={Colors.accent[500]} fill={Colors.accent[500]} />
              <Text style={styles.rating}>
                {library.rating.toFixed(1)} ({library.reviewCount} reviews)
              </Text>
            </View>
            
            <TouchableOpacity style={styles.addressContainer} onPress={handleOpenMap}>
              <MapPin size={16} color={Colors.gray[500]} style={styles.icon} />
              <Text style={styles.address}>{library.address}</Text>
            </TouchableOpacity>
            
            <View style={styles.hoursContainer}>
              <Clock size={16} color={Colors.gray[500]} style={styles.icon} />
              <Text style={styles.hours}>
                {library.isOpen ? (
                  <Text style={styles.openStatusOpen}>Open</Text>
                ) : (
                  <Text style={styles.openStatusClosed}>Closed</Text>
                )}
                {' • '}
                {library.openingTime} - {library.closingTime}
              </Text>
            </View>
          </View>
          
          <View style={styles.actionButtonsContainer}>
            {library.phone && (
              <TouchableOpacity
                style={styles.actionButtonLarge}
                onPress={handleCall}
              >
                <Phone size={20} color={Colors.primary[600]} />
                <Text style={styles.actionButtonText}>Call</Text>
              </TouchableOpacity>
            )}
            
            <TouchableOpacity
              style={styles.actionButtonLarge}
              onPress={handleOpenMap}
            >
              <MapPin size={20} color={Colors.primary[600]} />
              <Text style={styles.actionButtonText}>View on Maps</Text>
            </TouchableOpacity>
            
            {library.website && (
              <TouchableOpacity
                style={styles.actionButtonLarge}
                onPress={handleVisitWebsite}
              >
                <Globe size={20} color={Colors.primary[600]} />
                <Text style={styles.actionButtonText}>Website</Text>
              </TouchableOpacity>
            )}
          </View>
          
          <View style={styles.tabsContainer}>
            <TouchableOpacity
              style={[
                styles.tab,
                activeTab === 'info' && styles.activeTab,
              ]}
              onPress={() => setActiveTab('info')}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === 'info' && styles.activeTabText,
                ]}
              >
                Info
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[
                styles.tab,
                activeTab === 'events' && styles.activeTab,
              ]}
              onPress={() => setActiveTab('events')}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === 'events' && styles.activeTabText,
                ]}
              >
                Events
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.tab,
                activeTab === 'reviews' && styles.activeTab,
              ]}
              onPress={() => setActiveTab('reviews')}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === 'reviews' && styles.activeTabText,
                ]}
              >
                Reviews
              </Text>
            </TouchableOpacity>
          </View>
          
          {activeTab === 'info' && (
            <View style={styles.infoContainer}>
              <View style={styles.descriptionContainer}>
                <Text style={styles.sectionTitle}>About</Text>
                <Text style={styles.description}>{library.description}</Text>
              </View>
              
              <View style={styles.servicesContainer}>
                <Text style={styles.sectionTitle}>Services</Text>
                <View style={styles.servicesList}>
                  {library.services.map((service, index) => (
                    <View key={index} style={styles.serviceItem}>
                      <Text style={styles.serviceText}>{service}</Text>
                    </View>
                  ))}
                </View>
              </View>
              
              <View style={styles.tagsContainer}>
                <Text style={styles.sectionTitle}>Tags</Text>
                <View style={styles.tagsList}>
                  {library.tags.map((tag, index) => (
                    <View key={index} style={styles.tagItem}>
                      <Text style={styles.tagText}>{tag}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          )}

          {activeTab === 'events' && (
            <View style={styles.eventsContainer}>
              <Text style={styles.sectionTitle}>Upcoming Events</Text>
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
                        <Calendar size={14} color={Colors.gray[500]} style={styles.icon} />
                        <Text style={styles.eventDate}>{event.date} • {event.time}</Text>
                      </View>
                      <View style={[
                        styles.eventStatus,
                        { backgroundColor: getStatusColor(event.status) }
                      ]}>
                        <Text style={styles.eventStatusText}>{event.status}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))
              ) : (
                <Text style={styles.noEventsText}>No upcoming events</Text>
              )}
            </View>
          )}
          
          {activeTab === 'reviews' && (
            <View style={styles.reviewsContainer}>
              <View style={styles.reviewsHeader}>
                <Text style={styles.sectionTitle}>Reviews</Text>
                <TouchableOpacity style={styles.addReviewButton}>
                  <Star size={16} color={Colors.white} />
                  <Text style={styles.addReviewButtonText}>Write Review</Text>
                </TouchableOpacity>
              </View>
              
              {displayedReviews.map(review => (
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
                    Show All {libraryReviews.length} Reviews
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
  descriptionContainer: {},
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
  addReviewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary[600],
    paddingHorizontal: Layout.spacing.md,
    paddingVertical: Layout.spacing.sm,
    borderRadius: Layout.borderRadius.md,
    gap: Layout.spacing.xs,
  },
  addReviewButtonText: {
    fontFamily: Typography.fontFamily.medium,
    fontSize: Typography.fontSize.sm,
    color: Colors.white,
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