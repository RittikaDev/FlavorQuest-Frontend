/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import MyButton from "@/components/ui/MyButton/MyButton";
import { selectCurrentToken } from "@/redux/features/auth/authSlice";
import {
  useGetSuggestedFriendsQuery,
  useSendFriendRequestMutation,
} from "@/redux/features/friend-request/friend.api";
import { useAppSelector } from "@/redux/hooks";
import { verifyToken } from "@/utils/verifyToken";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type SendFriendRequestsProps = {
  limit?: number; // Optional: number of users to show
};

export default function SendFriendRequests({ limit }: SendFriendRequestsProps) {
  const router = useRouter();
  const currentUserToken = useAppSelector(selectCurrentToken);

  type UserWithRole = {
    role?: string;
    [key: string]: any;
  };

  const currentUser = currentUserToken
    ? (verifyToken(currentUserToken) as UserWithRole)
    : null;

  const { data, isLoading } = useGetSuggestedFriendsQuery(undefined, {
    skip: !currentUser,
  });

  const [sendRequest] = useSendFriendRequestMutation();

  const suggestions = data?.suggestions || [];
  const visibleSuggestions = limit ? suggestions.slice(0, limit) : suggestions;

  const handleSendRequest = async (receiverId: string) => {
    try {
      const res = await sendRequest(receiverId);
      if (res.data.status === "PENDING") toast.success("Friend request sent!");
    } catch (err) {
      console.error("Error sending request:", err);
      toast.error("Failed to send friend request. Try again.");
    }
  };

  if (isLoading) {
    return (
      <div className="border border-default/50 p-6 rounded-xl space-y-4 mt-6">
        <p className="text-sm text-gray-500">Loading suggestions...</p>
      </div>
    );
  }

  return (
    <div className="border border-default/50 p-6 rounded-xl space-y-4 mt-6">
      <h2 className="font-semibold text-lg">People You May Know</h2>

      {!currentUser ? (
        <p className="text-sm text-gray-500">
          <span
            className="text-blue-500 cursor-pointer hover:underline"
            onClick={() => router.push("/auth/login")}
          >
            Login
          </span>{" "}
          to send friend requests.
        </p>
      ) : visibleSuggestions.length === 0 ? (
        <p className="text-sm text-gray-500">No suggestions available</p>
      ) : (
        <>
          {visibleSuggestions.map((user: any) => (
            <div
              key={user.id}
              className="flex justify-between items-center gap-4"
            >
              <span className="text-sm font-medium truncate max-w-[70%]">
                {user.name}
              </span>
              {user.friendRequestStatus === "PENDING" && user.isSender ? (
                <span className="text-xs text-gray-500">
                  <MyButton
                    label="Pending"
                    variant="filled"
                    className="text-sm px-5 py-1.5"
                    customBg="rgb(253, 218, 13)"
                  />
                </span>
              ) : user.friendRequestStatus === "REJECTED" && user.isSender ? (
                <span className="text-xs text-red-500">
                  {" "}
                  <MyButton
                    label="Rejected"
                    variant="filled"
                    className="text-sm px-4 py-1.5"
                    customBg="rgb(220 38 38)"
                  />
                </span>
              ) : (
                <MyButton
                  label="Add Friend"
                  variant="filled"
                  className="text-sm px-3 py-1.5"
                  onClick={() => handleSendRequest(user.id)}
                />
              )}
            </div>
          ))}

          {limit && suggestions.length > limit && (
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
