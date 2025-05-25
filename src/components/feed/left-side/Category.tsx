import { useGetAllCategoriesQuery } from "@/redux/features/category/category.api";
import React from "react";

const Category = () => {
  const { data: categoriesResponse, isLoading: isCategoryLoading } =
    useGetAllCategoriesQuery(undefined);
  return (
    <div>
      {isCategoryLoading ? (
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-200 rounded w-3/4"></div>
          <div className="h-6 bg-gray-200 rounded w-full"></div>
          <div className="h-6 bg-gray-200 rounded w-2/3"></div>
        </div>
      ) : (
        <div className="border border-default/50 p-6 rounded-xl space-y-2">
          <h2 className="font-semibold text-lg">Categories</h2>
          <div className="gap-2 flex flex-wrap">
            {categoriesResponse.data.map(
              (category: { name: string; id: string }) => (
                <button
                  key={category.id}
                  className={`px-3 py-1 rounded-full border text-sm bg-gray-100 hover:bg-gray-200`}
                >
                  {category.name}
                </button>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Category;
