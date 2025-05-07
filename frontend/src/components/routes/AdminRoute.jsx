import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

import LoadingSpinner from '../ui/LoadingSpinner';
import { useState, useEffect } from 'react';
import { selectCurrentUser } from '../../redux/features/auth/authSlice';

const AdminRoute = () => {
  const user = useSelector(selectCurrentUser);
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate user verification delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return user?.role === 'admin' ? (
    <Outlet />
  ) : (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  );
};

export default AdminRoute;