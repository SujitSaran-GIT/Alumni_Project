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

// User list reducer
export const userListReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case GET_USERS_REQUEST:
      return { loading: true, users: [] };
    case GET_USERS_SUCCESS:
      return { loading: false, users: action.payload };
    case GET_USERS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// User profile reducer
export const userProfileReducer = (state = { profile: {} }, action) => {
  switch (action.type) {
    case GET_USER_PROFILE_REQUEST:
    case UPDATE_USER_PROFILE_REQUEST:
    case CREATE_USER_PROFILE_REQUEST:
      return { loading: true, profile: {} };
    case GET_USER_PROFILE_SUCCESS:
    case UPDATE_USER_PROFILE_SUCCESS:
    case CREATE_USER_PROFILE_SUCCESS:
      return { loading: false, profile: action.payload, success: true };
    case GET_USER_PROFILE_FAIL:
    case UPDATE_USER_PROFILE_FAIL:
    case CREATE_USER_PROFILE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// User details reducer
export const userDetailsReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case GET_USER_BY_ID_REQUEST:
    case GET_USER_BY_ID_ADMIN_REQUEST:
      return { loading: true, ...state };
    case GET_USER_BY_ID_SUCCESS:
    case GET_USER_BY_ID_ADMIN_SUCCESS:
      return { loading: false, user: action.payload };
    case GET_USER_BY_ID_FAIL:
    case GET_USER_BY_ID_ADMIN_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// User delete reducer
export const userDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_USER_REQUEST:
      return { loading: true };
    case DELETE_USER_SUCCESS:
      return { loading: false, success: true };
    case DELETE_USER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// User role update reducer
export const userRoleUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_USER_ROLE_REQUEST:
      return { loading: true };
    case UPDATE_USER_ROLE_SUCCESS:
      return { loading: false, success: true };
    case UPDATE_USER_ROLE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// User search reducer
export const userSearchReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case SEARCH_USERS_REQUEST:
      return { loading: true, users: [] };
    case SEARCH_USERS_SUCCESS:
      return { loading: false, users: action.payload };
    case SEARCH_USERS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// User stats reducer
export const userStatsReducer = (state = { stats: [] }, action) => {
  switch (action.type) {
    case GET_USER_STATS_REQUEST:
      return { loading: true, stats: [] };
    case GET_USER_STATS_SUCCESS:
      return { loading: false, stats: action.payload };
    case GET_USER_STATS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// Bulk update users reducer
export const bulkUpdateUsersReducer = (state = {}, action) => {
  switch (action.type) {
    case BULK_UPDATE_USERS_REQUEST:
      return { loading: true };
    case BULK_UPDATE_USERS_SUCCESS:
      return { loading: false, success: true };
    case BULK_UPDATE_USERS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// Verify user reducer
export const verifyUserReducer = (state = {}, action) => {
  switch (action.type) {
    case VERIFY_USER_REQUEST:
      return { loading: true };
    case VERIFY_USER_SUCCESS:
      return { loading: false, success: true };
    case VERIFY_USER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// Password reset request reducer
export const passwordResetRequestReducer = (state = {}, action) => {
  switch (action.type) {
    case REQUEST_PASSWORD_RESET_REQUEST:
      return { loading: true };
    case REQUEST_PASSWORD_RESET_SUCCESS:
      return { loading: false, success: true };
    case REQUEST_PASSWORD_RESET_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// Last active update reducer
export const lastActiveUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_LAST_ACTIVE_REQUEST:
      return { loading: true };
    case UPDATE_LAST_ACTIVE_SUCCESS:
      return { loading: false, success: true };
    case UPDATE_LAST_ACTIVE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// Export users reducer
export const exportUsersReducer = (state = {}, action) => {
  switch (action.type) {
    case EXPORT_USERS_REQUEST:
      return { loading: true };
    case EXPORT_USERS_SUCCESS:
      return { loading: false, success: true };
    case EXPORT_USERS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};