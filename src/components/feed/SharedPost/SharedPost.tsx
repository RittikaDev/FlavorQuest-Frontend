/* eslint-disable @typescript-eslint/no-explicit-any */
import { FoodSpotCard } from "@/components/shared/FoodSpotCard/FoodSpotCard";
import FoodSpotCardSkeleton from "@/components/shared/FoodSpotCardSkeleton/FoodSpotCardSkeleton";
import Loading from "@/components/shared/Loading/Loading";
import MyContainer from "@/components/shared/MyContainer/MyContainer";
import { useGetMeQuery } from "@/redux/features/auth/authApi";
import { useGetAllCategoriesQuery } from "@/redux/features/category/category.api";
import { useGetUserSharesQuery } from "@/redux/features/share/share.api";
import { Empty, Pagination } from "antd";
import { Search, ChevronDown } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

const SharedPost = () => {
	// State management
	const searchParams = useSearchParams();
	const categoryFromParams = searchParams.get("category");
	const [page, setPage] = useState(1);
	const [pageSize, setPageSize] = useState(10);
	const [searchQuery, setSearchQuery] = useState("");
	const [priceRange, setPriceRange] = useState([0, 1000]);
	const [selectedCategory, setSelectedCategory] = useState(
		categoryFromParams ?? ""
	);
	const [sortBy, setSortBy] = useState("");
	const [objectQuery, setObjectQuery] = useState<
		{ name: string; value: string | number }[]
	>([]);
	console.log("objectQuery", objectQuery);
	// Initialize query
	useEffect(() => {
		setObjectQuery([
			{ name: "page", value: page },
			{ name: "limit", value: pageSize },
			{ name: "category", value: selectedCategory },
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

		if (searchQuery) newQuery.push({ name: "searchTerm", value: searchQuery });

		if (selectedCategory)
			newQuery.push({ name: "category", value: selectedCategory });

		if (priceRange[0] !== 0 || priceRange[1] !== 1000)
			newQuery.push(
				{ name: "minPrice", value: priceRange[0] },
				{ name: "maxPrice", value: priceRange[1] }
			);

		if (sortBy !== "") newQuery.push({ name: "sortBy", value: sortBy });

		setObjectQuery(newQuery);
	}, [page, pageSize, searchQuery, priceRange, selectedCategory, sortBy]);

	// Reset to first page when filters change
	useEffect(() => {
		setPage(1);
	}, [searchQuery, priceRange, selectedCategory, sortBy]);

	const { data: getMeResponse } = useGetMeQuery(undefined);

	//   console.log("getMeResponse", getMeResponse);
	const myData = getMeResponse?.data;

	// API call
	const { data, isLoading, isFetching } = useGetUserSharesQuery(myData.id);
	// console.log(data);

	const { data: categoriesResponse, isLoading: isCategoryLoading } =
		useGetAllCategoriesQuery(undefined);

	if (isCategoryLoading) {
		return <Loading />;
	}

	return (
		<div className="min-h-screen bg-gray-50 py-8 md:py-12">
			{/* Header */}
			<div className="bg-white shadow-sm">
				<MyContainer>
					<h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary">
						Discover Street Food
					</h1>
					<p className="text-gray-600 mt-2">
						Find the best hidden food spots in your city
					</p>
				</MyContainer>
			</div>

			{/* Search and Filter Bar */}
			<div className="bg-white border-b sticky top-0 z-20">
				<MyContainer className="py-4">
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
				</MyContainer>
			</div>

			{/* Spots Grid */}
			<MyContainer className="py-8 md:py-12">
				{!isLoading && !isFetching && data.length > 0 ? (
					<div className="grid grid-cols-1 gap-6">
						{data.map((spot: any) => (
							<FoodSpotCard key={spot?.id} spot={spot.post} />
						))}
					</div>
				) : (
					""
				)}

				{isLoading || isFetching ? (
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
						{Array.from({ length: pageSize }).map((_, index) => (
							<FoodSpotCardSkeleton key={index} />
						))}
					</div>
				) : (
					""
				)}

				{!isLoading && !isFetching && data?.data?.data?.length < 1 ? (
					<div className="text-center py-12">
						<Empty description={false} />
						<h3 className="text-lg font-medium text-gray-900">
							No spots found
						</h3>
						<p className="mt-1 text-gray-500">
							Try adjusting your search or filters
						</p>
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
			</MyContainer>
		</div>
	);
};

export default SharedPost;
