// components/FoodSpotCardSkeleton.tsx
import React from "react";

const FoodSpotCardSkeleton = () => {
  return (
    <div className="h-full rounded-xl overflow-hidden shadow-md border border-gray-100 bg-white flex flex-col animate-pulse">
      {/* Image Skeleton */}
      <div className="relative aspect-square w-full overflow-hidden bg-gray-200"></div>

      {/* Content Skeleton */}
      <div className="p-4 flex-grow space-y-3">
        <div className="flex justify-between items-start">
          <div className="h-6 w-3/4 rounded-md bg-gray-200"></div>
          <div className="h-5 w-12 rounded-md bg-gray-200"></div>
        </div>

        <div className="flex items-center">
          <div className="h-4 w-4 rounded-full bg-gray-200 mr-2"></div>
          <div className="h-4 w-2/3 rounded-md bg-gray-200"></div>
        </div>

        <div className="flex justify-between items-center">
          <div className="h-4 w-1/3 rounded-md bg-gray-200"></div>
          <div className="h-5 w-16 rounded-full bg-gray-200"></div>
        </div>

        {/* Posted By Skeleton */}
        <div className="flex items-center mt-4 pt-3 border-t border-gray-100">
          <div className="h-6 w-6 rounded-full bg-gray-200 mr-2"></div>
          <div className="h-3 w-32 rounded-md bg-gray-200"></div>
        </div>
      </div>

      {/* Bottom Stats Bar Skeleton */}
      <div className="px-4 py-3 bg-gray-50 flex justify-between items-center">
        <div className="h-4 w-8 rounded-md bg-gray-200"></div>
        <div className="h-4 w-8 rounded-md bg-gray-200"></div>
        <div className="h-4 w-16 rounded-md bg-gray-200"></div>
      </div>
    </div>
  );
};

export default FoodSpotCardSkeleton;
