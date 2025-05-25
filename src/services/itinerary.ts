interface ItineraryRequest {
  destination: string;
  duration: number;
  travelStyle: string;
  interests: string[];
}

const activityTemplates = {
  'Historical Sites': [
    'Visit {destination} Historical Museum',
    'Explore the Old Town district',
    'Tour ancient monuments and landmarks',
    'Visit heritage buildings',
    'Join a historical walking tour',
  ],
  'Nature': [
    'Hike in nearby nature trails',
    'Visit {destination} Botanical Gardens',
    'Explore local parks',
    'Take a scenic nature walk',
    'Visit nearby lakes or beaches',
  ],
  'Food & Culture': [
    'Try local street food',
    'Visit traditional markets',
    'Take a cooking class',
    'Dine at authentic local restaurants',
    'Join a food tasting tour',
  ],
  'Adventure': [
    'Go on a zip-lining adventure',
    'Try rock climbing',
    'Join adventure sports activities',
    'Take a mountain biking tour',
    'Go kayaking or rafting',
  ],
};

const timeSlots = {
  'Relaxed': {
    activitiesPerDay: 2,
    startTime: '10:00',
    breakTime: '2 hours',
  },
  'Moderate': {
    activitiesPerDay: 3,
    startTime: '09:00',
    breakTime: '1.5 hours',
  },
  'Intensive': {
    activitiesPerDay: 4,
    startTime: '08:00',
    breakTime: '1 hour',
  },
};

function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

function getActivitiesForInterests(interests: string[], count: number): string[] {
  const allActivities: string[] = [];
  interests.forEach(interest => {
    const activities = activityTemplates[interest as keyof typeof activityTemplates] || [];
    allActivities.push(...activities);
  });
  return shuffleArray(allActivities).slice(0, count);
}

export const generateItinerary = (request: ItineraryRequest): string => {
  const { destination, duration, travelStyle, interests } = request;
  const schedule = timeSlots[travelStyle as keyof typeof timeSlots];
  let itinerary = `${duration}-Day ${travelStyle} Itinerary for ${destination}\n\n`;

  const totalActivities = duration * schedule.activitiesPerDay;
  const activities = getActivitiesForInterests(interests, totalActivities);
  let activityIndex = 0;

  for (let day = 1; day <= duration; day++) {
    itinerary += `Day ${day}:\n`;
    itinerary += `Start your day at ${schedule.startTime}\n\n`;

    for (let i = 0; i < schedule.activitiesPerDay; i++) {
      const activity = activities[activityIndex]?.replace('{destination}', destination) || 'Free time to explore';
      itinerary += `${i + 1}. ${activity} (${schedule.breakTime})\n`;
      activityIndex++;
    }

    if (day < duration) {
      itinerary += '\nEvening: Free time to relax or explore local dining options\n\n';
    }
  }

  itinerary += '\nTravel Tips:\n';
  itinerary += '- Wear comfortable walking shoes\n';
  itinerary += '- Carry water and stay hydrated\n';
  itinerary += '- Check local weather conditions\n';
  itinerary += '- Make restaurant reservations in advance\n';
  itinerary += '- Keep local emergency numbers handy\n';

  return itinerary;
}; 