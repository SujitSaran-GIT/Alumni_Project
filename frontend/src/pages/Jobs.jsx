import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { getJobs } from '../redux/features/jobs/jobActions';

const Jobs = () => {
  const dispatch = useDispatch();
  const { jobs } = useSelector((state) => state.jobs);

  // useEffect(() => {
  //   dispatch(getJobs());
  // }, [dispatch]);

  return (
    <div>
      <h1>Jobs</h1>
      {jobs.length > 0 ? (
        <ul>
          {jobs.map((job) => (
            <li key={job._id}>
              <h2>{job.title}</h2>
              <p>Company: {job.company}</p>
              <p>Location: {job.location}</p>
              {/* Add more job-specific information or actions here */}
            </li>
          ))}
        </ul>
      ) : (
        <p>No jobs available.</p>
      )}
    </div>
  );
};

export default Jobs;
