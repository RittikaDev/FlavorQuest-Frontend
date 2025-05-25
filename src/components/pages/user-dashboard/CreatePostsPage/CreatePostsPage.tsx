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
import { useCreatePostMutation } from "@/redux/features/posts/posts.user.api";
import { useAppSelector } from "@/redux/hooks";
import { handleAsyncWithToast } from "@/utils/handleAsyncWithToast";
import { zodResolver } from "@hookform/resolvers/zod";
import { UploadCloud } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { z } from "zod";

// Define validation schema
const CreatePostsSchema = z
  .object({
    title: z
      .string({ required_error: "Title is required" })
      .min(1, "Title is required"),
    description: z
      .string({ required_error: "Description is required" })
      .min(10, "Description should be at least 10 characters"),
    location: z
      .string({ required_error: "Location is required" })
      .min(1, "Location is required"),
    minPrice: z
      .string({ required_error: "Minimum price is required" })
      .refine((val) => !isNaN(+val), {
        message: "Minimum price must be a valid number",
      })
      .transform((val) => +val)
      .refine((val) => val >= 10, {
        message: "Minimum price must be at least 10",
      }),

    maxPrice: z
      .string({ required_error: "Maximum price is required" })
      .refine((val) => !isNaN(+val), {
        message: "Maximum price must be a valid number",
      })
      .transform((val) => +val)
      .refine((val) => val >= 20, {
        message: "Maximum price must be at least 20",
      }),
    categoryId: z
      .string({ required_error: "Category is required" })
      .uuid("Invalid category ID"),
    image: z.instanceof(File, { message: "Image is required" }),
  })
  .refine((data) => data.maxPrice >= data.minPrice, {
    message: "Maximum price must be greater than or equal to minimum price",
    path: ["maxPrice"],
  });

type CreatePostFormInputs = z.infer<typeof CreatePostsSchema>;

const CreatePostsPage = () => {
  const currentUser = useAppSelector(selectCurrentUser);
  const router = useRouter();
  const { data: categoriesResponse, isLoading } =
    useGetAllCategoriesQuery(undefined);
  const [createPost] = useCreatePostMutation();

  const handleSubmit = async (data: CreatePostFormInputs, reset: any) => {
    const formData = new FormData();

    // Append the file
    formData.append("file", data.image);

    // Append other fields as JSON
    const postData = {
      title: data.title,
      description: data.description,
      location: data.location,
      minPrice: data.minPrice,
      maxPrice: data.maxPrice,
      categoryId: data.categoryId,
    };
    formData.append("data", JSON.stringify(postData));

    const result = await handleAsyncWithToast(
      async () => createPost(formData),
      "Creating post..."
    );

    if (result?.data?.success) {
      toast.success(result.data.message);
      if (currentUser?.role === "ADMIN"){
         router.push("/dashboard/my-post");
      } else{
        router.push("/user/my-posts");
      }
        
      reset();
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-primary">Create New Post</h1>

      <MyFormWrapper
        resolver={zodResolver(CreatePostsSchema)}
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <MyFormInput name="title" placeHolder="Item title" label="Title" />

        <MyFormTextArea
          name="description"
          placeHolder="Item description"
          label="Description"
        />

        <div className="grid grid-cols-1 gap-4">
          <MyFormInput
            name="location"
            placeHolder="Location"
            label="Location"
          />

          <MyFormSelect
            name="categoryId"
            placeHolder="Category"
            label="Category"
            options={categoriesResponse?.data?.map(
              (category: { name: string; id: string }) => {
                return {
                  label: category?.name,
                  value: category?.id,
                };
              }
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <MyFormInput
            name="minPrice"
            placeHolder="Minimum price"
            label="Min Price"
          />

          <MyFormInput
            name="maxPrice"
            placeHolder="Maximum price"
            label="Max Price"
          />
        </div>

        <MyFormImageUpload
          name="image"
          label="Display Image"
          inputClassName="cursor-pointer"
        >
          <div className="flex items-center flex-col justify-center text-primary border border-dashed border-gray-300 rounded-lg p-5 cursor-pointer">
            <UploadCloud className="w-5 h-5 mr-2" />
            <span className="text-sm text-center font-medium">
              Upload item image
            </span>
            <p className="mt-1 text-xs text-center text-gray-500">
              PNG, JPG up to 3MB
            </p>
          </div>
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
            label="Create Post"
            className="rounded-full"
          />
        </div>
      </MyFormWrapper>
    </div>
  );
};

export default CreatePostsPage;
