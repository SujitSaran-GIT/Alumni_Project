import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ roles = [] }) => {
  // Correct path to userInfo
  const userInfo = useSelector(state => state.auth?.userLogin?.userInfo);

  if (!userInfo) {
    return <Navigate to="/login" replace />;
  }

  if (roles.length && !roles.includes(userInfo.role)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;