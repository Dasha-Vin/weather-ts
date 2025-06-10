import type { FC } from 'react';
import type { WeatherProps } from './types';

export const Weather: FC<WeatherProps> = ({
    city: cityName,
    country,
    temp,
    pressure,
    sunset,
    error
}) => {
    return (
        <div className='infoWeath'>
            {cityName && temp && (
            <div>
                <p>Местоположение: {cityName}, {country}</p>
                <p>Температура: {temp} °C</p>
                <p>Давление: {pressure} hPa</p>
                {sunset && sunset !== 'N/A' && <p>Заход солнца: {sunset}</p>}
            </div>
            )}
            <p className='error' style={{color: 'var(--error-color)'}}>{error}</p>
        </div>
    )
}