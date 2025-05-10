import {
  GET_NOTIFICATIONS_REQUEST,
  GET_NOTIFICATIONS_SUCCESS,
  GET_NOTIFICATIONS_FAIL,
  MARK_NOTIFICATION_AS_READ_REQUEST,
  MARK_NOTIFICATION_AS_READ_SUCCESS,
  MARK_NOTIFICATION_AS_READ_FAIL,
  MARK_ALL_NOTIFICATIONS_AS_READ_REQUEST,
  MARK_ALL_NOTIFICATIONS_AS_READ_SUCCESS,
  MARK_ALL_NOTIFICATIONS_AS_READ_FAIL,
  GET_UNREAD_NOTIFICATIONS_COUNT_REQUEST,
  GET_UNREAD_NOTIFICATIONS_COUNT_SUCCESS,
  GET_UNREAD_NOTIFICATIONS_COUNT_FAIL,
  DELETE_NOTIFICATION_REQUEST,
  DELETE_NOTIFICATION_SUCCESS,
  DELETE_NOTIFICATION_FAIL,
  GET_NOTIFICATIONS_BY_TYPE_REQUEST,
  GET_NOTIFICATIONS_BY_TYPE_SUCCESS,
  GET_NOTIFICATIONS_BY_TYPE_FAIL,
  NEW_NOTIFICATION_RECEIVED
} from '../constants/notificationConstants';

// Get Notifications Reducer
export const notificationsListReducer = (state = { notifications: [], pagination: {} }, action) => {
  switch (action.type) {
    case GET_NOTIFICATIONS_REQUEST:
      return { ...state, loading: true };
    case GET_NOTIFICATIONS_SUCCESS:
      return { 
        loading: false, 
        notifications: action.payload.notifications,
        pagination: action.payload.pagination
      };
    case GET_NOTIFICATIONS_FAIL:
      return { ...state, loading: false, error: action.payload };
    case NEW_NOTIFICATION_RECEIVED:
      return {
        ...state,
        notifications: [action.payload, ...state.notifications]
      };
    case MARK_NOTIFICATION_AS_READ_SUCCESS:
      return {
        ...state,
        notifications: state.notifications.map(notification => 
          notification._id === action.payload._id 
            ? { ...notification, isRead: true } 
            : notification
        )
      };
    case MARK_ALL_NOTIFICATIONS_AS_READ_SUCCESS:
      return {
        ...state,
        notifications: state.notifications.map(notification => 
          ({ ...notification, isRead: true })
        )
      };
    case DELETE_NOTIFICATION_SUCCESS:
      return {
        ...state,
        notifications: state.notifications.filter(
          notification => notification._id !== action.payload
        )
      };
    default:
      return state;
  }
};

// Get Notifications by Type Reducer
export const notificationsByTypeReducer = (state = { notifications: [] }, action) => {
  switch (action.type) {
    case GET_NOTIFICATIONS_BY_TYPE_REQUEST:
      return { loading: true, notifications: [] };
    case GET_NOTIFICATIONS_BY_TYPE_SUCCESS:
      return { loading: false, notifications: action.payload };
    case GET_NOTIFICATIONS_BY_TYPE_FAIL:
      return { loading: false, error: action.payload };
    case NEW_NOTIFICATION_RECEIVED:
      if (action.payload.type === state.type) {
        return {
          ...state,
          notifications: [action.payload, ...state.notifications]
        };
      }
      return state;
    default:
      return state;
  }
};

// Unread Notifications Count Reducer
export const unreadNotificationsCountReducer = (state = { count: 0 }, action) => {
  switch (action.type) {
    case GET_UNREAD_NOTIFICATIONS_COUNT_REQUEST:
      return { ...state, loading: true };
    case GET_UNREAD_NOTIFICATIONS_COUNT_SUCCESS:
      return { loading: false, count: action.payload };
    case GET_UNREAD_NOTIFICATIONS_COUNT_FAIL:
      return { ...state, loading: false, error: action.payload };
    case NEW_NOTIFICATION_RECEIVED:
      return { ...state, count: state.count + 1 };
    case MARK_NOTIFICATION_AS_READ_SUCCESS:
      return state.count > 0 
        ? { ...state, count: state.count - 1 } 
        : state;
    case MARK_ALL_NOTIFICATIONS_AS_READ_SUCCESS:
      return { ...state, count: 0 };
    default:
      return state;
  }
};

// Mark Notification as Read Reducer
export const notificationMarkAsReadReducer = (state = {}, action) => {
  switch (action.type) {
    case MARK_NOTIFICATION_AS_READ_REQUEST:
      return { loading: true };
    case MARK_NOTIFICATION_AS_READ_SUCCESS:
      return { loading: false, success: true, notification: action.payload };
    case MARK_NOTIFICATION_AS_READ_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// Delete Notification Reducer
export const notificationDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_NOTIFICATION_REQUEST:
      return { loading: true };
    case DELETE_NOTIFICATION_SUCCESS:
      return { loading: false, success: true, id: action.payload };
    case DELETE_NOTIFICATION_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};