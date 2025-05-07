const EventBadge = ({ type, className = '' }) => {
    const typeStyles = {
      reunion: 'bg-purple-100 text-purple-800',
      workshop: 'bg-blue-100 text-blue-800',
      conference: 'bg-green-100 text-green-800',
      social: 'bg-yellow-100 text-yellow-800'
    };
  
    return (
      <span className={`text-xs px-2 py-1 rounded-full ${typeStyles[type] || 'bg-gray-100 text-gray-800'} ${className}`}>
        {type.charAt(0).toUpperCase() + type.slice(1)}
      </span>
    );
  };
  
  export default EventBadge;