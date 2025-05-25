"use client";

import Loading from "@/components/shared/Loading/Loading";
import SectionHead from "@/components/shared/SectionHead/SectionHead";
import MyButton from "@/components/ui/MyButton/MyButton";
import { useGetAllCategoriesQuery } from "@/redux/features/category/category.api";
import {
  useDeletePostForUserMutation,
  useGetMyPostsQuery,
} from "@/redux/features/posts/posts.user.api";
import { handleAsyncWithToast } from "@/utils/handleAsyncWithToast";
import { Empty, Pagination } from "antd";
import { ChevronDown, Search } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import MyPostTable from "./MyPostTable/MyPostTable";

const MyPostsPage = () => {
  // State management
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortBy, setSortBy] = useState("");
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

  // Handle pagination changes
  const handlePaginationChange = (page: number, pageSize: number) => {
    setPage(page);
    setPageSize(pageSize);
  };

  // Update query when search/filter parameters change
  useEffect(() => {
    const newQuery: { name: string; value: string | number }[] = [
      { name: "page", value: page },
      { name: "limit", value: pageSize },
    ];

    if (searchQuery) {
      newQuery.push({ name: "searchTerm", value: searchQuery });
    }

    if (selectedCategory) {
      newQuery.push({ name: "category", value: selectedCategory });
    }

    if (priceRange[0] !== 0 || priceRange[1] !== 1000) {
      newQuery.push(
        { name: "minPrice", value: priceRange[0] },
        { name: "maxPrice", value: priceRange[1] }
      );
    }

    if (sortBy !== "") {
      newQuery.push({ name: "sortBy", value: sortBy });
    }

    setObjectQuery(newQuery);
  }, [page, pageSize, searchQuery, priceRange, selectedCategory, sortBy]);

  // Reset to first page when filters change
  useEffect(() => {
    setPage(1);
  }, [searchQuery, priceRange, selectedCategory, sortBy]);

  // API call
  const { data, isLoading, isFetching } = useGetMyPostsQuery(objectQuery, {
    refetchOnMountOrArgChange: true,
  });
  const { data: categoriesResponse, isLoading: isCategoryLoading } =
    useGetAllCategoriesQuery(undefined);

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

  if (isCategoryLoading) {
    return <Loading />;
  }
  return (
    <div className="min-h-[calc(100vh-200px)] bg-gray-50 py-5">
      <SectionHead title="Manage your posts" className="text-start mb-3" />
      {/* Search and Filter Bar */}
      <div className="bg-white z-20">
        <div className="py-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search by name or category..."
                className="w-full border border-primary focus:outline-primary bg-transparent text-gray-400 rounded-lg p-2 pl-10 pr-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <select
                className="appearance-none border border-primary focus:outline-primary bg-transparent text-primary rounded-lg p-2 pr-8 cursor-pointer w-full"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">All Categories</option>
                {categoriesResponse?.data?.map(
                  (category: { name: string; id: string }) => (
                    <option key={category.id} value={category.name}>
                      {category.name}
                    </option>
                  )
                )}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-primary">
                <ChevronDown className="h-4 w-4" />
              </div>
            </div>

            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none border border-primary focus:outline-primary bg-transparent text-primary rounded-lg p-2 pr-8 cursor-pointer w-full"
              >
                <option value="">Sort By</option>
                <option value="popular">Most Popular</option>
                <option value="rating">Top Rated</option>
                <option value="newest">Newest</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-primary">
                <ChevronDown className="h-4 w-4" />
              </div>
            </div>
          </div>

          {/* Price Range Filter */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Price Range: ${priceRange[0]} - ${priceRange[1]}
            </label>
            <div className="flex items-center space-x-4">
              <input
                type="range"
                min="0"
                max="1000"
                step="1"
                value={priceRange[0]}
                onChange={(e) =>
                  setPriceRange([parseInt(e.target.value), priceRange[1]])
                }
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <input
                type="range"
                min={priceRange[0]}
                max="1000"
                step="1"
                value={priceRange[1]}
                onChange={(e) =>
                  setPriceRange([priceRange[0], parseInt(e.target.value)])
                }
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Spots table */}
      <div className="py-5">
        {!isLoading && !isFetching && data?.data?.data?.length > 0 ? (
          <div className="w-full">
            <MyPostTable
              posts={data?.data?.data}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </div>
        ) : (
          ""
        )}

        {isLoading || isFetching ? (
          <div className="w-full gap-x-2 flex justify-center items-center h-[200px]">
            <div className="w-5 bg-[#d991c2]  h-5 rounded-full animate-bounce"></div>
            <div className="w-5 h-5 bg-[#9869b8] rounded-full animate-bounce"></div>
            <div className="w-5 h-5 bg-[#6756cc] rounded-full animate-bounce"></div>
          </div>
        ) : (
          ""
        )}

        {!isLoading &&
        !isFetching &&
        (!data?.data?.data || data?.data?.data?.length < 1) ? (
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
        <div className="p-4 w-full flex justify-center items-center mt-6">
          <Pagination
            current={page}
            pageSize={pageSize}
            total={data?.data?.meta?.total}
            onChange={handlePaginationChange}
            className="custom-pagination"
            // showSizeChanger
            // pageSizeOptions={[5, 10, 20, 50]}
          />
        </div>
      </div>
    </div>
  );
};

export default MyPostsPage;
