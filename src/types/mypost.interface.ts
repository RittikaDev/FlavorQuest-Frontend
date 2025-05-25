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

interface IRating {
  id: string;
  score: number;
  userId: string;
  postId: string;
  createdAt: string;
}

interface IVote {
  id: string;
  type: "UPVOTE" | "DOWNVOTE";
  userId: string;
  postId: string;
  createdAt: string;
}

interface IComment {
  id: string;
  text: string;
  userId: string;
  postId: string;
  createdAt: string;
}

export interface IMyPost {
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
  comments: IComment[];
  averageRating: number;
  upvotesCount: number;
}
