import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ children, roles = [] }) => {
  const userInfo = useSelector(state => state.auth?.userLogin?.userInfo);

  if (!userInfo) {
    return <Navigate to="/login" replace />;
  }

  // If roles array is empty, allow access to any authenticated user
  if (roles.length === 0) {
    return children;
  }

  // Check if user has the required role
  if (!roles.includes(userInfo.role)) {
    // Redirect based on user role
    switch (userInfo.role) {
      case 'admin':
        return <Navigate to="/admin-dashboard" replace />;
      case 'alumni':
        return <Navigate to="/alumni-dashboard" replace />;
      case 'student':
        return <Navigate to="/student-dashboard" replace />;
      default:
        return <Navigate to="/" replace />;
    }
  }

  return children;
};

export default PrivateRoute;