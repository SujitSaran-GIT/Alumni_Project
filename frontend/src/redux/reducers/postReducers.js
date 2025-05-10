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

// Create Post Reducer
export const postCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_POST_REQUEST:
      return { loading: true };
    case CREATE_POST_SUCCESS:
      return { loading: false, success: true, post: action.payload };
    case CREATE_POST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// Update Post Reducer
export const postUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_POST_REQUEST:
      return { loading: true };
    case UPDATE_POST_SUCCESS:
      return { loading: false, success: true, post: action.payload };
    case UPDATE_POST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// Get Posts Reducer
export const postListReducer = (state = { posts: [] }, action) => {
  switch (action.type) {
    case GET_POSTS_REQUEST:
      return { loading: true, posts: [] };
    case GET_POSTS_SUCCESS:
      return { 
        loading: false, 
        posts: action.payload.posts,
        page: action.payload.page,
        pages: action.payload.pages,
        total: action.payload.total
      };
    case GET_POSTS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// Get Post by ID Reducer
export const postDetailsReducer = (state = { post: {} }, action) => {
  switch (action.type) {
    case GET_POST_BY_ID_REQUEST:
      return { ...state, loading: true };
    case GET_POST_BY_ID_SUCCESS:
      return { loading: false, post: action.payload };
    case GET_POST_BY_ID_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// Delete Post Reducer
export const postDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_POST_REQUEST:
      return { loading: true };
    case DELETE_POST_SUCCESS:
      return { loading: false, success: true };
    case DELETE_POST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// Add Comment Reducer
export const postCommentReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_COMMENT_REQUEST:
      return { loading: true };
    case ADD_COMMENT_SUCCESS:
      return { loading: false, success: true, post: action.payload };
    case ADD_COMMENT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// Upvote Post Reducer
export const postUpvoteReducer = (state = {}, action) => {
  switch (action.type) {
    case UPVOTE_POST_REQUEST:
      return { loading: true };
    case UPVOTE_POST_SUCCESS:
      return { loading: false, success: true, post: action.payload };
    case UPVOTE_POST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// Get Posts by Tag Reducer
export const postsByTagReducer = (state = { posts: [] }, action) => {
  switch (action.type) {
    case GET_POSTS_BY_TAG_REQUEST:
      return { loading: true, posts: [] };
    case GET_POSTS_BY_TAG_SUCCESS:
      return { loading: false, posts: action.payload };
    case GET_POSTS_BY_TAG_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// Get Posts by Author Reducer
export const postsByAuthorReducer = (state = { posts: [] }, action) => {
  switch (action.type) {
    case GET_POSTS_BY_AUTHOR_REQUEST:
      return { loading: true, posts: [] };
    case GET_POSTS_BY_AUTHOR_SUCCESS:
      return { loading: false, posts: action.payload };
    case GET_POSTS_BY_AUTHOR_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// Search Posts Reducer
export const postSearchReducer = (state = { results: [] }, action) => {
  switch (action.type) {
    case SEARCH_POSTS_REQUEST:
      return { loading: true, results: [] };
    case SEARCH_POSTS_SUCCESS:
      return { loading: false, results: action.payload };
    case SEARCH_POSTS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// Post Analytics Reducer
export const postAnalyticsReducer = (state = { analytics: [] }, action) => {
  switch (action.type) {
    case GET_POST_ANALYTICS_REQUEST:
      return { loading: true, analytics: [] };
    case GET_POST_ANALYTICS_SUCCESS:
      return { loading: false, analytics: action.payload };
    case GET_POST_ANALYTICS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};