/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { RxMagicWand } from "react-icons/rx";
import { selectCurrentToken } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import { verifyToken } from "@/utils/verifyToken";
import { DiamondIcon, User } from "lucide-react";
import { useRouter } from "next/navigation";
import MyButton from "@/components/ui/MyButton/MyButton";
import Category from "./Category";

export default function SidebarLeft() {
  const router = useRouter();
  const currentUserToken = useAppSelector(selectCurrentToken);

  type UserWithRole = {
    role?: string;
    [key: string]: any;
  };

  const currentUser = currentUserToken
    ? (verifyToken(currentUserToken) as UserWithRole)
    : null;

  const role = currentUser?.role;

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const routeToSubscription = () => {
    router.push("/subscriptions");
  };

  return (
    <aside className="hidden lg:flex flex-col justify-between w-1/5 p-4 sticky top-28 self-start h-[calc(100vh-7rem)]">
      <div>
        <ul className="space-y-4">
          <MyButton
            label={`Personalized`}
            customIcon={<RxMagicWand className="text-lg" />}
            variant="outline"
            className={`w-full justify-start`}
            onClick={scrollToTop}
          />
          {/* <li className="font-medium">Following</li> */}
        </ul>
      </div>

      <Category />

      {/* PREMIUM SECTION STICKS TO THE BOTTOM */}
      <div className="mt-6 p-4 border border-default/50 rounded-xl">
        {role !== "PREMIUM_USER" ? (
          <>
            <h3 className="font-semibold">Upgrade to Premium</h3>
            <p className="mb-2">
              Unlock premium features designed to enhance your writing journey.
            </p>
            <MyButton
              label={`Go Premium`}
              customIcon={<DiamondIcon className="text-lg" />}
              variant="outline"
              className={`w-full justify-start`}
              onClick={routeToSubscription}
            />
          </>
        ) : (
          <>
            <h3 className="font-semibold">Premium Member</h3>
            <p className="mb-2">
              Your subscription status is active. Enjoy the premium features.
            </p>
            <MyButton
              label={`Go to Profile`}
              customIcon={<User className="text-lg" />}
              variant="outline"
              className={`w-full justify-start`}
              onClick={() => router.push("/profile")}
            />
          </>
        )}
      </div>
    </aside>
  );
}
