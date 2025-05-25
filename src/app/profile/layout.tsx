import NavBar from "@/components/shared/NavBar/NavBar";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-gray-100 min-h-screen">
      <NavBar />
      <main>{children}</main>
    </div>
  );
}
