import { userLoginReducer, userRegisterReducer } from "./reducers/authReducers.js";
import { combineReducers, configureStore } from '@reduxjs/toolkit'

// Combine reducers under an 'auth' namespace
const rootReducer = combineReducers({
  auth: combineReducers({
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
  })
});

// Get user info from localStorage
const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

// Set initial state
const initialState = {
  auth: {
    userLogin: { userInfo: userInfoFromStorage },
    userRegister: { userInfo: userInfoFromStorage }
  }
};

const store = configureStore({
  reducer: rootReducer,
  preloadedState: initialState,
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;