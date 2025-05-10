import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import { CalendarDays } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import Typography from '@/constants/Typography';
import Layout from '@/constants/Layout';
import SearchBar from '@/components/SearchBar';
import EventCard from '@/components/EventCard';
import { events } from '@/data/events';
import { EventType } from '@/types/event';
import { useTranslation } from 'react-i18next';

export default function EventsScreen() {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredEvents, setFilteredEvents] = useState(events);
  const [activeFilter, setActiveFilter] = useState('all');

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    if (text) {
      const filtered = events.filter(event => 
        event.title.toLowerCase().includes(text.toLowerCase()) ||
        event.libraryName.toLowerCase().includes(text.toLowerCase()) ||
        event.category.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredEvents(filtered);
    } else {
      filterEvents(activeFilter);
    }
  };

  const filterEvents = (filter: string) => {
    setActiveFilter(filter);
    if (filter === 'all') {
      setFilteredEvents(events);
    } else if (filter === 'open') {
      setFilteredEvents(events.filter(event => event.status === 'Open'));
    } else if (filter === 'today') {
      // This would normally filter by today's date
      // For the mock data, we'll just return the first two events
      setFilteredEvents(events.slice(0, 2));
    } else if (filter === 'upcoming') {
      // This would normally filter by future dates
      // For the mock data, we'll return events from index 2 onwards
      setFilteredEvents(events.slice(2));
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{t('events.title')}</Text>
        <Text style={styles.subtitle}>{t('events.subtitle', 'Discover cultural happenings')}</Text>
      </View>
      
      <View style={styles.searchContainer}>
        <SearchBar 
          onSearch={handleSearch}
          placeholder={t('events.searchPlaceholder', 'Search events...')}
        />
        
        <TouchableOpacity style={styles.calendarButton}>
          <CalendarDays size={20} color={Colors.text.primary} />
        </TouchableOpacity>
      </View>
      
      <View style={styles.filterContainer}>
        {['all', 'open', 'today', 'upcoming'].map(filter => (
          <TouchableOpacity
            key={filter}
            style={[
              styles.filterButton,
              activeFilter === filter && styles.activeFilterButton
            ]}
            onPress={() => filterEvents(filter)}
          >
            <Text style={[
              styles.filterText,
              activeFilter === filter && styles.activeFilterText
            ]}>
              {filter === 'all' ? t('common.all') :
               filter === 'open' ? t('events.open') :
               filter === 'today' ? t('events.today') :
               filter === 'upcoming' ? t('events.upcoming') : 
               filter.charAt(0).toUpperCase() + filter.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      
      {filteredEvents.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>{t('common.noResults')}</Text>
          <Text style={styles.emptySubtext}>{t('events.adjustFilters', 'Try adjusting your filters')}</Text>
        </View>
      ) : (
        <FlatList
          data={filteredEvents}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <EventCard event={item} />
          )}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.secondary,
  },
  header: {
    padding: Layout.spacing.lg,
    paddingTop: Layout.spacing.xl,
  },
  title: {
    fontFamily: Typography.fontFamily.semiBold,
    fontSize: Typography.fontSize.xxxl,
    color: Colors.text.primary,
  },
  subtitle: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: Typography.fontSize.md,
    color: Colors.text.secondary,
    marginTop: Layout.spacing.xs,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Layout.spacing.lg,
  },
  calendarButton: {
    width: 44,
    height: 44,
    borderRadius: Layout.borderRadius.md,
    backgroundColor: Colors.background.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: Layout.spacing.sm,
    borderWidth: 1,
    borderColor: Colors.border.light,
  },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: Layout.spacing.lg,
    paddingVertical: Layout.spacing.md,
  },
  filterButton: {
    paddingHorizontal: Layout.spacing.md,
    paddingVertical: Layout.spacing.sm,
    borderRadius: Layout.borderRadius.full,
    marginRight: Layout.spacing.sm,
    backgroundColor: Colors.background.primary,
    borderWidth: 1,
    borderColor: Colors.border.light,
  },
  activeFilterButton: {
    backgroundColor: Colors.primary[600],
    borderColor: Colors.primary[600],
  },
  filterText: {
    fontFamily: Typography.fontFamily.medium,
    fontSize: Typography.fontSize.sm,
    color: Colors.text.primary,
  },
  activeFilterText: {
    color: Colors.white,
  },
  list: {
    padding: Layout.spacing.lg,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 100,
  },
  emptyText: {
    fontFamily: Typography.fontFamily.medium,
    fontSize: Typography.fontSize.lg,
    color: Colors.text.primary,
    marginBottom: Layout.spacing.sm,
  },
  emptySubtext: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: Typography.fontSize.md,
    color: Colors.text.secondary,
  },
});