import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { getEvents } from '../redux/features/events/eventActions';

const Event = () => {
  const dispatch = useDispatch();
  const { events } = useSelector((state) => state.events);

  // useEffect(() => {
  //   dispatch(getEvents());
  // }, [dispatch]);

  return (
    <div>
      <h1>Events</h1>
      {events.length > 0 ? (
        <ul>
          {events.map((event) => (
            <li key={event._id}>
              <h2>{event.title}</h2>
              <p>Date: {event.date}</p>
              <p>Location: {event.location}</p>
              {/* Add more event-specific information or actions here */}
            </li>
          ))}
        </ul>
      ) : (
        <p>No events available.</p>
      )}
    </div>
  );
};

export default Event;
