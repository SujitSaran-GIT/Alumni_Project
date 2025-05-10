import API_BASE_URL from '../../utils/api';
import axios from 'axios';
import {
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS,
  CREATE_POST_FAIL,
  GET_POSTS_REQUEST,
  GET_POSTS_SUCCESS,
  GET_POSTS_FAIL,
  GET_POST_BY_ID_REQUEST,
  GET_POST_BY_ID_SUCCESS,
  GET_POST_BY_ID_FAIL,
  UPDATE_POST_REQUEST,
  UPDATE_POST_SUCCESS,
  UPDATE_POST_FAIL,
  DELETE_POST_REQUEST,
  DELETE_POST_SUCCESS,
  DELETE_POST_FAIL,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAIL,
  UPVOTE_POST_REQUEST,
  UPVOTE_POST_SUCCESS,
  UPVOTE_POST_FAIL,
  GET_POSTS_BY_TAG_REQUEST,
  GET_POSTS_BY_TAG_SUCCESS,
  GET_POSTS_BY_TAG_FAIL,
  GET_POSTS_BY_AUTHOR_REQUEST,
  GET_POSTS_BY_AUTHOR_SUCCESS,
  GET_POSTS_BY_AUTHOR_FAIL,
  SEARCH_POSTS_REQUEST,
  SEARCH_POSTS_SUCCESS,
  SEARCH_POSTS_FAIL,
  GET_POST_ANALYTICS_REQUEST,
  GET_POST_ANALYTICS_SUCCESS,
  GET_POST_ANALYTICS_FAIL
} from '../constants/postConstants';

const API = API_BASE_URL;

// Create Post
export const createPost = (postData) => async (dispatch, getState) => {
  try {
    dispatch({ type: CREATE_POST_REQUEST });

    const {
      auth: { userLogin: { userInfo } }
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await axios.post(`${API}/posts`, postData, config);

    dispatch({
      type: CREATE_POST_SUCCESS,
      payload: data
    });

  } catch (error) {
    dispatch({
      type: CREATE_POST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

// Get Posts
export const getPosts = (page = 1, limit = 10) => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_POSTS_REQUEST });

    const {
      auth: { userLogin: { userInfo } }
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await axios.get(`${API}/posts?page=${page}&limit=${limit}`, config);

    dispatch({
      type: GET_POSTS_SUCCESS,
      payload: data
    });

  } catch (error) {
    dispatch({
      type: GET_POSTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

// Get Post by ID
export const getPostById = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_POST_BY_ID_REQUEST });

    const {
      auth: { userLogin: { userInfo } }
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await axios.get(`${API}/posts/${id}`, config);

    dispatch({
      type: GET_POST_BY_ID_SUCCESS,
      payload: data
    });

  } catch (error) {
    dispatch({
      type: GET_POST_BY_ID_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

// Update Post
export const updatePost = (id, postData) => async (dispatch, getState) => {
  try {
    dispatch({ type: UPDATE_POST_REQUEST });

    const {
      auth: { userLogin: { userInfo } }
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await axios.put(`${API}/posts/${id}`, postData, config);

    dispatch({
      type: UPDATE_POST_SUCCESS,
      payload: data
    });

  } catch (error) {
    dispatch({
      type: UPDATE_POST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

// Delete Post
export const deletePost = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: DELETE_POST_REQUEST });

    const {
      auth: { userLogin: { userInfo } }
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    await axios.delete(`${API}/posts/${id}`, config);

    dispatch({ type: DELETE_POST_SUCCESS });

  } catch (error) {
    dispatch({
      type: DELETE_POST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

// Add Comment
export const addComment = (id, commentText) => async (dispatch, getState) => {
  try {
    dispatch({ type: ADD_COMMENT_REQUEST });

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
      `${API}/posts/${id}/comments`,
      { text: commentText },
      config
    );

    dispatch({
      type: ADD_COMMENT_SUCCESS,
      payload: data
    });

  } catch (error) {
    dispatch({
      type: ADD_COMMENT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

// Upvote Post
export const upvotePost = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: UPVOTE_POST_REQUEST });

    const {
      auth: { userLogin: { userInfo } }
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await axios.post(`${API}/posts/${id}/upvote`, {}, config);

    dispatch({
      type: UPVOTE_POST_SUCCESS,
      payload: data
    });

  } catch (error) {
    dispatch({
      type: UPVOTE_POST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

// Get Posts by Tag
export const getPostsByTag = (tag) => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_POSTS_BY_TAG_REQUEST });

    const {
      auth: { userLogin: { userInfo } }
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await axios.get(`${API}/posts/tag/${tag}`, config);

    dispatch({
      type: GET_POSTS_BY_TAG_SUCCESS,
      payload: data
    });

  } catch (error) {
    dispatch({
      type: GET_POSTS_BY_TAG_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

// Get Posts by Author
export const getPostsByAuthor = (authorId) => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_POSTS_BY_AUTHOR_REQUEST });

    const {
      auth: { userLogin: { userInfo } }
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await axios.get(`${API}/posts/author/${authorId}`, config);

    dispatch({
      type: GET_POSTS_BY_AUTHOR_SUCCESS,
      payload: data
    });

  } catch (error) {
    dispatch({
      type: GET_POSTS_BY_AUTHOR_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

// Search Posts
export const searchPosts = (query) => async (dispatch, getState) => {
  try {
    dispatch({ type: SEARCH_POSTS_REQUEST });

    const {
      auth: { userLogin: { userInfo } }
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await axios.get(`${API}/posts/search?q=${query}`, config);

    dispatch({
      type: SEARCH_POSTS_SUCCESS,
      payload: data
    });

  } catch (error) {
    dispatch({
      type: SEARCH_POSTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

// Get Post Analytics (Admin only)
export const getPostAnalytics = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_POST_ANALYTICS_REQUEST });

    const {
      auth: { userLogin: { userInfo } }
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await axios.get(`${API}/posts/analytics`, config);

    dispatch({
      type: GET_POST_ANALYTICS_SUCCESS,
      payload: data
    });

  } catch (error) {
    dispatch({
      type: GET_POST_ANALYTICS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};