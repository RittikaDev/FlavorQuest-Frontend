/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import MyButton from "@/components/ui/MyButton/MyButton";
import { selectCurrentToken } from "@/redux/features/auth/authSlice";
import {
  useGetMyFriendRequestsQuery,
  useRespondToFriendRequestMutation,
} from "@/redux/features/friend-request/friend.api";
import { useAppSelector } from "@/redux/hooks";
import { verifyToken } from "@/utils/verifyToken";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type FriendRequestsProps = {
  limit?: number; // If not provided, show all
};

export default function FriendRequests({ limit }: FriendRequestsProps) {
  const router = useRouter();
  const currentUserToken = useAppSelector(selectCurrentToken);

  type UserWithRole = {
    role?: string;
    [key: string]: any;
  };

  const currentUser = currentUserToken
    ? (verifyToken(currentUserToken) as UserWithRole)
    : null;

  const { data, isLoading } = useGetMyFriendRequestsQuery(undefined, {
    skip: !currentUser,
  });

  const [respondToRequest] = useRespondToFriendRequestMutation();

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

  const handleReject = async (id: string) => {
    try {
      const res = await respondToRequest({ requestId: id, status: "REJECTED" });
      if (res.data.status === "REJECTED") {
        toast.success("Friend request rejected.");
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to reject friend request.");
    }
  };

  const visibleRequests = limit ? requests.slice(0, limit) : requests;

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

      {!currentUser ? (
        <p className="text-sm text-gray-500">
          <span
            className="text-blue-500 cursor-pointer hover:underline"
            onClick={() => router.push("/auth/login")}
          >
            Login
          </span>{" "}
          to see your friend requests and stay connected.
        </p>
      ) : requests.length === 0 ? (
        <p className="text-sm text-gray-500">No pending requests</p>
      ) : (
        <>
          {visibleRequests.map((user: any) => (
            <div
              key={user.id}
              className="flex justify-between items-center gap-4"
            >
              <span className="text-sm font-medium truncate max-w-[70%]">
                {user.sender.name}
              </span>
              <div className="flex-shrink-0 flex gap-1">
                <MyButton
                  label="Accept"
                  variant="filled"
                  className="text-sm px-3 py-1.5"
                  customBg="rgb(34 197 94)"
                  onClick={() => handleAccept(user.id)}
                />
                <MyButton
                  label="Reject"
                  variant="filled"
                  className="text-sm px-3 py-1.5"
                  customBg="rgb(220 38 38)"
                  onClick={() => handleReject(user.id)}
                />
              </div>
            </div>
          ))}

          {limit && requests.length > 1 && (
            <div className="flex justify-center pt-2">
              <MyButton
                label="View All"
                variant="filled"
                onClick={() => router.push("/profile")}
                className="px-8 py-1.5"
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}
