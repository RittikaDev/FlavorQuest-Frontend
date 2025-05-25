"use client";
import React from "react";
import Image from "next/image";
import { useGetMeQuery } from "@/redux/features/auth/authApi";
import Loading from "@/components/shared/Loading/Loading";
import { Lock } from "lucide-react";
import Link from "next/link";

const ProfilePage = () => {
  const { data: getMyProfileResponse, isLoading } = useGetMeQuery(undefined);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden p-6 space-y-4">
        <div className="flex flex-col items-center">
          {/* Profile Image */}
          {getMyProfileResponse?.data?.profilePhoto ? (
            <div className="relative h-32 w-32 rounded-full overflow-hidden border-4 border-gray-100">
              <Image
                src={getMyProfileResponse?.data?.profilePhoto}
                alt="Profile"
                fill
                className="object-cover"
                priority
              />
            </div>
          ) : (
            <div className="w-32 h-32 rounded-full bg-primary text-xl text-white flex items-center justify-center text-primary-foreground font-medium flex-shrink-0">
              {(getMyProfileResponse?.data?.name as string)?.charAt(0)?.toUpperCase()}
            </div>
          )}

          {/* Name */}
          <h2 className="mt-4 text-2xl font-bold text-gray-900">
            {getMyProfileResponse?.data?.name}
          </h2>

          {/* Email */}
          <p className="text-gray-600">
            Email: {getMyProfileResponse?.data?.email}
          </p>
          <p className="text-gray-600">
            Phone: {getMyProfileResponse?.data?.contactNumber}
          </p>
          {getMyProfileResponse?.data?.role === "PREMIUM_USER" ? (
            <p className="text-white bg-primary flex items-center gap-2 p-2 mt-2 rounded-full text-xs justify-center">
              <Lock size={20} className="text-white" /> Premium Member
            </p>
          ) : getMyProfileResponse?.data?.role === "USER" ? (
            <Link
              href={`/checkout`}
              className="text-white cursor-pointer bg-primary flex items-center gap-2 p-2 mt-2 rounded-full text-xs justify-center"
            >
              <Lock size={20} className="text-white" /> Upgrade
            </Link>
          ) : getMyProfileResponse?.data?.role === "USER" ? (
            <p className="text-white bg-primary flex items-center gap-2 p-2 mt-2 rounded-full text-xs justify-center">
              <Lock size={20} className="text-white" /> Admin
            </p>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
