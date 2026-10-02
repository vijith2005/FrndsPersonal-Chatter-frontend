import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isAdmin: false,

      setUser: (user) =>
        set({
          user,
          isAuthenticated: !!user,
          isAdmin: user?.role === 'ADMIN',
        }),

      logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('mock_currentUser');
        set({ user: null, isAuthenticated: false, isAdmin: false });
      },
    }),
    {
      name: 'frndschat-auth',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        isAdmin: state.isAdmin,
      }),
    }
  )
);

export default useAuthStore;
