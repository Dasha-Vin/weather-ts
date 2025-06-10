import type { FC } from 'react';
import { Info } from './components/info/Info';
import { WeatherContainer } from './components/weather/WeatherContainer';
import { ThemeToggle } from './components/themeToggle/ThemeToggle';
import { Provider } from 'react-redux';
import { store } from './store/store';

export const App: FC = () => {
  return (
    <Provider store={store}>
    <div className="wrapper">
      <ThemeToggle />
      <div className="main">
        <div className="container">
          <div className="row">
            <div className="col-sm-5 info">
              <Info />
            </div>
            <div className="col-sm-7">
              <WeatherContainer />
            </div>
          </div>
        </div>
      </div>
    </div>
    </Provider>
  );
};