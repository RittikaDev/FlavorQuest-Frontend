import { baseApi } from "../../api/baseApi";

const groupApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		// Get all my groups
		getMyGroups: builder.query({
			query: () => ({
				url: "/groups",
				method: "GET",
			}),
			providesTags: ["group"],
		}),

		// Create a new group
		createGroup: builder.mutation({
			query: ({ name, memberIds }: { name: string; memberIds: string[] }) => ({
				url: "/groups",
				method: "POST",
				body: { name, memberIds },
			}),
			invalidatesTags: ["group"],
		}),

		// Add member to group
		addGroupMember: builder.mutation({
			query: ({ groupId, userId }: { groupId: string; userId: string }) => ({
				url: `/groups/${groupId}/members`,
				method: "POST",
				body: { userId },
			}),
			invalidatesTags: ["group"],
		}),

		// Remove member from group
		removeGroupMember: builder.mutation({
			query: ({ groupId, userId }: { groupId: string; userId: string }) => ({
				url: `/groups/${groupId}/members/${userId}`,
				method: "DELETE",
			}),
			invalidatesTags: ["group"],
		}),

		// Delete a group
		deleteGroup: builder.mutation({
			query: (groupId: string) => ({
				url: `/groups/${groupId}`,
				method: "DELETE",
			}),
			invalidatesTags: ["group"],
		}),
	}),
});

export const {
	useGetMyGroupsQuery,
	useCreateGroupMutation,
	useAddGroupMemberMutation,
	useRemoveGroupMemberMutation,
	useDeleteGroupMutation,
} = groupApi;
