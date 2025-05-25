interface DistanceResult {
  distance: number;
  drivingTime: number;
  trainTime: number | null;
  flightTime: number | null;
}

export async function calculateDistance(from: string, to: string): Promise<DistanceResult> {
  try {
    // For demo purposes, using estimated calculations
    // In production, you would use MapQuest or similar API
    const estimatedDistance = Math.random() * 1000 + 100; // Random distance between 100-1100 km
    
    // Estimated times based on average speeds:
    // Car: 60 km/h
    // Train: 80 km/h
    // Flight: 800 km/h (including airport procedures)
    const drivingTime = estimatedDistance / 60;
    const trainTime = estimatedDistance / 80;
    const flightTime = estimatedDistance > 300 ? (estimatedDistance / 800) + 2 : null; // Add 2 hours for airport procedures

    return {
      distance: Math.round(estimatedDistance),
      drivingTime: Math.round(drivingTime * 10) / 10,
      trainTime: trainTime ? Math.round(trainTime * 10) / 10 : null,
      flightTime: flightTime ? Math.round(flightTime * 10) / 10 : null
    };
  } catch (error) {
    console.error('Error calculating distance:', error);
    throw error;
  }
} 