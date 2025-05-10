export interface LibraryType {
  id: string;
  name: string;
  address: string;
  imageUrl: string;
  rating: number;
  reviewCount: number;
  isOpen: boolean;
  openingTime: string;
  closingTime: string;
  tags: string[];
  description: string;
  services: string[];
  coordinates: {
    latitude: number;
    longitude: number;
  };
  website?: string;
  phone?: string;
  images: string[];
}