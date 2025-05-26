/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";

import MyButton from "@/components/ui/MyButton/MyButton";
import MyFormInput from "@/components/ui/MyForm/MyFormInput/MyFormInput";
import MyFormWrapper from "@/components/ui/MyForm/MyFormWrapper/MyFormWrapper";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { setUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { handleAsyncWithToast } from "@/utils/handleAsyncWithToast";
import { verifyToken } from "@/utils/verifyToken";

const loginSchema = z.object({
	email: z.string().email("Invalid email"),
	password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function LoginForm() {
	const dispatch = useAppDispatch();
	const [loginUser] = useLoginMutation();
	const router = useRouter();

	const [activeTab, setActiveTab] = useState<"admin" | "user">("admin");

	const methods = useForm({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: "admin@gmail.com",
			password: "admin123",
		},
	});

	const { reset, handleSubmit } = methods;

	useEffect(() => {
		const defaultData =
			activeTab === "admin"
				? { email: "admin@gmail.com", password: "admin123" }
				: { email: "mike@gmail.com", password: "mike123" };

		reset(defaultData);
	}, [activeTab, reset]);

	const onSubmit = async (data: any) => {
		try {
			const response = await handleAsyncWithToast(
				() =>
					loginUser({
						email: data.email,
						password: data.password,
					}),
				"Logging in..."
			);

			if (response?.data?.success) {
				const user = verifyToken(response?.data?.data?.accessToken);
				dispatch(
					setUser({
						user,
						access_token: response?.data?.data?.accessToken,
					})
				);
				toast.success(response?.data?.message);
				router.push("/");
			}
		} catch (error) {
			toast.error("Unexpected error occurred");
		}
	};

	return (
		<div className="min-h-[calc(100vh-100px)] flex items-center justify-center text-text-primary py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg">
				<div className="flex justify-center gap-4 mb-4">
					<button
						onClick={() => setActiveTab("admin")}
						className={`px-4 py-2 rounded ${
							activeTab === "admin" ? "bg-primary text-white" : "bg-gray-200"
						}`}
					>
						Admin
					</button>
					<button
						onClick={() => setActiveTab("user")}
						className={`px-4 py-2 rounded ${
							activeTab === "user" ? "bg-primary text-white" : "bg-gray-200"
						}`}
					>
						User
					</button>
				</div>

				<h2 className="text-center text-3xl text-primary font-bold">Sign in</h2>

				<MyFormWrapper
					methods={methods}
					onSubmit={handleSubmit(onSubmit)}
					className="space-y-4"
				>
					<MyFormInput type="email" placeHolder="Email" name="email" />
					<MyFormInput type="password" placeHolder="Password" name="password" />
					<Link href={"/auth/forget-password"}>
						<p className="text-primary text-sm mt-2"> Forget Password?</p>
					</Link>
					<MyButton type="submit" label="Login" fullWidth />
				</MyFormWrapper>

				<div className="flex justify-center mt-2 items-center gap-1">
					New to FlavorQuest?
					<Link href={"/auth/register"} className="text-primary font-medium">
						Sign up
					</Link>
				</div>
			</div>
		</div>
	);
}
