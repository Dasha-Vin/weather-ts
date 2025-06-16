import type { FC } from 'react';
import { Form } from '../form/Form';
import { WeatherDisplay } from './WeatherDisplay';
import { useWeatherState } from './weatherUtils';

export const WeatherContainer: FC = () => {
  const {
    city,
    activeDay,
    weatherState,
    handleSubmit,
    handleDayChange,
    isFetching,
    isForecastFetching,
    isError,
    forecastError,
  } = useWeatherState();

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
