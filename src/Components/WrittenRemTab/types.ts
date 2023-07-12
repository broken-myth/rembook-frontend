import { OverlayState, SidebarVisibility } from "../../Pages/User/types";

export interface WrittenRemTabProps {
	setOverlay: React.Dispatch<React.SetStateAction<OverlayState>>;
	overlay: OverlayState;
	imgUrl: string;
	name: string;
	sidebarVisible: SidebarVisibility;
	setSidebarVisible: React.Dispatch<React.SetStateAction<SidebarVisibility>>;
	activeWrittenRemToId: string;
	setActiveWrittenRemToId: React.Dispatch<React.SetStateAction<string>>;
	toID: string;
}
