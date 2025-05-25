/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../../api/baseApi";

const ratingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllRating: builder.query({
      query: (data) => {
        const params = new URLSearchParams();
        if (data) {
          data?.forEach((item: any) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: `/rating`,
          method: "GET",
          params: params,
        };
      },
      providesTags: ["rating"],
    }),
    getSingleRating: builder.query({
      query: (id) => ({
        url: `/rating/${id}`,
        method: "GET",
      }),
      providesTags: ["rating"],
    }),

    createRating: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `/rating/${id}`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["rating", "post"],
    }),
  }),
});

export const {
  useCreateRatingMutation,
  useGetAllRatingQuery,
  useGetSingleRatingQuery,
} = ratingApi;
