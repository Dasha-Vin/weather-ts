import { store } from '../store/store';
import { setTheme } from '../components/themeToggle/themeSlice';

export const initTheme = () => {
  // Получаем сохраненную тему или используем светлую по умолчанию
  const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' || 'light';

  // Применяем тему к DOM и сохраняем в localStorage
  const applyTheme = (theme: 'light' | 'dark') => {
    document.documentElement.className = `${theme}-theme`;
    localStorage.setItem('theme', theme);
  };

  // Инициализируем тему в Redux store
  store.dispatch(setTheme(savedTheme));
  
  // Применяем тему сразу при инициализации
  applyTheme(savedTheme);

  // Подписываемся на изменения темы
  return store.subscribe(() => {
    const currentTheme = store.getState().theme;
    applyTheme(currentTheme);
  });
};

