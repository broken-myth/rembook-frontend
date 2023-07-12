import { OverlayState, SidebarVisibility } from "../../Pages/User/types";
import { Rem } from "../../Pages/User/types";

export interface RembookSidebarProps {
	setOverlay: React.Dispatch<React.SetStateAction<OverlayState>>;
	overlay: OverlayState;
	sidebarVisible: SidebarVisibility;
	setSidebarVisible: React.Dispatch<React.SetStateAction<SidebarVisibility>>;
	remsData: Rem[];
	setRemsData: React.Dispatch<React.SetStateAction<Rem[]>>;
	activeRemFromId: string;
	setActiveRemFromId: React.Dispatch<React.SetStateAction<string>>;
}
