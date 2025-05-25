"use client";
import React from "react";
import {
  Users,
  FileText,
  Star,
  MessageCircle,
  BarChart3,
} from "lucide-react";
import { useGetAllRatingsQuery } from "@/redux/features/admin/admin.api";



const AdminStatsCard = () => {
  const { data, isLoading } =  useGetAllRatingsQuery({})

  const stats = [
    {
      label: "Total Posts",
      value: data?.data?.postCount || 0,
      icon: <FileText className="text-blue-600 w-6 h-6" />,
      bg: "bg-blue-100",
    },
    {
      label: "Total Users",
      value: data?.data?.userCount || 0,
      icon: <Users className="text-green-600 w-6 h-6" />,
      bg: "bg-green-100",
    },
    {
      label: "Total Ratings",
      value: data?.data?.totalRating || 0,
      icon: <Star className="text-yellow-500 w-6 h-6" />,
      bg: "bg-yellow-100",
    },
    {
      label: "Average Rating",
      value: data?.data?.averageRating?.toFixed(2) || 0,
      icon: <BarChart3 className="text-indigo-600 w-6 h-6" />,
      bg: "bg-indigo-100",
    },
    {
      label: "Total Comments",
      value: data?.data?.commentCount || 0,
      icon: <MessageCircle className="text-pink-600 w-6 h-6" />,
      bg: "bg-pink-100",
    },
  ];

  if (isLoading) {
    return <div className="text-center py-10">Loading...</div>;
  }

 

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 px-4 py-6">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="flex items-center p-5  rounded-2xl shadow-md hover:shadow-lg transition duration-300"
        >
          <div className={`p-3 rounded-full ${stat.bg} mr-4`}>{stat.icon}</div>
          <div>
            <p className="text-sm text-gray-500">{stat.label}</p>
            <h4 className="text-xl font-semibold text-gray-800">
              {stat.value}
            </h4>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminStatsCard;
