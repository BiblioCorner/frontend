export interface ReviewType {
  id: string;
  libraryId: string;
  userId: string;
  userName: string;
  userAvatar: string;
  rating: number;
  content: string;
  date: string;
  reported?: boolean;
}