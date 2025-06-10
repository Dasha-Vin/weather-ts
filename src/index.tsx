import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {App} from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { initTheme } from './middlewares/theme';

const root: ReactDOM.Root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

<<<<<<< HEAD
initTheme();
=======
// Функция для применения темы к документу
const applyTheme = (theme: 'light' | 'dark') => {
  document.documentElement.className = theme + '-theme';
  localStorage.setItem('theme', theme);
};

store.subscribe(() => {
  const state = store.getState();
  applyTheme(state.theme);
});

applyTheme(savedTheme);
>>>>>>> 6b4ab780043976b24d8d15dfb547cf127099e850

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
