/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
// components/FoodSpotCard.tsx
import { cn } from "@/lib/utils";
import { IPost } from "@/types/post.interface";
import { Lock, MapPin, MessageSquare, Star, ThumbsUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function FoodSpotCard({
	spot,
	showAdminInfo = false,
	className,
}: {
	spot: IPost;
	showAdminInfo?: boolean;
	className?: string;
}) {
	const {
		id,
		title,
		description,
		location,
		minPrice,
		maxPrice,
		image,
		category,
		status,
		isPremium,
		adminComment,
		user,
		createdAt,
		votes,
		upvotesCount,
		averageRating,
	} = spot;

	const isApproved = status === "APPROVED";
	const priceRange = `$${minPrice.toFixed(2)}${
		maxPrice > minPrice ? ` - $${maxPrice.toFixed(2)}` : ""
	}`;
	const postedDate = new Date(createdAt).toLocaleDateString("en-US", {
		month: "short",
		day: "numeric",
		year: "numeric",
	});
	console.log(user);
	return (
		<Link href={`/spots/${id}`} className="block h-full">
			<div
				className={cn(
					"group relative h-full rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300",
					"border border-gray-100 hover:border-gray-200 bg-white",
					"flex flex-col",
					className
				)}
			>
				{/* Image Section */}
				<div className="relative aspect-square w-full overflow-hidden">
					<Image
						src={image || "/placeholder.png"}
						alt={title}
						fill
						className="object-cover transition-transform duration-500 group-hover:scale-105"
						sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
						priority
					/>

					{/* Gradient Overlay */}
					<div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/10 to-transparent" />

					{/* Premium Badge */}
					{isPremium && (
						<div className="absolute top-3 left-3 z-10 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center shadow-md">
							<Lock className="w-3 h-3 mr-1" />
							<span>Premium</span>
						</div>
					)}

					{/* Favorite Button */}
					{/* <button
            onClick={(e) => {
              e.preventDefault();
              onFavoriteToggle(id);
            }}
            className="absolute top-3 right-3 z-10 p-2 bg-white/90 rounded-full shadow-sm hover:bg-white transition-colors"
            aria-label={
              isFavorite ? "Remove from favorites" : "Add to favorites"
            }
          >
            <Heart
              className={cn(
                "w-5 h-5",
                isFavorite
                  ? "fill-red-500 text-red-500"
                  : "text-gray-400 hover:text-red-400"
              )}
            />
          </button> */}

					{/* Status Badge */}
					{!isApproved && (
						<div
							className={cn(
								"absolute bottom-3 left-3 z-10 px-3 py-1 rounded-full text-xs font-bold shadow-md",
								{
									"bg-yellow-100 text-yellow-800": status === "PENDING",
									"bg-red-100 text-red-800": status === "REJECTED",
								}
							)}
						>
							{status.charAt(0) + status.slice(1).toLowerCase()}
						</div>
					)}
				</div>

				{/* Main Content */}
				<div className="p-4 flex-grow">
					<div className="flex justify-between items-start mb-2">
						<h3 className="text-lg font-bold line-clamp-1">{title}</h3>
						<div className="flex items-center bg-primary/10 px-2 py-1 rounded-md min-w-[50px] justify-center">
							<Star className="w-3 h-3 fill-amber-400 text-amber-400 mr-1" />
							<span className="text-xs font-medium">
								{averageRating > 0 ? averageRating.toFixed(1) : "New"}
							</span>
						</div>
					</div>

					<div className="flex items-center text-sm text-gray-600 mb-2">
						<MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
						<span className="line-clamp-1">{location}</span>
					</div>

					<div className="flex justify-between items-center mb-3">
						<span className="text-sm font-medium text-primary">
							{priceRange}
						</span>
						<span className="text-xs px-2 py-1 bg-gray-100 rounded-full">
							{category?.name}
						</span>
					</div>

					{/* Posted By */}
					<div className="flex items-center mt-4 pt-3 border-t border-gray-100">
						{user.profilePhoto ? (
							<div className="relative w-6 h-6 rounded-full overflow-hidden mr-2">
								<Image
									src={user?.profilePhoto}
									alt={user.name}
									fill
									className="object-cover"
								/>
							</div>
						) : (
							<div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs mr-2">
								{user.name.charAt(0).toUpperCase()}
							</div>
						)}
						<div className="text-xs text-gray-500">
							<span>Posted by </span>
							<span className="font-medium">{user.name}</span>
							<span> • {postedDate}</span>
						</div>
					</div>
				</div>

				{/* Bottom Stats Bar */}
				<div className="px-4 py-3 bg-gray-50 flex justify-between items-center">
					<div className="flex items-center text-sm text-gray-600">
						<ThumbsUp className="w-4 h-4 mr-1" />
						<span>{upvotesCount}</span>
					</div>
					<div className="flex items-center text-sm text-gray-600">
						<MessageSquare className="w-4 h-4 mr-1" />
						<span>{votes?.length}</span>
					</div>
					<div
						className={cn("text-xs text-gray-500", {
							"text-green-500": isApproved,
						})}
					>
						{isApproved
							? "Approved"
							: `${status?.charAt(0)?.toUpperCase()}${status
									?.slice(1)
									.toLowerCase()}`}
					</div>
				</div>

				{/* Admin Info (Conditional) */}
				{showAdminInfo && adminComment && (
					<div className="p-3 bg-yellow-50 border-t border-yellow-100">
						<div className="text-xs font-medium text-yellow-800">
							Admin Note:
						</div>
						<p className="text-xs text-yellow-700 line-clamp-2">
							{adminComment}
						</p>
					</div>
				)}
			</div>
		</Link>
	);
}
