import { useState } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay } from 'date-fns';
import { motion } from 'framer-motion';

const EventCalendar = ({ events }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const eventsByDate = events?.reduce((acc, event) => {
    const date = format(new Date(event.date), 'yyyy-MM-dd');
    if (!acc[date]) acc[date] = [];
    acc[date].push(event);
    return acc;
  }, {});

  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() - 1,
      1
    ));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() + 1,
      1
    ));
  };

  return (
    <motion.div 
      className="bg-white rounded-lg shadow-md p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      {/* Calendar Header */}
      <div className="flex justify-between items-center mb-4">
        <motion.button
          onClick={handlePrevMonth}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="p-2 rounded-full hover:bg-gray-100"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </motion.button>
        
        <h3 className="text-lg font-semibold">
          {format(currentMonth, 'MMMM yyyy')}
        </h3>
        
        <motion.button
          onClick={handleNextMonth}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="p-2 rounded-full hover:bg-gray-100"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </motion.button>
      </div>

      {/* Weekday Headers */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekdays.map((day) => (
          <div key={day} className="text-center text-xs font-medium text-gray-500">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {monthDays.map((day, i) => {
          const dayFormatted = format(day, 'yyyy-MM-dd');
          const dayEvents = eventsByDate?.[dayFormatted] || [];
          
          return (
            <motion.div
              key={day.toString()}
              className={`p-2 h-12 rounded-md text-sm ${
                isSameMonth(day, currentMonth) 
                  ? 'bg-white hover:bg-blue-50 cursor-pointer' 
                  : 'bg-gray-50 text-gray-400'
              } ${
                isSameDay(day, new Date()) 
                  ? 'border-2 border-blue-500' 
                  : ''
              }`}
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.01 }}
            >
              <div className="flex flex-col h-full">
                <span className="text-right">{format(day, 'd')}</span>
                {dayEvents.length > 0 && (
                  <div className="flex justify-center mt-1">
                    <motion.div 
                      className="w-2 h-2 rounded-full bg-blue-500"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                    />
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Events Legend */}
      {events?.length > 0 && (
        <motion.div 
          className="mt-6 pt-4 border-t border-gray-200"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h4 className="text-sm font-medium mb-2">Upcoming Events</h4>
          <div className="space-y-2">
            {events.slice(0, 3).map((event) => (
              <motion.div 
                key={event._id}
                className="flex items-start"
                whileHover={{ x: 5 }}
              >
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5 mr-2 flex-shrink-0"></div>
                <div>
                  <p className="text-sm font-medium">{event.title}</p>
                  <p className="text-xs text-gray-500">
                    {format(new Date(event.date), 'MMM d, h:mm a')}
                  </p>
                </div>
              </motion.div>
            ))}
            {events.length > 3 && (
              <p className="text-xs text-blue-600 mt-2">
                +{events.length - 3} more events
              </p>
            )}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default EventCalendar;