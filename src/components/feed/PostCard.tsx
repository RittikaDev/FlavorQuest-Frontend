import Image from "next/image";

interface PostProps {
	user: string;
	avatar: string;
	content: string;
}

export default function PostCard({ user, avatar, content }: PostProps) {
	return (
		<div className="bg-white p-4 rounded shadow mb-4">
			<div className="flex gap-3 items-center mb-2">
				<Image
					src={avatar}
					alt={user}
					width={40}
					height={40}
					className="w-10 h-10 rounded-full object-cover"
				/>
				<span className="font-semibold">{user}</span>
			</div>
			<p>{content}</p>
		</div>
	);
}
