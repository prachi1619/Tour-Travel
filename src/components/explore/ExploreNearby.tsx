import React, { useState, useEffect } from 'react';
import { getCurrentLocation, searchNearbyPlaces, getCityFromCoordinates } from '../../services/location';
import { FaMapMarkerAlt, FaSpinner, FaWalking, FaStar, FaFilter, FaExclamationTriangle } from 'react-icons/fa';

interface Place {
  name: string;
  type: string;
  distance: number;
  address: string;
  rating?: number;
  lat: number;
  lon: number;
}

const placeTypes = [
  { id: 'tourism', label: 'Tourist Attractions' },
  { id: 'restaurant', label: 'Restaurants' },
  { id: 'hotel', label: 'Hotels' },
  { id: 'museum', label: 'Museums' },
  { id: 'park', label: 'Parks' }
];

const ExploreNearby: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [places, setPlaces] = useState<Place[]>([]);
  const [selectedType, setSelectedType] = useState('tourism');
  const [mapUrl, setMapUrl] = useState('');
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [locationPermission, setLocationPermission] = useState<'granted' | 'denied' | 'prompt'>('prompt');
  const [cityName, setCityName] = useState<string>('');

  useEffect(() => {
    // Check if geolocation is supported
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      return;
    }

    // Check for existing location permission
    if ('permissions' in navigator) {
      navigator.permissions.query({ name: 'geolocation' })
        .then((result) => {
          console.log('Location permission status:', result.state);
          setLocationPermission(result.state as 'granted' | 'denied' | 'prompt');
          
          // Watch for permission changes
          result.addEventListener('change', () => {
            console.log('Location permission changed to:', result.state);
            setLocationPermission(result.state as 'granted' | 'denied' | 'prompt');
          });
        })
        .catch(err => console.error('Error checking location permission:', err));
    }
  }, []);

  const handleLocationSearch = async () => {
    console.log('Location search triggered');
    setLoading(true);
    setError(null);
    
    try {
      console.log('Getting current location...');
      const location = await getCurrentLocation();
      console.log('Location received:', location);
      setUserLocation(location);

      // Get city name
      const city = await getCityFromCoordinates(location.latitude, location.longitude);
      setCityName(city);
      
      console.log('Searching for places in:', city);
      const nearbyPlaces = await searchNearbyPlaces(location, selectedType);
      console.log('Places found:', nearbyPlaces.length);
      setPlaces(nearbyPlaces);
      
      // Generate OpenStreetMap URL with markers
      if (nearbyPlaces.length > 0) {
        const markers = nearbyPlaces
          .map((place, index) => {
            const color = index === 0 ? 'red' : 'blue';
            return `marker=${place.lat},${place.lon},${color}`;
          })
          .join('&');
        
        const userMarker = `marker=${location.latitude},${location.longitude},green`;
        
        const lats = nearbyPlaces.map(p => p.lat).concat([location.latitude]);
        const lons = nearbyPlaces.map(p => p.lon).concat([location.longitude]);
        const minLat = Math.min(...lats) - 0.01;
        const maxLat = Math.max(...lats) + 0.01;
        const minLon = Math.min(...lons) - 0.01;
        const maxLon = Math.max(...lons) + 0.01;

        const newMapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${minLon},${minLat},${maxLon},${maxLat}&layer=mapnik&${markers}&${userMarker}`;
        console.log('Setting map URL:', newMapUrl);
        setMapUrl(newMapUrl);
      }
    } catch (err) {
      console.error('Error in ExploreNearby:', err);
      setError(
        err instanceof Error 
          ? err.message 
          : 'Failed to get nearby places. Please ensure location services are enabled and try again.'
      );
      setPlaces([]);
      setMapUrl('');
    } finally {
      setLoading(false);
    }
  };

  const handleTypeChange = (newType: string) => {
    setSelectedType(newType);
    if (userLocation) {
      handleLocationSearch();
    }
  };

  const renderLocationPermissionMessage = () => {
    if (locationPermission === 'denied') {
      return (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4">
          <div className="flex items-center">
            <FaExclamationTriangle className="mr-2" />
            <div>
              <p className="font-bold">Location Access Required</p>
              <p>Please enable location access in your browser settings to use this feature.</p>
              <button
                onClick={() => window.open('chrome://settings/content/location', '_blank')}
                className="text-blue-600 hover:text-blue-800 underline mt-2"
              >
                Open Browser Settings
              </button>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6 p-4">
      {renderLocationPermissionMessage()}
      
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-2xl font-bold">Explore Near Me</h2>
          {cityName && <p className="text-gray-600">Showing places in {cityName}</p>}
        </div>
        <div className="flex items-center space-x-4">
          <select
            value={selectedType}
            onChange={(e) => handleTypeChange(e.target.value)}
            className="p-2 border rounded-lg"
            disabled={loading}
          >
            {placeTypes.map(type => (
              <option key={type.id} value={type.id}>
                {type.label}
              </option>
            ))}
          </select>
          <button
            onClick={handleLocationSearch}
            disabled={loading || locationPermission === 'denied'}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:bg-blue-400 flex items-center space-x-2"
          >
            {loading ? (
              <>
                <FaSpinner className="animate-spin" />
                <span>Searching...</span>
              </>
            ) : (
              <>
                <FaMapMarkerAlt />
                <span>Find Places</span>
              </>
            )}
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg">
          <div className="flex items-center">
            <FaExclamationTriangle className="mr-2" />
            <div>{error}</div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Map */}
        <div className="bg-gray-100 rounded-lg overflow-hidden h-[400px] shadow-lg">
          {mapUrl ? (
            <iframe
              src={mapUrl}
              width="100%"
              height="100%"
              frameBorder="0"
              title="Nearby Places Map"
              className="w-full h-full"
            />
          ) : (
            <div className="h-full flex items-center justify-center text-gray-500">
              {loading ? (
                <FaSpinner className="animate-spin text-2xl" />
              ) : (
                'Click "Find Places" to see the map'
              )}
            </div>
          )}
        </div>

        {/* Places List */}
        <div className="bg-white rounded-lg shadow-lg p-4">
          <h3 className="font-bold mb-4">Places to Visit</h3>
          {places.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              {loading ? 'Searching for places...' : 'No places found. Try searching!'}
            </p>
          ) : (
            <div className="space-y-4 max-h-[350px] overflow-y-auto">
              {places.map((place, index) => (
                <div
                  key={index}
                  className="border-b last:border-0 pb-4 last:pb-0 hover:bg-gray-50 p-2 rounded"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">{place.name}</h4>
                      <p className="text-sm text-gray-600 capitalize">{place.type.replace(/_/g, ' ')}</p>
                      {place.address && (
                        <p className="text-sm text-gray-500">{place.address}</p>
                      )}
                      {place.rating && (
                        <div className="flex items-center mt-1">
                          <FaStar className="text-yellow-400 mr-1" />
                          <span className="text-sm">{place.rating}</span>
                        </div>
                      )}
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-medium">
                        {place.distance.toFixed(1)} km
                      </span>
                      <div className="text-sm text-gray-500 flex items-center mt-1">
                        <FaWalking className="mr-1" />
                        {Math.round(place.distance * 20)} min
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExploreNearby; 