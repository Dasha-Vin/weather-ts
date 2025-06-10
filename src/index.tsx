import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {App} from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { initTheme } from './middlewares/theme';

const root: ReactDOM.Root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

initTheme();

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);