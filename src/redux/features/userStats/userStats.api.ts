/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../../api/baseApi";

const userStatsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserStats: builder.query({
      query: (data) => {
        const params = new URLSearchParams();
        if (data) {
          data?.forEach((item: any) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: `/post/user-stats`,
          method: "GET",
          params: params,
        };
      },
      providesTags: ["user"],
    }),
  }),
});

export const { useGetUserStatsQuery } = userStatsApi;
