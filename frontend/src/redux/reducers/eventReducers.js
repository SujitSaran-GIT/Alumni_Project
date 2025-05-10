import {
  CREATE_EVENT_REQUEST,
  CREATE_EVENT_SUCCESS,
  CREATE_EVENT_FAIL,
  GET_EVENTS_REQUEST,
  GET_EVENTS_SUCCESS,
  GET_EVENTS_FAIL,
  GET_EVENT_BY_ID_REQUEST,
  GET_EVENT_BY_ID_SUCCESS,
  GET_EVENT_BY_ID_FAIL,
  UPDATE_EVENT_REQUEST,
  UPDATE_EVENT_SUCCESS,
  UPDATE_EVENT_FAIL,
  CANCEL_EVENT_REQUEST,
  CANCEL_EVENT_SUCCESS,
  CANCEL_EVENT_FAIL,
  REGISTER_FOR_EVENT_REQUEST,
  REGISTER_FOR_EVENT_SUCCESS,
  REGISTER_FOR_EVENT_FAIL,
  GET_EVENTS_BY_ORGANIZER_REQUEST,
  GET_EVENTS_BY_ORGANIZER_SUCCESS,
  GET_EVENTS_BY_ORGANIZER_FAIL,
  SEARCH_EVENTS_REQUEST,
  SEARCH_EVENTS_SUCCESS,
  SEARCH_EVENTS_FAIL,
  GET_MY_EVENTS_REQUEST,
  GET_MY_EVENTS_SUCCESS,
  GET_MY_EVENTS_FAIL
} from '../constants/eventConstants';

// Create Event Reducer
export const eventCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_EVENT_REQUEST:
      return { loading: true };
    case CREATE_EVENT_SUCCESS:
      return { loading: false, success: true, event: action.payload };
    case CREATE_EVENT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// Get Events Reducer
export const eventListReducer = (state = { events: [] }, action) => {
  switch (action.type) {
    case GET_EVENTS_REQUEST:
      return { loading: true, events: [] };
    case GET_EVENTS_SUCCESS:
      return { loading: false, events: action.payload };
    case GET_EVENTS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// Get Event by ID Reducer
export const eventDetailsReducer = (state = { event: {} }, action) => {
  switch (action.type) {
    case GET_EVENT_BY_ID_REQUEST:
      return { ...state, loading: true };
    case GET_EVENT_BY_ID_SUCCESS:
      return { loading: false, event: action.payload };
    case GET_EVENT_BY_ID_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// Update Event Reducer
export const eventUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_EVENT_REQUEST:
      return { loading: true };
    case UPDATE_EVENT_SUCCESS:
      return { loading: false, success: true, event: action.payload };
    case UPDATE_EVENT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// Cancel Event Reducer
export const eventCancelReducer = (state = {}, action) => {
  switch (action.type) {
    case CANCEL_EVENT_REQUEST:
      return { loading: true };
    case CANCEL_EVENT_SUCCESS:
      return { loading: false, success: true };
    case CANCEL_EVENT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// Register for Event Reducer
export const eventRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case REGISTER_FOR_EVENT_REQUEST:
      return { loading: true };
    case REGISTER_FOR_EVENT_SUCCESS:
      return { loading: false, success: true, event: action.payload };
    case REGISTER_FOR_EVENT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// Get Events by Organizer Reducer
export const eventsByOrganizerReducer = (state = { events: [] }, action) => {
  switch (action.type) {
    case GET_EVENTS_BY_ORGANIZER_REQUEST:
      return { loading: true, events: [] };
    case GET_EVENTS_BY_ORGANIZER_SUCCESS:
      return { loading: false, events: action.payload };
    case GET_EVENTS_BY_ORGANIZER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// Search Events Reducer
export const eventSearchReducer = (state = { results: [] }, action) => {
  switch (action.type) {
    case SEARCH_EVENTS_REQUEST:
      return { loading: true, results: [] };
    case SEARCH_EVENTS_SUCCESS:
      return { loading: false, results: action.payload };
    case SEARCH_EVENTS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// Get My Events Reducer
export const myEventsReducer = (state = { events: [] }, action) => {
  switch (action.type) {
    case GET_MY_EVENTS_REQUEST:
      return { loading: true, events: [] };
    case GET_MY_EVENTS_SUCCESS:
      return { loading: false, events: action.payload };
    case GET_MY_EVENTS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};