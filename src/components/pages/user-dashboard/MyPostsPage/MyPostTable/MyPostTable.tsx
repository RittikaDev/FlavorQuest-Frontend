import { IMyPost } from "@/types/mypost.interface";
import { Tooltip } from "antd";
import {
  Info,
  Lock,
  MapPin,
  MessageSquare,
  Star,
  ThumbsUp,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FiEdit, FiTrash2 } from "react-icons/fi";

const MyPostTable = ({
  posts,
  onEdit,
  onDelete,
}: {
  posts: IMyPost[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}) => {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200 text-text-primary">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500  uppercase tracking-wider"
            >
              Spot
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500  uppercase tracking-wider"
            >
              Location
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500  uppercase tracking-wider"
            >
              Price Range
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500  uppercase tracking-wider"
            >
              Category
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500  uppercase tracking-wider"
            >
              Status
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500  uppercase tracking-wider"
            >
              Stats
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500  uppercase tracking-wider"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {posts?.map((post) => (
            <tr
              key={post.id}
              className="hover:bg-gray-50 transition-all duration-500"
            >
              {/* Spot Column */}
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full overflow-hidden">
                    <Image
                      src={post.image || "/placeholder.png"}
                      alt={post.title}
                      width={40}
                      height={40}
                      className="object-cover"
                    />
                  </div>
                  <div className="ml-4">
                    <Link
                      href={`/spots/${post?.id}`}
                      className="text-sm cursor-pointer font-medium text-gray-900  flex items-center"
                    >
                      {post?.title?.length > 30
                        ? post?.title?.substring(0, 30) + "..."
                        : post?.title}
                      {post?.isPremium && (
                        <span className="ml-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs px-2 py-0.5 rounded-full flex items-center">
                          <Lock className="h-3 w-3 mr-1" />
                          Premium
                        </span>
                      )}
                    </Link>
                    <div className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1">
                      {post.description}
                    </div>
                  </div>
                </div>
              </td>

              {/* Location Column */}
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900  flex items-center">
                  <MapPin className="mr-2 h-4 w-4 text-gray-500 dark:text-gray-400" />
                  {post.location}
                </div>
              </td>

              {/* Price Range Column */}
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900 ">
                  ${post?.minPrice?.toFixed(2) ?? 0} - $
                  {post?.maxPrice?.toFixed(2) ?? 0}
                </div>
              </td>

              {/* Category Column */}
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                  {post.category.name}
                </span>
              </td>

              {/* Status Column */}
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    post.status === "APPROVED"
                      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                      : post.status === "PENDING"
                      ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                      : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                  }`}
                >
                  {post.status.charAt(0) + post.status.slice(1).toLowerCase()}
                </span>
                {post.adminComment && (
                  <Tooltip title={post.adminComment}>
                    <Info className="ml-2 h-4 w-4 text-gray-400 inline" />
                  </Tooltip>
                )}
              </td>

              {/* Stats Column */}
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex space-x-4 text-sm">
                  <div className="flex items-center text-gray-900 ">
                    <Star className="mr-1 h-4 w-4 text-amber-400" />
                    {post.averageRating.toFixed(1) || 0}
                  </div>
                  <div className="flex items-center text-gray-900 ">
                    <ThumbsUp className="mr-1 h-4 w-4 text-blue-400" />
                    {post.upvotesCount || 0}
                  </div>
                  <div className="flex items-center text-gray-900 ">
                    <MessageSquare className="mr-1 h-4 w-4 text-green-400" />
                    {post.comments.length || 0}
                  </div>
                </div>
              </td>

              {/* Actions Column */}
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div className="flex space-x-2">
                  <button
                    onClick={() => onEdit(post.id)}
                    className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    <FiEdit className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => onDelete(post.id)}
                    className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                  >
                    <FiTrash2 className="h-5 w-5" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {posts?.length === 0 && (
        <div className="bg-white dark:bg-gray-800 p-8 text-center">
          <p className="text-gray-500 dark:text-gray-400">No posts found</p>
        </div>
      )}
    </div>
  );
};

export default MyPostTable;
