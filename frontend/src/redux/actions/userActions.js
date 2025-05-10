import axios from 'axios';
import {
  GET_USERS_REQUEST, 
  GET_USERS_SUCCESS, 
  GET_USERS_FAIL,

  GET_USER_PROFILE_REQUEST, 
  GET_USER_PROFILE_SUCCESS, 
  GET_USER_PROFILE_FAIL,

  UPDATE_USER_PROFILE_REQUEST, 
  UPDATE_USER_PROFILE_SUCCESS, 
  UPDATE_USER_PROFILE_FAIL,

  DELETE_USER_REQUEST, 
  DELETE_USER_SUCCESS, 
  DELETE_USER_FAIL,

  UPDATE_USER_ROLE_REQUEST, 
  UPDATE_USER_ROLE_SUCCESS, 
  UPDATE_USER_ROLE_FAIL,

  SEARCH_USERS_REQUEST, 
  SEARCH_USERS_SUCCESS, 
  SEARCH_USERS_FAIL,

  GET_USER_STATS_REQUEST, 
  GET_USER_STATS_SUCCESS, 
  GET_USER_STATS_FAIL,

  BULK_UPDATE_USERS_REQUEST, 
  BULK_UPDATE_USERS_SUCCESS, 
  BULK_UPDATE_USERS_FAIL,

  VERIFY_USER_REQUEST, 
  VERIFY_USER_SUCCESS, 
  VERIFY_USER_FAIL,

  REQUEST_PASSWORD_RESET_REQUEST, 
  REQUEST_PASSWORD_RESET_SUCCESS, 
  REQUEST_PASSWORD_RESET_FAIL,

  UPDATE_LAST_ACTIVE_REQUEST, 
  UPDATE_LAST_ACTIVE_SUCCESS, 
  UPDATE_LAST_ACTIVE_FAIL,

  EXPORT_USERS_REQUEST, 
  EXPORT_USERS_SUCCESS, 
  EXPORT_USERS_FAIL,

  CREATE_USER_PROFILE_REQUEST, 
  CREATE_USER_PROFILE_SUCCESS, 
  CREATE_USER_PROFILE_FAIL,

  GET_USER_BY_ID_REQUEST, 
  GET_USER_BY_ID_SUCCESS, 
  GET_USER_BY_ID_FAIL,

  GET_USER_BY_ID_ADMIN_REQUEST, 
  GET_USER_BY_ID_ADMIN_SUCCESS, 
  GET_USER_BY_ID_ADMIN_FAIL
} from '../constants/userConstants';
import API_BASE_URL from '../../utils/api.js';

const API = API_BASE_URL;

// Get all users (admin only)
export const getUsers = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_USERS_REQUEST });

    const { userLogin: { userInfo } } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`${API}/users`, config);

    dispatch({
      type: GET_USERS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_USERS_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};

// Get user profile
export const getUserProfile = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_USER_PROFILE_REQUEST });

    const { userLogin: { userInfo } } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`${API}/users/profile`, config);

    dispatch({
      type: GET_USER_PROFILE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_USER_PROFILE_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};

// Update user profile
export const updateUserProfile = (userData) => async (dispatch, getState) => {
  try {
    dispatch({ type: UPDATE_USER_PROFILE_REQUEST });

    const { userLogin: { userInfo } } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(`${API}/users/profile`, userData, config);

    dispatch({
      type: UPDATE_USER_PROFILE_SUCCESS,
      payload: data,
    });

    // Update user info in local storage if email or name changed
    if (data.email || data.name) {
      const updatedUserInfo = {
        ...userInfo,
        ...(data.name && { name: data.name }),
        ...(data.email && { email: data.email }),
      };
      localStorage.setItem('userInfo', JSON.stringify(updatedUserInfo));
    }
  } catch (error) {
    dispatch({
      type: UPDATE_USER_PROFILE_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};

// Create user profile
export const createUserProfile = (profileData) => async (dispatch, getState) => {
  try {
    dispatch({ type: CREATE_USER_PROFILE_REQUEST });

    const { userLogin: { userInfo } } = getState();

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`${API}/users/profile`, profileData, config);

    dispatch({
      type: CREATE_USER_PROFILE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_USER_PROFILE_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};

// Delete user
export const deleteUser = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: DELETE_USER_REQUEST });

    const { userLogin: { userInfo } } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`${API}/users/${id}`, config);

    dispatch({ type: DELETE_USER_SUCCESS });
  } catch (error) {
    dispatch({
      type: DELETE_USER_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};

// Search users
export const searchUsers = (searchQuery) => async (dispatch, getState) => {
  try {
    dispatch({ type: SEARCH_USERS_REQUEST });

    const { userLogin: { userInfo } } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`${API}/users/search?q=${searchQuery}`, config);

    dispatch({
      type: SEARCH_USERS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SEARCH_USERS_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};

// Get user stats (admin only)
export const getUserStats = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_USER_STATS_REQUEST });

    const { userLogin: { userInfo } } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`${API}/users/stats`, config);

    dispatch({
      type: GET_USER_STATS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_USER_STATS_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};

// Update user role (admin only)
export const updateUserRole = (id, role) => async (dispatch, getState) => {
  try {
    dispatch({ type: UPDATE_USER_ROLE_REQUEST });

    const { userLogin: { userInfo } } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(`${API}/users/${id}/role`, { role }, config);

    dispatch({
      type: UPDATE_USER_ROLE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_USER_ROLE_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};

// Bulk update users (admin only)
export const bulkUpdateUsers = (ids, updates) => async (dispatch, getState) => {
  try {
    dispatch({ type: BULK_UPDATE_USERS_REQUEST });

    const { userLogin: { userInfo } } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(`${API}/users/bulk-update`, { ids, updates }, config);

    dispatch({
      type: BULK_UPDATE_USERS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: BULK_UPDATE_USERS_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};

// Verify user (admin only)
export const verifyUser = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: VERIFY_USER_REQUEST });

    const { userLogin: { userInfo } } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(`${API}/users/${id}/verify`, {}, config);

    dispatch({
      type: VERIFY_USER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: VERIFY_USER_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};

// Request password reset
export const requestPasswordReset = (email) => async (dispatch) => {
  try {
    dispatch({ type: REQUEST_PASSWORD_RESET_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post(`${API}/users/reset-password`, { email }, config);

    dispatch({
      type: REQUEST_PASSWORD_RESET_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: REQUEST_PASSWORD_RESET_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};

// Update last active
export const updateLastActive = () => async (dispatch, getState) => {
  try {
    dispatch({ type: UPDATE_LAST_ACTIVE_REQUEST });

    const { userLogin: { userInfo } } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`${API}/users/activity`, {}, config);

    dispatch({
      type: UPDATE_LAST_ACTIVE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_LAST_ACTIVE_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};

// Export users (admin only)
export const exportUsers = () => async (dispatch, getState) => {
  try {
    dispatch({ type: EXPORT_USERS_REQUEST });

    const { userLogin: { userInfo } } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
      responseType: 'blob', // Important for file downloads
    };

    const { data } = await axios.get(`${API}/users/export`, config);

    // Create a download link and trigger download
    const url = window.URL.createObjectURL(new Blob([data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'users-export.csv');
    document.body.appendChild(link);
    link.click();
    link.remove();

    dispatch({
      type: EXPORT_USERS_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: EXPORT_USERS_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};

// Get user by ID
export const getUserById = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_USER_BY_ID_REQUEST });

    const { userLogin: { userInfo } } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`${API}/users/${id}`, config);

    dispatch({
      type: GET_USER_BY_ID_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_USER_BY_ID_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};

// Get user by ID (admin only)
export const getUserByIdAdmin = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_USER_BY_ID_ADMIN_REQUEST });

    const { userLogin: { userInfo } } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`${API}/users/${id}/admin`, config);

    dispatch({
      type: GET_USER_BY_ID_ADMIN_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_USER_BY_ID_ADMIN_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};