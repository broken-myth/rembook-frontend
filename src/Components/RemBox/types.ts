import { OverlayState } from "../../Pages/User/types";
import { Rem } from "../../Pages/User/types";

export interface RemBoxProps {
	setOverlay: React.Dispatch<React.SetStateAction<OverlayState>>;
	overlay: OverlayState;
	activeRemFromId: string;
	remsData: Rem[];
	setRemsData: React.Dispatch<React.SetStateAction<Rem[]>>;
}
