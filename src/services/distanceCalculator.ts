interface DistanceResult {
  origin: string;
  destination: string;
  distance: string;
  duration: string;
}

interface LocationPair {
  origin: string;
  destination: string;
}

// Function to calculate distance using Haversine formula
function calculateHaversineDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth's radius in kilometers
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRad(degrees: number): number {
  return degrees * (Math.PI / 180);
}

async function getCoordinates(location: string): Promise<{ lat: number; lng: number }> {
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        location
      )}&key=AIzaSyDm6InoH03YoPzVrNAzCkkAbudWEAD6l6c`
    );
    const data = await response.json();
    
    if (data.status === 'OK' && data.results[0]?.geometry?.location) {
      return data.results[0].geometry.location;
    }
    throw new Error('Location not found');
  } catch (error) {
    console.error('Geocoding error:', error);
    throw error;
  }
}

export async function calculateDirectDistance(origin: string, destination: string): Promise<DistanceResult> {
  try {
    const originCoords = await getCoordinates(origin);
    const destCoords = await getCoordinates(destination);
    
    const distance = calculateHaversineDistance(
      originCoords.lat,
      originCoords.lng,
      destCoords.lat,
      destCoords.lng
    );

    // Estimate duration (rough approximation based on average speed of 50 km/h)
    const hours = Math.floor(distance / 50);
    const minutes = Math.round((distance / 50 - hours) * 60);
    
    const durationText = hours > 0 
      ? `${hours} hr ${minutes} min`
      : `${minutes} min`;

    return {
      origin: origin.split(',')[0],
      destination: destination.split(',')[0],
      distance: `${distance.toFixed(1)} km`,
      duration: durationText
    };
  } catch (error) {
    console.error('Error calculating direct distance:', error);
    throw error;
  }
}

export async function calculateDistances(locations: string[], city: string): Promise<DistanceResult[]> {
  try {
    const results: DistanceResult[] = [];
    
    // Create pairs of consecutive locations
    const locationPairs: LocationPair[] = [];
    for (let i = 0; i < locations.length - 1; i++) {
      locationPairs.push({
        origin: `${locations[i]}, ${city}, India`,
        destination: `${locations[i + 1]}, ${city}, India`
      });
    }

    // Calculate distance for each pair
    for (const pair of locationPairs) {
      const result = await calculateDirectDistance(pair.origin, pair.destination);
      results.push(result);
    }

    return results;
  } catch (error) {
    console.error('Error calculating distances:', error);
    throw error;
  }
}

export function calculateTotalDistance(distances: DistanceResult[]): string {
  const totalKm = distances.reduce((total, result) => {
    const distanceValue = parseFloat(result.distance.replace(' km', ''));
    return total + distanceValue;
  }, 0);

  return `${totalKm.toFixed(1)} km`;
}

export function formatDuration(duration: string): string {
  return duration.replace(/hours?/, 'hr').replace(/mins?/, 'min');
} 