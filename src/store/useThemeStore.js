import { create } from 'zustand';

const getInitialTheme = () => {
  const saved = localStorage.getItem('aurastore_theme');
  if (saved) return saved;
  return 'dark'; // Dark-first default
};

export const useThemeStore = create((set) => ({
  theme: getInitialTheme(),

  setTheme: (theme) => {
    localStorage.setItem('aurastore_theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    set({ theme });
  },

  toggleTheme: () => {
    set((state) => {
      const next = state.theme === 'dark' ? 'light' : 'dark';
      localStorage.setItem('aurastore_theme', next);
      if (next === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      return { theme: next };
    });
  }
}));
