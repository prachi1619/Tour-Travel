export const POINTS = {
  // Review related points
  CREATE_REVIEW: 10,
  REVIEW_LIKE: 2,
  REVIEW_HELPFUL: 5,

  // Photo related points
  UPLOAD_PHOTO: 5,
  PHOTO_LIKE: 1,

  // Forum related points
  CREATE_THREAD: 8,
  THREAD_REPLY: 3,
  THREAD_LIKE: 1,

  // Q&A related points
  ASK_QUESTION: 5,
  ANSWER_QUESTION: 8,
  BEST_ANSWER: 15,

  // Destination related points
  ADD_DESTINATION: 20,
  UPDATE_DESTINATION: 5,

  // Profile related points
  COMPLETE_PROFILE: 10,
  UPDATE_PROFILE: 2,
  ADD_SOCIAL_LINKS: 5,
  VERIFY_EMAIL: 5,
  DAILY_LOGIN: 1,
  LOGIN_STREAK_BONUS: 5, // Awarded every 7 days
  PROFILE_PHOTO_UPLOAD: 5,

  // Social points
  GAIN_FOLLOWER: 3,
  REFERRED_USER_JOINS: 25,
};

export const BADGES = {
  REVIEWER: {
    BRONZE: { name: 'Novice Reviewer', threshold: 5, points: 20 },
    SILVER: { name: 'Expert Reviewer', threshold: 25, points: 50 },
    GOLD: { name: 'Master Critic', threshold: 100, points: 100 }
  },
  PHOTOGRAPHER: {
    BRONZE: { name: 'Shutterbug', threshold: 10, points: 20 },
    SILVER: { name: 'Photographer', threshold: 50, points: 50 },
    GOLD: { name: 'Photography Master', threshold: 200, points: 100 }
  },
  HELPER: {
    BRONZE: { name: 'Helper', threshold: 5, points: 20 },
    SILVER: { name: 'Guide', threshold: 25, points: 50 },
    GOLD: { name: 'Travel Guru', threshold: 100, points: 100 }
  },
  CONTRIBUTOR: {
    BRONZE: { name: 'Contributor', threshold: 100, points: 30 },
    SILVER: { name: 'Super Contributor', threshold: 500, points: 75 },
    GOLD: { name: 'Elite Contributor', threshold: 2000, points: 150 }
  },
  SOCIALITE: {
    BRONZE: { name: 'Connected', threshold: 10, points: 20 },
    SILVER: { name: 'Influencer', threshold: 50, points: 50 },
    GOLD: { name: 'Travel Celebrity', threshold: 200, points: 100 }
  },
  EXPLORER: {
    BRONZE: { name: 'Wanderer', threshold: 5, points: 20 },
    SILVER: { name: 'Adventurer', threshold: 25, points: 50 },
    GOLD: { name: 'Globe Trotter', threshold: 100, points: 100 }
  }
}; 