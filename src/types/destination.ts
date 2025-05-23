export interface Attraction {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  type: 'Historical' | 'Natural' | 'Cultural' | 'Religious' | 'Adventure';
  rating: number;
  entryFee?: number;
  timings?: string;
}

export interface LocalFood {
  name: string;
  description: string;
  imageUrl: string;
  price: string;
  where: string[];
}

export interface Accommodation {
  id: string;
  name: string;
  type: 'Hotel' | 'Hostel' | 'Homestay' | 'Resort';
  priceRange: string;
  rating: number;
  amenities: string[];
  location: string;
  imageUrl: string;
}

export interface Market {
  name: string;
  description: string;
  specialties: string[];
  timings: string;
  location: string;
}

export interface TravelWarning {
  type: 'Weather' | 'Safety' | 'Health' | 'Political' | 'Other';
  severity: 'Low' | 'Medium' | 'High';
  description: string;
  validUntil?: Date;
}

export interface TransportOption {
  mode: 'Air' | 'Train' | 'Road';
  description: string;
  routes: string[];
  frequency: string;
  estimatedCost: string;
}

export interface NearbyPlace {
  id: string;
  name: string;
  distance: number;
  travelTime: string;
  description: string;
  imageUrl: string;
}

export interface Budget {
  accommodation: {
    budget: number;
    standard: number;
    luxury: number;
  };
  food: {
    budget: number;
    standard: number;
    luxury: number;
  };
  transportation: {
    budget: number;
    standard: number;
    luxury: number;
  };
  activities: {
    budget: number;
    standard: number;
    luxury: number;
  };
}

export interface Destination {
  id: string;
  name: string;
  state: string;
  type: 'City' | 'Town' | 'Village' | 'Region';
  description: string;
  history: string;
  culturalSignificance: string;
  imageUrl: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  bestTimeToVisit: {
    months: string[];
    description: string;
  };
  attractions: Attraction[];
  localFood: LocalFood[];
  accommodations: Accommodation[];
  markets: Market[];
  travelWarnings: TravelWarning[];
  transportOptions: TransportOption[];
  nearbyPlaces: NearbyPlace[];
  budget: Budget;
  isFeatured: boolean;
  isTrending: boolean;
  isHiddenGem: boolean;
  rating: number;
  tags: string[];
} 