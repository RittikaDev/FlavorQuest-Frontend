/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { Star } from "lucide-react";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import { useState } from "react";
import { Pagination } from "antd";
import { Rating, Star as Rate } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import MyButton from "@/components/ui/MyButton/MyButton";
import { useCreateRatingMutation } from "@/redux/features/rating/rating.api";
import { handleAsyncWithToast } from "@/utils/handleAsyncWithToast";
import { useAppSelector } from "@/redux/hooks";
import { selectCurrentToken } from "@/redux/features/auth/authSlice";
import { verifyToken } from "@/utils/verifyToken";
import { toast } from "sonner";
import { JwtPayload } from "jwt-decode";

interface IRatingUser {
  name: string;
  profilePhoto?: string;
}

interface IRating {
  id: string;
  score: number;
  userId: string;
  postId: string;
  createdAt: string;
  user: IRatingUser;
}

interface RatingSectionProps {
  ratings: IRating[];
  postId: string;
}

interface DecodedUser extends JwtPayload {
  id: string;
}

const RatingSection = ({ ratings, postId }: RatingSectionProps) => {
  const currentUserToken = useAppSelector(selectCurrentToken);
  const currentUser = currentUserToken ? verifyToken(currentUserToken) : null;
  const [rating, setRating] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [createRating] = useCreateRatingMutation();

  const handlePaginationChange = (page: number, pageSize: number) => {
    setPage(page);
    setPageSize(pageSize);
  };

  // Calculate paginated ratings
  const paginatedRatings = ratings?.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  const renderStars = (score: number) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Star
          key={i}
          size={16}
          className={
            i < score ? "fill-amber-400 text-amber-400" : "text-gray-300"
          }
        />
      ));
  };

  const handleSubmitRating = async () => {
    if (!currentUser) {
      toast.error("You must be logged in to perform this action!");
      return;
    }
    const isAlreadyRated =
      ratings?.some(
        (rating) => rating?.userId === (currentUser as DecodedUser)?.id
      ) || false;
    if (isAlreadyRated) {
      toast.error("You have already submitted your rating!");
      return;
    }
    if (rating < 1) {
      toast.error("Minimum 1 rating is required");
      return;
    }
    await handleAsyncWithToast(async () => {
      return createRating({ id: postId, data: { score: rating } });
    }, "Processing...");
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <Rating
          style={{ maxWidth: 180 }}
          value={rating}
          onChange={setRating}
          itemStyles={{
            itemShapes: Rate,
            activeFillColor: "#F79F39",
            inactiveFillColor: "#E6E8EC",
          }}
          isRequired
        />
        <MyButton
          onClick={handleSubmitRating}
          variant="outline"
          label="Submit Your Rating"
        />
      </div>
      {paginatedRatings.length === 0 ? (
        <p className="text-gray-500">No ratings yet</p>
      ) : (
        paginatedRatings.map((rating) => (
          <div
            key={rating.id}
            className="flex gap-3 p-4 border-b border-gray-100"
          >
            {/* User Avatar */}
            {rating.user.profilePhoto ? (
              <Image
                src={rating.user.profilePhoto}
                alt={rating.user.name}
                width={40}
                height={40}
                className="rounded-full w-10 h-10 object-cover"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-medium">
                {rating.user.name.charAt(0).toUpperCase()}
              </div>
            )}

            {/* Rating Content */}
            <div className="flex-1 max-w-sm">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium">{rating.user.name}</h4>
                  <div className="flex items-center gap-1 mt-1">
                    {renderStars(rating.score)}
                    <span className="text-xs text-gray-500 ml-1">
                      {rating.score.toFixed(1)}
                    </span>
                  </div>
                </div>
                <span className="text-xs text-gray-500">
                  {formatDistanceToNow(new Date(rating.createdAt), {
                    addSuffix: true,
                  })}
                </span>
              </div>

              {/* Additional rating content could go here */}
            </div>
          </div>
        ))
      )}
      <div className="p-4 w-full flex justify-center items-center mt-6">
        <Pagination
          current={page}
          pageSize={pageSize}
          total={ratings?.length}
          onChange={handlePaginationChange}
          className="custom-pagination"
          // showSizeChanger
          // pageSizeOptions={[5, 10, 20, 50]}
        />
      </div>
    </div>
  );
};

export default RatingSection;
