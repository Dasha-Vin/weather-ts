import type { FC } from 'react';
import { useGetWeatherByCityQuery, useLazyGetForecastByCityQuery } from '../../api/weatherApi';
import { Form } from '../form/Form';
import { WeatherDisplay } from './WeatherDisplay';
import { getWeatherData, useWeatherState } from './weatherUtils';
import type { AppState } from '../../types/types';

export const WeatherContainer: FC = () => {
  const { city, setCity, activeDay, setActiveDay } = useWeatherState();
  
  const { data: currentWeather, isFetching, isError } = useGetWeatherByCityQuery(city, {
    skip: !city || activeDay !== 'today',
  });
  
  const [getForecast, { data: forecastData, isFetching: isForecastFetching, error: forecastError }] = 
    useLazyGetForecastByCityQuery();

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

  return (
    <>
      <Form onFormSubmit={handleSubmit} />
      {isFetching || isForecastFetching ? (
        <div className="loading">Загрузка...</div>
      ) : (
        <WeatherDisplay
          city={city}
          isError={isError}
          forecastError={forecastError}
          activeDay={activeDay}
          onDayChange={handleDayChange}
          weatherState={weatherState}
        />
      )}
    </>
  );
};