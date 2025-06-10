import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../store/store';
import { toggleTheme } from './themeSlice';

export const ThemeToggle: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const currentTheme = useSelector((state: RootState) => state.theme);

  return (
    <button 
      className='theme-toggle'
      onClick={() => dispatch(toggleTheme())}
      style={{
        position: 'absolute',
        top: '20px',
        right: '20px',
        zIndex: 1000,
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
        color: 'var(--icon-color)',
        fontSize: '32px'
      }}
      aria-label={currentTheme === 'light' ? 'Переключить на темную тему' : 'Переключить на светлую тему'}
    >
      <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
        {currentTheme === 'light' ? 'dark_mode' : 'light_mode'}
      </span>
    </button>
  );
};