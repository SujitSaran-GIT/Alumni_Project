import { apiSlice } from './apiSlice';

export const activityApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRecentActivity: builder.query({
      query: () => '/activity/recent',
      providesTags: ['Activity']
    })
  })
});

export const { 
  useGetRecentActivityQuery 
} = activityApi;