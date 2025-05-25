/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  X,
  Home,
  LayoutDashboard,
  ShoppingBag,
  Settings,
  Users,
  CreditCard,
  FileText,
  ChevronDown,
  Calendar,
  BarChart3,
  ChartBarIncreasing,
  MapPinned,
  ChartBarStacked,
  ShieldQuestion,
  UserPen,
  Dot,
} from "lucide-react";
import Logo from "./logo";

interface MobileDrawerProps {
  myData: Record<string, unknown>;
  isOpen: boolean;
  onClose: () => void;
  role?: string;
}

export default function MobileDrawer({
  myData,
  role,
  isOpen,
  onClose,
}: MobileDrawerProps) {
  const pathname = usePathname();

  // Close drawer when route changes
  useEffect(() => {
    if (isOpen) {
      onClose();
    }
  }, [pathname]);

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-white transition-all duration-500 z-40"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 left-0 w-[280px] bg-background z-50 shadow-xl flex flex-col">
        <div className="flex items-center justify-between h-16 px-4 border-b border-border">
          <Logo />
          <button
            onClick={onClose}
            className="p-2 rounded-md hover:bg-muted transition-colors"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 py-4 overflow-y-auto">
          <MobileNav role={role as string} />
        </div>

        <div className="p-4 border-t border-border">
          <MobileProfileSection myData={myData} />
        </div>
      </div>
    </>
  );
}

function MobileNav({ role }: { role: string }) {
  const pathname = usePathname();

  return (
    <div className="space-y-1 px-3">
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
            <NavGroup
              icon={<ShieldQuestion size={20} />}
              label="Perform Actions"
            >
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
            <NavGroup icon={<MapPinned size={20} />} label="Manage My Posts">
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
  label,
  isActive,
  isNested = false,
}: NavItemProps) {
  return (
    <Link
      href={href}
      className={`
        flex items-center hover:bg-primary gap-3 px-3 py-2 rounded-md transition-colors duration-300
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

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          w-full flex items-center justify-between px-3 py-2 rounded-md transition-colors hover:bg-muted
          ${isOpen ? "bg-muted" : ""}
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

      {isOpen && <div className="mt-1 space-y-1">{children}</div>}
    </div>
  );
}

function MobileProfileSection({ myData }: { myData: Record<string, unknown> }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-medium">
        {(myData?.name as string)?.charAt(0)?.toUpperCase()}
      </div>
      <div>
        <div className="font-medium">{myData?.name as string}</div>
        <div className="text-xs text-muted-foreground">
          {myData?.email as string}
        </div>
      </div>
    </div>
  );
}
