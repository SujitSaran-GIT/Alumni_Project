// jobApi.js
import { apiSlice } from './apiSlice';

export const jobApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getJobs: builder.query({
      query: () => '/jobs',
      providesTags: ['Job']
    }),
    applyForJob: builder.mutation({
      query: (jobId) => ({
        url: `/jobs/${jobId}/apply`,
        method: 'POST'
      }),
      invalidatesTags: ['Job']
    })
  })
});

export const { 
  useGetJobsQuery,
  useApplyForJobMutation 
} = jobApi;