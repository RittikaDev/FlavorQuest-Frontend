import { cn } from "@/lib/utils";
import React from "react";

const SectionHead = ({
  title,
  className,
}: {
  title: string;
  className?: string;
}) => {
  return (
    <div>
      <h2
        className={cn(
          "text-3xl lg:text-4xl text-text-primary font-bold text-center",
          className
        )}
      >
        {title}
      </h2>
    </div>
  );
};

export default SectionHead;
