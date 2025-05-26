import { baseApi } from "../../api/baseApi";

const shareApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		// SHARE POST TO USER OR GROUP
		sharePost: builder.mutation({
			query: ({
				senderId,
				postId,
				message,
				receiverId = null,
				groupId = null,
			}) => ({
				url: "/share",
				method: "POST",
				body: { senderId, postId, message, receiverId, groupId },
			}),
			invalidatesTags: ["share"],
		}),

		// GET SHARES SENT TO A USER
		getUserShares: builder.query({
			query: (userId: string) => ({
				url: `/share/user/${userId}`,
				method: "GET",
			}),
			providesTags: ["share"],
		}),

		// GET SHARES SENT TO A GROUP
		getGroupShares: builder.query({
			query: (groupId: string) => ({
				url: `/share/group/${groupId}`,
				method: "GET",
			}),
			providesTags: ["share"],
		}),
	}),
});

export const {
	useSharePostMutation,
	useGetUserSharesQuery,
	useGetGroupSharesQuery,
} = shareApi;
