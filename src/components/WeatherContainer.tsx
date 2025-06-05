import { useState } from 'react';
import type { FC } from 'react';
import { useGetWeatherByCityQuery } from './weatherApi';
import Form from './Form';
import Weather from './Weather';
import type { AppState } from './types';

const WeatherContainer: FC = () => {
  const [city, setCity] = useState('');
  const { data, error, isFetching } = useGetWeatherByCityQuery(city, {
    skip: !city,
  });

  const handleSubmit = (formData: { city: string }) => {
    setCity(formData.city);
  };

  const state: AppState = {
    temp: data?.temp,
    city: data?.city,
    country: data?.country,
    pressure: data?.pressure,
    sunset: data?.sunset,
    error: error ? 'Город не найден' : undefined,
  };

  return (
    <>
      <Form weatherMethod={handleSubmit} />
      {isFetching ? (
        <div style={{color: 'white', marginLeft: '50px'}}>Загрузка...</div>
      ) : (
        <Weather {...state} />
      )}
    </>
  );
};

export default WeatherContainer;