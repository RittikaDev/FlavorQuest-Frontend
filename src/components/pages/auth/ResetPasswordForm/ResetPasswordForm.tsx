/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import MyButton from "@/components/ui/MyButton/MyButton";
import MyFormInput from "@/components/ui/MyForm/MyFormInput/MyFormInput";
import MyFormWrapper from "@/components/ui/MyForm/MyFormWrapper/MyFormWrapper";
import { useResetPasswordMutation } from "@/redux/features/auth/authApi";
import { handleAsyncWithToast } from "@/utils/handleAsyncWithToast";
import { verifyToken } from "@/utils/verifyToken";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { toast } from "sonner";
import { z } from "zod";

const resetPasswordSchema = z.object({
  password: z
    .string({ required_error: "Password is Required" })
    .min(6, "Password must be at least 6 character long"),
});

const ResetPasswordForm = () => {
  const [resetPassword] = useResetPasswordMutation();
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const userId = searchParams.get("userId");
  const verifiedToken = token ? verifyToken(token as string) : null;

  useEffect(() => {
    if (!token || !verifiedToken || !userId) {
      router.replace("/auth/login");
    }
  }, [token, verifiedToken, userId, router]);

  const handleSubmit = async (data: any, reset: any) => {
    const resetPasswordData = {
      id: userId,
      password: data?.password,
    };

    try {
      const response = await handleAsyncWithToast(
        async () => resetPassword({ data: resetPasswordData, token: token }),
        "Resetting password..."
      );
      if (response?.data?.success) {
        router.push("/auth/login");
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
          Reset your Password
        </h2>

        <MyFormWrapper
          resolver={zodResolver(resetPasswordSchema)}
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <MyFormInput
            type="password"
            placeHolder="New Password"
            name="password"
          />
          <MyButton type="submit" label="Reset Password" fullWidth />
        </MyFormWrapper>
      </div>
    </div>
  );
};

export default ResetPasswordForm;
