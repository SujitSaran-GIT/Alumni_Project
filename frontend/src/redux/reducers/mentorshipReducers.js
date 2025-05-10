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

// Request Mentorship Reducer
export const mentorshipRequestReducer = (state = {}, action) => {
  switch (action.type) {
    case REQUEST_MENTORSHIP_REQUEST:
      return { loading: true };
    case REQUEST_MENTORSHIP_SUCCESS:
      return { loading: false, success: true, mentorship: action.payload };
    case REQUEST_MENTORSHIP_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// Get Mentors Reducer
export const mentorsListReducer = (state = { mentors: [] }, action) => {
  switch (action.type) {
    case GET_MENTORS_REQUEST:
      return { loading: true, mentors: [] };
    case GET_MENTORS_SUCCESS:
      return { loading: false, mentors: action.payload };
    case GET_MENTORS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// Get Mentorship Requests Reducer
export const mentorshipRequestsReducer = (state = { requests: [] }, action) => {
  switch (action.type) {
    case GET_MENTORSHIP_REQUESTS_REQUEST:
      return { loading: true, requests: [] };
    case GET_MENTORSHIP_REQUESTS_SUCCESS:
      return { loading: false, requests: action.payload };
    case GET_MENTORSHIP_REQUESTS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// Accept/Reject Mentorship Reducer
export const mentorshipResponseReducer = (state = {}, action) => {
  switch (action.type) {
    case ACCEPT_MENTORSHIP_REQUEST:
    case REJECT_MENTORSHIP_REQUEST:
    case RESPOND_TO_REQUEST_REQUEST:
      return { loading: true };
    case ACCEPT_MENTORSHIP_SUCCESS:
    case REJECT_MENTORSHIP_SUCCESS:
    case RESPOND_TO_REQUEST_SUCCESS:
      return { loading: false, success: true, mentorship: action.payload };
    case ACCEPT_MENTORSHIP_FAIL:
    case REJECT_MENTORSHIP_FAIL:
    case RESPOND_TO_REQUEST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// Get Active Mentorships Reducer
export const activeMentorshipsReducer = (state = { mentorships: [] }, action) => {
  switch (action.type) {
    case GET_ACTIVE_MENTORSHIPS_REQUEST:
      return { loading: true, mentorships: [] };
    case GET_ACTIVE_MENTORSHIPS_SUCCESS:
      return { loading: false, mentorships: action.payload };
    case GET_ACTIVE_MENTORSHIPS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// Complete Mentorship Reducer
export const mentorshipCompletionReducer = (state = {}, action) => {
  switch (action.type) {
    case COMPLETE_MENTORSHIP_REQUEST:
      return { loading: true };
    case COMPLETE_MENTORSHIP_SUCCESS:
      return { loading: false, success: true, mentorship: action.payload };
    case COMPLETE_MENTORSHIP_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// Add Meeting Reducer
export const meetingAddReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_MEETING_REQUEST:
      return { loading: true };
    case ADD_MEETING_SUCCESS:
      return { loading: false, success: true, meeting: action.payload };
    case ADD_MEETING_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// Get Mentorship Details Reducer
export const mentorshipDetailsReducer = (state = { mentorship: {} }, action) => {
  switch (action.type) {
    case GET_MENTORSHIP_DETAILS_REQUEST:
      return { ...state, loading: true };
    case GET_MENTORSHIP_DETAILS_SUCCESS:
      return { loading: false, mentorship: action.payload };
    case GET_MENTORSHIP_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// Get User Mentorships Reducer
export const userMentorshipsReducer = (state = { mentorships: [] }, action) => {
  switch (action.type) {
    case GET_USER_MENTORSHIPS_REQUEST:
      return { loading: true, mentorships: [] };
    case GET_USER_MENTORSHIPS_SUCCESS:
      return { loading: false, mentorships: action.payload };
    case GET_USER_MENTORSHIPS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// Get All Mentorships Reducer (Admin)
export const allMentorshipsReducer = (state = { mentorships: [] }, action) => {
  switch (action.type) {
    case GET_ALL_MENTORSHIPS_REQUEST:
      return { loading: true, mentorships: [] };
    case GET_ALL_MENTORSHIPS_SUCCESS:
      return { loading: false, mentorships: action.payload };
    case GET_ALL_MENTORSHIPS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// Get Mentorship Stats Reducer (Admin)
export const mentorshipStatsReducer = (state = { stats: {} }, action) => {
  switch (action.type) {
    case GET_MENTORSHIP_STATS_REQUEST:
      return { loading: true, stats: {} };
    case GET_MENTORSHIP_STATS_SUCCESS:
      return { loading: false, stats: action.payload };
    case GET_MENTORSHIP_STATS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// Cancel Mentorship Reducer (Admin)
export const mentorshipCancellationReducer = (state = {}, action) => {
  switch (action.type) {
    case CANCEL_MENTORSHIP_REQUEST:
      return { loading: true };
    case CANCEL_MENTORSHIP_SUCCESS:
      return { loading: false, success: true, mentorship: action.payload };
    case CANCEL_MENTORSHIP_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// Search Mentors Reducer
export const mentorsSearchReducer = (state = { results: [] }, action) => {
  switch (action.type) {
    case SEARCH_MENTORS_REQUEST:
      return { loading: true, results: [] };
    case SEARCH_MENTORS_SUCCESS:
      return { loading: false, results: action.payload };
    case SEARCH_MENTORS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};