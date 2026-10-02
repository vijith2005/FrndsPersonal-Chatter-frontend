import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useThemeStore = create(
  persist(
    (set) => ({
      theme: 'forest-green',

      setTheme: (theme) => set({ theme }),
    }),
    {
      name: 'frndschat-theme',
    }
  )
);

export default useThemeStore;
