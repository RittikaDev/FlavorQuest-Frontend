"use client";

import { useState } from "react";
import Image from "next/image";
import { useGetMeQuery } from "@/redux/features/auth/authApi";
import Loading from "@/components/shared/Loading/Loading";
import FriendRequests from "@/components/feed/Friends/FriendRequest";
import SendFriendRequests from "@/components/feed/Friends/RequestSend";
import FriendList from "@/components/feed/Friends/FriendList";
import MyPostsPage from "../user-dashboard/MyPostsPage/MyPostsPage";
import Myposts from "../admin-dashboard/Myposts/Myposts";
import GroupSection from "@/components/feed/Group/GroupSection";
import SharedPost from "@/components/feed/SharedPost/SharedPost";

export default function Profile() {
	const [activeTab, setActiveTab] = useState("My Posts");

	const {
		data: getMeResponse,
		isLoading,
		isFetching,
	} = useGetMeQuery(undefined);

	//   console.log("getMeResponse", getMeResponse);
	const myData = getMeResponse?.data;

	//   console.log("myData", myData);

	if (isLoading || isFetching) <Loading />;

	return (
		<div className="max-w-5xl mx-auto">
			{/* Banner Image */}
			<div className="relative w-full h-64">
				<Image
					src="https://i.pinimg.com/736x/0c/e9/6a/0ce96ac3986e782d7775cd59a70a7d58.jpg"
					alt="Profile Banner"
					layout="fill"
					objectFit="cover"
					className="rounded-b-xl"
				/>

				{/* Avatar */}
				<div className="absolute -bottom-16 left-6 w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
					<Image
						src={
							"https://i.pinimg.com/736x/0c/e9/6a/0ce96ac3986e782d7775cd59a70a7d58.jpg"
						}
						alt="Profile Avatar"
						layout="fill"
						objectFit="cover"
					/>
				</div>
			</div>

			{/* User Info */}
			{myData && (
				<div className="mt-20 px-6 flex flex-col md:flex-row md:items-center md:justify-between">
					<div>
						<h1 className="text-3xl font-bold capitalize">{myData.name}</h1>
						<p className="text-gray-500 text-sm">{myData.email}</p>
					</div>
				</div>
			)}

			{/* Tabs */}
			<div className="mt-8 px-6 border-b border-gray-200">
				<div className="flex space-x-6 pb-2">
					{[
						"My Posts",
						"Shared Posts",
						"Friend Requests",
						"Suggestions",
						"Friend List",
						"Group",
						"About",
					].map((tab) => (
						<button
							key={tab}
							className={`pb-2 ${
								activeTab === tab
									? "text-blue-600 border-b-2 border-blue-600 font-semibold"
									: "text-gray-600 hover:text-blue-600"
							}`}
							onClick={() => setActiveTab(tab)}
						>
							{tab}
						</button>
					))}
				</div>
			</div>

			{/* Tab Content */}
			<div className="mt-6 px-6 space-y-4">
				{activeTab === "My Posts" && (
					<div className="bg-white rounded-lg p-4 shadow">
						<div className="text-gray-800">
							{myData && myData.role === "ADMIN" ? (
								<Myposts />
							) : (
								<MyPostsPage />
							)}
						</div>
					</div>
				)}
				{activeTab === "Shared Posts" && (
					<div className="bg-white rounded-lg p-4 shadow">
						<div className="text-gray-800">
							<SharedPost />
						</div>
					</div>
				)}
				{activeTab === "Friend Requests" && (
					<div className="bg-white rounded-lg p-4 shadow">
						<div className="text-gray-800">
							<FriendRequests />
						</div>
					</div>
				)}
				{activeTab === "Suggestions" && (
					<div className="bg-white rounded-lg p-4 shadow">
						<div className="text-gray-800">
							<SendFriendRequests />
						</div>
					</div>
				)}
				{activeTab === "Friend List" && (
					<div className="bg-white rounded-lg p-4 shadow">
						<div className="text-gray-800">
							<FriendList />
						</div>
					</div>
				)}
				{activeTab === "Group" && (
					<div className="bg-white rounded-lg p-4 shadow">
						<div className="text-gray-800">
							<GroupSection />
						</div>
					</div>
				)}
				{activeTab === "About" && (
					<div className="bg-white rounded-lg p-6 shadow space-y-4">
						<h2 className="text-xl font-semibold text-gray-800">
							User Details
						</h2>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-800 bg-white p-6 rounded-xl shadow">
							<div>
								<span className="font-semibold text-gray-600">Full Name:</span>{" "}
								<span className="ml-1">{myData.name}</span>
							</div>
							<div>
								<span className="font-semibold text-gray-600">Email:</span>{" "}
								<span className="ml-1">{myData.email}</span>
							</div>
							<div>
								<span className="font-semibold text-gray-600">Contact:</span>{" "}
								<span className="ml-1">{myData.contactNumber}</span>
							</div>
							<div>
								<span className="font-semibold text-gray-600">Role:</span>{" "}
								<span
									className={`ml-1 inline-block px-2 py-1 rounded-full text-xs font-semibold ${
										myData.role === "PREMIUM_USER"
											? "bg-yellow-100 text-yellow-800"
											: myData.role === "ADMIN"
											? "bg-red-100 text-red-800"
											: "bg-gray-100 text-gray-800"
									}`}
								>
									{myData.role === "PREMIUM_USER"
										? "Premium"
										: myData.role === "ADMIN"
										? "Admin"
										: "User"}
								</span>
							</div>
							<div>
								<span className="font-semibold text-gray-600">Status:</span>{" "}
								<span
									className={`ml-2 inline-block px-2 py-1 rounded-full text-xs font-medium ${
										myData.status.toLowerCase() === "active"
											? "bg-green-100 text-green-700"
											: "bg-red-100 text-red-700"
									}`}
								>
									{myData.status}
								</span>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
