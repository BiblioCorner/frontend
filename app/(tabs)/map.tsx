import { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { libraries } from '../../data/libraries'; // Import libraries data
import { events } from '../../data/events'; // Import events data
import { capitalize } from '@/utils';

// Define types for our data
type Events = {
    id: string;
    title: string;
    date: string;
}

type Location = {
    id: string;
    name: string;
    type: 'library' | 'event';
    latitude: number;
    longitude: number;
    address: string;
    description?: string;
    date?: string;
    events?: Events[];};

export default function MapScreen() {
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
    const libraryLocations: Location[] = libraries.map(lib => ({
        id: lib.id.toString(),
        name: lib.name,
        type: 'library',
        latitude: lib.coordinates.latitude,
        longitude: lib.coordinates.longitude,
        address: lib.address || '',
        description: lib.description,
    }));

    // Group events by their associated library
    const eventsByLibrary: Record<string, Events[]> = events.reduce<Record<string, Events[]>>((acc, event) => {
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
    const libraryLocationsWithEvents = libraryLocations.map(lib => ({
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
            <Text style={styles.loadingText}>Loading map...</Text>
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
            {locations.map(location => (
                <Marker
                    key={`library-${location.id}`}
                    coordinate={{
                        latitude: location.latitude,
                        longitude: location.longitude,
                    }}
                    pinColor="red"
                >
                    <Callout tooltip>
                        <View style={styles.calloutContainer}>
                            <Text style={styles.calloutTitle}>{location.name}</Text>
                            <Text style={styles.calloutAddress}>{location.address}</Text>
                            {location.description && (
                                <Text style={styles.calloutDescription}>{location.description}</Text>
                            )}
                            {location.events && location.events.length > 0 && (
                                <>
                                    <Text style={styles.calloutEventsTitle}>Events:</Text>
                                    {location.events.map(event => (
                                        <Text key={event.id} style={styles.calloutEvent}>
                                            - {event.title} ({event.date})
                                        </Text>
                                    ))}
                                </>
                            )}
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
    },
    calloutContainer: {
        width: 150,
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 5,
    },
    calloutTitle: {
        fontWeight: 'bold',
    },
    calloutAddress: {
        fontSize: 12,
        color: '#555',
    },
    calloutDescription: {
        fontSize: 12,
        marginTop: 5,
    },
    calloutDate: {
        fontSize: 12,
        marginTop: 5,
    },
    calloutType: {
        fontSize: 12,
        marginTop: 5,
        color: '#888',
    },
    calloutEventsTitle: {
        fontWeight: 'bold',
        marginTop: 5,
    },
    calloutEvent: {
        fontSize: 12,
        marginTop: 2,
    },
})