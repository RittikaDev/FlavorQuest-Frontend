/* eslint-disable @typescript-eslint/no-explicit-any */
interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  profilePhoto: string | null;
  contactNumber: string;
  needPasswordChange: boolean;
  role: "USER" | "ADMIN" | "PREMIUM_USER";
  status: "ACTIVE" | "DEACTIVATED" | "BANNED";
  createdAt: string;
  updatedAt: string;
}

interface ICategory {
  id: string;
  name: string;
}

interface IRatingUser {
  name: string;
  profilePhoto?: string; // Optional since some users might not have a photo
}

interface IRating {
  id: string;
  score: number; // Typically 1-5 for star ratings
  userId: string;
  postId: string;
  createdAt: string; // ISO date string
  user: IRatingUser;
}

interface IVote {
  id: string;
  type: "UPVOTE" | "DOWNVOTE";
  userId: string;
  postId: string;
  createdAt: string;
}

export interface ISinglePost {
  id: string;
  title: string;
  description: string;
  location: string;
  minPrice: number;
  maxPrice: number;
  image: string;
  categoryId: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  isPremium: boolean;
  adminComment?: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  user: IUser;
  category: ICategory;
  ratings: IRating[];
  votes: IVote[];
  comments: any[]; // Replace with proper comment interface if available
  averageRating: number;
  upvoteCount: number;
  downvoteCount: number;
  totalVoteCount: number;
  commentCount: number;
}
