import {
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  increment,
  collection,
  query,
  where,
  orderBy,
  limit as firestoreLimit,
  getDocs,
  Timestamp,
  writeBatch,
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { POINTS, BADGES } from '../utils/pointsSystem';
import { UserProfile, Badge } from '../types/user';

export interface UserStats {
  reviews: number;
  photos: number;
  answers: number;
  threads: number;
  points: number;
  followers: string[];
  following: string[];
  badges: Badge[];
  lastLoginDate?: string;
  loginStreak: number;
  profileCompletion: number;
  travelPreferences: any;
  socialLinks: any;
}

export interface Review {
  id: string;
  userId: string;
  destinationId: string;
  content: string;
  rating: number;
  likes: number;
  helpfulCount: number;
  photos: string[];
  createdAt: string;
  updatedAt: string;
}

// Points system configuration
export const POINTS = {
  PROFILE_PHOTO_UPLOAD: 10,
  DAILY_LOGIN: 5,
  LOGIN_STREAK_BONUS: 15, // Every 7 days
  ADD_REVIEW: 20,
  ADD_PHOTO: 5,
  ANSWER_QUESTION: 15,
  CREATE_THREAD: 10,
  UPDATE_PROFILE: 5,
  ADD_SOCIAL_LINKS: 5,
  GAIN_FOLLOWER: 2,
  HELPFUL_REVIEW: 3,
  REVIEW_LIKE: 1
};

// Function to award points to a user
export const awardPoints = async (userId: string, action: keyof typeof POINTS) => {
  try {
    const userRef = doc(db, 'users', userId);
    const pointsToAward = POINTS[action];

    await updateDoc(userRef, {
      points: increment(pointsToAward),
      [`stats.${action.toLowerCase()}`]: increment(1)
    });

    // Check and award badges
    await checkAndAwardBadges(userId);

    return true;
  } catch (error) {
    console.error('Error awarding points:', error);
    return false;
  }
};

// Function to check and award badges
export const checkAndAwardBadges = async (userId: string) => {
  try {
    const userRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userRef);
    if (!userDoc.exists()) return;

    const userData = userDoc.data();
    const userStats = userData.stats || {};
    const currentBadges = userData.badges || [];

    const newBadges: Badge[] = [];

    // Check each badge category
    Object.entries(BADGES).forEach(([category, levels]) => {
      const stat = userStats[category.toLowerCase()] || 0;
      
      Object.entries(levels).forEach(([level, badge]) => {
        const badgeId = `${category}_${level}`;
        const hasBadge = currentBadges.some((b: Badge) => b.id === badgeId);
        
        if (!hasBadge && stat >= badge.threshold) {
          newBadges.push({
            id: badgeId,
            name: badge.name,
            category,
            level: level.toLowerCase() as Badge['level'],
            description: `Awarded for reaching ${badge.threshold} ${category.toLowerCase()}`,
            awardedAt: Timestamp.now().toDate().toISOString()
          });
        }
      });
    });

    if (newBadges.length > 0) {
      await updateDoc(userRef, {
        badges: arrayUnion(...newBadges),
        points: increment(newBadges.reduce((acc, badge) => {
          const badgeConfig = BADGES[badge.category as keyof typeof BADGES][badge.level.toUpperCase() as 'BRONZE' | 'SILVER' | 'GOLD'];
          return acc + (badgeConfig?.points || 0);
        }, 0))
      });
    }

    return newBadges;
  } catch (error) {
    console.error('Error checking badges:', error);
    return [];
  }
};

// Function to update profile photo with points
export const updateProfilePhoto = async (userId: string, photoURL: string) => {
  try {
    const userRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userRef);
    
    if (!userDoc.exists()) return false;
    
    // Check if this is their first photo upload
    const isFirstUpload = !userDoc.data().photoURL;
    
    await updateDoc(userRef, {
      photoURL,
      points: increment(isFirstUpload ? POINTS.PROFILE_PHOTO_UPLOAD : 0),
      updatedAt: Timestamp.now().toDate().toISOString()
    });

    return true;
  } catch (error) {
    console.error('Error updating profile photo:', error);
    return false;
  }
};

// Function to add a photo to a destination or review
export const addPhoto = async (userId: string, photoURL: string, type: 'destination' | 'review', parentId: string) => {
  try {
    const batch = writeBatch(db);
    const userRef = doc(db, 'users', userId);
    
    // Update user points and photo count
    batch.update(userRef, {
      points: increment(POINTS.ADD_PHOTO),
      'stats.photos': increment(1)
    });

    // Add photo to destination or review
    const parentRef = doc(db, type === 'destination' ? 'destinations' : 'reviews', parentId);
    batch.update(parentRef, {
      photos: arrayUnion(photoURL),
      updatedAt: Timestamp.now().toDate().toISOString()
    });

    await batch.commit();
    return true;
  } catch (error) {
    console.error('Error adding photo:', error);
    return false;
  }
};

// Function to follow a user with points
export const followUser = async (followerId: string, targetUserId: string) => {
  try {
    const batch = writeBatch(db);
    const followerRef = doc(db, 'users', followerId);
    const targetRef = doc(db, 'users', targetUserId);

    // Update follower's following list
    batch.update(followerRef, {
      following: arrayUnion(targetUserId)
    });

    // Update target's followers list and award points
    batch.update(targetRef, {
      followers: arrayUnion(followerId),
      points: increment(POINTS.GAIN_FOLLOWER)
    });

    await batch.commit();
    return true;
  } catch (error) {
    console.error('Error following user:', error);
    return false;
  }
};

// Function to unfollow a user
export const unfollowUser = async (followerId: string, targetUserId: string) => {
  try {
    const batch = writeBatch(db);
    const followerRef = doc(db, 'users', followerId);
    const targetRef = doc(db, 'users', targetUserId);

    // Update follower's following list
    batch.update(followerRef, {
      following: arrayRemove(targetUserId)
    });

    // Update target's followers list and remove points
    batch.update(targetRef, {
      followers: arrayRemove(followerId),
      points: increment(-POINTS.GAIN_FOLLOWER)
    });

    await batch.commit();
    return true;
  } catch (error) {
    console.error('Error unfollowing user:', error);
    return false;
  }
};

// Function to add a review with points
export const addReview = async (userId: string, review: Omit<Review, 'id' | 'createdAt' | 'updatedAt'>) => {
  try {
    const batch = writeBatch(db);
    const userRef = doc(db, 'users', userId);
    const reviewRef = doc(collection(db, 'reviews'));

    // Update user points and review count
    batch.update(userRef, {
      points: increment(POINTS.ADD_REVIEW),
      'stats.reviews': increment(1)
    });

    // Create review
    batch.set(reviewRef, {
      ...review,
      id: reviewRef.id,
      createdAt: Timestamp.now().toDate().toISOString(),
      updatedAt: Timestamp.now().toDate().toISOString()
    });

    await batch.commit();
    return reviewRef.id;
  } catch (error) {
    console.error('Error adding review:', error);
    return null;
  }
};

// Function to answer a question with points
export const answerQuestion = async (userId: string, questionId: string, answer: string) => {
  try {
    const batch = writeBatch(db);
    const userRef = doc(db, 'users', userId);
    const questionRef = doc(db, 'questions', questionId);

    // Update user points and answer count
    batch.update(userRef, {
      points: increment(POINTS.ANSWER_QUESTION),
      'stats.answers': increment(1)
    });

    // Add answer to question
    batch.update(questionRef, {
      answers: arrayUnion({
        userId,
        content: answer,
        createdAt: Timestamp.now().toDate().toISOString()
      })
    });

    await batch.commit();
    return true;
  } catch (error) {
    console.error('Error answering question:', error);
    return false;
  }
};

// Function to get top contributors
export const getTopContributors = async (limit = 10) => {
  try {
    const q = query(
      collection(db, 'users'),
      orderBy('points', 'desc'),
      firestoreLimit(limit)
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting top contributors:', error);
    return [];
  }
};

// Function to update daily login streak
export const updateLoginStreak = async (userId: string) => {
  try {
    const userRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userRef);
    if (!userDoc.exists()) return;

    const userData = userDoc.data();
    const lastLogin = userData.lastLoginDate ? new Date(userData.lastLoginDate) : null;
    const now = new Date();
    
    // Check if it's a new day since last login
    if (!lastLogin || 
        lastLogin.getDate() !== now.getDate() || 
        lastLogin.getMonth() !== now.getMonth() || 
        lastLogin.getFullYear() !== now.getFullYear()) {
      
      // Calculate streak
      let newStreak = 1;
      if (lastLogin) {
        const daysSinceLastLogin = Math.floor((now.getTime() - lastLogin.getTime()) / (1000 * 60 * 60 * 24));
        if (daysSinceLastLogin === 1) {
          // Continued streak
          newStreak = (userData.loginStreak || 0) + 1;
        }
      }

      const updates: any = {
        lastLoginDate: now.toISOString(),
        loginStreak: newStreak,
        points: increment(POINTS.DAILY_LOGIN)
      };

      // Award streak bonus every 7 days
      if (newStreak > 0 && newStreak % 7 === 0) {
        updates.points = increment(POINTS.DAILY_LOGIN + POINTS.LOGIN_STREAK_BONUS);
      }

      await updateDoc(userRef, updates);
    }
  } catch (error) {
    console.error('Error updating login streak:', error);
  }
};

// Function to update social links
export const updateSocialLinks = async (userId: string, socialLinks: any) => {
  try {
    const userRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userRef);
    if (!userDoc.exists()) return false;

    const userData = userDoc.data();
    const hadSocialLinks = Object.values(userData.socialLinks || {}).some(link => link);
    const hasSocialLinks = Object.values(socialLinks).some(link => link);

    // Award points only if adding social links for the first time
    if (!hadSocialLinks && hasSocialLinks) {
      await updateDoc(userRef, {
        socialLinks,
        points: increment(POINTS.ADD_SOCIAL_LINKS)
      });
    } else {
      await updateDoc(userRef, { socialLinks });
    }

    return true;
  } catch (error) {
    console.error('Error updating social links:', error);
    return false;
  }
};

// Function to update travel preferences
export const updateTravelPreferences = async (userId: string, preferences: any) => {
  try {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      travelPreferences: preferences,
      points: increment(POINTS.UPDATE_PROFILE)
    });
    return true;
  } catch (error) {
    console.error('Error updating travel preferences:', error);
    return false;
  }
};

// Function to get user reviews
export const getUserReviews = async (userId: string): Promise<Review[]> => {
  try {
    const reviewsQuery = query(
      collection(db, 'reviews'),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );

    const reviewsSnap = await getDocs(reviewsQuery);
    return reviewsSnap.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Review[];
  } catch (error) {
    console.error('Error getting user reviews:', error);
    return [];
  }
};

// Function to format date
export const formatDate = (date: string | Date): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(dateObj);
};

// Function to get user stats with additional profile metrics
export const getUserStats = async (userId: string): Promise<UserStats | null> => {
  try {
    const userDoc = await getDoc(doc(db, 'users', userId));
    if (!userDoc.exists()) return null;

    const userData = userDoc.data();
    const reviews = await getUserReviews(userId);

    return {
      reviews: reviews.length,
      photos: userData.stats?.photos || 0,
      answers: userData.stats?.answers || 0,
      threads: userData.stats?.threads || 0,
      points: userData.points || 0,
      followers: userData.followers || [],
      following: userData.following || [],
      badges: userData.badges || [],
      lastLoginDate: userData.lastLoginDate,
      loginStreak: userData.loginStreak || 0,
      profileCompletion: calculateProfileCompletion(userData),
      travelPreferences: userData.travelPreferences || {},
      socialLinks: userData.socialLinks || {}
    };
  } catch (error) {
    console.error('Error getting user stats:', error);
    return null;
  }
};

// Helper function to calculate profile completion percentage
const calculateProfileCompletion = (userData: any): number => {
  const fields = [
    userData.firstName,
    userData.lastName,
    userData.bio,
    userData.location,
    userData.photoURL,
    userData.interests?.length > 0,
    userData.travelPreferences?.travelStyle?.length > 0,
    userData.travelPreferences?.budget,
    userData.travelPreferences?.preferredSeasons?.length > 0,
    userData.travelPreferences?.accommodation?.length > 0
  ];

  const completedFields = fields.filter(Boolean).length;
  return Math.round((completedFields / fields.length) * 100);
}; 