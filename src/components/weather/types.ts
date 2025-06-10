// Типизация пропсов для компонента Weather
export interface WeatherProps {
  city?: string;
  country?: string;
  temp?: number;
  pressure?: number;
  sunset?: string;
  error?: string;
}