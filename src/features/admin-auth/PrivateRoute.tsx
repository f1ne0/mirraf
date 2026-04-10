import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Center, Spinner } from '@chakra-ui/react';
import { useAdminAuth } from './AuthProvider';

type PrivateRouteProps = {
  children: ReactNode;
};

export function PrivateRoute({ children }: PrivateRouteProps) {
  const location = useLocation();
  const { user, isLoading } = useAdminAuth();

  if (isLoading) {
    return (
      <Center minH="100vh">
        <Spinner size="xl" color="accent.400" />
      </Center>
    );
  }

  if (!user) {
    return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />;
  }

  return <>{children}</>;
}
