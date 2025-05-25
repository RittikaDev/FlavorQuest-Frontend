"use client";

import { useState } from "react";
import Sidebar from "./sidebar";
import MobileDrawer from "./mobile-drawer";
import TopBar from "./top-bar";
import { useGetMeQuery } from "@/redux/features/auth/authApi";
import Loading from "@/components/shared/Loading/Loading";

interface DashboardLayoutProps {
  children: React.ReactNode;
  role: "user" | "admin";
}

export default function DashboardLayout({
  children,
  role,
}: DashboardLayoutProps) {
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const {
    data: getMeResponse,
    isLoading,
    isFetching,
  } = useGetMeQuery(undefined);

  // Handle drawer toggle
  const toggleMobileDrawer = () => {
    setIsMobileDrawerOpen(!isMobileDrawerOpen);
  };

  if (isLoading || isFetching) {
    return <Loading />;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar - visible on large screens */}
      <div
        className={`hidden lg:block transition-all duration-300 ease-in-out`}
      >
        <Sidebar myData={getMeResponse?.data} role={role as string} />
      </div>

      {/* Mobile Drawer - visible when open on small screens */}
      <MobileDrawer
        myData={getMeResponse?.data}
        role={role as string}
        isOpen={isMobileDrawerOpen}
        onClose={() => setIsMobileDrawerOpen(false)}
      />

      {/* Main content area */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <TopBar
          myData={getMeResponse?.data}
          onMenuClickAction={toggleMobileDrawer}
        />

        <main className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
