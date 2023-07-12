import { IconX } from "@tabler/icons-react";

import { RemTab } from "../../Components";
import config from "../../Config";
import styles from "../../Pages/User/profile.module.css";
import { user } from "../../Slices/User/User";
import { RembookSidebarProps } from "./types";

const RembookSidebar: React.FC<RembookSidebarProps> = ({
	sidebarVisible,
	setSidebarVisible,
	overlay,
	setOverlay,
	remsData,
	setRemsData,
	activeRemFromId,
	setActiveRemFromId,
}) => {
	const closeRembookSidebar = () => {
		setSidebarVisible({ ...sidebarVisible, rembook: false });
	};

	return (
		<aside
			className={`min-h-[100vh] bg-gradient-to-b from-violet to-blue absolute top-0 left-0 w-full lg:w-[30rem] z-100 rounded-md p-10 flex flex-col ${
				sidebarVisible.rembook
					? "translate-x-[0%]"
					: "-translate-x-[100%]"
			} transition-all duration-500 overflow-sidebarVisible ${
				styles.sidebar_bg
			}`}
		>
			<header className="mb-10 w-full flex flex-col items-center gap-5">
				<button
					className="cursor-pointer p-1 outline-none border-2 border-solid border-red-600 bg-transparent text-red-500 cross-btn-shadow rounded-full flex items-center justify-center "
					onClick={closeRembookSidebar}
				>
					<IconX width={20} height={20} />
				</button>
				<h1 className="text-2xl text-center text-turquoise">
					Your Rembook
				</h1>
			</header>
			<section
				className={
					"flex flex-col items-center gap-0 w-full mb-5 p-3 max-h-[80vh] overflow-y-auto"
				}
			>
				{remsData.map((rem) => (
					<RemTab
						imgUrl={`${config.backend_url}/assets/images/profiles/${
							rem.userImage?.split(".")[0]
						}.jpg`}
						name={rem.from}
						sidebarVisible={sidebarVisible}
						setSidebarVisible={setSidebarVisible}
						overlay={overlay}
						setOverlay={setOverlay}
						key={rem.fromID}
						fromID={rem.fromID}
						activeRemFromId={activeRemFromId}
						setActiveRemFromId={setActiveRemFromId}
					/>
				))}
			</section>
		</aside>
	);
};

export default RembookSidebar;
