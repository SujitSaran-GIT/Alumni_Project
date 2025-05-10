import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { userLoginReducer, userRegisterReducer } from "./reducers/authReducers.js";

import {
  userListReducer,
  userProfileReducer,
  userDetailsReducer,
  userDeleteReducer,
  userRoleUpdateReducer,
  userSearchReducer,
  userStatsReducer,
  bulkUpdateUsersReducer,
  verifyUserReducer,
  passwordResetRequestReducer,
  lastActiveUpdateReducer,
  exportUsersReducer
} from "./reducers/userReducers.js";

import {
  profileCreateUpdateReducer,
  profileDetailsReducer,
  profileListReducer,
  mentorListReducer,
  mentorStatusReducer,
  profileDeleteReducer,
  profileSearchReducer
} from "./reducers/profileReducers.js";

import {
  postCreateReducer,
  postListReducer,
  postDetailsReducer,
  postUpdateReducer,
  postDeleteReducer,
  postCommentReducer,
  postUpvoteReducer,
  postsByTagReducer,
  postsByAuthorReducer,
  postSearchReducer,
  postAnalyticsReducer
} from "./reducers/postReducers.js";
import {
  eventCreateReducer,
  eventListReducer,
  eventDetailsReducer,
  eventUpdateReducer,
  eventCancelReducer,
  eventRegisterReducer,
  eventsByOrganizerReducer,
  eventSearchReducer,
  myEventsReducer
} from "./reducers/eventReducers.js";

// import {
//   donationCreateReducer,
//   recurringDonationCreateReducer,
//   donationListReducer,
//   allDonationsListReducer,
//   donationDetailsReducer,
//   donationsByCampaignReducer,
//   donationStatusUpdateReducer,
//   donationStatsReducer,
//   donationWebhookReducer
// } from './reducers/donationReducers.js';

import {
  mentorshipRequestReducer,
  mentorsListReducer,
  mentorshipRequestsReducer,
  mentorshipResponseReducer,
  activeMentorshipsReducer,
  mentorshipCompletionReducer,
  meetingAddReducer,
  mentorshipDetailsReducer,
  userMentorshipsReducer,
  allMentorshipsReducer,
  mentorshipStatsReducer,
  mentorshipCancellationReducer,
  mentorsSearchReducer
} from './reducers/mentorshipReducers.js';

import {
  notificationsListReducer,
  notificationsByTypeReducer,
  unreadNotificationsCountReducer,
  notificationMarkAsReadReducer,
  notificationDeleteReducer
} from './reducers/notificationReducers.js';

import {
  jobCreateReducer,
  jobListReducer,
  allJobsListReducer,
  jobDetailsReducer,
  jobUpdateReducer,
  jobCloseReducer,
  jobForceCloseReducer,
  jobDeleteReducer,
  jobApplyReducer,
  jobApplicationsReducer,
  allApplicationsReducer,
  myPostedJobsReducer,
  myAppliedJobsReducer,
  jobSearchReducer
} from './reducers/jobReducers.js';

// Combine reducers under namespaces
const rootReducer = combineReducers({
  auth: combineReducers({
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
  }),
  userList: userListReducer,
  userProfile: userProfileReducer,
  userDetails: userDetailsReducer,
  userDelete: userDeleteReducer,
  userRoleUpdate: userRoleUpdateReducer,
  userSearch: userSearchReducer,
  userStats: userStatsReducer,
  bulkUpdateUsers: bulkUpdateUsersReducer,
  verifyUser: verifyUserReducer,
  passwordResetRequest: passwordResetRequestReducer,
  lastActiveUpdate: lastActiveUpdateReducer,
  exportUsers: exportUsersReducer,
  
  profile: combineReducers({
    createUpdate: profileCreateUpdateReducer,
    details: profileDetailsReducer,
    list: profileListReducer,
    mentorList: mentorListReducer,
    mentorStatus: mentorStatusReducer,
    delete: profileDeleteReducer,
    search: profileSearchReducer
  }),
  
  post: combineReducers({
    create: postCreateReducer,
    list: postListReducer,
    details: postDetailsReducer,
    update: postUpdateReducer,
    delete: postDeleteReducer,
    comment: postCommentReducer,
    upvote: postUpvoteReducer,
    byTag: postsByTagReducer,
    byAuthor: postsByAuthorReducer,
    search: postSearchReducer,
    analytics: postAnalyticsReducer
  }),
  
  event: combineReducers({
    create: eventCreateReducer,
    list: eventListReducer,
    details: eventDetailsReducer,
    update: eventUpdateReducer,
    cancel: eventCancelReducer,
    register: eventRegisterReducer,
    byOrganizer: eventsByOrganizerReducer,
    search: eventSearchReducer,
    myEvents: myEventsReducer
  }),

  job: combineReducers({
    create: jobCreateReducer,
    list: jobListReducer,
    allList: allJobsListReducer,
    details: jobDetailsReducer,
    update: jobUpdateReducer,
    close: jobCloseReducer,
    forceClose: jobForceCloseReducer,
    delete: jobDeleteReducer,
    apply: jobApplyReducer,
    applications: jobApplicationsReducer,
    allApplications: allApplicationsReducer,
    myPosted: myPostedJobsReducer,
    myApplied: myAppliedJobsReducer,
    search: jobSearchReducer
  }),

  // donation: combineReducers({
  //   create: donationCreateReducer,
  //   createRecurring: recurringDonationCreateReducer,
  //   list: donationListReducer,
  //   allList: allDonationsListReducer,
  //   details: donationDetailsReducer,
  //   byCampaign: donationsByCampaignReducer,
  //   updateStatus: donationStatusUpdateReducer,
  //   stats: donationStatsReducer,
  //   webhook: donationWebhookReducer
  // }),

  mentorship: combineReducers({
    request: mentorshipRequestReducer,
    mentorsList: mentorsListReducer,
    requests: mentorshipRequestsReducer,
    response: mentorshipResponseReducer,
    active: activeMentorshipsReducer,
    completion: mentorshipCompletionReducer,
    addMeeting: meetingAddReducer,
    details: mentorshipDetailsReducer,
    userMentorships: userMentorshipsReducer,
    allMentorships: allMentorshipsReducer,
    stats: mentorshipStatsReducer,
    cancellation: mentorshipCancellationReducer,
    search: mentorsSearchReducer
  }),
   
  notification: combineReducers({
    list: notificationsListReducer,
    byType: notificationsByTypeReducer,
    unreadCount: unreadNotificationsCountReducer,
    markAsRead: notificationMarkAsReadReducer,
    delete: notificationDeleteReducer
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
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
      serializableCheck: false
    })
});

export default store;