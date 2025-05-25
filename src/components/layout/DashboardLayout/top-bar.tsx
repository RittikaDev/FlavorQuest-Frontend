/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { logout, selectCurrentToken } from "@/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { verifyToken } from "@/utils/verifyToken";
import { JwtPayload } from "jwt-decode";
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FiLogOut } from "react-icons/fi";
import { RxAvatar } from "react-icons/rx";
import Swal from "sweetalert2";

interface TopBarProps {
  myData: Record<string, unknown>;
  onMenuClickAction: () => void;
}

interface DecodedUser extends JwtPayload {
  role: string;
}

export default function TopBar({ myData, onMenuClickAction }: TopBarProps) {
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [profileOpen, setProfileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const currentUserToken = useAppSelector(selectCurrentToken);
  const currentUser = currentUserToken ? verifyToken(currentUserToken) : null;

  // Handle click outside dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, sign out!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(logout());
        Swal.fire({
          title: "Success!",
          text: "Sign out successful.",
          icon: "success",
        });
        router.push("/");
      }
    });
  };

  return (
    <header className="h-16 border-b border-border flex items-center px-4 gap-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-20">
      {/* Mobile menu button - visible on small screens */}
      <button
        onClick={onMenuClickAction}
        className="lg:hidden p-2 rounded-md hover:bg-muted transition-colors"
        aria-label="Open menu"
      >
        <Menu size={20} />
      </button>

      <h5 className="font-semibold text-lg flex-1">Dashboard</h5>

      {/* Theme toggle */}
      {/* <ThemeToggle /> */}

      {/* User account - smaller screens only */}
      <div ref={dropdownRef} className="relative">
        <button
          onClick={() => setProfileOpen(!profileOpen)}
          className="flex items-center text-sm rounded-full focus:outline-none"
        >
          {myData?.profilePhoto ? (
            <Image
              src={myData?.profilePhoto as string}
              alt="profile"
              height={40}
              width={40}
              className="rounded-full object-cover w-11 h-11"
            />
          ) : (
            <div className="w-11 h-11 rounded-full bg-primary text-white flex items-center justify-center text-primary-foreground font-medium flex-shrink-0">
              {(myData?.name as string)?.charAt(0)?.toUpperCase()}
            </div>
          )}
        </button>

        {profileOpen && (
          <div className="absolute right-0 z-10 w-48 mt-2 origin-top-right rounded-md shadow-lg dark:bg-white text-black focus:outline-none">
            <div className="py-1">
              <Link
                href={
                  (currentUser as DecodedUser)?.role === "USER"
                    ? "/user/profile"
                    : (currentUser as DecodedUser)?.role === "PREMIUM_USER"
                    ? "/user/profile"
                    : (currentUser as DecodedUser)?.role === "ADMIN"
                    ? "/dashboard/profile"
                    : ""
                }
                className="block px-4 py-2 text-sm hover:bg-gray-200 transition-all duration-300"
              >
                Your Profile
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center w-full px-4 py-2 text-sm text-left hover:bg-gray-200 transition-all duration-300"
              >
                <FiLogOut className="mr-2" />
                Sign out
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
