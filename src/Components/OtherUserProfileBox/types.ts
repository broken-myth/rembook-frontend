import { User } from "../../Pages/User/types";

export interface OtherUserProfileBoxProps {
	userData: User | null;
	setUserData: React.Dispatch<React.SetStateAction<User | null>>;
	showWriteRem: boolean;
}
