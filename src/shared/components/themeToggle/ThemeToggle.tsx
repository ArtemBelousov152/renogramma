import { useTheme } from 'shared/theme/ThemeProvider';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme}>{theme === 'light' ? '🌙' : '☀️'}</button>
  );
};
