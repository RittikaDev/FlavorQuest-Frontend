/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../../api/baseApi";

const voteUserApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // getAllPost: builder.query({
    //   query: (data) => {
    //     const params = new URLSearchParams();
    //     if (data) {
    //       data?.forEach((item: any) => {
    //         params.append(item.name, item.value as string);
    //       });
    //     }
    //     return {
    //       url: `/post`,
    //       method: "GET",
    //       params: params,
    //     };
    //   },
    //   providesTags: ["post"],
    // }),
    // getSinglePost: builder.query({
    //   query: (id) => ({
    //     url: `/post/postById/${id}`,
    //     method: "GET",
    //   }),
    //   providesTags: ["post"],
    // }),

    createVote: builder.mutation({
      query: ({id, data}) => {
        return {
          url: `/vote/${id}`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["vote"],
    }),

    // updatePost: builder.mutation({
    //   query: ({ id, data }) => {
    //     return {
    //       url: `/post/updateByUser/${id}`,
    //       method: "PATCH",
    //       body: data,
    //     };
    //   },
    //   invalidatesTags: ["post"],
    // }),
    unVote: builder.mutation({
      query: (id) => {
        return {
          url: `/vote/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["vote"],
    }),
  }),
});

export const { useCreateVoteMutation, useUnVoteMutation } = voteUserApi;
