import { useState } from 'react';
import { useGetWeatherByCityQuery, useLazyGetForecastByCityQuery } from '../../api/weatherApi';
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

  if (forecastData && forecastData[activeDay] && forecastData[activeDay].main) {
    const dayData = forecastData[activeDay];
    return {
      temp: dayData.main?.temp,
      city: currentWeather?.city || city,
      country: currentWeather?.country,
      pressure: dayData.main?.pressure,
      sunset: 'N/A',
    };
  }

  return {
    temp: undefined,
    city: undefined,
    country: undefined,
    pressure: undefined,
    sunset: undefined,
  };
};

export const useWeatherState = () => {
  const [city, setCity] = useState('');
  const [activeDay, setActiveDay] = useState<'today' | 'tomorrow' | 'dayAfterTomorrow'>('today');

  const {
    data: currentWeather,
    isFetching,
    isError,
  } = useGetWeatherByCityQuery(city, {
    skip: !city || activeDay !== 'today',
  });

  const [getForecast, {
    data: forecastData,
    isFetching: isForecastFetching,
    error: forecastError,
  }] = useLazyGetForecastByCityQuery();

  const handleSubmit = ({ city }: { city: string }) => {
    setCity(city);
    setActiveDay('today');
    getForecast(city);
  };

  const handleDayChange = (day: typeof activeDay) => {
    setActiveDay(day);
  };

  const weatherState: AppState = {
    ...getWeatherData({
      isError,
      forecastError,
      activeDay,
      currentWeather,
      forecastData,
      city,
    }),
    error: isError || forecastError ? 'Город не найден' : undefined,
  };

  return {
    city,
    activeDay,
    weatherState,
    handleSubmit,
    handleDayChange,
    isFetching,
    isForecastFetching,
    isError,
    forecastError,
  };
};
