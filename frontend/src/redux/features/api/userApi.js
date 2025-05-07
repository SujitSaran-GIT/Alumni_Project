import { apiSlice } from './apiSlice';

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => '/users',
      providesTags: ['User']
    }),
    updateProfile: builder.mutation({
      query: (data) => ({
        url: '/users/profile',
        method: 'PUT',
        body: data
      }),
      invalidatesTags: ['User']
    }),
    getUserStats: builder.query({
      query: () => '/users/stats',
      providesTags: ['UserStats']
    }),
    getAlumniStats: builder.query({
      query: () => '/users/alumni-stats',
      providesTags: ['AlumniStats']
    })
  })
});

export const { 
  useGetUsersQuery,
  useUpdateProfileMutation,
  useGetUserStatsQuery,
  useGetAlumniStatsQuery  
} = userApi;