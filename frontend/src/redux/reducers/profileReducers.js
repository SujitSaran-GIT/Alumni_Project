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

// Create and Update Profile Reducer
export const profileCreateUpdateReducer = (state = { profile: {} }, action) => {
  switch (action.type) {
    case CREATE_PROFILE_REQUEST:
    case UPDATE_PROFILE_REQUEST:
      return { loading: true };
    case CREATE_PROFILE_SUCCESS:
    case UPDATE_PROFILE_SUCCESS:
      return { loading: false, success: true, profile: action.payload };
    case CREATE_PROFILE_FAIL:
    case UPDATE_PROFILE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// Get Profile by ID Reducer
export const profileDetailsReducer = (state = { profile: {} }, action) => {
  switch (action.type) {
    case GET_PROFILE_BY_ID_REQUEST:
      return { ...state, loading: true };
    case GET_PROFILE_BY_ID_SUCCESS:
      return { loading: false, profile: action.payload };
    case GET_PROFILE_BY_ID_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// Get All Profiles Reducer
export const profileListReducer = (state = { profiles: [] }, action) => {
  switch (action.type) {
    case GET_ALL_PROFILES_REQUEST:
      return { loading: true, profiles: [] };
    case GET_ALL_PROFILES_SUCCESS:
      return { loading: false, profiles: action.payload };
    case GET_ALL_PROFILES_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// Get All Mentors Reducer
export const mentorListReducer = (state = { mentors: [] }, action) => {
  switch (action.type) {
    case GET_ALL_MENTORS_REQUEST:
      return { loading: true, mentors: [] };
    case GET_ALL_MENTORS_SUCCESS:
      return { loading: false, mentors: action.payload };
    case GET_ALL_MENTORS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// Toggle Mentor Status Reducer
export const mentorStatusReducer = (state = {}, action) => {
  switch (action.type) {
    case TOGGLE_MENTOR_STATUS_REQUEST:
      return { loading: true };
    case TOGGLE_MENTOR_STATUS_SUCCESS:
      return { loading: false, success: true, isMentor: action.payload.isMentor };
    case TOGGLE_MENTOR_STATUS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// Delete Profile Reducer
export const profileDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_PROFILE_REQUEST:
      return { loading: true };
    case DELETE_PROFILE_SUCCESS:
      return { loading: false, success: true };
    case DELETE_PROFILE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// Search Profiles Reducer
export const profileSearchReducer = (state = { results: [] }, action) => {
  switch (action.type) {
    case SEARCH_PROFILES_REQUEST:
      return { loading: true, results: [] };
    case SEARCH_PROFILES_SUCCESS:
      return { loading: false, results: action.payload };
    case SEARCH_PROFILES_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};