import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './components/store';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { setTheme } from './components/themeSlice';

// Проверка сохраненной темы в localStorage
const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' || 'light';
store.dispatch(setTheme(savedTheme));

const root: ReactDOM.Root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

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

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
