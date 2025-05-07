import { apiSlice } from './apiSlice';

export const donationApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCampaigns: builder.query({
      query: () => '/donations/campaigns',
      providesTags: ['Donation']
    }),
    createDonation: builder.mutation({
      query: (data) => ({
        url: '/donations/create',
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['Donation']
    }),
    getDonationHistory: builder.query({
      query: () => '/donations/history',
      providesTags: ['Donation']
    })
  })
});

export const { 
  useGetCampaignsQuery,
  useCreateDonationMutation,
  useGetDonationHistoryQuery 
} = donationApi;