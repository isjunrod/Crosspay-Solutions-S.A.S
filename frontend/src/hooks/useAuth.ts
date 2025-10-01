import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { logout } from '../store/authActions';
import { RootState } from '../store/index';

export const useAuth = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user, isAuthenticated, loading, error } = useSelector(
    (state: RootState) => state.auth
  );

  const handleLogout = () => {
    dispatch(logout() as any);
    router.push('/');
  };

  return {
    user,
    isAuthenticated,
    loading,
    error,
    handleLogout,
  };
};
