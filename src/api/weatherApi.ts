import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_KEY } from './config';
import { baseUrl } from './config';

export const weatherApi = createApi({
  reducerPath: 'weatherApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getWeatherByCity: builder.query({
      query: (city: string) => `weather?q=${city}&appid=${API_KEY}&units=metric`,
      transformResponse: (response: any) => {
        const sunset = new Date(response.sys.sunset * 1000);
        return {
          temp: response.main.temp,
          city: response.name,
          country: response.sys.country,
          pressure: response.main.pressure,
          sunset: `${sunset.getHours()}:${sunset.getMinutes()}:${sunset.getSeconds()}`,
        };
      },
    }),
    getForecastByCity: builder.query({
      query: (city: string) => `forecast?q=${city}&appid=${API_KEY}&units=metric&cnt=40`,
      transformResponse: (response: any) => {
        // Обработка прогноза на 3 дня
        const forecast = {
          today: response.list[0],
          tomorrow: response.list[8], // Примерно через 24 часа
          dayAfterTomorrow: response.list[16] // Примерно через 48 часов
        };
        return forecast;
      },
    }),
  }),
});

export const { 
  useGetWeatherByCityQuery,
  useGetForecastByCityQuery,
  useLazyGetForecastByCityQuery 
} = weatherApi;