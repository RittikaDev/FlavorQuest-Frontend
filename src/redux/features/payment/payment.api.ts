/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../../api/baseApi";

const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllPayment: builder.query({
      query: (data) => {
        const params = new URLSearchParams();
        if (data?.queryObj) {
          data?.queryObj.forEach((item: any) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: `payment`,
          method: "GET",
          params: params,
        };
      },
      providesTags: ["payment"],
    }),
    getSinglePayment: builder.query({
      query: (id) => ({
        url: `payment/${id}`,
        method: "GET",
      }),
      providesTags: ["payment"],
    }),

    createPayment: builder.mutation({
      query: () => {
        return {
          url: "/subscribe",
          method: "POST",
        };
      },
      invalidatesTags: ["payment"],
    }),
    verifyPayment: builder.mutation({
      query: (data) => {
        return {
          url: "/subscribe/verify",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["payment"],
    }),
  }),
});

export const { useCreatePaymentMutation, useVerifyPaymentMutation } =
  paymentApi;
