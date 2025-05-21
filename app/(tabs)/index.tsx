import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import Colors from '@/constants/Colors';
import Typography from '@/constants/Typography';
import Layout from '@/constants/Layout';
import SearchBar from '@/components/SearchBar';
import LibraryCard from '@/components/LibraryCard';
import { LibraryType } from '@/types/library';
import * as Location from 'expo-location';
import { useTranslation } from 'react-i18next';
import { getLibraries } from '@/services/library.service';

export default function LibrariesScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [libraries, setLibraries] = useState<LibraryType[]>([]);
  const [filteredLibraries, setFilteredLibraries] = useState<LibraryType[]>([]);
  const [locationPermission, setLocationPermission] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useTranslation();

  const fetchLibraries = async () => {
    try {
      setIsLoading(true);
      const data = await getLibraries();
      setLibraries(data);
      setFilteredLibraries(data);
    } catch (error) {
      console.error('Error fetching libraries:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLibraries();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const filtered = libraries.filter(library => 
        library.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        library.address.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredLibraries(filtered);
    } else {
      setFilteredLibraries(libraries);
    }
  }, [searchQuery, libraries]);

  const handleSearch = (text: string) => {
    setSearchQuery(text);
  };

  const handleLocationSearch = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      
      if (status !== 'granted') {
        setLocationPermission(false);
        return;
      }
      
      setLocationPermission(true);
      const location = await Location.getCurrentPositionAsync({});
      
      // Sort libraries by distance from current location
      // This is a simplified calculation - in a real app you'd use a more accurate formula
      const librariesWithDistance = libraries.map(library => {
        const distance = calculateDistance(
          location.coords.latitude,
          location.coords.longitude,
          library.location.latitude,
          library.location.longitude
        );
        return { ...library, distance };
      });
      
      // Sort by distance
      const sorted = [...librariesWithDistance].sort((a, b) => a.distance - b.distance);
      setFilteredLibraries(sorted);
    } catch (error) {
      console.error('Error getting location:', error);
    }
  };

  // Simple distance calculation using Haversine formula
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // Radius of the Earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in km
    return distance;
  };

  const deg2rad = (deg: number) => {
    return deg * (Math.PI / 180);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{t('home.title')}</Text>
        <Text style={styles.subtitle}>{t('home.subtitle')}</Text>
      </View>
      
      <View style={styles.searchContainer}>
        <SearchBar 
          onSearch={handleSearch} 
          onLocationSearch={handleLocationSearch}
          placeholder={t('home.searchPlaceholder')}
        />
        
      </View>
      
      {filteredLibraries.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>{t('home.noLibraries')}</Text>
          <Text style={styles.emptySubtext}>{t('home.adjustSearch')}</Text>
        </View>
      ) : (
        <FlatList
          data={filteredLibraries}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <LibraryCard key={item._id} library={item} />
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
  filterButton: {
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