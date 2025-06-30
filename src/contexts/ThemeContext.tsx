
import React, { createContext, useContext, useState, useEffect } from 'react';

interface ThemeContextType {
  theme: 'clean' | 'dark';
  setTheme: (theme: 'clean' | 'dark') => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<'clean' | 'dark'>('clean');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'clean' | 'dark' | null;
    if (savedTheme && (savedTheme === 'clean' || savedTheme === 'dark')) {
      setThemeState(savedTheme);
    } else {
      // Default to clean theme
      setThemeState('clean');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('clean');
    } else {
      document.documentElement.classList.add('clean');
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const setTheme = (newTheme: 'clean' | 'dark') => {
    setThemeState(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
