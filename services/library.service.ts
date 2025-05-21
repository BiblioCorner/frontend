import env from '@/config/env';
import { LibraryType } from '@/types/library';

export const getLibraries = async (): Promise<LibraryType[]> => {
  try {
    const response = await fetch(`${env.apiUrl}/library`);
    if (!response.ok) {
      throw new Error('Failed to fetch libraries');
    }
    const text = await response.text();
    return JSON.parse(text);
  } catch (error) {
    console.error('[getLibraries] : Error fetching libraries:', error);
    throw error;
  }
};

export const getLibraryById = async (id: string): Promise<LibraryType> => {
    try {
        const response = await fetch(`${env.apiUrl}/library/${id}`);
        if (!response.ok) {
        throw new Error('Failed to fetch library');
        }
        const text = await response.text();
        return JSON.parse(text);
    } catch (error) {
        console.error('[getLibraryById] : Error fetching library:', error);
        throw error;
    }
}