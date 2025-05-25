"use client"
import Image from "next/image";
import { useRouter } from "next/navigation";
import logo from "@/assets/images/logo.png";

export default function Logo() {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push("/")}
      className="flex items-center justify-center cursor-pointer"
    >
      <Image src={logo} alt="Logo" height={80} width={80} />
    </div>
  );
}
