export interface EventType {
  id: string;
  title: string;
  libraryId: string;
  libraryName: string;
  date: string;
  time: string;
  imageUrl: string;
  description: string;
  status: 'Open' | 'Limited' | 'Full';
  attendees?: number;
  maxAttendees?: number;
  category: string;
  location?: string;
}