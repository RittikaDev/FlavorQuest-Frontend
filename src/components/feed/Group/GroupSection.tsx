/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import {
	useGetMyGroupsQuery,
	useCreateGroupMutation,
	useDeleteGroupMutation,
	useRemoveGroupMemberMutation,
	useAddGroupMemberMutation,
} from "@/redux/features/group/group.api";
import { useGetFriendListQuery } from "@/redux/features/friend-request/friend.api";
import { toast } from "sonner";
import { selectCurrentToken } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import { verifyToken } from "@/utils/verifyToken";
import MyButton from "@/components/ui/MyButton/MyButton";
import Swal from "sweetalert2";
import { handleAsyncWithToast } from "@/utils/handleAsyncWithToast";

const GroupSection = () => {
	const { data: groups, isLoading: loadingGroups } =
		useGetMyGroupsQuery(undefined);
	const currentUserToken = useAppSelector(selectCurrentToken);

	type UserWithRole = {
		id: string;
		role?: string;
		[key: string]: any;
	};

	const currentUser = currentUserToken
		? (verifyToken(currentUserToken) as UserWithRole)
		: null;

	const { data, isLoading: loadingFriends } = useGetFriendListQuery(undefined, {
		skip: !currentUser,
	});
	const friends = data?.friends || [];

	const [createGroup] = useCreateGroupMutation();
	const [deleteGroup] = useDeleteGroupMutation();
	const [deleteGroupMember] = useRemoveGroupMemberMutation();
	const [addMemberToGroup] = useAddGroupMemberMutation(); // ✅ new

	const [groupName, setGroupName] = useState("");
	const [selectedMemberIds, setSelectedMemberIds] = useState<string[]>([]);

	const handleAddMember = (friendId: string) => {
		if (friendId && !selectedMemberIds.includes(friendId))
			setSelectedMemberIds([...selectedMemberIds, friendId]);
	};

	const handleRemoveMember = (friendId: string) => {
		setSelectedMemberIds(selectedMemberIds.filter((id) => id !== friendId));
	};

	const handleCreateGroup = async () => {
		if (!groupName || selectedMemberIds.length === 0) {
			toast.info("Please enter a group name and select at least one member.");
			return;
		}

		try {
			await createGroup({
				name: groupName,
				memberIds: selectedMemberIds,
			}).unwrap();

			toast.success("Group created successfully");
			setGroupName("");
			setSelectedMemberIds([]);
		} catch (err) {
			console.log(err);
			toast.error("Failed to create group");
		}
	};

	const handleDeleteGroup = async (id: string) => {
		Swal.fire({
			title: "Are you sure you want to delete this group?",
			text: "You won't be able to revert this!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Yes, delete it!",
		}).then(async (result) => {
			if (result.isConfirmed) {
				const res = await handleAsyncWithToast(async () => {
					return deleteGroup(id).unwrap();
				}, "Deleting...");
				if (res?.data?.success)
					Swal.fire({
						title: "Deleted!",
						text: "Group has been deleted.",
						icon: "success",
					});
			}
		});
	};

	const handleRemoveGroupMember = async (groupId: string, userId: string) => {
		Swal.fire({
			title: "Are you sure you want to remove this member?",
			text: "They will no longer be part of the group.",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Yes, remove them!",
		}).then(async (result) => {
			if (result.isConfirmed) {
				const res = await handleAsyncWithToast(async () => {
					return deleteGroupMember({ groupId, userId }).unwrap();
				}, "Removing member...");

				if (res?.data?.success)
					Swal.fire({
						title: "Removed!",
						text: "Member has been removed from the group.",
						icon: "success",
					});
			}
		});
	};

	// ✅ Add member to existing group
	const handleAddMemberToExistingGroup = async (
		groupId: string,
		userId: string
	) => {
		const res = await handleAsyncWithToast(
			() => addMemberToGroup({ groupId, userId }).unwrap(),
			"Adding member..."
		);
		if (res?.success) toast.success("Member added successfully!");
		else toast.error(res?.message || "Failed to add member");
	};

	return (
		<div className="p-8 max-w-4xl mx-auto">
			<h2 className="text-2xl font-semibold text-gray-800 mb-6">My Groups</h2>

			{/* Create Group */}
			<div className="bg-white rounded-xl shadow p-6 mb-8 border border-gray-200">
				<h3 className="text-lg font-medium text-gray-700 mb-4">
					Create a New Group
				</h3>

				<div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-4 md:space-y-0 mb-4">
					<input
						type="text"
						placeholder="Group Name"
						value={groupName}
						onChange={(e) => setGroupName(e.target.value)}
						className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>

					<select
						onChange={(e) => {
							handleAddMember(e.target.value);
							e.target.value = "";
						}}
						disabled={loadingFriends}
						className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
						defaultValue=""
					>
						<option value="" disabled>
							{loadingFriends ? "Loading friends..." : "Select a friend to add"}
						</option>
						{friends
							.filter((f: any) => !selectedMemberIds.includes(f.id))
							.map((friend: any) => (
								<option key={friend.id} value={friend.id}>
									{friend.name} ({friend.email})
								</option>
							))}
					</select>
				</div>

				<div className="flex flex-wrap gap-2 mb-4">
					{selectedMemberIds.map((id) => {
						const friend = friends.find((f: any) => f.id === id);
						if (!friend) return null;
						return (
							<div
								key={id}
								className="bg-blue-100 text-blue-800 px-3 py-1.5 rounded-full flex items-center text-sm font-medium capitalize"
							>
								{friend.name}
								<button
									onClick={() => handleRemoveMember(id)}
									className="ml-2 text-red-500 hover:text-red-700 font-bold"
									title="Remove Member"
								>
									×
								</button>
							</div>
						);
					})}
				</div>

				<button
					onClick={handleCreateGroup}
					className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2.5 rounded-lg transition"
				>
					Create Group
				</button>
			</div>

			{/* Group List */}
			<div className="space-y-6">
				{loadingGroups ? (
					<p className="text-gray-500">Loading groups...</p>
				) : groups?.length > 0 ? (
					groups.map((group: any) => (
						<div
							key={group.id}
							className="bg-white border border-gray-200 rounded-xl shadow p-6 space-y-4"
						>
							<div className="flex justify-between items-center">
								<div>
									<h4 className="text-lg font-semibold text-gray-800">
										{group.name}
									</h4>
									<p className="text-sm text-gray-500">Members:</p>
								</div>
								<MyButton
									label="Delete Group"
									variant="filled"
									className="text-sm px-4 py-2"
									customBg="rgb(220 38 38)"
									onClick={() => handleDeleteGroup(group.id)}
								/>
							</div>

							<div className="flex flex-wrap gap-2">
								{group.members.map((m: any) => {
									const isOwner = group.ownerId === m.user.id;
									return (
										<div
											key={m.id}
											className="bg-gray-100 text-gray-800 px-3 py-1.5 rounded-full flex items-center text-sm"
										>
											{m.user.name}
											{!isOwner && (
												<button
													onClick={() =>
														handleRemoveGroupMember(group.id, m.user.id)
													}
													className="ml-2 text-red-500 hover:text-red-700 font-bold"
													title="Remove Member"
												>
													×
												</button>
											)}
										</div>
									);
								})}
							</div>

							<select
								onChange={(e) => {
									if (e.target.value) {
										handleAddMemberToExistingGroup(group.id, e.target.value);
										e.target.value = "";
									}
								}}
								className="border border-gray-300 rounded-lg px-4 py-2 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
								defaultValue=""
							>
								<option value="" disabled>
									Add new member
								</option>
								{friends
									.filter(
										(f: any) =>
											!group.members.some((m: any) => m.user.id === f.id)
									)
									.map((friend: any) => (
										<option key={friend.id} value={friend.id}>
											{friend.name} ({friend.email})
										</option>
									))}
							</select>
						</div>
					))
				) : (
					<p className="text-gray-500">No groups found.</p>
				)}
			</div>
		</div>
	);
};

export default GroupSection;
