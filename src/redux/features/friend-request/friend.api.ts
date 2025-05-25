import { baseApi } from "../../api/baseApi";

const friendApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		// GET MY FRIEND REQUESTS (INCOMING AND OUTGOING)
		getMyFriendRequests: builder.query({
			query: () => ({
				url: "/friend/requests/me",
				method: "GET",
			}),
			providesTags: ["friend"],
		}),

		// SEND A FRIEND REQUEST
		sendFriendRequest: builder.mutation({
			query: (receiverId: string) => ({
				url: "/friend/request",
				method: "POST",
				body: { receiverId },
			}),
			invalidatesTags: ["friend"],
		}),

		// RESPOND TO A FRIEND REQUEST (ACCEPTED OR REJECTED)
		respondToFriendRequest: builder.mutation({
			query: ({ requestId, status }) => ({
				url: `/friend/request/${requestId}/respond`,
				method: "PATCH",
				body: { status },
			}),
			invalidatesTags: ["friend"],
		}),
	}),
});

export const {
	useGetMyFriendRequestsQuery,
	useSendFriendRequestMutation,
	useRespondToFriendRequestMutation,
} = friendApi;
