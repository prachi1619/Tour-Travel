interface Location {
  latitude: number;
  longitude: number;
}

interface Place {
  name: string;
  type: string;
  distance: number;
  address: string;
  rating?: number;
  lat: number;
  lon: number;
}

export async function getCurrentLocation(): Promise<Location> {
  console.log('Attempting to get current location...');
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      console.error('Geolocation API not supported');
      reject(new Error('Geolocation is not supported by your browser'));
      return;
    }

    console.log('Requesting location permission...');
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log('Location obtained:', {
          lat: position.coords.latitude,
          lon: position.coords.longitude
        });
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
      },
      (error) => {
        console.error('Geolocation error:', error.code, error.message);
        let errorMessage = 'Failed to get your location. ';
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage += 'Please allow location access in your browser settings.';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage += 'Location information is unavailable.';
            break;
          case error.TIMEOUT:
            errorMessage += 'Location request timed out.';
            break;
          default:
            errorMessage += error.message;
        }
        reject(new Error(errorMessage));
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  });
}

export async function searchNearbyPlaces(location: Location, type: string = 'tourism'): Promise<Place[]> {
  try {
    // Convert type to appropriate OSM tag
    let osmTag = '';
    switch (type) {
      case 'tourism':
        osmTag = 'tourism=attraction';  // Use single tag for main query
        break;
      case 'restaurant':
        osmTag = 'amenity=restaurant';
        break;
      case 'hotel':
        osmTag = 'tourism=hotel';
        break;
      case 'museum':
        osmTag = 'tourism=museum';
        break;
      case 'park':
        osmTag = 'leisure=park';
        break;
      default:
        osmTag = 'tourism=attraction';
    }

    // Use a radius-based search instead of city boundaries
    const radius = 10000; // 10km radius
    const query = `[out:json][timeout:25];
(
  way[${osmTag}](around:${radius},${location.latitude},${location.longitude});
  node[${osmTag}](around:${radius},${location.latitude},${location.longitude});
  relation[${osmTag}](around:${radius},${location.latitude},${location.longitude});
);
out body;
>;
out skel qt;`;

    console.log('Sending Overpass query:', query);

    const response = await fetch('https://overpass-api.de/api/interpreter', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `data=${encodeURIComponent(query)}`
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Overpass API Error Response:', errorText);
      throw new Error(`Failed to fetch nearby places: ${response.statusText}`);
    }

    const data = await response.json();
    
    if (!data.elements || !Array.isArray(data.elements)) {
      return [];
    }

    // Additional tourism-related tags to include if searching for tourist attractions
    const additionalTags = type === 'tourism' ? [
      'historic=monument',
      'historic=memorial',
      'historic=castle',
      'historic=ruins',
      'tourism=viewpoint',
      'tourism=museum'
    ] : [];

    // If searching for tourist attractions, make additional queries for other relevant places
    let allElements = [...data.elements];
    if (additionalTags.length > 0) {
      for (const tag of additionalTags) {
        const additionalQuery = `[out:json][timeout:25];
(
  way[${tag}](around:${radius},${location.latitude},${location.longitude});
  node[${tag}](around:${radius},${location.latitude},${location.longitude});
  relation[${tag}](around:${radius},${location.latitude},${location.longitude});
);
out body;
>;
out skel qt;`;

        try {
          const additionalResponse = await fetch('https://overpass-api.de/api/interpreter', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `data=${encodeURIComponent(additionalQuery)}`
          });

          if (additionalResponse.ok) {
            const additionalData = await additionalResponse.json();
            if (additionalData.elements && Array.isArray(additionalData.elements)) {
              allElements = [...allElements, ...additionalData.elements];
            }
          }
        } catch (error) {
          console.error(`Error fetching additional places for tag ${tag}:`, error);
        }
      }
    }

    return allElements
      .filter((element: any) => {
        return element.tags && element.tags.name && 
               (element.lat !== undefined && element.lon !== undefined);
      })
      .map((element: any) => ({
        name: element.tags.name,
        type: element.tags.tourism || element.tags.amenity || element.tags.leisure || element.tags.historic || type,
        distance: calculateDistance(
          location.latitude,
          location.longitude,
          element.lat,
          element.lon
        ),
        address: element.tags['addr:street'] || element.tags['addr:housenumber'] || '',
        lat: element.lat,
        lon: element.lon,
        rating: element.tags.stars ? parseFloat(element.tags.stars) : undefined
      }))
      .sort((a: Place, b: Place) => a.distance - b.distance)
      .slice(0, 50); // Return top 50 closest places
  } catch (error) {
    console.error('Error fetching nearby places:', error);
    throw error;
  }
}

// Function to get the city name from coordinates using reverse geocoding
export async function getCityFromCoordinates(lat: number, lon: number): Promise<string> {
  try {
    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=10`);
    
    if (!response.ok) {
      throw new Error('Failed to get city name');
    }

    const data = await response.json();
    return data.address?.city || data.address?.town || data.address?.village || 'Unknown Location';
  } catch (error) {
    console.error('Error getting city name:', error);
    return 'Unknown Location';
  }
}

function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth's radius in km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRad(degrees: number): number {
  return degrees * (Math.PI / 180);
} 