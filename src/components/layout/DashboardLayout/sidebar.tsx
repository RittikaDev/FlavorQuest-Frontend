/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import {
  ChartBarIncreasing,
  ChartBarStacked,
  ChevronDown,
  Dot,
  MapPinned,
  ShieldQuestion,
  UserPen,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Logo from "./logo";

export default function Sidebar({
  myData,
  role,
}: {
  myData: Record<string, unknown>;
  role: string;
}) {
  const currentUser = useAppSelector(selectCurrentUser);
  return (
    <div className="h-full flex flex-col border-r border-border">
      <div className="flex items-center justify-between h-16 px-4 border-b border-border">
        <div className={`overflow-hidden transition-all duration-300 w-full`}>
          <Logo />
        </div>
      </div>

      <div className="flex-1 py-4 overflow-y-auto">
        <Nav role={role} />
      </div>

      <div className="p-4 border-t border-border">
        <ProfileSection myData={myData} />
      </div>
    </div>
  );
}

function Nav({ role }: { role: string }) {
  const pathname = usePathname();

  return (
    <div className="space-y-1 px-3">
      {/* Admin only */}
      {role === "admin" && (
        <>
          <NavItem
            href="/dashboard"
            icon={<ChartBarIncreasing size={20} />}
            label="Dashboard"
            isActive={pathname === "/dashboard"}
          />
          <NavItem
            href="/dashboard/manage-users"
            icon={<Users size={20} />}
            label="Manage Users"
            isActive={pathname === "/dashboard/manage-users"}
          />
          <NavGroup icon={<MapPinned size={20} />} label="Manage Food Spots">
            <NavItem
              href="/dashboard/manage-post"
              label="All Posts"
              isActive={pathname === "/dashboard/manage-post"}
              isNested
            />
            <NavItem
              href="/dashboard/my-post"
              label="My Posts"
              isActive={pathname === "/dashboard/my-post"}
              isNested
            />
            <NavItem
              href="/dashboard/create-post"
              label="Create Post"
              isActive={pathname === "/dashboard/create-post"}
              isNested
            />
            <NavItem
              href="/dashboard/admin-approve"
              label="Make premium Posts"
              isActive={pathname === "/dashboard/admin-approve"}
              isNested
            />
          </NavGroup>
          <NavGroup
            icon={<ChartBarStacked size={20} />}
            label="Manage Categories"
          >
            <NavItem
              href="/dashboard/manage-category"
              label="All Categories"
              isActive={pathname === "/dashboard/manage-category"}
              isNested
            />
            <NavItem
              href="/dashboard/create-category"
              label="Create Category"
              isActive={pathname === "/dashboard/create-category"}
              isNested
            />
          </NavGroup>
          <NavGroup icon={<ShieldQuestion size={20} />} label="Perform Actions">
            <NavItem
              href="/dashboard/all-comments"
              label="All Comments"
              isActive={pathname === "/dashboard/all-comments"}
              isNested
            />
            {/* <NavItem
              href="/dashboard/all-ratings"
              label="All Ratings"
              isActive={pathname === "/dashboard/all-ratings"}
              isNested
            /> */}
          </NavGroup>
          <NavItem
            href="/dashboard/profile"
            icon={<UserPen size={20} />}
            label="Profile"
            isActive={pathname === "/dashboard/profile"}
          />
        </>
      )}

      {/* User-only nav (example) */}
      {role === "user" && (
        <>
          <NavItem
            href="/user"
            icon={<ChartBarIncreasing size={20} />}
            label="Dashboard"
            isActive={pathname === "/user"}
          />
          <NavGroup icon={<MapPinned size={20} />} label="Manage Posts">
            <NavItem
              href="/user/my-posts"
              label="My Posts"
              isActive={pathname === "/user/my-posts"}
              isNested
            />
            <NavItem
              href="/user/create-post"
              label="Create Post"
              isActive={pathname === "/user/create-post"}
              isNested
            />
          </NavGroup>
          <NavItem
            href="/user/profile"
            icon={<UserPen size={20} />}
            label="Profile"
            isActive={pathname === "/dashboard/profile"}
          />
        </>
      )}
    </div>
  );
}

interface NavItemProps {
  href: string;
  icon?: React.ReactNode;
  label: string;
  isActive: boolean;
  isNested?: boolean;
}

function NavItem({
  href,
  icon,
  isActive,
  label,
  isNested = false,
}: NavItemProps) {
  return (
    <Link
      href={href}
      className={`
        flex items-center hover:bg-primary gap-3 px-3 py-2 rounded-md group transition-colors duration-300
        ${isActive ? "bg-primary text-primary-foreground" : "hover:bg-muted"}
        ${isNested ? "pl-10" : ""}
      `}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span className="truncate flex items-center">
        {isNested ? <Dot /> : ""}
        {label}
      </span>
    </Link>
  );
}

interface NavGroupProps {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}

function NavGroup({ icon, label, children }: NavGroupProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleGroup = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button
        onClick={toggleGroup}
        className={`
          w-full flex items-center justify-between px-3 py-2 rounded-md transition-colors hover:bg-muted
        `}
      >
        <div className="flex items-center gap-3">
          <span className="flex-shrink-0">{icon}</span>
          <span className="truncate">{label}</span>
        </div>
        <ChevronDown
          size={16}
          className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && <div className={`mt-1 space-y-1`}>{children}</div>}
    </div>
  );
}

function ProfileSection({ myData }: { myData: Record<string, unknown> }) {
  return (
    <div className="flex items-center gap-3">
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
      <div className="overflow-hidden">
        <div className="font-medium truncate">{myData?.name as string}</div>
        <div className="text-xs text-muted-foreground truncate">
          {myData?.email as string}
        </div>
      </div>
    </div>
  );
}
