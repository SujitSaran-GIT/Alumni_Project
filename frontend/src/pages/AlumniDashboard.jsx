import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { getUserProfile } from '../redux/features/users/userActions';

const AlumniDashboard = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.users);

  // useEffect(() => {
  //   dispatch(getUserProfile());
  // }, [dispatch]);

  return (
    <div>
      <h1>Alumni Dashboard</h1>
      {currentUser ? (
        <div>
          <h2>Welcome, {currentUser.name}!</h2>
          <p>Email: {currentUser.email}</p>
          {/* Add alumni-specific information or actions here */}
        </div>
      ) : (
        <p>Loading user profile...</p>
      )}
    </div>
  );
};

export default AlumniDashboard;
