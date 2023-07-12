export interface RemTabProps {
	setOverlay: React.Dispatch<React.SetStateAction<OverlayState>>;
	overlay: OverlayState;
	imgUrl: string;
	name: string;
	sidebarVisible: SidebarVisibility;
	setSidebarVisible: React.Dispatch<React.SetStateAction<SidebarVisibility>>;
	activeRemFromId: string;
	setActiveRemFromId: React.Dispatch<React.SetStateAction<string>>;
	fromID: string;
}
