import "@/app/globals.css"; // ensure Tailwind styles apply
import SidebarRight from "@/components/feed/right-side/Sidebaright";
import SidebarLeft from "@/components/feed/SidebarLeft";
import NavBar from "@/components/shared/NavBar/NavBar";

export default function FeedLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="bg-gray-100 min-h-screen">
			<NavBar />
			<div className="flex  mx-auto mt-4 px-4">
				<SidebarLeft />
				<main className="flex-1 px-4 overflow-auto">{children}</main>
				<SidebarRight />
			</div>
		</div>
	);
}
