// components/FeaturedSpots.tsx
"use client";
import { FoodSpotCard } from "@/components/shared/FoodSpotCard/FoodSpotCard";
import FoodSpotCardSkeleton from "@/components/shared/FoodSpotCardSkeleton/FoodSpotCardSkeleton";
import MyContainer from "@/components/shared/MyContainer/MyContainer";
import SectionHead from "@/components/shared/SectionHead/SectionHead";
import MyButton from "@/components/ui/MyButton/MyButton";
import { useGetAllPostQuery } from "@/redux/features/posts/posts.user.api";
import { IPost } from "@/types/post.interface";
import { Empty } from "antd";
import Link from "next/link";

export default function FeaturedSpots() {
  const { data, isLoading, isFetching } = useGetAllPostQuery(
    [
      { name: "page", value: 1 },
      { name: "limit", value: 4 },
    ],
    {
      refetchOnMountOrArgChange: true,
    }
  );
  return (
    <section className="py-12 md:py-16 bg-slate-100/90">
      <MyContainer>
        <div className="flex justify-between items-center mb-6 md:mb-10">
          <SectionHead title="Featured Street Eats" />
          <Link href={"/spots"} className="hidden md:block">
            <MyButton label="View all" isArrow className="rounded-full" />
          </Link>
        </div>

        {!isLoading && !isFetching && data?.data?.data?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {data?.data?.data?.map((spot: IPost) => (
              <FoodSpotCard
                key={spot?.id}
                spot={spot}
                // onFavoriteToggle={onFavoriteToggle}
              />
            ))}
          </div>
        ) : (
          ""
        )}
        {isLoading || isFetching ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, index) => (
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
              No feature spots yet
            </h3>
          </div>
        ) : (
          ""
        )}
      </MyContainer>
    </section>
  );
}
