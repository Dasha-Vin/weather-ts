import type { FC } from 'react';
import Info from './components/Info';
import WeatherContainer from './components/WeatherContainer';
import ThemeToggle from './components/ThemeToggle';

const App: FC = () => {
  return (
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
  );
};

export default App;