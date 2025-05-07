import { apiSlice } from './apiSlice';

export const mentorshipApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMentors: builder.query({
      query: () => '/mentorship/mentors',
      providesTags: ['Mentor']
    }),
    requestMentorship: builder.mutation({
      query: (data) => ({
        url: '/mentorship/request',
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['Mentorship']
    }),
    getMentorshipRequests: builder.query({
      query: () => '/mentorship/requests',
      providesTags: ['Mentorship']
    })
  })
});

export const { 
  useGetMentorsQuery,
  useRequestMentorshipMutation,
  useGetMentorshipRequestsQuery
} = mentorshipApi;