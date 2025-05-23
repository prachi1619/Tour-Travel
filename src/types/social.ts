export interface Review {
  id: string;
  userId: string;
  userName: string;
  userPhoto: string;
  destinationId: string;
  rating: number;
  content: string;
  photos: string[];
  likes: number;
  createdAt: string;
  updatedAt: string;
}

export interface Comment {
  id: string;
  userId: string;
  userName: string;
  userPhoto: string;
  content: string;
  parentId?: string;
  likes: number;
  createdAt: string;
  updatedAt: string;
}

export interface ForumThread {
  id: string;
  userId: string;
  userName: string;
  userPhoto: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
  views: number;
  likes: number;
  replies: number;
  createdAt: string;
  updatedAt: string;
  lastReplyAt: string;
}

export interface QA {
  id: string;
  userId: string;
  userName: string;
  userPhoto: string;
  destinationId: string;
  question: string;
  answers: Answer[];
  createdAt: string;
  updatedAt: string;
}

export interface Answer {
  id: string;
  userId: string;
  userName: string;
  userPhoto: string;
  content: string;
  isAccepted: boolean;
  likes: number;
  createdAt: string;
  updatedAt: string;
}

export interface UserProfile {
  id: string;
  name: string;
  photoURL: string;
  bio: string;
  location: string;
  joinedDate: string;
  followers: string[];
  following: string[];
  contributions: {
    reviews: number;
    photos: number;
    answers: number;
    forumPosts: number;
  };
  badges: Badge[];
  points: number;
  rank: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'reviews' | 'photos' | 'answers' | 'forum' | 'exploration';
  level: 'bronze' | 'silver' | 'gold' | 'platinum';
  earnedAt: string;
} 