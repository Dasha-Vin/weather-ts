import type { FC } from 'react';
import Info from './components/Info';
import WeatherContainer from './components/WeatherContainer';

const App: FC = () => {
  return (
    <div className="wrapper">
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