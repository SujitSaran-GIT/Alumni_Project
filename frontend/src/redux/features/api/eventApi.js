import { apiSlice } from './apiSlice';

export const eventApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getEvents: builder.query({
      query: () => '/events',
      providesTags: ['Event']
    }),
    getUpcomingEvents: builder.query({
      query: () => '/events/upcoming',
      providesTags: ['Event']
    }),
    registerForEvent: builder.mutation({
      query: (eventId) => ({
        url: `/events/${eventId}/register`,
        method: 'POST'
      }),
      invalidatesTags: ['Event']
    }),
    createEvent: builder.mutation({
      query: (eventData) => ({
        url: '/events',
        method: 'POST',
        body: eventData
      }),
      invalidatesTags: ['Event']
    })
  })
});

export const { 
  useGetEventsQuery,
  useGetUpcomingEventsQuery, // Add this export
  useRegisterForEventMutation,
  useCreateEventMutation 
} = eventApi;