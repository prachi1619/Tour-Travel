export interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  photoURL?: string;
  bio?: string;
  location?: string;
  joinedDate: string;
  interests: string[];
  points: number;
  badges: Badge[];
  followers: string[];
  following: string[];
  loginStreak: number;
  lastLoginDate: string;
  travelPreferences: {
    preferredDestinations: string[];
    travelStyle: string[];
    budget: 'budget' | 'moderate' | 'luxury';
    preferredSeasons: string[];
    accommodation: string[];
  };
  socialLinks?: {
    instagram?: string;
    facebook?: string;
    twitter?: string;
    website?: string;
  };
  stats: {
    reviews: number;
    photos: number;
    answers: number;
    threads: number;
  };
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  level: 'bronze' | 'silver' | 'gold';
  earnedAt: string;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  userPhoto?: string;
  destinationId: string;
  content: string;
  rating: number;
  likes: number;
  helpfulCount: number;
  photos: string[];
  createdAt: string;
  updatedAt: string;
}

export const TRAVEL_STYLES = [
  'Adventure',
  'Luxury',
  'Budget',
  'Cultural',
  'Nature',
  'Urban',
  'Beach',
  'Mountain'
];

export const INTERESTS = [
  'Photography',
  'Food & Dining',
  'History',
  'Art & Museums',
  'Nature & Wildlife',
  'Adventure Sports',
  'Shopping',
  'Nightlife',
  'Local Culture',
  'Relaxation'
];

export const SEASONS = [
  'Spring',
  'Summer',
  'Fall',
  'Winter'
];

export const ACCOMMODATION_TYPES = [
  'Hotel',
  'Hostel',
  'Resort',
  'Vacation Rental',
  'Camping',
  'Boutique Hotel',
  'Bed & Breakfast'
]; 