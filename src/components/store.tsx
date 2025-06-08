import { configureStore } from '@reduxjs/toolkit';
import { weatherApi } from './weatherApi';
import themeReducer from './themeSlice';

export const store = configureStore({
  reducer: {
    [weatherApi.reducerPath]: weatherApi.reducer,
    theme: themeReducer, // Добавлен редьюсер темы
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(weatherApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;