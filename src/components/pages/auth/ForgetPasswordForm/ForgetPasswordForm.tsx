/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import MyButton from "@/components/ui/MyButton/MyButton";
import MyFormInput from "@/components/ui/MyForm/MyFormInput/MyFormInput";
import MyFormWrapper from "@/components/ui/MyForm/MyFormWrapper/MyFormWrapper";
import { useForgotPasswordMutation } from "@/redux/features/auth/authApi";
import { handleAsyncWithToast } from "@/utils/handleAsyncWithToast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { z } from "zod";

const forgetPasswordSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
    })
    .email("Invalid email address"),
});

export default function ForgetPasswordForm() {
  const [forgetPassword] = useForgotPasswordMutation();
  const router = useRouter();

  const handleSubmit = async (data: any, reset: any) => {
    const forgetPasswordData = {
      email: data.email,
    };

    try {
      const response = await handleAsyncWithToast(
        async () => forgetPassword(forgetPasswordData),
        "Sending mail..."
      );
      if (response?.data?.success) {
        // sessionStorage.setItem(
        //   "emailForResetPassword",
        //   forgetPasswordData?.email
        // );
        router.push("/");
        reset();
      }
    } catch (error) {
      // console.error("Error:", error);
      toast.error("An unexpected error occurred");
    }
  };
  return (
    <div className="min-h-[calc(100vh-100px)] flex items-center justify-center text-text-primary py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-center text-3xl text-primary font-bold">
          Send verification link
        </h2>

        <MyFormWrapper
          resolver={zodResolver(forgetPasswordSchema)}
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <MyFormInput type="email" placeHolder="Email" name="email" />
          <MyButton type="submit" label="Send Email" fullWidth />
        </MyFormWrapper>
      </div>
    </div>
  );
}
