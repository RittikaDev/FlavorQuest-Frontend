/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import Loading from "@/components/shared/Loading/Loading";
import MyButton from "@/components/ui/MyButton/MyButton";
import { selectCurrentToken } from "@/redux/features/auth/authSlice";
import { useGetSinglePostQuery } from "@/redux/features/posts/posts.user.api";
import { useAppSelector } from "@/redux/hooks";
import { ISinglePost } from "@/types/singlePost.interface";
import { verifyToken } from "@/utils/verifyToken";
import { JwtPayload } from "jwt-decode";
import { MdThumbDown, MdThumbUp } from "react-icons/md";
import {
  ChevronLeft,
  Lock,
  MapPin,
  Star,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  useCreateVoteMutation,
  useUnVoteMutation,
} from "@/redux/features/vote/vote.user.api";
import { toast } from "sonner";
import { useState } from "react";
import { CommentSection } from "./CommentSection/CommentSection";
import MyContainer from "@/components/shared/MyContainer/MyContainer";
import RatingSection from "./RatingSection/RatingSection";
import { handleAsyncWithToast } from "@/utils/handleAsyncWithToast";

interface DecodedUser extends JwtPayload {
  id: string;
}

const SpotDetailsPage = ({ spotId }: { spotId: string }) => {
  const currentUserToken = useAppSelector(selectCurrentToken);
  const currentUser = currentUserToken ? verifyToken(currentUserToken) : null;
  const [createVoteMutation] = useCreateVoteMutation();
  const [unVote] = useUnVoteMutation();
  const [isActionLoading, setIsActionLoading] = useState(false);

  const {
    data: response,
    isLoading,
    isFetching,
    refetch,
  } = useGetSinglePostQuery(spotId, {
    skip: !spotId,
  });

  const spot: ISinglePost = response?.data;
  const priceRange = `$${spot?.minPrice.toFixed(2)} - $${spot?.maxPrice.toFixed(
    2
  )}`;
  const postedDate = new Date(spot?.createdAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  if (isLoading) {
    return <Loading />;
  }

  console.log(response);

  const isAlreadyUpvoted =
    spot?.votes?.some(
      (vote) =>
        vote?.type === "UPVOTE" &&
        vote?.userId === (currentUser as DecodedUser)?.id
    ) || false;

  const isAlreadyDownVoted =
    spot?.votes?.some(
      (vote) =>
        vote?.type === "DOWNVOTE" &&
        vote?.userId === (currentUser as DecodedUser)?.id
    ) || false;

  const createVote = async (type: string) => {
    setIsActionLoading(true);
    if (!currentUser) {
      toast.error("You must be logged in to perform this action!");
      setIsActionLoading(false);
      return;
    }
    if (isAlreadyUpvoted && type === "UPVOTE") {
      await unVote(spot?.id).unwrap();
      refetch();
      setIsActionLoading(false);
      return;
    }
    if (isAlreadyDownVoted && type === "DOWNVOTE") {
      await unVote(spot?.id).unwrap();
      refetch();
      setIsActionLoading(false);
      return;
    }
    interface CreateVotePayload {
      id: string;
      data: {
        type: string;
      };
    }
    const payload: CreateVotePayload = {
      id: spot?.id ?? "",
      data: { type },
    };
    // await createVoteMutation({ id: payload.id, data: payload.data }).unwrap();
    await handleAsyncWithToast(async () => {
      return createVoteMutation({ id: payload.id, data: payload.data });
    }, "Vote is on processing...")
    refetch();
    setIsActionLoading(false);
  };

  return (
    <MyContainer className="py-8">
      {/* Back Button */}
      <Link
        href="/spots"
        className="inline-flex items-center mb-6 text-primary hover:underline"
      >
        <ChevronLeft className="w-5 h-5 mr-1" />
        Back to all spots
      </Link>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Image */}
        <div className="relative aspect-square rounded-xl overflow-hidden shadow-lg">
          <Image
            src={spot?.image || "/placeholder.png"}
            alt={spot?.title}
            fill
            className="object-cover"
            priority
          />

          {/* Premium Badge */}
          {spot?.isPremium && (
            <div className="absolute top-4 left-4 z-10 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center shadow-md">
              <Lock className="w-3 h-3 mr-1" />
              <span>Premium</span>
            </div>
          )}
        </div>

        {/* Right Column - Details */}
        <div className="space-y-6">
          {/* Title and Rating */}
          <div className="flex justify-between items-start">
            <h1 className="text-3xl font-bold">{spot.title}</h1>
            <div className="flex items-center bg-primary/10 px-3 py-1 rounded-md">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400 mr-1" />
              <span className="font-medium">
                {spot?.averageRating.toFixed(1)} ({spot?.ratings?.length}{" "}
                reviews)
              </span>
            </div>
          </div>

          {/* Location */}
          <div className="flex items-center text-gray-700">
            <MapPin className="w-5 h-5 mr-2 text-primary" />
            <span>{spot?.location}</span>
          </div>

          {/* Price and Category */}
          <div className="flex items-center space-x-4">
            <span className="text-lg font-semibold text-primary">
              {priceRange}
            </span>
            <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">
              {spot?.category?.name}
            </span>
          </div>

          {/* Description */}
          <div className="prose max-w-none">
            <p className="text-gray-700">{spot?.description}</p>
          </div>

          {/* Posted By */}
          <div className="flex items-center pt-4 border-t border-gray-200">
            {spot.user.profilePhoto ? (
              <div className="relative w-10 h-10 rounded-full overflow-hidden mr-3">
                <Image
                  src={spot?.user.profilePhoto || "/placeholder.png"}
                  alt={spot?.user.name}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-sm font-medium mr-3">
                {spot?.user?.name.charAt(0).toUpperCase()}
              </div>
            )}
            <div>
              <p className="font-medium">{spot?.user?.name}</p>
              <p className="text-sm text-gray-500">Posted on {postedDate}</p>
            </div>
          </div>

          {/* Admin Note */}
          {spot?.adminComment && (
            <div className="p-4 bg-yellow-50 border border-yellow-100 rounded-lg">
              <p className="text-sm font-medium text-yellow-800">Admin Note:</p>
              <p className="text-sm text-yellow-700 mt-1">
                {spot?.adminComment}
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col xs:flex-row gap-4 pt-4">
            <MyButton
              onClick={() => createVote("UPVOTE")}
              isDisabled={isFetching || isActionLoading}
              label={`Upvote (${spot?.upvoteCount})`}
              customIcon={
                isAlreadyUpvoted ? (
                  <MdThumbUp className="w-5 h-5 mr-2" />
                ) : (
                  <ThumbsUp className="w-5 h-5 mr-2" />
                )
              }
              variant="outline"
              className="flex items-center"
            />
            <MyButton
              onClick={() => createVote("DOWNVOTE")}
              isDisabled={isFetching || isActionLoading}
              label={`DownVote (${spot?.downvoteCount})`}
              customIcon={
                isAlreadyDownVoted ? (
                  <MdThumbDown className="w-5 h-5 mr-2" />
                ) : (
                  <ThumbsDown className="w-5 h-5 mr-2" />
                )
              }
              variant="outline"
              className="flex items-center"
            />
          </div>
        </div>
      </div>

      {/* Comments Section */}
      <section className="mt-16">
        <h2 className="text-2xl font-bold mb-6">
          Comments ({spot?.commentCount})
        </h2>
        <CommentSection comments={spot?.comments} postId={spot?.id} />
      </section>

      {/* Rating section  */}
      <section className="mt-16">
        <h2 className="text-2xl font-bold mb-6">
          Rating ({spot?.ratings?.length})
        </h2>
        <RatingSection ratings={spot?.ratings} postId={spot?.id} />
      </section>
    </MyContainer>
  );
};

export default SpotDetailsPage;
