import { apiSlice } from './apiSlice';

export const contentApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFeaturedContent: builder.query({
      query: () => '/content/featured',
      providesTags: ['Content']
    }),
    getNews: builder.query({
      query: () => '/content/news',
      providesTags: ['Content']
    }),
    getTestimonials: builder.query({
      query: () => '/content/testimonials',
      providesTags: ['Content']
    })
  })
});

export const { 
  useGetFeaturedContentQuery,
  useGetNewsQuery,
  useGetTestimonialsQuery
} = contentApi;