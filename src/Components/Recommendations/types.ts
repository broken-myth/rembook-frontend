import { User } from "../../Pages/User/types";

export interface RecommendationProps {
	recommendedUsersData: User[];
	setRecommendedUsersData: React.Dispatch<React.SetStateAction<User[]>>;
}
