import { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { libraries } from '../../data/libraries'; // Import libraries data
import { events } from '../../data/events'; // Import events data
import { capitalize, truncateText } from '@/utils';
import { useTranslation } from 'react-i18next';

// Define types for our data
type Events = {
  id: string;
  title: string;
  date: string;
};

type Location = {
  id: string;
  name: string;
  type: 'library' | 'event';
  latitude: number;
  longitude: number;
  address: string;
  description?: string;
  date?: string;
  events?: Events[];
};

export default function MapScreen() {
  const { t } = useTranslation();
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'libraries' | 'events'>('all');
  const insets = useSafeAreaInsets();

  // Paris coordinates
  const initialRegion = {
    latitude: 48.8566,
    longitude: 2.3522,
    latitudeDelta: 0.4,
    longitudeDelta: 0.4,
  };

  useEffect(() => {
    // Transform the libraries data into our Location format
    const libraryLocations: Location[] = libraries.map((lib) => ({
      id: lib.id.toString(),
      name: lib.name,
      type: 'library',
      latitude: lib.coordinates.latitude,
      longitude: lib.coordinates.longitude,
      address: lib.address || '',
      description: lib.description,
    }));

    // Group events by their associated library
    const eventsByLibrary: Record<string, Events[]> = events.reduce<
      Record<string, Events[]>
    >((acc, event) => {
      const libraryId = event.libraryId.toString();
      if (!acc[libraryId]) {
        acc[libraryId] = [];
      }
      acc[libraryId].push({
        id: event.id.toString(),
        title: event.title,
        date: event.date,
      });
      return acc;
    }, {});

    // Attach events to their respective libraries
    const libraryLocationsWithEvents = libraryLocations.map((lib) => ({
      ...lib,
      events: eventsByLibrary[lib.id] || [],
    }));

    // Simulate loading
    setTimeout(() => {
      setLocations(libraryLocationsWithEvents);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>{t('common.loading')}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={initialRegion}
      >
        {locations.map((location) => (
          <Marker
            key={`library-${location.id}`}
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            pinColor="red"
          >
            <Callout tooltip style={{ width: 300 }}>
              <View style={styles.calloutContainer}>
                <Text style={styles.calloutTitle}>{location.name}</Text>
                <Text style={styles.calloutAddress}>{location.address}</Text>
                {location.description ? (
                  <Text style={styles.calloutDescription} numberOfLines={3}>
                    {truncateText(location.description, 100)}
                  </Text>
                ) : null}
                {location.events && location.events.length > 0 ? (
                  <View>
                    <Text style={styles.calloutEventsTitle}>{t('events.title', 'Events')}:</Text>
                    {location.events.map((event) => (
                      <Text key={event.id} style={styles.calloutEvent} numberOfLines={1}>
                        - {truncateText(event.title, 25)} ({event.date})
                      </Text>
                    ))}
                  </View>
                ) : null}
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  map: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
  },  calloutContainer: {
    width: 280,
    padding: 12,
    backgroundColor: 'white',
    borderRadius: 6,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  calloutTitle: {
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 3,
  },
  calloutAddress: {
    fontSize: 12,
    color: '#555',
    marginBottom: 3,
  },
  calloutDescription: {
    fontSize: 12,
    marginTop: 3,
    marginBottom: 3,
    color: '#333',
  },
  calloutDate: {
    fontSize: 12,
    marginTop: 3,
  },
  calloutType: {
    fontSize: 12,
    marginTop: 3,
    color: '#888',
  },
  calloutEventsTitle: {
    fontWeight: 'bold',
    marginTop: 5,
    fontSize: 13,
  },
  calloutEvent: {
    fontSize: 11,
    marginTop: 2,
  },
});
