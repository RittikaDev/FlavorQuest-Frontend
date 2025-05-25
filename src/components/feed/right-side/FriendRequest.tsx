/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import MyButton from "@/components/ui/MyButton/MyButton";
import {
	useGetMyFriendRequestsQuery,
	useRespondToFriendRequestMutation,
} from "@/redux/features/friend-request/friend.api";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function FriendRequests() {
	const router = useRouter();

	const { data, isLoading } = useGetMyFriendRequestsQuery(undefined);
	const [respondToRequest] = useRespondToFriendRequestMutation();

	console.log("Friend Requests Data:", data);

	const requests = data?.incoming || [];

	const handleAccept = async (id: string) => {
		try {
			const res = await respondToRequest({ requestId: id, status: "ACCEPTED" });
			if (res.data.status == "ACCEPTED")
				toast.success("Friend request accepted successfully!");
		} catch (err) {
			console.error("Error accepting request:", err);
			toast.error("Failed to accept friend request. Please try again.");
		}
	};

	if (isLoading) {
		return (
			<div className="border border-default/50 p-6 rounded-xl space-y-4 mt-6">
				<p className="text-sm text-gray-500">Loading friend requests...</p>
			</div>
		);
	}

	return (
		<div className="border border-default/50 p-6 rounded-xl space-y-4 mt-6">
			<h2 className="font-semibold text-lg">Friend Requests</h2>

			{requests.length === 0 ? (
				<p className="text-sm text-gray-500">No pending requests</p>
			) : (
				<>
					{requests.slice(0, 4).map((user: any) => (
						<div key={user.id} className="flex justify-between items-center">
							<span className="text-sm font-medium">{user.sender.name}</span>
							<MyButton
								label="Accept"
								variant="outline"
								onClick={() => handleAccept(user.id)}
							/>
						</div>
					))}

					{requests.length > 4 && (
						<div className="flex justify-end pt-2">
							<MyButton
								label="View All"
								variant="filled"
								onClick={() => router.push("/friends/requests")}
							/>
						</div>
					)}
				</>
			)}
		</div>
	);
}
