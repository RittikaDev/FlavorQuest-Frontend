import React from "react";
import UpdatePostPage from "@/components/pages/user-dashboard/UpdatePostPage/UpdatePostPage";

const UpdatePost = async ({
  params,
}: {
  params: Promise<{ postId: string }>;
}) => {
  const { postId } = await params;
  return (
    <div>
      <UpdatePostPage postId={postId} />
    </div>
  );
};

export default UpdatePost;
