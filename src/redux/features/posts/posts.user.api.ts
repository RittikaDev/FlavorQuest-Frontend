/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../../api/baseApi";

const postUserApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllPost: builder.query({
      query: (data) => {
        const params = new URLSearchParams();
        if (data) {
          data?.forEach((item: any) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: `/post`,
          method: "GET",
          params: params,
        };
      },
      providesTags: ["post"],
    }),
    getMyPosts: builder.query({
      query: (data) => {
        const params = new URLSearchParams();
        if (data) {
          data?.forEach((item: any) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: `/post/user-posts`,
          method: "GET",
          params: params,
        };
      },
      providesTags: ["post"],
    }),
    getSinglePost: builder.query({
      query: (id) => ({
        url: `/post/postById/${id}`,
        method: "GET",
      }),
      providesTags: ["post"],
    }),

    createPost: builder.mutation({
      query: (data) => {
        return {
          url: "/post",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["post"],
    }),

    updatePost: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `/post/updateByUser/${id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["post"],
    }),
    deletePostForUser: builder.mutation({
      query: (id) => {
        return {
          url: `/post/delete/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["post"],
    }),
  }),
});

export const {
  useCreatePostMutation,
  useUpdatePostMutation,
  useGetAllPostQuery,
  useGetSinglePostQuery,
  useDeletePostForUserMutation,
  useGetMyPostsQuery,
} = postUserApi;
