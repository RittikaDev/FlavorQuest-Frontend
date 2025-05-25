"use client";

import SpotsPage from "@/components/pages/common/spots/SpotsPage";

export default function FeedPage() {
	return (
		<div>
			{/* {posts.map((post) => (
				<PostCard
					key={post.id}
					user={post.user}
					avatar={post.avatar}
					content={post.content}
				/>
			))} */}
			<SpotsPage />
		</div>
	);
}
