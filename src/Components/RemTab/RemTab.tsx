import { Avatar } from "@mantine/core";

import { OverlayState } from "../../Pages/User/types";
import { RemTabProps } from "./types";

const RemTab: React.FC<RemTabProps> = ({
	imgUrl,
	name,
	sidebarVisible,
	setSidebarVisible,
	overlay,
	setOverlay,
	activeRemFromId,
	setActiveRemFromId,
	fromID,
}) => {
	const goToRem = () => {
		setActiveRemFromId(fromID);
		setOverlay(OverlayState.REM);
		setSidebarVisible({ ...sidebarVisible, rembook: false });
	};

	return (
		<div
			className="bg-green bg-opacity-75 flex items-center gap-5 my-5 px-2 py-3 rounded-md w-full max-w-[20rem] cursor-pointer"
			onClick={goToRem}
		>
			<Avatar src={imgUrl} className="w-10 rounded-full" />
			<p className="text-dark-green text-md md:text-xl truncate">
				{name}
			</p>
		</div>
	);
};

export default RemTab;
