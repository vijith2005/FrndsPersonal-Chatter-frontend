import { useQuery } from '@tanstack/react-query';
import { getMe } from '../api/users';
import useAuthStore from '../store/authStore';

export function useAuth() {
  const { user, isAuthenticated, isAdmin, setUser, logout } = useAuthStore();

  const { isLoading, error } = useQuery({
    queryKey: ['me'],
    queryFn: async () => {
      try {
        const userData = await getMe();
        setUser(userData);
        return userData;
      } catch (err) {
        logout();
        throw err;
      }
    },
    enabled: isAuthenticated && !user,
    retry: false,
  });

  return { user, isAuthenticated, isAdmin, isLoading, error, logout, setUser };
}
