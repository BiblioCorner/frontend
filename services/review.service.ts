import env from "@/config/env";

export const getReviewsByLibraryId = async (libraryId: string) => {
    try {
        const response = await fetch(`${env.apiUrl}/review/${libraryId}`);
        if (!response.ok) {
        throw new Error('Failed to fetch reviews');
        }
        const text = await response.text();
        return JSON.parse(text);
    } catch (error) {
        console.error('[getReviewsByLibraryId] : Error fetching reviews:', error);
        throw error;
    }
}