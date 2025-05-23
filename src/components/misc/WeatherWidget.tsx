import React, { useState, useEffect } from 'react';
import { getWeatherForecast, WeatherForecast } from '../../utils/weather';

interface WeatherWidgetProps {
  lat: number;
  lon: number;
}

const WeatherWidget: React.FC<WeatherWidgetProps> = ({ lat, lon }) => {
  const [forecast, setForecast] = useState<WeatherForecast[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const data = await getWeatherForecast(lat, lon);
        setForecast(data);
      } catch (err) {
        setError('Failed to load weather forecast');
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [lat, lon]);

  if (loading) {
    return (
      <div className="animate-pulse p-4 bg-white rounded-lg shadow">
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
        <div className="space-y-3">
          <div className="h-3 bg-gray-200 rounded"></div>
          <div className="h-3 bg-gray-200 rounded"></div>
          <div className="h-3 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 text-red-600 rounded-lg">
        {error}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h3 className="text-lg font-semibold mb-4">5-Day Weather Forecast</h3>
      <div className="grid grid-cols-5 gap-2">
        {forecast.map((day) => (
          <div
            key={day.date}
            className="text-center p-2 hover:bg-gray-50 rounded transition"
          >
            <div className="text-sm font-medium">{day.date}</div>
            <img
              src={day.icon}
              alt={day.description}
              className="w-10 h-10 mx-auto"
            />
            <div className="text-lg font-bold">{day.temp}°C</div>
            <div className="text-xs text-gray-600 capitalize">
              {day.description}
            </div>
            <div className="text-xs text-gray-600">
              Humidity: {day.humidity}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherWidget; 