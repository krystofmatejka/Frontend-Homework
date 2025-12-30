'use client';

import { useState, useEffect } from 'react';

export function ThemeSwitch() {
  const [currentTheme, setCurrentTheme] = useState<string>('light');

  useEffect(() => {
    // Get current theme from cookie
    const theme = document.cookie
      .split('; ')
      .find(row => row.startsWith('preferred-theme='))
      ?.split('=')[1] || 'light';
    setCurrentTheme(theme);
  }, []);

  const toggleTheme = () => {
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    // Set cookie
    document.cookie = `preferred-theme=${newTheme}; path=/; max-age=${60 * 60 * 24 * 365}`;
    // Reload page to apply theme
    window.location.reload();
  };

  return (
    <button
      onClick={toggleTheme}
      className="theme-switch-button"
      aria-label={`Switch to ${currentTheme === 'light' ? 'dark' : 'light'} theme`}
      title={`Switch to ${currentTheme === 'light' ? 'dark' : 'light'} theme`}
    >
      {currentTheme === 'light' ? '🌙' : '☀️'}
    </button>
  );
}
