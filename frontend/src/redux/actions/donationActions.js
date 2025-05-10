import API_BASE_URL from '../../utils/api.js';
import axios from 'axios';
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
} from '../constants/donationConstants.js';

const API = API_BASE_URL;

// Create Donation
export const createDonation = (donationData) => async (dispatch, getState) => {
  try {
    dispatch({ type: CREATE_DONATION_REQUEST });

    const {
      auth: { userLogin: { userInfo } }
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await axios.post(`${API}/donations`, donationData, config);

    dispatch({
      type: CREATE_DONATION_SUCCESS,
      payload: data
    });

    return data; // Return client secret for Stripe

  } catch (error) {
    dispatch({
      type: CREATE_DONATION_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
    throw error;
  }
};

// Create Recurring Donation
export const createRecurringDonation = (donationData) => async (dispatch, getState) => {
  try {
    dispatch({ type: CREATE_RECURRING_DONATION_REQUEST });

    const {
      auth: { userLogin: { userInfo } }
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await axios.post(`${API}/donations/recurring`, donationData, config);

    dispatch({
      type: CREATE_RECURRING_DONATION_SUCCESS,
      payload: data
    });

    return data; // Return client secret for Stripe

  } catch (error) {
    dispatch({
      type: CREATE_RECURRING_DONATION_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
    throw error;
  }
};

// Get Donations (User's donations)
export const getDonations = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_DONATIONS_REQUEST });

    const {
      auth: { userLogin: { userInfo } }
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await axios.get(`${API}/donations`, config);

    dispatch({
      type: GET_DONATIONS_SUCCESS,
      payload: data
    });

  } catch (error) {
    dispatch({
      type: GET_DONATIONS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

// Get All Donations (Admin)
export const getAllDonations = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_ALL_DONATIONS_REQUEST });

    const {
      auth: { userLogin: { userInfo } }
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await axios.get(`${API}/donations/admin/all`, config);

    dispatch({
      type: GET_ALL_DONATIONS_SUCCESS,
      payload: data
    });

  } catch (error) {
    dispatch({
      type: GET_ALL_DONATIONS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

// Get Donation by ID
export const getDonationById = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_DONATION_BY_ID_REQUEST });

    const {
      auth: { userLogin: { userInfo } }
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await axios.get(`${API}/donations/${id}`, config);

    dispatch({
      type: GET_DONATION_BY_ID_SUCCESS,
      payload: data
    });

  } catch (error) {
    dispatch({
      type: GET_DONATION_BY_ID_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

// Get Donations by Campaign
export const getDonationsByCampaign = (campaign) => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_DONATIONS_BY_CAMPAIGN_REQUEST });

    const {
      auth: { userLogin: { userInfo } }
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await axios.get(`${API}/donations/admin/campaign/${campaign}`, config);

    dispatch({
      type: GET_DONATIONS_BY_CAMPAIGN_SUCCESS,
      payload: data
    });

  } catch (error) {
    dispatch({
      type: GET_DONATIONS_BY_CAMPAIGN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

// Update Donation Status
export const updateDonationStatus = (id, status) => async (dispatch, getState) => {
  try {
    dispatch({ type: UPDATE_DONATION_STATUS_REQUEST });

    const {
      auth: { userLogin: { userInfo } }
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await axios.put(
      `${API}/donations/admin/${id}/status`,
      { status },
      config
    );

    dispatch({
      type: UPDATE_DONATION_STATUS_SUCCESS,
      payload: data
    });

  } catch (error) {
    dispatch({
      type: UPDATE_DONATION_STATUS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

// Get Donation Stats
export const getDonationStats = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_DONATION_STATS_REQUEST });

    const {
      auth: { userLogin: { userInfo } }
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await axios.get(`${API}/donations/stats`, config);

    dispatch({
      type: GET_DONATION_STATS_SUCCESS,
      payload: data
    });

  } catch (error) {
    dispatch({
      type: GET_DONATION_STATS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

// Handle Webhook Success
export const handleDonationWebhookSuccess = (paymentIntent) => (dispatch) => {
  dispatch({
    type: DONATION_WEBHOOK_SUCCESS,
    payload: paymentIntent
  });
};