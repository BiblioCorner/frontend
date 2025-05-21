export interface ReviewType {
  _id: string;
  user_id: string;
  content: string;
  created_at: string; // ISO date string
  likes_count: number;
  liked_by: string[]; // Array of user IDs
  library_id: string;
}
