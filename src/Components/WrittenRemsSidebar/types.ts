import { OverlayState, SidebarVisibility } from "../../Pages/User/types";
import { Rem } from "../../Pages/User/types";

export interface WrittenRemSidebarProps {
	setOverlay: React.Dispatch<React.SetStateAction<OverlayState>>;
	overlay: OverlayState;
	sidebarVisible: SidebarVisibility;
	setSidebarVisible: React.Dispatch<React.SetStateAction<SidebarVisibility>>;
	writtenRemsData: Rem[];
	setWrittenRemsData: React.Dispatch<React.SetStateAction<Rem[]>>;
	activeWrittenRemToId: string;
	setActiveWrittenRemToId: React.Dispatch<React.SetStateAction<string>>;
}
