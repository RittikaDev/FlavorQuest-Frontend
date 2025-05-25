import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

const MyContainer = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("max-w-[1440px] w-[90%] mx-auto", className)}>
      {children}
    </div>
  );
};

export default MyContainer;
