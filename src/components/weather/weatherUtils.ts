import type { AppState } from '../../types/types';

interface GetWeatherDataParams {
  isError: boolean;
  forecastError: any;
  activeDay: 'today' | 'tomorrow' | 'dayAfterTomorrow';
  currentWeather?: {
    temp?: number;
    city?: string;
    country?: string;
    pressure?: number;
    sunset?: string;
  };
  forecastData?: Record<string, any>;
  city: string;
}

export const getWeatherData = ({
  isError,
  forecastError,
  activeDay,
  currentWeather,
  forecastData,
  city,
}: GetWeatherDataParams): AppState => {
  if (isError || forecastError) {
    return {
      temp: undefined,
      city: undefined,
      country: undefined,
      pressure: undefined,
      sunset: undefined,
    };
  }

  if (activeDay === 'today') {
    return {
      temp: currentWeather?.temp,
      city: currentWeather?.city,
      country: currentWeather?.country,
      pressure: currentWeather?.pressure,
      sunset: currentWeather?.sunset,
    };
  }
  
  if (forecastData) {
    const dayData = forecastData[activeDay];
    return {
      temp: dayData?.main.temp,
      city: currentWeather?.city || city,
      country: currentWeather?.country,
      pressure: dayData?.main.pressure,
      sunset: 'N/A',
    };
  }
  
  return {};
};