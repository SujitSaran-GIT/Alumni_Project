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

// Create Job Reducer
export const jobCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_JOB_REQUEST:
      return { loading: true };
    case CREATE_JOB_SUCCESS:
      return { loading: false, success: true, job: action.payload };
    case CREATE_JOB_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// Get Jobs Reducer (Public)
export const jobListReducer = (state = { jobs: [] }, action) => {
  switch (action.type) {
    case GET_JOBS_REQUEST:
      return { loading: true, jobs: [] };
    case GET_JOBS_SUCCESS:
      return { loading: false, jobs: action.payload };
    case GET_JOBS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// Get All Jobs Reducer (Admin)
export const allJobsListReducer = (state = { jobs: [] }, action) => {
  switch (action.type) {
    case GET_ALL_JOBS_REQUEST:
      return { loading: true, jobs: [] };
    case GET_ALL_JOBS_SUCCESS:
      return { loading: false, jobs: action.payload };
    case GET_ALL_JOBS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// Get Job by ID Reducer
export const jobDetailsReducer = (state = { job: {} }, action) => {
  switch (action.type) {
    case GET_JOB_BY_ID_REQUEST:
      return { ...state, loading: true };
    case GET_JOB_BY_ID_SUCCESS:
      return { loading: false, job: action.payload };
    case GET_JOB_BY_ID_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// Update Job Reducer
export const jobUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_JOB_REQUEST:
      return { loading: true };
    case UPDATE_JOB_SUCCESS:
      return { loading: false, success: true, job: action.payload };
    case UPDATE_JOB_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// Close Job Reducer
export const jobCloseReducer = (state = {}, action) => {
  switch (action.type) {
    case CLOSE_JOB_REQUEST:
      return { loading: true };
    case CLOSE_JOB_SUCCESS:
      return { loading: false, success: true, job: action.payload };
    case CLOSE_JOB_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// Force Close Job Reducer (Admin)
export const jobForceCloseReducer = (state = {}, action) => {
  switch (action.type) {
    case FORCE_CLOSE_JOB_REQUEST:
      return { loading: true };
    case FORCE_CLOSE_JOB_SUCCESS:
      return { loading: false, success: true, job: action.payload };
    case FORCE_CLOSE_JOB_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// Delete Job Reducer (Admin)
export const jobDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_JOB_REQUEST:
      return { loading: true };
    case DELETE_JOB_SUCCESS:
      return { loading: false, success: true };
    case DELETE_JOB_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// Apply for Job Reducer
export const jobApplyReducer = (state = {}, action) => {
  switch (action.type) {
    case APPLY_FOR_JOB_REQUEST:
      return { loading: true };
    case APPLY_FOR_JOB_SUCCESS:
      return { loading: false, success: true, job: action.payload };
    case APPLY_FOR_JOB_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// Get Job Applications Reducer
export const jobApplicationsReducer = (state = { applications: [] }, action) => {
  switch (action.type) {
    case GET_JOB_APPLICATIONS_REQUEST:
      return { loading: true, applications: [] };
    case GET_JOB_APPLICATIONS_SUCCESS:
      return { loading: false, applications: action.payload };
    case GET_JOB_APPLICATIONS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// Get All Applications Reducer (Admin)
export const allApplicationsReducer = (state = { applications: [] }, action) => {
  switch (action.type) {
    case GET_ALL_APPLICATIONS_REQUEST:
      return { loading: true, applications: [] };
    case GET_ALL_APPLICATIONS_SUCCESS:
      return { loading: false, applications: action.payload };
    case GET_ALL_APPLICATIONS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// Get My Posted Jobs Reducer
export const myPostedJobsReducer = (state = { jobs: [] }, action) => {
  switch (action.type) {
    case GET_MY_POSTED_JOBS_REQUEST:
      return { loading: true, jobs: [] };
    case GET_MY_POSTED_JOBS_SUCCESS:
      return { loading: false, jobs: action.payload };
    case GET_MY_POSTED_JOBS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// Get My Applied Jobs Reducer
export const myAppliedJobsReducer = (state = { jobs: [] }, action) => {
  switch (action.type) {
    case GET_MY_APPLIED_JOBS_REQUEST:
      return { loading: true, jobs: [] };
    case GET_MY_APPLIED_JOBS_SUCCESS:
      return { loading: false, jobs: action.payload };
    case GET_MY_APPLIED_JOBS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// Search Jobs Reducer
export const jobSearchReducer = (state = { results: [] }, action) => {
  switch (action.type) {
    case SEARCH_JOBS_REQUEST:
      return { loading: true, results: [] };
    case SEARCH_JOBS_SUCCESS:
      return { loading: false, results: action.payload };
    case SEARCH_JOBS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};