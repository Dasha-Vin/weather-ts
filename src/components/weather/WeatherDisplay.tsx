// components/WeatherDisplay/WeatherDisplay.tsx
import type { FC } from 'react';
import { Weather } from './Weather';
import type { AppState } from '../../types/types';

interface WeatherDisplayProps {
  city: string;
  isError: boolean;
  forecastError: any;
  activeDay: 'today' | 'tomorrow' | 'dayAfterTomorrow';
  onDayChange: (day: 'today' | 'tomorrow' | 'dayAfterTomorrow') => void;
  weatherState: AppState;
}

export const WeatherDisplay: FC<WeatherDisplayProps> = ({
  city,
  isError,
  forecastError,
  activeDay,
  onDayChange,
  weatherState,
}) => {
  return (
    <>
      {city && !(isError || forecastError) && (
        <div style={{ margin: '15px 0', display: 'flex', gap: '10px', marginLeft: '30px' }}>
          <div>
            <button 
              className="buttonDay"
              onClick={() => onDayChange('today')}
              disabled={activeDay === 'today'}
            >
              Сегодня
            </button>
          </div>
          <div>
            <button
              className="buttonDay"
              onClick={() => onDayChange('tomorrow')}
              disabled={activeDay === 'tomorrow'}
            >
              Завтра
            </button>
          </div>
          <div>
            <button
              className="buttonDay"
              onClick={() => onDayChange('dayAfterTomorrow')}
              disabled={activeDay === 'dayAfterTomorrow'}
            >
              Послезавтра
            </button>
          </div>
        </div>
      )}
      <Weather {...weatherState} />
    </>
  );
};