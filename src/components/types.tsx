// Типизация состояния приложения
export interface AppState {
  temp?: number;
  city?: string;
  country?: string;
  pressure?: number;
  sunset?: string;
  error?: string;
}

// Типизация пропсов для компонента Form
export interface FormProps {
  weatherMethod: (data: { city: string }) => void;
}

// Типизация пропсов для компонента Weather
export interface WeatherProps {
  city?: string;
  country?: string;
  temp?: number;
  pressure?: number;
  sunset?: string;
  error?: string;
}