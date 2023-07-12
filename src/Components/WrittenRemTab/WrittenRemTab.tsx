import { Avatar } from "@mantine/core";

import { OverlayState } from "../../Pages/User/types";
import { WrittenRemTabProps } from "./types";

const WrittenRemTab: React.FC<WrittenRemTabProps> = ({
	imgUrl,
	name,
	setOverlay,
	overlay,
	sidebarVisible,
	setSidebarVisible,
	toID,
	setActiveWrittenRemToId,
}) => {
	const goToWrittenRem = () => {
		setActiveWrittenRemToId(toID);
		setOverlay(OverlayState.WRITTEN_REM);
		setSidebarVisible({ ...sidebarVisible, writtenRems: false });
	};

	return (
		<div
			className="bg-green bg-opacity-75 flex items-center gap-5 my-5 px-2 py-3 rounded-md w-full max-w-[20rem] cursor-pointer"
			onClick={goToWrittenRem}
		>
			<Avatar src={imgUrl} alt="hi" className="w-10 rounded-full" />
			<p className="text-dark-green text-md md:text-xl truncate">
				{name}
			</p>
		</div>
	);
};

export default WrittenRemTab;
