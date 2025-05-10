import {
  CREATE_DONATION_REQUEST,
  CREATE_DONATION_SUCCESS,
  CREATE_DONATION_FAIL,
  CREATE_RECURRING_DONATION_REQUEST,
  CREATE_RECURRING_DONATION_SUCCESS,
  CREATE_RECURRING_DONATION_FAIL,
  GET_DONATIONS_REQUEST,
  GET_DONATIONS_SUCCESS,
  GET_DONATIONS_FAIL,
  GET_ALL_DONATIONS_REQUEST,
  GET_ALL_DONATIONS_SUCCESS,
  GET_ALL_DONATIONS_FAIL,
  GET_DONATION_BY_ID_REQUEST,
  GET_DONATION_BY_ID_SUCCESS,
  GET_DONATION_BY_ID_FAIL,
  GET_DONATIONS_BY_CAMPAIGN_REQUEST,
  GET_DONATIONS_BY_CAMPAIGN_SUCCESS,
  GET_DONATIONS_BY_CAMPAIGN_FAIL,
  UPDATE_DONATION_STATUS_REQUEST,
  UPDATE_DONATION_STATUS_SUCCESS,
  UPDATE_DONATION_STATUS_FAIL,
  GET_DONATION_STATS_REQUEST,
  GET_DONATION_STATS_SUCCESS,
  GET_DONATION_STATS_FAIL,
  DONATION_WEBHOOK_SUCCESS
} from '../constants/donationConstants';

// Create Donation Reducer
export const donationCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_DONATION_REQUEST:
      return { loading: true };
    case CREATE_DONATION_SUCCESS:
      return { 
        loading: false, 
        success: true, 
        donation: action.payload.donation,
        clientSecret: action.payload.clientSecret
      };
    case CREATE_DONATION_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// Create Recurring Donation Reducer
export const recurringDonationCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_RECURRING_DONATION_REQUEST:
      return { loading: true };
    case CREATE_RECURRING_DONATION_SUCCESS:
      return { 
        loading: false, 
        success: true, 
        donation: action.payload.donation,
        clientSecret: action.payload.clientSecret
      };
    case CREATE_RECURRING_DONATION_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// Get Donations Reducer (User's donations)
export const donationListReducer = (state = { donations: [] }, action) => {
  switch (action.type) {
    case GET_DONATIONS_REQUEST:
      return { loading: true, donations: [] };
    case GET_DONATIONS_SUCCESS:
      return { loading: false, donations: action.payload };
    case GET_DONATIONS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// Get All Donations Reducer (Admin)
export const allDonationsListReducer = (state = { donations: [] }, action) => {
  switch (action.type) {
    case GET_ALL_DONATIONS_REQUEST:
      return { loading: true, donations: [] };
    case GET_ALL_DONATIONS_SUCCESS:
      return { loading: false, donations: action.payload };
    case GET_ALL_DONATIONS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// Get Donation by ID Reducer
export const donationDetailsReducer = (state = { donation: {} }, action) => {
  switch (action.type) {
    case GET_DONATION_BY_ID_REQUEST:
      return { ...state, loading: true };
    case GET_DONATION_BY_ID_SUCCESS:
      return { loading: false, donation: action.payload };
    case GET_DONATION_BY_ID_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// Get Donations by Campaign Reducer
export const donationsByCampaignReducer = (state = { donations: [] }, action) => {
  switch (action.type) {
    case GET_DONATIONS_BY_CAMPAIGN_REQUEST:
      return { loading: true, donations: [] };
    case GET_DONATIONS_BY_CAMPAIGN_SUCCESS:
      return { loading: false, donations: action.payload };
    case GET_DONATIONS_BY_CAMPAIGN_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// Update Donation Status Reducer
export const donationStatusUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_DONATION_STATUS_REQUEST:
      return { loading: true };
    case UPDATE_DONATION_STATUS_SUCCESS:
      return { loading: false, success: true, donation: action.payload };
    case UPDATE_DONATION_STATUS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// Get Donation Stats Reducer
export const donationStatsReducer = (state = { stats: {} }, action) => {
  switch (action.type) {
    case GET_DONATION_STATS_REQUEST:
      return { loading: true, stats: {} };
    case GET_DONATION_STATS_SUCCESS:
      return { loading: false, stats: action.payload };
    case GET_DONATION_STATS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// Webhook Reducer
export const donationWebhookReducer = (state = {}, action) => {
  switch (action.type) {
    case DONATION_WEBHOOK_SUCCESS:
      return { paymentIntent: action.payload };
    default:
      return state;
  }
};