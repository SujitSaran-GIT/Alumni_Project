import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { selectCurrentToken } from '../../redux/features/auth/authSlice';


const RestrictedRoute = () => {
  const token = useSelector(selectCurrentToken);

  return token ? <Navigate to="/dashboard" replace /> : <Outlet />;
};

export default RestrictedRoute;