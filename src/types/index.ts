export type Region = 
  | 'North' 
  | 'South' 
  | 'East' 
  | 'West' 
  | 'Central' 
  | 'Northeast';

export type TravelType = 
  | 'Adventure' 
  | 'Spiritual' 
  | 'Historical' 
  | 'Cultural' 
  | 'Nature' 
  | 'Beach' 
  | 'Hill Station' 
  | 'Wildlife';

export type BudgetRange = 
  | 'Budget' 
  | 'Mid-range' 
  | 'Luxury';

export type Season = 
  | 'Winter' 
  | 'Summer' 
  | 'Monsoon' 
  | 'Spring' 
  | 'Autumn' 
  | 'Year-round';

export interface Destination {
  id: string;
  name: string;
  slug: string;
  state: string;
  region: Region;
  type: TravelType[];
  budget: BudgetRange;
  bestSeason: Season[];
  description: string;
  shortDescription: string;
  imageUrl: string;
  imageGallery: string[];
  bestTimeToVisit: string;
  howToReach: {
    air?: string;
    train?: string;
    road?: string;
  };
  nearbyPlaces: NearbyPlace[];
  localFood: string[];
  stayOptions: StayOption[];
  culturalSignificance: string;
  featured?: boolean;
  trending?: boolean;
}

export interface NearbyPlace {
  id: string;
  name: string;
  slug: string;
  distance: string;
  imageUrl: string;
}

export interface StayOption {
  type: 'Budget' | 'Mid-range' | 'Luxury';
  description: string;
  priceRange: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  author: {
    name: string;
    avatarUrl: string;
  };
  date: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  tags: string[];
  destinations: string[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  savedDestinations: string[];
  preferences: {
    travelTypes: TravelType[];
    budgetRange: BudgetRange;
  };
  isDarkMode: boolean;
}