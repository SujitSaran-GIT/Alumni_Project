import API_BASE_URL from '../../utils/api.js';
import axios from 'axios';
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

const API = API_BASE_URL;

// Create Event
export const createEvent = (eventData) => async (dispatch, getState) => {
  try {
    dispatch({ type: CREATE_EVENT_REQUEST });

    const {
      auth: { userLogin: { userInfo } }
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await axios.post(`${API}/events`, eventData, config);

    dispatch({
      type: CREATE_EVENT_SUCCESS,
      payload: data
    });

  } catch (error) {
    dispatch({
      type: CREATE_EVENT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

// Get Events
export const getEvents = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_EVENTS_REQUEST });

    const {
      auth: { userLogin: { userInfo } }
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await axios.get(`${API}/events`, config);

    dispatch({
      type: GET_EVENTS_SUCCESS,
      payload: data
    });

  } catch (error) {
    dispatch({
      type: GET_EVENTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

// Get Event by ID
export const getEventById = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_EVENT_BY_ID_REQUEST });

    const {
      auth: { userLogin: { userInfo } }
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await axios.get(`${API}/events/${id}`, config);

    dispatch({
      type: GET_EVENT_BY_ID_SUCCESS,
      payload: data
    });

  } catch (error) {
    dispatch({
      type: GET_EVENT_BY_ID_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

// Update Event
export const updateEvent = (id, eventData) => async (dispatch, getState) => {
  try {
    dispatch({ type: UPDATE_EVENT_REQUEST });

    const {
      auth: { userLogin: { userInfo } }
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await axios.put(`${API}/events/${id}`, eventData, config);

    dispatch({
      type: UPDATE_EVENT_SUCCESS,
      payload: data
    });

  } catch (error) {
    dispatch({
      type: UPDATE_EVENT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

// Cancel Event
export const cancelEvent = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: CANCEL_EVENT_REQUEST });

    const {
      auth: { userLogin: { userInfo } }
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    await axios.delete(`${API}/events/${id}`, config);

    dispatch({ type: CANCEL_EVENT_SUCCESS });

  } catch (error) {
    dispatch({
      type: CANCEL_EVENT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

// Register for Event
export const registerForEvent = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: REGISTER_FOR_EVENT_REQUEST });

    const {
      auth: { userLogin: { userInfo } }
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await axios.post(`${API}/events/${id}/register`, {}, config);

    dispatch({
      type: REGISTER_FOR_EVENT_SUCCESS,
      payload: data
    });

  } catch (error) {
    dispatch({
      type: REGISTER_FOR_EVENT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

// Get Events by Organizer
export const getEventsByOrganizer = (organizerId) => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_EVENTS_BY_ORGANIZER_REQUEST });

    const {
      auth: { userLogin: { userInfo } }
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await axios.get(`${API}/events/organizer/${organizerId}`, config);

    dispatch({
      type: GET_EVENTS_BY_ORGANIZER_SUCCESS,
      payload: data
    });

  } catch (error) {
    dispatch({
      type: GET_EVENTS_BY_ORGANIZER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

// Search Events
export const searchEvents = (query, location, fromDate, toDate) => async (dispatch, getState) => {
  try {
    dispatch({ type: SEARCH_EVENTS_REQUEST });

    const {
      auth: { userLogin: { userInfo } }
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    let url = `${API}/events/search?`;
    if (query) url += `q=${query}&`;
    if (location) url += `location=${location}&`;
    if (fromDate) url += `fromDate=${fromDate}&`;
    if (toDate) url += `toDate=${toDate}`;

    const { data } = await axios.get(url, config);

    dispatch({
      type: SEARCH_EVENTS_SUCCESS,
      payload: data
    });

  } catch (error) {
    dispatch({
      type: SEARCH_EVENTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

// Get My Events (Events user registered for)
export const getMyEvents = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_MY_EVENTS_REQUEST });

    const {
      auth: { userLogin: { userInfo } }
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await axios.get(`${API}/events/my-events`, config);

    dispatch({
      type: GET_MY_EVENTS_SUCCESS,
      payload: data
    });

  } catch (error) {
    dispatch({
      type: GET_MY_EVENTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};