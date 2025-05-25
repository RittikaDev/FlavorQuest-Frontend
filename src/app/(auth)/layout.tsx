import { ReactNode } from "react";
import logo from "@/assets/images/logo.png";
import Image from "next/image";
import Link from "next/link";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <div className="bg-white z-[1000] sticky top-0 w-full shadow-md">
        {/* Logo */}
        <Link
          href={"/"}
          className="flex items-center justify-center cursor-pointer w-fit mx-auto"
        >
          <Image src={logo} alt="Logo" height={80} width={80} />
        </Link>
      </div>
      <div className="bg-slate-100/90">{children}</div>
    </div>
  );
};

export default layout;
