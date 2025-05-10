import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { getMentors } from '../redux/features/mentorships/mentorshipActions';

const Mentorship = () => {
  const dispatch = useDispatch();
  const { mentors } = useSelector((state) => state.mentorships);

  // useEffect(() => {
  //   dispatch(getMentors());
  // }, [dispatch]);

  return (
    <div>
      <h1>Mentorship</h1>
      {mentors.length > 0 ? (
        <ul>
          {mentors.map((mentor) => (
            <li key={mentor._id}>
              <h2>{mentor.name}</h2>
              <p>Email: {mentor.email}</p>
              {/* Add more mentor-specific information or actions here */}
            </li>
          ))}
        </ul>
      ) : (
        <p>No mentors available.</p>
      )}
    </div>
  );
};

export default Mentorship;
