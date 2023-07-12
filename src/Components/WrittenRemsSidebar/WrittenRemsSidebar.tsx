import { IconX } from "@tabler/icons-react";

import { WrittenRemTab } from "../../Components";
import config from "../../Config";
import styles from "../../Pages/User/profile.module.css";
import { WrittenRemSidebarProps } from "./types";

const WrittenRemsSidebar: React.FC<WrittenRemSidebarProps> = ({
	sidebarVisible,
	setSidebarVisible,
	setOverlay,
	overlay,
	writtenRemsData,
	setWrittenRemsData,
	activeWrittenRemToId,
	setActiveWrittenRemToId,
}) => {
	const closeWrittenRemsSidebar = () => {
		setSidebarVisible({ ...sidebarVisible, writtenRems: false });
	};
	return (
		<aside
			className={`min-h-[100vh] absolute top-0 left-0 w-full lg:w-[30rem] z-100 rounded-md p-10 flex flex-col ${
				sidebarVisible.writtenRems
					? "translate-x-[0%]"
					: "-translate-x-[100%]"
			} transition-all duration-500 overflow-sidebarVisible ${
				styles.sidebar_bg
			}`}
		>
			<header className="mb-10 w-full flex flex-col items-center gap-5">
				<button
					className="cursor-pointer outline-none p-1 border-2 border-solid border-red-600 bg-transparent text-red-500 cross-btn-shadow rounded-full flex items-center justify-center"
					onClick={closeWrittenRemsSidebar}
				>
					<IconX width={20} height={20} />
				</button>
				<h1 className="text-2xl text-center text-turquoise">
					My Written Rems
				</h1>
			</header>
			<section
				className={
					"flex flex-col items-center gap-0 w-full mb-5 p-3 max-h-[80vh] overflow-y-auto"
				}
			>
				{writtenRemsData.map((writtenRem) => (
					<WrittenRemTab
						imgUrl={`${config.backend_url}/assets/images/profiles/${
							writtenRem.userImage?.split(".")[0]
						}.jpg`}
						name={writtenRem.to}
						setOverlay={setOverlay}
						overlay={overlay}
						key={writtenRem.toID}
						toID={writtenRem.toID}
						sidebarVisible={sidebarVisible}
						setSidebarVisible={setSidebarVisible}
						setActiveWrittenRemToId={setActiveWrittenRemToId}
						activeWrittenRemToId={activeWrittenRemToId}
					/>
				))}
			</section>
		</aside>
	);
};

export default WrittenRemsSidebar;
