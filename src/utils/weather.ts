import axios from 'axios';

const WEATHER_API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const WEATHER_API_BASE = 'https://api.openweathermap.org/data/2.5';

export interface WeatherForecast {
  date: string;
  temp: number;
  humidity: number;
  description: string;
  icon: string;
}

export const getWeatherForecast = async (lat: number, lon: number): Promise<WeatherForecast[]> => {
  try {
    const response = await axios.get(
      `${WEATHER_API_BASE}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );

    return response.data.list
      .filter((_: any, index: number) => index % 8 === 0) // Get one forecast per day
      .map((item: any) => ({
        date: new Date(item.dt * 1000).toLocaleDateString(),
        temp: Math.round(item.main.temp),
        humidity: item.main.humidity,
        description: item.weather[0].description,
        icon: `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`
      }));
  } catch (error) {
    console.error('Error fetching weather:', error);
    throw error;
  }
}; 