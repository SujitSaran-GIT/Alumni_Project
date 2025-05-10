import API_BASE_URL from '../../utils/api.js';
import axios from 'axios';
import {
  REQUEST_MENTORSHIP_REQUEST,
  REQUEST_MENTORSHIP_SUCCESS,
  REQUEST_MENTORSHIP_FAIL,
  GET_MENTORS_REQUEST,
  GET_MENTORS_SUCCESS,
  GET_MENTORS_FAIL,
  GET_MENTORSHIP_REQUESTS_REQUEST,
  GET_MENTORSHIP_REQUESTS_SUCCESS,
  GET_MENTORSHIP_REQUESTS_FAIL,
  ACCEPT_MENTORSHIP_REQUEST,
  ACCEPT_MENTORSHIP_SUCCESS,
  ACCEPT_MENTORSHIP_FAIL,
  REJECT_MENTORSHIP_REQUEST,
  REJECT_MENTORSHIP_SUCCESS,
  REJECT_MENTORSHIP_FAIL,
  RESPOND_TO_REQUEST_REQUEST,
  RESPOND_TO_REQUEST_SUCCESS,
  RESPOND_TO_REQUEST_FAIL,
  GET_ACTIVE_MENTORSHIPS_REQUEST,
  GET_ACTIVE_MENTORSHIPS_SUCCESS,
  GET_ACTIVE_MENTORSHIPS_FAIL,
  COMPLETE_MENTORSHIP_REQUEST,
  COMPLETE_MENTORSHIP_SUCCESS,
  COMPLETE_MENTORSHIP_FAIL,
  ADD_MEETING_REQUEST,
  ADD_MEETING_SUCCESS,
  ADD_MEETING_FAIL,
  GET_MENTORSHIP_DETAILS_REQUEST,
  GET_MENTORSHIP_DETAILS_SUCCESS,
  GET_MENTORSHIP_DETAILS_FAIL,
  GET_USER_MENTORSHIPS_REQUEST,
  GET_USER_MENTORSHIPS_SUCCESS,
  GET_USER_MENTORSHIPS_FAIL,
  GET_ALL_MENTORSHIPS_REQUEST,
  GET_ALL_MENTORSHIPS_SUCCESS,
  GET_ALL_MENTORSHIPS_FAIL,
  GET_MENTORSHIP_STATS_REQUEST,
  GET_MENTORSHIP_STATS_SUCCESS,
  GET_MENTORSHIP_STATS_FAIL,
  CANCEL_MENTORSHIP_REQUEST,
  CANCEL_MENTORSHIP_SUCCESS,
  CANCEL_MENTORSHIP_FAIL,
  SEARCH_MENTORS_REQUEST,
  SEARCH_MENTORS_SUCCESS,
  SEARCH_MENTORS_FAIL
} from '../constants/mentorshipConstants';

const API = API_BASE_URL;

// Request Mentorship
export const requestMentorship = (mentorId, requestData) => async (dispatch, getState) => {
  try {
    dispatch({ type: REQUEST_MENTORSHIP_REQUEST });

    const {
      auth: { userLogin: { userInfo } }
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await axios.post(
      `${API}/mentorship/request`,
      { mentorId, ...requestData },
      config
    );

    dispatch({
      type: REQUEST_MENTORSHIP_SUCCESS,
      payload: data
    });

  } catch (error) {
    dispatch({
      type: REQUEST_MENTORSHIP_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

// Get Mentors
export const getMentors = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_MENTORS_REQUEST });

    const {
      auth: { userLogin: { userInfo } }
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await axios.get(`${API}/mentorship`, config);

    dispatch({
      type: GET_MENTORS_SUCCESS,
      payload: data
    });

  } catch (error) {
    dispatch({
      type: GET_MENTORS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

// Get Mentorship Requests
export const getMentorshipRequests = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_MENTORSHIP_REQUESTS_REQUEST });

    const {
      auth: { userLogin: { userInfo } }
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await axios.get(`${API}/mentorship/requests`, config);

    dispatch({
      type: GET_MENTORSHIP_REQUESTS_SUCCESS,
      payload: data
    });

  } catch (error) {
    dispatch({
      type: GET_MENTORSHIP_REQUESTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

// Accept Mentorship Request
export const acceptMentorship = (requestId) => async (dispatch, getState) => {
  try {
    dispatch({ type: ACCEPT_MENTORSHIP_REQUEST });

    const {
      auth: { userLogin: { userInfo } }
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await axios.put(
      `${API}/mentorship/${requestId}/accept`,
      {},
      config
    );

    dispatch({
      type: ACCEPT_MENTORSHIP_SUCCESS,
      payload: data
    });

  } catch (error) {
    dispatch({
      type: ACCEPT_MENTORSHIP_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

// Reject Mentorship Request
export const rejectMentorship = (requestId) => async (dispatch, getState) => {
  try {
    dispatch({ type: REJECT_MENTORSHIP_REQUEST });

    const {
      auth: { userLogin: { userInfo } }
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await axios.put(
      `${API}/mentorship/${requestId}/reject`,
      {},
      config
    );

    dispatch({
      type: REJECT_MENTORSHIP_SUCCESS,
      payload: data
    });

  } catch (error) {
    dispatch({
      type: REJECT_MENTORSHIP_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

// Respond to Request (Alumni)
export const respondToRequest = (requestId, response) => async (dispatch, getState) => {
  try {
    dispatch({ type: RESPOND_TO_REQUEST_REQUEST });

    const {
      auth: { userLogin: { userInfo } }
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await axios.put(
      `${API}/mentorship/${requestId}/respond`,
      { response },
      config
    );

    dispatch({
      type: RESPOND_TO_REQUEST_SUCCESS,
      payload: data
    });

  } catch (error) {
    dispatch({
      type: RESPOND_TO_REQUEST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

// Get Active Mentorships
export const getActiveMentorships = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_ACTIVE_MENTORSHIPS_REQUEST });

    const {
      auth: { userLogin: { userInfo } }
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await axios.get(`${API}/mentorship/active`, config);

    dispatch({
      type: GET_ACTIVE_MENTORSHIPS_SUCCESS,
      payload: data
    });

  } catch (error) {
    dispatch({
      type: GET_ACTIVE_MENTORSHIPS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

// Complete Mentorship
export const completeMentorship = (mentorshipId) => async (dispatch, getState) => {
  try {
    dispatch({ type: COMPLETE_MENTORSHIP_REQUEST });

    const {
      auth: { userLogin: { userInfo } }
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await axios.put(
      `${API}/mentorship/${mentorshipId}/complete`,
      {},
      config
    );

    dispatch({
      type: COMPLETE_MENTORSHIP_SUCCESS,
      payload: data
    });

  } catch (error) {
    dispatch({
      type: COMPLETE_MENTORSHIP_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

// Add Meeting
export const addMeeting = (mentorshipId, meetingData) => async (dispatch, getState) => {
  try {
    dispatch({ type: ADD_MEETING_REQUEST });

    const {
      auth: { userLogin: { userInfo } }
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await axios.post(
      `${API}/mentorship/${mentorshipId}/meetings`,
      meetingData,
      config
    );

    dispatch({
      type: ADD_MEETING_SUCCESS,
      payload: data
    });

  } catch (error) {
    dispatch({
      type: ADD_MEETING_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

// Get Mentorship Details
export const getMentorshipDetails = (mentorshipId) => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_MENTORSHIP_DETAILS_REQUEST });

    const {
      auth: { userLogin: { userInfo } }
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await axios.get(`${API}/mentorship/${mentorshipId}`, config);

    dispatch({
      type: GET_MENTORSHIP_DETAILS_SUCCESS,
      payload: data
    });

  } catch (error) {
    dispatch({
      type: GET_MENTORSHIP_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

// Get User Mentorships
export const getUserMentorships = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_USER_MENTORSHIPS_REQUEST });

    const {
      auth: { userLogin: { userInfo } }
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await axios.get(`${API}/mentorship/my-mentorships`, config);

    dispatch({
      type: GET_USER_MENTORSHIPS_SUCCESS,
      payload: data
    });

  } catch (error) {
    dispatch({
      type: GET_USER_MENTORSHIPS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

// Get All Mentorships (Admin)
export const getAllMentorships = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_ALL_MENTORSHIPS_REQUEST });

    const {
      auth: { userLogin: { userInfo } }
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await axios.get(`${API}/mentorship/admin/all`, config);

    dispatch({
      type: GET_ALL_MENTORSHIPS_SUCCESS,
      payload: data
    });

  } catch (error) {
    dispatch({
      type: GET_ALL_MENTORSHIPS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

// Get Mentorship Stats (Admin)
export const getMentorshipStats = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_MENTORSHIP_STATS_REQUEST });

    const {
      auth: { userLogin: { userInfo } }
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await axios.get(`${API}/mentorship/admin/stats`, config);

    dispatch({
      type: GET_MENTORSHIP_STATS_SUCCESS,
      payload: data
    });

  } catch (error) {
    dispatch({
      type: GET_MENTORSHIP_STATS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

// Cancel Mentorship (Admin)
export const cancelMentorship = (mentorshipId) => async (dispatch, getState) => {
  try {
    dispatch({ type: CANCEL_MENTORSHIP_REQUEST });

    const {
      auth: { userLogin: { userInfo } }
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await axios.put(
      `${API}/mentorship/admin/${mentorshipId}/cancel`,
      {},
      config
    );

    dispatch({
      type: CANCEL_MENTORSHIP_SUCCESS,
      payload: data
    });

  } catch (error) {
    dispatch({
      type: CANCEL_MENTORSHIP_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

// Search Mentors
export const searchMentors = (query) => async (dispatch, getState) => {
  try {
    dispatch({ type: SEARCH_MENTORS_REQUEST });

    const {
      auth: { userLogin: { userInfo } }
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await axios.get(`${API}/mentorship/search?q=${query}`, config);

    dispatch({
      type: SEARCH_MENTORS_SUCCESS,
      payload: data
    });

  } catch (error) {
    dispatch({
      type: SEARCH_MENTORS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};