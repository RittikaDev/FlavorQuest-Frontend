/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IFoodSpot {
  id: string;
  title: string;
  description: string;
  location: string;
  minPrice: number;
  maxPrice: number;
  image: string;
  categoryId: string;
  userId: string;
  category: {
    id: string;
    name: string;
  };
  status: "PENDING" | "APPROVED" | "REJECTED";
  isPremium: boolean;
  adminComment?: string;
  user: any;
  ratings: any;
  createdAt: Date;
  commentCount?: number;
  votesCount?: number;
  upvotesCount?: number;
  upvoteCount?: number;
  reviewCount?: number;
  averageRating: number;
  className?: string;
  showAdminInfo?: boolean;
}
