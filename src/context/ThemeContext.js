import React, { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

const defaultTheme = {
  navbar: '#0d0d0d',
  background: '#000',
  text: '#fff',
  accent: '#667eea',
  modalBg: '#1a1a1a',
};

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(defaultTheme);

  // Cargar tema al montar el componente
  useEffect(() => {
    const savedTheme = localStorage.getItem('appTheme');
    if (savedTheme) {
      try {
        setTheme(JSON.parse(savedTheme));
      } catch (e) {
        setTheme(defaultTheme);
      }
    }
  }, []);

  // Actualizar CSS variables cuando cambia el tema
  useEffect(() => {
    if (theme) {
      const root = document.documentElement;
      root.style.setProperty('--accent-color', theme.accent);
      root.style.setProperty('--background-color', theme.background);
      root.style.setProperty('--modal-bg-color', theme.modalBg);
      root.style.setProperty('--text-color', theme.text);
      root.style.setProperty('--navbar-color', theme.navbar);
    }
  }, [theme]);

  const updateTheme = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem('appTheme', JSON.stringify(newTheme));
  };

  const resetTheme = () => {
    setTheme(defaultTheme);
    localStorage.setItem('appTheme', JSON.stringify(defaultTheme));
  };

  return (
    <ThemeContext.Provider value={{ theme, updateTheme, resetTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
