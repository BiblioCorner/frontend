// Mock library data
export const libraries = [
  {
    id: '1',
    name: 'Bibliothèque François Mitterrand',
    address: '11 Quai François Mauriac, 75013 Paris',
    imageUrl: 'https://images.pexels.com/photos/2041556/pexels-photo-2041556.jpeg',
    rating: 4.7,
    reviewCount: 127,
    isOpen: true,
    openingTime: '9:00',
    closingTime: '20:00',
    tags: ['Quiet', 'Modern', 'Study Areas', 'WiFi'],
    description: 'The Bibliothèque François Mitterrand is the main site of the Bibliothèque nationale de France (BnF), located in the 13th arrondissement of Paris. Designed by architects Dominique Perrault and François Mitterrand, this modern library houses over 15 million books and documents.',
    services: ['WiFi', 'Study Areas', 'Research Support', 'Printing Services', 'Cafeteria'],
    coordinates: {
      latitude: 48.8296,
      longitude: 2.3781,
    },
    website: 'https://www.bnf.fr',
    phone: '+33 1 53 79 59 59',
    images: [
      'https://images.pexels.com/photos/2041556/pexels-photo-2041556.jpeg',
      'https://images.pexels.com/photos/1000160/pexels-photo-1000160.jpeg',
      'https://images.pexels.com/photos/6035317/pexels-photo-6035317.jpeg',
    ],
  },
  {
    id: '2',
    name: 'Bibliothèque Centre Pompidou',
    address: 'Place Georges-Pompidou, 75004 Paris',
    imageUrl: 'https://images.pexels.com/photos/448835/pexels-photo-448835.jpeg',
    rating: 4.5,
    reviewCount: 98,
    isOpen: true,
    openingTime: '10:00',
    closingTime: '22:00',
    tags: ['Art', 'Multimedia', 'Modern'],
    description: 'The Bibliothèque Publique d\'Information (Bpi) is a public library located in the Centre Pompidou in Paris. It\'s open to all, with no membership required, and offers a vast collection of multimedia resources.',
    services: ['Free Access', 'Digital Resources', 'Language Learning', 'Exhibitions', 'Workshops'],
    coordinates: {
      latitude: 48.8606,
      longitude: 2.3522,
    },
    website: 'https://www.bpi.fr',
    phone: '+33 1 44 78 12 75',
    images: [
      'https://images.pexels.com/photos/448835/pexels-photo-448835.jpeg',
      'https://images.pexels.com/photos/4113011/pexels-photo-4113011.jpeg',
      'https://images.pexels.com/photos/6373297/pexels-photo-6373297.jpeg',
    ],
  },
  {
    id: '3',
    name: 'Médiathèque Françoise Sagan',
    address: '8 Rue Léon Schwartzenberg, 75010 Paris',
    imageUrl: 'https://images.pexels.com/photos/590493/pexels-photo-590493.jpeg',
    rating: 4.2,
    reviewCount: 76,
    isOpen: false,
    openingTime: '10:00',
    closingTime: '19:00',
    tags: ['Children Section', 'Quiet', 'Historical Building'],
    description: 'The Médiathèque Françoise Sagan opened in 2015 in the renovated Saint-Lazare hospital\'s former laundry building. It offers a diverse collection including books, music, and films, with special focus on youth and children\'s literature.',
    services: ['Children\'s Section', 'Music Collection', 'Film Library', 'Reading Room', 'Events'],
    coordinates: {
      latitude: 48.8764,
      longitude: 2.3551,
    },
    website: 'https://bibliotheques.paris.fr/francoise-sagan.aspx',
    phone: '+33 1 53 24 69 70',
    images: [
      'https://images.pexels.com/photos/590493/pexels-photo-590493.jpeg',
      'https://images.pexels.com/photos/1034008/pexels-photo-1034008.jpeg',
      'https://images.pexels.com/photos/2908984/pexels-photo-2908984.jpeg',
    ],
  },
  {
    id: '4',
    name: 'Bibliothèque Forney',
    address: '1 Rue du Figuier, 75004 Paris',
    imageUrl: 'https://images.pexels.com/photos/1290141/pexels-photo-1290141.jpeg',
    rating: 4.6,
    reviewCount: 54,
    isOpen: true,
    openingTime: '13:00',
    closingTime: '19:00',
    tags: ['Art', 'Historical Building', 'Special Collections'],
    description: 'Located in the Hôtel de Sens, one of the few remaining medieval private residences in Paris, Bibliothèque Forney specializes in the decorative arts, graphic arts, crafts, and design. It houses an impressive collection of prints, posters, and wallpapers.',
    services: ['Special Collections', 'Research Support', 'Reading Room', 'Exhibitions', 'Guided Tours'],
    coordinates: {
      latitude: 48.8532,
      longitude: 2.3592,
    },
    website: 'https://bibliotheques-specialisees.paris.fr/forney',
    phone: '+33 1 42 78 14 60',
    images: [
      'https://images.pexels.com/photos/1290141/pexels-photo-1290141.jpeg',
      'https://images.pexels.com/photos/1769409/pexels-photo-1769409.jpeg',
      'https://images.pexels.com/photos/1907785/pexels-photo-1907785.jpeg',
    ],
  },
  {
    id: '5',
    name: 'Bibliothèque Mazarine',
    address: '23 Quai de Conti, 75006 Paris',
    imageUrl: 'https://images.pexels.com/photos/1370296/pexels-photo-1370296.jpeg',
    rating: 4.8,
    reviewCount: 63,
    isOpen: true,
    openingTime: '10:00',
    closingTime: '18:00',
    tags: ['Historical', 'Research', 'Rare Books'],
    description: 'Founded in the 17th century, the Bibliothèque Mazarine is the oldest public library in France. It houses over 600,000 volumes, including rare manuscripts and incunabula, and is located in the historic Institut de France building.',
    services: ['Research Services', 'Rare Books Collection', 'Study Areas', 'Guided Tours', 'Archives'],
    coordinates: {
      latitude: 48.8573,
      longitude: 2.3364,
    },
    website: 'https://www.bibliotheque-mazarine.fr',
    phone: '+33 1 44 41 44 06',
    images: [
      'https://images.pexels.com/photos/1370296/pexels-photo-1370296.jpeg',
      'https://images.pexels.com/photos/159870/old-books-book-art-literature-159870.jpeg',
      'https://images.pexels.com/photos/1148399/pexels-photo-1148399.jpeg',
    ],
  },
];