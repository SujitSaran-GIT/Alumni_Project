import API_BASE_URL from '../../utils/api';
import axios from 'axios';
import {
  CREATE_PROFILE_REQUEST,
  CREATE_PROFILE_SUCCESS,
  CREATE_PROFILE_FAIL,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
  GET_PROFILE_BY_ID_REQUEST,
  GET_PROFILE_BY_ID_SUCCESS,
  GET_PROFILE_BY_ID_FAIL,
  GET_ALL_PROFILES_REQUEST,
  GET_ALL_PROFILES_SUCCESS,
  GET_ALL_PROFILES_FAIL,
  GET_ALL_MENTORS_REQUEST,
  GET_ALL_MENTORS_SUCCESS,
  GET_ALL_MENTORS_FAIL,
  TOGGLE_MENTOR_STATUS_REQUEST,
  TOGGLE_MENTOR_STATUS_SUCCESS,
  TOGGLE_MENTOR_STATUS_FAIL,
  DELETE_PROFILE_REQUEST,
  DELETE_PROFILE_SUCCESS,
  DELETE_PROFILE_FAIL,
  SEARCH_PROFILES_REQUEST,
  SEARCH_PROFILES_SUCCESS,
  SEARCH_PROFILES_FAIL
} from '../constants/profileConstants';

const API = API_BASE_URL

// Create Profile
export const createProfile = (profileData) => async (dispatch, getState) => {
  try {
    dispatch({ type: CREATE_PROFILE_REQUEST });

    const {
      auth: { userLogin: { userInfo } }
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await axios.post(`${API}/profiles`, profileData, config);

    dispatch({
      type: CREATE_PROFILE_SUCCESS,
      payload: data
    });

  } catch (error) {
    dispatch({
      type: CREATE_PROFILE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

// Update Profile
export const updateProfile = (profileData) => async (dispatch, getState) => {
  try {
    dispatch({ type: UPDATE_PROFILE_REQUEST });

    const {
      auth: { userLogin: { userInfo } }
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await axios.put(`${API}/profiles`, profileData, config);

    dispatch({
      type: UPDATE_PROFILE_SUCCESS,
      payload: data
    });

  } catch (error) {
    dispatch({
      type: UPDATE_PROFILE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

// Get Profile by ID
export const getProfileById = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_PROFILE_BY_ID_REQUEST });

    const {
      auth: { userLogin: { userInfo } }
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await axios.get(`${API}/profiles/${id}`, config);

    dispatch({
      type: GET_PROFILE_BY_ID_SUCCESS,
      payload: data
    });

  } catch (error) {
    dispatch({
      type: GET_PROFILE_BY_ID_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

// Get All Profiles (Admin only)
export const getAllProfiles = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_ALL_PROFILES_REQUEST });

    const {
      auth: { userLogin: { userInfo } }
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await axios.get(`${API}/profiles`, config);

    dispatch({
      type: GET_ALL_PROFILES_SUCCESS,
      payload: data
    });

  } catch (error) {
    dispatch({
      type: GET_ALL_PROFILES_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

// Get All Mentors
export const getAllMentors = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_ALL_MENTORS_REQUEST });

    const {
      auth: { userLogin: { userInfo } }
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await axios.get(`${API}/profiles/mentors`, config);

    dispatch({
      type: GET_ALL_MENTORS_SUCCESS,
      payload: data
    });

  } catch (error) {
    dispatch({
      type: GET_ALL_MENTORS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

// Toggle Mentor Status
export const toggleMentorStatus = () => async (dispatch, getState) => {
  try {
    dispatch({ type: TOGGLE_MENTOR_STATUS_REQUEST });

    const {
      auth: { userLogin: { userInfo } }
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await axios.put(`${API}/profiles/toggle-mentor`, {}, config);

    dispatch({
      type: TOGGLE_MENTOR_STATUS_SUCCESS,
      payload: data
    });

  } catch (error) {
    dispatch({
      type: TOGGLE_MENTOR_STATUS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

// Delete Profile
export const deleteProfile = () => async (dispatch, getState) => {
  try {
    dispatch({ type: DELETE_PROFILE_REQUEST });

    const {
      auth: { userLogin: { userInfo } }
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    await axios.delete(`${API}/profiles/${id}`, config);

    dispatch({ type: DELETE_PROFILE_SUCCESS });

  } catch (error) {
    dispatch({
      type: DELETE_PROFILE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

// Search Profiles
export const searchProfiles = (query) => async (dispatch, getState) => {
  try {
    dispatch({ type: SEARCH_PROFILES_REQUEST });

    const {
      auth: { userLogin: { userInfo } }
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await axios.get(`${API}/profiles/search?q=${query}`, config);

    dispatch({
      type: SEARCH_PROFILES_SUCCESS,
      payload: data
    });

  } catch (error) {
    dispatch({
      type: SEARCH_PROFILES_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};