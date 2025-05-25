/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Loading from "@/components/shared/Loading/Loading";
import MyButton from "@/components/ui/MyButton/MyButton";
import MyFormImageUpload from "@/components/ui/MyForm/MyFormImageUpload/MyFormImageUpload";
import MyFormInput from "@/components/ui/MyForm/MyFormInput/MyFormInput";
import MyFormSelect from "@/components/ui/MyForm/MyFormSelect/MyFormSelect";
import MyFormTextArea from "@/components/ui/MyForm/MyFormTextArea/MyFormTextArea";
import MyFormWrapper from "@/components/ui/MyForm/MyFormWrapper/MyFormWrapper";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useGetAllCategoriesQuery } from "@/redux/features/category/category.api";
import {
  useGetSinglePostQuery,
  useUpdatePostMutation,
} from "@/redux/features/posts/posts.user.api";
import { useAppSelector } from "@/redux/hooks";
import { handleAsyncWithToast } from "@/utils/handleAsyncWithToast";
import { zodResolver } from "@hookform/resolvers/zod";
import { UploadCloud } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { z } from "zod";

// Define validation schema with all fields optional
const UpdatePostsSchema = z
  .object({
    title: z.string().min(1, "Title must be at least 1 character").optional(),
    description: z
      .string()
      .min(10, "Description should be at least 10 characters")
      .optional(),
    location: z
      .string()
      .min(1, "Location must be at least 1 character")
      .optional(),
    minPrice: z
      .string()
      .refine((val) => !val || !isNaN(+val), {
        message: "Minimum price must be a valid number",
      })
      .transform((val) => (val ? +val : undefined))
      .refine((val) => !val || val >= 10, {
        message: "Minimum price must be at least 10",
      })
      .optional(),
    maxPrice: z
      .string()
      .refine((val) => !val || !isNaN(+val), {
        message: "Maximum price must be a valid number",
      })
      .transform((val) => (val ? +val : undefined))
      .refine((val) => !val || val >= 20, {
        message: "Maximum price must be at least 20",
      })
      .optional(),
    categoryId: z.string().uuid("Invalid category ID").optional(),
    image: z.any().optional(),
  })
  .refine(
    (data) => {
      if (data.minPrice && data.maxPrice) {
        return data.maxPrice >= data.minPrice;
      }
      return true;
    },
    {
      message: "Maximum price must be greater than or equal to minimum price",
      path: ["maxPrice"],
    }
  );

type UpdatePostFormInputs = z.infer<typeof UpdatePostsSchema>;

const UpdatePostsPage = ({ postId }: { postId: string }) => {
  const currentUser = useAppSelector(selectCurrentUser);
  const router = useRouter();
  const { data: categoriesResponse, isLoading } =
    useGetAllCategoriesQuery(undefined);
  const { data: singlePostResponse, isLoading: isPostLoading } =
    useGetSinglePostQuery(postId);
  const [updatePost] = useUpdatePostMutation();

  const handleSubmit = async (data: UpdatePostFormInputs, reset: any) => {
    const formData = new FormData();

    // Only append the file if it exists
    if (data.image) {
      formData.append("file", data.image);
    }

    // Create object with only provided fields
    const postData: Record<string, any> = {};
    if (data.title) postData.title = data.title;
    if (data.description) postData.description = data.description;
    if (data.location) postData.location = data.location;
    if (data.minPrice !== undefined) postData.minPrice = data.minPrice;
    if (data.maxPrice !== undefined) postData.maxPrice = data.maxPrice;
    if (data.categoryId) postData.categoryId = data.categoryId;

    // Only append data if there are fields to update
    if (Object.keys(postData).length > 0) {
      formData.append("data", JSON.stringify(postData));
    }

    const result = await handleAsyncWithToast(
      async () => updatePost({ id: postId, data: formData }),
      "Updating post..."
    );

    if (result?.data?.success) {
      toast.success(result.data.message);
      if (currentUser?.role === "ADMIN") {
        router.push("/dashboard/my-post");
      } else {
        router.push("/user/my-posts");
      }
      reset();
    }
  };

  if (isLoading || isPostLoading) {
    return <Loading />;
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-primary">Update Post</h1>

      <MyFormWrapper
        resolver={zodResolver(UpdatePostsSchema)}
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <MyFormInput
          value={singlePostResponse?.data?.title}
          name="title"
          placeHolder="Item title"
          label="Title"
        />

        <MyFormTextArea
          value={singlePostResponse?.data?.description}
          name="description"
          placeHolder="Item description"
          label="Description"
        />

        <div className="grid grid-cols-1 items-center gap-4">
          <MyFormInput
            value={singlePostResponse?.data?.location}
            name="location"
            placeHolder="Location"
            label="Location"
          />

          <MyFormSelect
            defaultValue={singlePostResponse?.data?.categoryId}
            name="categoryId"
            placeHolder="Category"
            label="Category"
            options={categoriesResponse?.data?.map(
              (category: { name: string; id: string }) => ({
                label: category?.name,
                value: category?.id,
              })
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <MyFormInput
            value={String(singlePostResponse?.data?.minPrice)}
            name="minPrice"
            placeHolder="Minimum price"
            label="Min Price"
          />

          <MyFormInput
            value={String(singlePostResponse?.data?.maxPrice)}
            name="maxPrice"
            placeHolder="Maximum price"
            label="Max Price"
          />
        </div>

        <MyFormImageUpload
          defaultValue={singlePostResponse?.data?.image}
          name="image"
          label="Display Image"
          inputClassName="cursor-pointer"
        >
          <div className="flex items-center flex-col justify-center text-primary border border-dashed border-gray-300 rounded-lg p-5 cursor-pointer">
            <UploadCloud className="w-5 h-5 mr-2" />
            <span className="text-sm text-center font-medium">
              Upload new image (optional)
            </span>
            <p className="mt-1 text-xs text-center text-gray-500">
              PNG, JPG up to 3MB
            </p>
          </div>
          {/* {singlePostResponse?.data?.image ? (
            <div className="object-cover mt-5">
              <Image
                src={singlePostResponse?.data?.image}
                alt="image"
                height="250"
                width="250"
                className="mt-5"
              />
            </div>
          ) : (
            ""
          )} */}
        </MyFormImageUpload>

        <div className="flex justify-end gap-4 pt-4">
          <MyButton
            type="button"
            label="Cancel"
            variant="outline"
            onClick={() => router.back()}
            className="rounded-full"
          />
          <MyButton
            type="submit"
            label="Update Post"
            className="rounded-full"
          />
        </div>
      </MyFormWrapper>
    </div>
  );
};

export default UpdatePostsPage;
