import API_BASE_URL from '../../utils/api.js';
import axios from 'axios';
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

const API = API_BASE_URL;

// Get Notifications
export const getNotifications = (page = 1, limit = 20) => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_NOTIFICATIONS_REQUEST });

    const {
      auth: { userLogin: { userInfo } }
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await axios.get(
      `${API}/notifications?page=${page}&limit=${limit}`,
      config
    );

    dispatch({
      type: GET_NOTIFICATIONS_SUCCESS,
      payload: data
    });

  } catch (error) {
    dispatch({
      type: GET_NOTIFICATIONS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

// Mark Notification as Read
export const markNotificationAsRead = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: MARK_NOTIFICATION_AS_READ_REQUEST });

    const {
      auth: { userLogin: { userInfo } }
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await axios.put(
      `${API}/notifications/${id}/read`,
      {},
      config
    );

    dispatch({
      type: MARK_NOTIFICATION_AS_READ_SUCCESS,
      payload: data
    });

  } catch (error) {
    dispatch({
      type: MARK_NOTIFICATION_AS_READ_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

// Mark All Notifications as Read
export const markAllNotificationsAsRead = () => async (dispatch, getState) => {
  try {
    dispatch({ type: MARK_ALL_NOTIFICATIONS_AS_READ_REQUEST });

    const {
      auth: { userLogin: { userInfo } }
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    await axios.put(
      `${API}/notifications/all/read`,
      {},
      config
    );

    dispatch({
      type: MARK_ALL_NOTIFICATIONS_AS_READ_SUCCESS
    });

  } catch (error) {
    dispatch({
      type: MARK_ALL_NOTIFICATIONS_AS_READ_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

// Get Unread Notifications Count
export const getUnreadNotificationsCount = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_UNREAD_NOTIFICATIONS_COUNT_REQUEST });

    const {
      auth: { userLogin: { userInfo } }
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await axios.get(
      `${API}/notifications/unread/count`,
      config
    );

    dispatch({
      type: GET_UNREAD_NOTIFICATIONS_COUNT_SUCCESS,
      payload: data.count
    });

  } catch (error) {
    dispatch({
      type: GET_UNREAD_NOTIFICATIONS_COUNT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

// Delete Notification
export const deleteNotification = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: DELETE_NOTIFICATION_REQUEST });

    const {
      auth: { userLogin: { userInfo } }
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    await axios.delete(
      `${API}/notifications/${id}`,
      config
    );

    dispatch({
      type: DELETE_NOTIFICATION_SUCCESS,
      payload: id
    });

  } catch (error) {
    dispatch({
      type: DELETE_NOTIFICATION_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

// Get Notifications by Type
export const getNotificationsByType = (type) => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_NOTIFICATIONS_BY_TYPE_REQUEST });

    const {
      auth: { userLogin: { userInfo } }
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await axios.get(
      `${API}/notifications/type/${type}`,
      config
    );

    dispatch({
      type: GET_NOTIFICATIONS_BY_TYPE_SUCCESS,
      payload: data
    });

  } catch (error) {
    dispatch({
      type: GET_NOTIFICATIONS_BY_TYPE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

// Handle new notification received via WebSocket
export const newNotificationReceived = (notification) => (dispatch) => {
  dispatch({
    type: NEW_NOTIFICATION_RECEIVED,
    payload: notification
  });
};