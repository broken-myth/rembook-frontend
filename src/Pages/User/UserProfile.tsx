import { useEffect, useState } from "react";

import {
	Particle,
	ProfileBox,
	Recommendations,
	RembookSidebar,
	RemBox,
	WrittenRemBox,
	WrittenRemsSidebar,
} from "../../Components";
import { CustomAxios } from "../../Utils";
import { OverlayState, SidebarVisibility } from "./types";
import { Rem, User } from "./types";

const UserProfile = () => {
	const [sidebarVisible, setSidebarVisible] = useState<SidebarVisibility>({
		writtenRems: false,
		rembook: false,
	});
	const [currentUserData, setCurrentUserData] = useState<User | null>(null);
	const [recommendedUsersData, setRecommendedUsersData] = useState<User[]>(
		[]
	);
	const [remsData, setRemsData] = useState<Rem[]>([]);
	const [activeRemFromId, setActiveRemFromId] = useState<string>("");
	const [writtenRemsData, setWrittenRemsData] = useState<Rem[]>([]);
	const [activeWrittenRemToId, setActiveWrittenRemToId] =
		useState<string>("");
	const [overlay, setOverlay] = useState<OverlayState>(OverlayState.PROFILE);
	const [writtenRemsVisible, setWrittenRemsVisible] =
		useState<boolean>(false);
	const [remsVisible, setRemsVisible] = useState<boolean>(false);

	const fetchUserDetails = async () => {
		try {
			const res = await CustomAxios.get("/user/getCurrentUser", {
				withCredentials: true,
			});
			return res.data.user;
		} catch (err) {
			console.log(err);
			return null;
		}
	};

	const fetchRecommendedUserDetails = async (userId?: string) => {
		try {
			const res = await CustomAxios.get(`/user/getRecommend/${userId}`, {
				withCredentials: true,
			});
			return res.data;
		} catch (err) {
			console.log(err);
			return [];
		}
	};

	const fetchRems = async () => {
		try {
			const res = await CustomAxios.get("/memory/getMyAllRems", {
				withCredentials: true,
			});
			return res.data.data;
		} catch (err) {
			console.log(err);
			return [];
		}
	};

	const fetchWrittenRems = async () => {
		try {
			const res = await CustomAxios.get("/memory/getMyWrittenRems", {
				withCredentials: true,
			});
			return res.data.data;
		} catch (err) {
			console.log(err);
			return [];
		}
	};

	useEffect(() => {
		(async () => {
			const userDetails = await fetchUserDetails();
			setCurrentUserData(userDetails);
			const recommendedUsers = await fetchRecommendedUserDetails(
				userDetails?._id
			);
			setRecommendedUsersData(recommendedUsers);
			const rems = await fetchRems();
			setRemsData(rems);
			const writtenRems = await fetchWrittenRems();
			setWrittenRemsData(writtenRems);
		})();
	}, []);

	useEffect(() => {
		setRemsVisible(remsData.length > 0);
		setWrittenRemsVisible(writtenRemsData.length > 0);
	}, [remsData, writtenRemsData]);

	if (sidebarVisible.rembook || sidebarVisible.writtenRems) {
		document.body.style.overflow = "hidden";
	} else {
		document.body.style.overflow = "auto";
	}

	return (
		<>
			{writtenRemsData.length > 0 && (
				<WrittenRemsSidebar
					sidebarVisible={sidebarVisible}
					setSidebarVisible={setSidebarVisible}
					overlay={overlay}
					setOverlay={setOverlay}
					activeWrittenRemToId={activeWrittenRemToId}
					writtenRemsData={writtenRemsData}
					setWrittenRemsData={setWrittenRemsData}
					setActiveWrittenRemToId={setActiveWrittenRemToId}
				/>
			)}
			<Particle>
				<main className="min-h-[93vh] grid grid-cols-1 xl:grid-cols-[4fr,1fr] gap-5 pt-5 xl:pb-2 px-10">
					{overlay === OverlayState.PROFILE ? (
						<ProfileBox
							sidebarVisible={sidebarVisible}
							setSidebarVisible={setSidebarVisible}
							currentUserData={currentUserData}
							setCurrentUserData={setCurrentUserData}
							remsVisible={remsVisible}
							setRemsVisible={setRemsVisible}
							writtenRemsVisible={writtenRemsVisible}
							setWrittenRemsVisible={setWrittenRemsVisible}
						/>
					) : overlay === OverlayState.REM ? (
						<RemBox
							setOverlay={setOverlay}
							overlay={overlay}
							activeRemFromId={activeRemFromId}
							remsData={remsData}
							setRemsData={setRemsData}
						/>
					) : (
						<WrittenRemBox
							setOverlay={setOverlay}
							overlay={overlay}
							activeWrittenRemToId={activeWrittenRemToId}
							writtenRemsData={writtenRemsData}
							setWrittenRemsData={setWrittenRemsData}
						/>
					)}
					<Recommendations
						recommendedUsersData={recommendedUsersData}
						setRecommendedUsersData={setRecommendedUsersData}
					/>
				</main>
			</Particle>
			{remsData.length > 0 && (
				<RembookSidebar
					sidebarVisible={sidebarVisible}
					setSidebarVisible={setSidebarVisible}
					overlay={overlay}
					setOverlay={setOverlay}
					remsData={remsData}
					setRemsData={setRemsData}
					activeRemFromId={activeRemFromId}
					setActiveRemFromId={setActiveRemFromId}
				/>
			)}
			{(sidebarVisible.rembook || sidebarVisible.writtenRems) && (
				<section className="absolute top-0 left-0 w-full h-[100vh] bg-black bg-opacity-100">
					-
				</section>
			)}
		</>
	);
};

export default UserProfile;
