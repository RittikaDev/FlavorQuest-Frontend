/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import MyButton from "@/components/ui/MyButton/MyButton";
import { selectCurrentToken } from "@/redux/features/auth/authSlice";
import {
  useGetFriendListQuery,
  useRemoveFriendMutation,
} from "@/redux/features/friend-request/friend.api";
import { useAppSelector } from "@/redux/hooks";
import { verifyToken } from "@/utils/verifyToken";
import { useRouter } from "next/navigation";
import Image from "next/image";

type FriendListProps = {
  limit?: number; // Optional limit for number of friends to show
};

export default function FriendList({ limit }: FriendListProps) {
  const router = useRouter();
  const currentUserToken = useAppSelector(selectCurrentToken);

  type UserWithRole = {
    role?: string;
    [key: string]: any;
  };

  const currentUser = currentUserToken
    ? (verifyToken(currentUserToken) as UserWithRole)
    : null;

  const { data, isLoading } = useGetFriendListQuery(undefined, {
    skip: !currentUser,
  });
  const [removeFriend, { isLoading: isRemoving }] = useRemoveFriendMutation();

  const friends = data?.friends || [];
  const visibleFriends = limit ? friends.slice(0, limit) : friends;

  if (isLoading) {
    return (
      <div className="border border-default/50 p-6 rounded-xl space-y-4 mt-6">
        <p className="text-sm text-gray-500">Loading friends...</p>
      </div>
    );
  }

  return (
    <div className="border border-default/50 p-6 rounded-xl space-y-4 mt-6">
      <h2 className="font-semibold text-lg">Your Friends</h2>

      {!currentUser ? (
        <p className="text-sm text-gray-500">
          <span
            className="text-blue-500 cursor-pointer hover:underline"
            onClick={() => router.push("/auth/login")}
          >
            Login
          </span>{" "}
          to see your friend list.
        </p>
      ) : visibleFriends.length === 0 ? (
        <p className="text-sm text-gray-500">You have no friends yet.</p>
      ) : (
        <>
          {visibleFriends.map((friend: any) => (
            <div
              key={friend.id}
              className="flex items-center justify-between gap-4 p-2 border border-default/30 rounded-md"
            >
              <div className="flex items-center gap-4">
                {friend.profilePhoto ? (
                  <Image
                    src={friend.profilePhoto}
                    alt={friend.name}
                    width={40}
                    height={40}
                    className="rounded-full object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-sm font-bold text-white">
                    {friend.name?.charAt(0).toUpperCase()}
                  </div>
                )}
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{friend.name}</span>
                  <span className="text-xs text-gray-500">{friend.email}</span>
                </div>
              </div>

              <MyButton
                label="Remove"
                variant="filled"
                className="text-sm px-3 py-1.5"
                customBg="rgb(220 38 38)"
                isDisabled={isRemoving}
                onClick={() => removeFriend({ friendId: friend.id })}
              />
            </div>
          ))}

          {limit && friends.length > limit && (
            <div className="flex justify-center pt-2">
              <MyButton
                label="View All"
                variant="filled"
                onClick={() => router.push("/friends/list")}
                className="px-8 py-1.5"
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}
