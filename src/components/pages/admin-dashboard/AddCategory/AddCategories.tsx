"use client";

import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import MyFormWrapper from "@/components/ui/MyForm/MyFormWrapper/MyFormWrapper";
import MyButton from "@/components/ui/MyButton/MyButton";
import MyFormInput from "@/components/ui/MyForm/MyFormInput/MyFormInput";
import { usePostCategoryMutation } from "@/redux/features/admin/admin.api";

const categorySchema = z.object({
  name: z.string().min(1, "Category name is required"),
});

type TCategoryInput = z.infer<typeof categorySchema>;

const AddCategoryForm = () => {
  const [postCategory] = usePostCategoryMutation();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleFormSubmit = async (data: TCategoryInput,reset: any) => {
    try {
      await postCategory(data).unwrap();
      toast.success("Category added successfully!");
      reset()
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      toast.error(`Failed to add category. ${data.name} already exists`);
    }
  };

  return (
    <div className="lg:mt-32 md:mt-20 mt-10 flex items-center justify-center px-4">
      <div className="bg-white border border-green-500 p-6 rounded-xl shadow-2xl w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4 text-center">Add Category</h2>
        <MyFormWrapper
          resolver={zodResolver(categorySchema)}
          onSubmit={handleFormSubmit}
          className="space-y-4"
        >
          <MyFormInput
            name="name"
            placeHolder="Enter category name"
            type="text"
          />
          <MyButton type="submit" label="Submit" fullWidth />
        </MyFormWrapper>
      </div>
    </div>
  );
};

export default AddCategoryForm;
