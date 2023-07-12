import { OverlayState } from "../../Pages/User/types";
import { Rem } from "../../Pages/User/types";

export interface WrittenRemBoxProps {
	setOverlay: React.Dispatch<React.SetStateAction<OverlayState>>;
	overlay: OverlayState;
	activeWrittenRemToId: string;
	writtenRemsData: Rem[];
	setWrittenRemsData: React.Dispatch<React.SetStateAction<Rem[]>>;
}
