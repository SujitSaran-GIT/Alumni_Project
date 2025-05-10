import API_BASE_URL from '../../utils/api.js';
import axios from 'axios';
import {
  CREATE_JOB_REQUEST,
  CREATE_JOB_SUCCESS,
  CREATE_JOB_FAIL,
  GET_JOBS_REQUEST,
  GET_JOBS_SUCCESS,
  GET_JOBS_FAIL,
  GET_ALL_JOBS_REQUEST,
  GET_ALL_JOBS_SUCCESS,
  GET_ALL_JOBS_FAIL,
  GET_JOB_BY_ID_REQUEST,
  GET_JOB_BY_ID_SUCCESS,
  GET_JOB_BY_ID_FAIL,
  UPDATE_JOB_REQUEST,
  UPDATE_JOB_SUCCESS,
  UPDATE_JOB_FAIL,
  CLOSE_JOB_REQUEST,
  CLOSE_JOB_SUCCESS,
  CLOSE_JOB_FAIL,
  FORCE_CLOSE_JOB_REQUEST,
  FORCE_CLOSE_JOB_SUCCESS,
  FORCE_CLOSE_JOB_FAIL,
  DELETE_JOB_REQUEST,
  DELETE_JOB_SUCCESS,
  DELETE_JOB_FAIL,
  APPLY_FOR_JOB_REQUEST,
  APPLY_FOR_JOB_SUCCESS,
  APPLY_FOR_JOB_FAIL,
  GET_JOB_APPLICATIONS_REQUEST,
  GET_JOB_APPLICATIONS_SUCCESS,
  GET_JOB_APPLICATIONS_FAIL,
  GET_ALL_APPLICATIONS_REQUEST,
  GET_ALL_APPLICATIONS_SUCCESS,
  GET_ALL_APPLICATIONS_FAIL,
  GET_MY_POSTED_JOBS_REQUEST,
  GET_MY_POSTED_JOBS_SUCCESS,
  GET_MY_POSTED_JOBS_FAIL,
  GET_MY_APPLIED_JOBS_REQUEST,
  GET_MY_APPLIED_JOBS_SUCCESS,
  GET_MY_APPLIED_JOBS_FAIL,
  SEARCH_JOBS_REQUEST,
  SEARCH_JOBS_SUCCESS,
  SEARCH_JOBS_FAIL
} from '../constants/jobConstants';

const API = API_BASE_URL;

// Create Job
export const createJob = (jobData) => async (dispatch, getState) => {
  try {
    dispatch({ type: CREATE_JOB_REQUEST });

    const {
      auth: { userLogin: { userInfo } }
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await axios.post(`${API}/jobs`, jobData, config);

    dispatch({
      type: CREATE_JOB_SUCCESS,
      payload: data
    });

  } catch (error) {
    dispatch({
      type: CREATE_JOB_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

// Get Jobs (Public)
export const getJobs = () => async (dispatch) => {
  try {
    dispatch({ type: GET_JOBS_REQUEST });

    const { data } = await axios.get(`${API}/jobs`);

    dispatch({
      type: GET_JOBS_SUCCESS,
      payload: data
    });

  } catch (error) {
    dispatch({
      type: GET_JOBS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

// Get All Jobs (Admin)
export const getAllJobs = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_ALL_JOBS_REQUEST });

    const {
      auth: { userLogin: { userInfo } }
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await axios.get(`${API}/jobs/admin/jobs`, config);

    dispatch({
      type: GET_ALL_JOBS_SUCCESS,
      payload: data
    });

  } catch (error) {
    dispatch({
      type: GET_ALL_JOBS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

// Get Job by ID
export const getJobById = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_JOB_BY_ID_REQUEST });

    const {
      auth: { userLogin: { userInfo } }
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await axios.get(`${API}/jobs/${id}`, config);

    dispatch({
      type: GET_JOB_BY_ID_SUCCESS,
      payload: data
    });

  } catch (error) {
    dispatch({
      type: GET_JOB_BY_ID_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

// Update Job
export const updateJob = (id, jobData) => async (dispatch, getState) => {
  try {
    dispatch({ type: UPDATE_JOB_REQUEST });

    const {
      auth: { userLogin: { userInfo } }
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await axios.put(`${API}/jobs/${id}`, jobData, config);

    dispatch({
      type: UPDATE_JOB_SUCCESS,
      payload: data
    });

  } catch (error) {
    dispatch({
      type: UPDATE_JOB_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

// Close Job (by poster)
export const closeJob = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: CLOSE_JOB_REQUEST });

    const {
      auth: { userLogin: { userInfo } }
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await axios.put(`${API}/jobs/${id}/close`, {}, config);

    dispatch({
      type: CLOSE_JOB_SUCCESS,
      payload: data
    });

  } catch (error) {
    dispatch({
      type: CLOSE_JOB_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

// Force Close Job (admin)
export const forceCloseJob = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: FORCE_CLOSE_JOB_REQUEST });

    const {
      auth: { userLogin: { userInfo } }
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await axios.put(`${API}/jobs/admin/jobs/${id}/force-close`, {}, config);

    dispatch({
      type: FORCE_CLOSE_JOB_SUCCESS,
      payload: data
    });

  } catch (error) {
    dispatch({
      type: FORCE_CLOSE_JOB_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

// Delete Job (admin)
export const deleteJob = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: DELETE_JOB_REQUEST });

    const {
      auth: { userLogin: { userInfo } }
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    await axios.delete(`${API}/jobs/admin/jobs/${id}`, config);

    dispatch({ type: DELETE_JOB_SUCCESS });

  } catch (error) {
    dispatch({
      type: DELETE_JOB_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

// Apply for Job
export const applyForJob = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: APPLY_FOR_JOB_REQUEST });

    const {
      auth: { userLogin: { userInfo } }
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await axios.post(`${API}/jobs/${id}/apply`, {}, config);

    dispatch({
      type: APPLY_FOR_JOB_SUCCESS,
      payload: data
    });

  } catch (error) {
    dispatch({
      type: APPLY_FOR_JOB_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

// Get Job Applications
export const getJobApplications = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_JOB_APPLICATIONS_REQUEST });

    const {
      auth: { userLogin: { userInfo } }
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await axios.get(`${API}/jobs/${id}/applications`, config);

    dispatch({
      type: GET_JOB_APPLICATIONS_SUCCESS,
      payload: data
    });

  } catch (error) {
    dispatch({
      type: GET_JOB_APPLICATIONS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

// Get All Applications (admin)
export const getAllApplications = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_ALL_APPLICATIONS_REQUEST });

    const {
      auth: { userLogin: { userInfo } }
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await axios.get(`${API}/jobs/admin/applications`, config);

    dispatch({
      type: GET_ALL_APPLICATIONS_SUCCESS,
      payload: data
    });

  } catch (error) {
    dispatch({
      type: GET_ALL_APPLICATIONS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

// Get My Posted Jobs
export const getMyPostedJobs = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_MY_POSTED_JOBS_REQUEST });

    const {
      auth: { userLogin: { userInfo } }
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await axios.get(`${API}/jobs/my-jobs`, config);

    dispatch({
      type: GET_MY_POSTED_JOBS_SUCCESS,
      payload: data
    });

  } catch (error) {
    dispatch({
      type: GET_MY_POSTED_JOBS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

// Get My Applied Jobs
export const getMyAppliedJobs = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_MY_APPLIED_JOBS_REQUEST });

    const {
      auth: { userLogin: { userInfo } }
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await axios.get(`${API}/jobs/applied`, config);

    dispatch({
      type: GET_MY_APPLIED_JOBS_SUCCESS,
      payload: data
    });

  } catch (error) {
    dispatch({
      type: GET_MY_APPLIED_JOBS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

// Search Jobs
export const searchJobs = (query, location) => async (dispatch) => {
  try {
    dispatch({ type: SEARCH_JOBS_REQUEST });

    let url = `${API}/jobs/search?`;
    if (query) url += `q=${query}&`;
    if (location) url += `location=${location}`;

    const { data } = await axios.get(url);

    dispatch({
      type: SEARCH_JOBS_SUCCESS,
      payload: data
    });

  } catch (error) {
    dispatch({
      type: SEARCH_JOBS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};