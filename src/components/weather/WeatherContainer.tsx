import { useState, useEffect } from 'react';
import type { FC } from 'react';
import { useGetWeatherByCityQuery, useLazyGetForecastByCityQuery } from '../../api/weatherApi';
import { Form } from '../form/Form';
import { Weather } from './Weather';
import type { AppState } from '../../types/types';

export const WeatherContainer: FC = () => {
  const [city, setCity] = useState('');
  const [activeDay, setActiveDay] = useState<'today' | 'tomorrow' | 'dayAfterTomorrow'>('today');
  const [showForecastButtons, setShowForecastButtons] = useState(false);
  const [lastValidCity, setLastValidCity] = useState<string | null>(null);
  
  const { data: currentWeather, isFetching, isError } = useGetWeatherByCityQuery(city, {
    skip: !city || activeDay !== 'today',
  });
  
  const [getForecast, { data: forecastData, isFetching: isForecastFetching, error: forecastError }] = 
    useLazyGetForecastByCityQuery();

  // Используем useEffect для обработки побочных эффектов
  useEffect(() => {
    if (isError || forecastError) {
      setLastValidCity(null);
    } else if (currentWeather?.city) {
      setLastValidCity(currentWeather.city);
    }
  }, [isError, forecastError, currentWeather]);

  const handleSubmit = ({ city }: { city: string }) => {
    setCity(city);
    setActiveDay('today');
    setShowForecastButtons(true);
    getForecast(city);
  };

  const handleDayChange = (day: typeof activeDay) => {
    setActiveDay(day);
  };

  const getWeatherData = () => {
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
        city: lastValidCity || city,
        country: currentWeather?.country,
        pressure: dayData?.main.pressure,
        sunset: 'N/A',
      };
    }
    
    return {};
  };

  const weatherState: AppState = {
    ...getWeatherData(),
    error: isError || forecastError ? 'Город не найден' : undefined,
  };

  return (
    <>
      <Form onFormSubmit={handleSubmit} />
      {isFetching || isForecastFetching ? (
        <div className='loading'>Загрузка...</div>
      ) : (
        <>
          {showForecastButtons && city && !(isError || forecastError) && (
            <div style={{ margin: '15px 0', display: 'flex', gap: '10px', marginLeft: '30px' }}>
              <button className='buttonDay' 
                onClick={() => handleDayChange('today')}
                disabled={activeDay === 'today'}
              >
                Сегодня
              </button>
              <button className='buttonDay'
                onClick={() => handleDayChange('tomorrow')}
                disabled={activeDay === 'tomorrow'}
              >
                Завтра
              </button>
              <button className='buttonDay'
                onClick={() => handleDayChange('dayAfterTomorrow')}
                disabled={activeDay === 'dayAfterTomorrow'}
              >
                Послезавтра
              </button>
            </div>
          )}
          <Weather {...weatherState} />
        </>
      )}
    </>
  );
};