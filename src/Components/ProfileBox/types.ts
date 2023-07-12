import { SidebarVisibility } from "../../Pages/User/types";
import { User } from "../../Pages/User/types";

export interface ProfileBoxProps {
	sidebarVisible: SidebarVisibility;
	setSidebarVisible: React.Dispatch<React.SetStateAction<SidebarVisibility>>;
	currentUserData: User | null;
	setCurrentUserData: React.Dispatch<React.SetStateAction<User | null>>;
	writtenRemsVisible: boolean;
	setWrittenRemsVisible: React.Dispatch<React.SetStateAction<boolean>>;
	remsVisible: boolean;
	setRemsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}
