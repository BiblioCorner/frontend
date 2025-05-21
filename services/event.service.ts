import env from '@/config/env';
import { EventType } from '@/types/event';

export const getEvents = async () => {
  try {
    const response = await fetch(`${env.apiUrl}/event`);
    if (!response.ok) {
      throw new Error('Failed to fetch events');
    }
    const text = await response.text();
    return JSON.parse(text);
  } catch (error) {
    console.error('[getEvents] : Error fetching events:', error);
    throw error;
  }
};

export const getEventById = async (id: string) => {
    try {
        const response = await fetch(`${env.apiUrl}/event/${id}`);
        if (!response.ok) {
        throw new Error('Failed to fetch event');
        }
        const text = await response.text();
        return JSON.parse(text);
    } catch (error) {
        console.error('[getEventById] : Error fetching event:', error);
        throw error;
    }
}

export const getEventByLibraryId = async (libraryId: string) => {
    try {
        const response = await fetch(`${env.apiUrl}/event/library/${libraryId}`);
        if (!response.ok) {
        throw new Error('Failed to fetch events');
        }
        const text = await response.text();
        return JSON.parse(text);
    } catch (error) {
        console.error('[getEventByLibraryId] : Error fetching events:', error);
        throw error;
    }
}