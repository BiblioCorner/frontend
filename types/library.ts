export interface LibraryType {
  _id: string;
  name: string;
  address: string;
  city: string;
  postal_code: string;
  location: {
    latitude: number;
    longitude: number;
  };
  website?: string;
  opening_hours: Array<{
    day: 'Lundi' | 'Mardi' | 'Mercredi' | 'Jeudi' | 'Vendredi' | 'Samedi' | 'Dimanche';
    open_time: string;
    close_time: string;
    is_open: 'Ouvert' | 'Fermé';
  }>;
  phone?: string;
  services: 'Livres' | 'E-books' | 'Salles d\'étude' | 'Événements' | 'Impression' | 'Wi-Fi gratuit' | 'Section pour enfants';
  accessibility: 'Accessible en fauteuil roulant' | 'Pas d\'accès fauteuil roulant' | 'Ascenseur disponible' | 'Uniquement des escaliers';
  rating: number;
}