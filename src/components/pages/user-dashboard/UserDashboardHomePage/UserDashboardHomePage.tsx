/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import SectionHead from "@/components/shared/SectionHead/SectionHead";
import MyButton from "@/components/ui/MyButton/MyButton";
import {
  useDeletePostForUserMutation,
  useGetMyPostsQuery
} from "@/redux/features/posts/posts.user.api";
import { useGetUserStatsQuery } from "@/redux/features/userStats/userStats.api";
import { handleAsyncWithToast } from "@/utils/handleAsyncWithToast";
import { Empty } from "antd";
import { LocationEdit, Star, Vote } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import MyPostTable from "../MyPostsPage/MyPostTable/MyPostTable";

const UserDashboardHomePage = () => {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [objectQuery, setObjectQuery] = useState<
    { name: string; value: string | number }[]
  >([]);
  // Initialize query
  useEffect(() => {
    setObjectQuery([
      { name: "page", value: page },
      { name: "limit", value: pageSize },
    ]);
  }, []);
  const { data, isLoading, isFetching } = useGetUserStatsQuery(undefined);
  // API call
  const {
    data: postsResponse,
    isLoading: isPostsLoading,
    isFetching: isPostsFetching,
  } = useGetMyPostsQuery(objectQuery, {
    refetchOnMountOrArgChange: true,
  });

  const handleEdit = (postId: string) => {
    router.push(`/user/update-post/${postId}`);
  };

  const [deletePost] = useDeletePostForUserMutation();

  const handleDelete = async (postId: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await handleAsyncWithToast(async () => {
          return deletePost(postId);
        }, "Deleting...");
        if (res?.data?.success) {
          Swal.fire({
            title: "Deleted!",
            text: "Post has been deleted.",
            icon: "success",
          });
        }
      }
    });
  };

  const statsCardsData = [
    {
      title: "Total Posts",
      value: data?.data?.totalPosts?.toString(),
      icon: <LocationEdit size={30} className="text-white" />,
    },
    {
      title: "Total Votes",
      value: `Upvote: ${data?.data?.totalUpvotes} || Downvote: ${data?.data?.totalDownvotes}`,
      icon: <Vote size={30} className="text-white" />,
    },
    {
      title: "Ratings",
      value: `Total: ${
        data?.data?.totalRatings
      } || Avg: ${data?.data?.averageRating?.toFixed(1)}`,
      icon: <Star size={30} className="text-white" />,
    },
  ];
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-primary">
        {/* Stat Card Template */}
        {!isLoading &&
          !isFetching &&
          statsCardsData?.map((card, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-primary/20 shadow-inner hover:shadow-lg transition-all duration-300 flex flex-col gap-4"
            >
              <h2 className="font-semibold text-xl md:text-2xl text-primary">
                {card.title}
              </h2>
              <div className="flex items-center gap-4">
                <div className="bg-gradient-to-br from-primary to-blue-500 p-3 rounded-2xl shadow-md">
                  {card.icon}
                </div>
                <p className="font-medium text-base text-primary">
                  {card.value}
                </p>
              </div>
            </div>
          ))}

        {isLoading || isFetching
          ? [1, 2, 3].map((_, index: number) => (
              <div
                key={index}
                className="flex items-center p-4 bg-gray-50 rounded-lg shadow-md animate-pulse h-[150px]"
              >
                <div className="w-10 h-10 bg-gray-300 rounded-full mr-4"></div>
                <div className="flex flex-col">
                  <div className="w-24 h-6 bg-gray-300 rounded mb-2"></div>
                  <div className="w-16 h-4 bg-gray-300 rounded"></div>
                </div>
              </div>
            ))
          : ""}
      </div>
      {/* Spots table */}
      <div className="py-5">
        {postsResponse?.data?.data ? (
          <SectionHead
            title="Your Latest Posts"
            className="text-start py-4 text-text-primary"
          />
        ) : (
          ""
        )}
        {!isPostsLoading &&
        !isPostsFetching &&
        postsResponse?.data?.data?.length > 0 ? (
          <div className="w-full">
            <MyPostTable
              posts={postsResponse?.data?.data}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </div>
        ) : (
          ""
        )}

        {isPostsLoading || isPostsFetching ? (
          <div className="w-full gap-x-2 flex justify-center items-center h-[200px]">
            <div className="w-5 bg-[#d991c2] animate-pulse h-5 rounded-full animate-bounce"></div>
            <div className="w-5 animate-pulse h-5 bg-[#9869b8] rounded-full animate-bounce"></div>
            <div className="w-5 h-5 animate-pulse bg-[#6756cc] rounded-full animate-bounce"></div>
          </div>
        ) : (
          ""
        )}

        {!isPostsLoading && !isPostsFetching && !postsResponse?.data?.data ? (
          <div className="text-center flex items-center justify-center flex-col gap-3 py-12">
            <Empty description={false} />
            <h3 className="text-lg font-medium text-gray-900">
              No spots found
            </h3>
            <Link href={`/user/create-post`}>
              <MyButton label="Create a post" className="rounded-full" />
            </Link>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default UserDashboardHomePage;
