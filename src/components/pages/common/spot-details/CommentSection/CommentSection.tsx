/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import MyButton from "@/components/ui/MyButton/MyButton";
import MyFormTextArea from "@/components/ui/MyForm/MyFormTextArea/MyFormTextArea";
import MyFormWrapper from "@/components/ui/MyForm/MyFormWrapper/MyFormWrapper";
import { selectCurrentToken } from "@/redux/features/auth/authSlice";
import { useCreateCommentMutation } from "@/redux/features/comment/comment.api";
import { useAppSelector } from "@/redux/hooks";
import { handleAsyncWithToast } from "@/utils/handleAsyncWithToast";
import { verifyToken } from "@/utils/verifyToken";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pagination } from "antd";
import { formatDistanceToNow } from "date-fns";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

interface IComment {
  id: string;
  text: string;
  userId: string;
  postId: string;
  createdAt: string;
  user?: {
    name: string;
    profilePhoto?: string;
  }; // Optional user details
}

interface CommentSectionProps {
  comments: IComment[];
  postId: string;
}

const commentSchema = z.object({
  text: z
    .string({ required_error: "Comment is required" })
    .min(1, "Comment cannot be empty")
    .max(500, "Comment must be less than 500 characters"),
});

type CommentFormInputs = z.infer<typeof commentSchema>;

export function CommentSection({ comments, postId }: CommentSectionProps) {
  const [createComment] = useCreateCommentMutation();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const currentUserToken = useAppSelector(selectCurrentToken);
  const currentUser = currentUserToken ? verifyToken(currentUserToken) : null;

  const handleSubmit = async (data: CommentFormInputs, reset: any) => {
    if (!currentUser) {
      toast.error("You must be logged in to perform this action!");
      return;
    }
    const res = await handleAsyncWithToast(async () => {
      return createComment({ id: postId, data: data });
    }, "Posting comment...");
    if (res?.data?.success) {
      reset();
    }
  };

  const handlePaginationChange = (page: number, pageSize: number) => {
    setPage(page);
    setPageSize(pageSize);
  };

  // Calculate paginated comments
  const paginatedComments = comments?.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  return (
    <div className="space-y-6">
      {/* Comment Form */}
      <div className="bg-white py-4 rounded-lg shadow-sm">
        <MyFormWrapper
          resolver={zodResolver(commentSchema)}
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <MyFormTextArea
            name="text"
            placeHolder="Write your comment..."
            label="Add Comment"
          />
          <div className="flex justify-end">
            <MyButton
              type="submit"
              label="Post Comment"
              className="rounded-full"
            />
          </div>
        </MyFormWrapper>
      </div>
      {paginatedComments.length === 0 ? (
        <p className="text-gray-500">
          No comments yet. Be the first to comment!
        </p>
      ) : (
        <div className="space-y-4">
          {paginatedComments?.map((comment) => (
            <div key={comment.id} className="flex gap-3">
              {comment?.user?.profilePhoto ? (
                <Image
                  src={comment?.user?.profilePhoto as string}
                  alt="profile"
                  height={40}
                  width={40}
                  className="rounded-full object-cover w-11 h-11"
                />
              ) : (
                <div className="w-11 h-11 rounded-full bg-primary text-white flex items-center justify-center text-primary-foreground font-medium flex-shrink-0">
                  {comment?.user?.name?.charAt(0)?.toUpperCase()}
                </div>
              )}

              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium">
                    {comment.user?.name || "Anonymous"}
                  </span>
                  <span className="text-xs text-gray-500">
                    {formatDistanceToNow(new Date(comment.createdAt), {
                      addSuffix: true,
                    })}
                  </span>
                </div>
                <p className="mt-1 text-sm">{comment.text}</p>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="p-4 w-full flex justify-center items-center mt-6">
        <Pagination
          current={page}
          pageSize={pageSize}
          total={comments?.length}
          onChange={handlePaginationChange}
          className="custom-pagination"
          // showSizeChanger
          // pageSizeOptions={[5, 10, 20, 50]}
        />
      </div>
    </div>
  );
}
