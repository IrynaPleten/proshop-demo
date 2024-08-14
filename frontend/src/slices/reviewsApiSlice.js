import { REVIEWS_URL } from '../constants';
import { apiSlice } from './apiSlice';

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getReviews: builder.query({
      query: ({ pageNumber }) => ({
        url: `${REVIEWS_URL}`,
        params: { pageNumber },
      }),
      providesTags: ['Reviews'],
    }),
    deleteReview: builder.mutation({
      query: (id) => ({
        url: `${REVIEWS_URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Reviews'],
    }),
  }),
});

export const {
  useGetReviewsQuery,
  useDeleteReviewMutation,
} = productsApiSlice;
