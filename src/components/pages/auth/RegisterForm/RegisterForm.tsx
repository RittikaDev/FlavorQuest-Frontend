/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import MyButton from "@/components/ui/MyButton/MyButton";
import MyFormImageUpload from "@/components/ui/MyForm/MyFormImageUpload/MyFormImageUpload";
import MyFormInput from "@/components/ui/MyForm/MyFormInput/MyFormInput";
import MyFormWrapper from "@/components/ui/MyForm/MyFormWrapper/MyFormWrapper";
import {
  useLoginMutation,
  useRegisterMutation,
} from "@/redux/features/auth/authApi";
import { setUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { handleAsyncWithToast } from "@/utils/handleAsyncWithToast";
import { verifyToken } from "@/utils/verifyToken";
import { zodResolver } from "@hookform/resolvers/zod";
import { UploadCloud } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

const registerSchema = z
  .object({
    name: z
      .string({ required_error: "Name is required" })
      .min(1, "Name is required"),
    email: z
      .string({ required_error: "Email is required" })
      .email("Invalid email address"),
    password: z
      .string({ required_error: "Password is required" })
      .min(6, "Password must be at least 6 characters"),
    contactNumber: z
      .string({ required_error: "Phone number is required" })
      .min(10, "Phone number must be at least 10 character long"),
    profilePhoto: z.instanceof(File, { message: "Profile Photo is required" }),
  })
  .refine((data) => data.password.length >= 6, {
    message: "Password must be at least 6 characters",
    path: ["password"],
  });

type RegisterFormInputs = z.infer<typeof registerSchema>;

const RegisterForm = () => {
  const router = useRouter();
  const [registerUser] = useRegisterMutation();
  const [loginUser] = useLoginMutation();
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useAppDispatch();

  const handleSubmit = async (data: RegisterFormInputs, reset: any) => {
    const registrationData = {
      name: data.name,
      email: data.email,
      password: data.password,
      contactNumber: data.contactNumber,
    };

    const formData = new FormData();
    formData.append("file", data?.profilePhoto);
    formData.append("data", JSON.stringify(registrationData));

    try {
      const result = await handleAsyncWithToast(
        async () => registerUser(formData),
        "Creating Account..."
      );

      if (result?.data?.success) {
        try {
          const response = await handleAsyncWithToast(
            async () =>
              loginUser({
                email: registrationData.email,
                password: registrationData.password,
              }),
            "Logging in..."
          );

          if (response?.data?.success) {
            const user = verifyToken(response?.data?.data?.accessToken);
            console.log(user)
            dispatch(
              setUser({
                user: user,
                access_token: response?.data?.data?.accessToken,
              })
            );
            toast.success(result?.data?.message);
            router.push("/");
            reset();
          }
        } catch (error) {
          // console.error("Login error:", error);
          toast.error("An error occurred during login");
        }
      }
    } catch (error) {
      // console.error("Registration error:", error);
      toast.error("An unexpected error occurred");
    }
  };

  return (
    <div className="min-h-[calc(100vh-100px)] flex items-center justify-center text-text-primary py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-center text-3xl text-primary font-bold">
          Create Account
        </h2>

        <MyFormWrapper
          resolver={zodResolver(registerSchema)}
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <MyFormInput placeHolder="Your name" name="name" />
          <MyFormInput type="email" placeHolder="Your email" name="email" />
          <MyFormInput type="password" placeHolder="Password" name="password" />
          <MyFormInput placeHolder="Phone Number" name="contactNumber" />
          <MyFormImageUpload
            name="profilePhoto"
            inputClassName="cursor-pointer"
          >
            <div className="flex items-center flex-col justify-center text-primary border border-dashed border-gray-300 rounded-lg p-5 cursor-pointer">
              <UploadCloud className="w-5 h-5 mr-2" />
              <span className="text-sm text-center font-medium">
                Upload your profile
              </span>
              <p className="mt-1 text-xs text-center text-gray-500">
                PNG, JPG up to 3MB
              </p>
            </div>
          </MyFormImageUpload>
          <MyButton type="submit" label="Register" fullWidth />
        </MyFormWrapper>

        <div className="flex justify-center mt-2 items-center gap-1">
          Already have an account?
          <Link href={"/auth/login"} className="text-primary font-medium">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
