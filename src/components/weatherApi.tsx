import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_KEY = "f486adea06e0b68aaa90c5e0c20a2749";

export const weatherApi = createApi({
  reducerPath: 'weatherApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.openweathermap.org/data/2.5/' }),
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
  }),
});

export const { useGetWeatherByCityQuery } = weatherApi;