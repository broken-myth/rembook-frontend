import { Avatar, Image } from "@mantine/core";
import { IconBuilding, IconSchool } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

import config from "../../Config";
import styles from "../../Pages/User/profile.module.css";
import Toast from "../Toast/Toast";
import { ProfileBoxProps } from "./types";

const ProfileBox: React.FC<ProfileBoxProps> = ({
	sidebarVisible,
	setSidebarVisible,
	currentUserData,
	setCurrentUserData,
	writtenRemsVisible,
	setRemsVisible,
	setWrittenRemsVisible,
	remsVisible,
}) => {
	const navigate = useNavigate();

	const openWrittenRems = () => {
		window.scrollTo(0, 0);
		setSidebarVisible({
			...sidebarVisible,
			rembook: false,
			writtenRems: true,
		});
	};

	const openRembook = () => {
		window.scrollTo(0, 0);
		setSidebarVisible({
			...sidebarVisible,
			writtenRems: false,
			rembook: true,
		});
	};

	const copyProfileToClipboard = () => {
		const shareLink = `${document.location.origin}/user/${currentUserData?._id}`;
		navigator.clipboard.writeText(shareLink);
		Toast("toastGreen", "Done !", "Link was copied to the clipboard");
	};

	const navigateToEdit = () => {
		navigate("/user/editprofile");
	};

	return (
		<section
			className={`rounded-lg p-5 md:p-10 md:pb-3 border border-solid border-turquoise flex flex-col justify-between gap-10 ${styles.profile_box_bg}`}
		>
			<header className="w-full border border-turquoise border-solid border-t-0 border-l-0 border-r-0 flex flex-col justify-between md:flex-row md:pb-5 gap-5">
				<div className="flex gap-5 lg:gap-10">
					<div className="flex items-center justify-center">
						<Avatar
							src={`${
								config.backend_url
							}/assets/images/profiles/${
								currentUserData?.image?.split(".")[0]
							}.jpg`}
							className="w-[70px] h-[70px] mb-5 lg:w-[150px] lg:h-[150px] rounded-[50%]"
						/>
					</div>
					<div className="flex flex-col items-start xl:items-start justify-center gap-5">
						<div>
							<h1 className="text-ellipsis text-xl sm:text-2xl lg:text-3xl text-turquoise">
								{currentUserData?.name}
							</h1>
						</div>
						<div className="flex items-center gap-5">
							<h2 className="flex items-center gap-2 text-xs sm:text-sm lg:text-xl text-gray-200">
								<span>
									<IconBuilding />
								</span>
								{currentUserData?.department}
							</h2>
							{/* <h2 className="flex items-center gap-2 text-xs sm:text-sm lg:text-xl">
								<span>
									<IconSchool />
								</span>
								{"20"+currentUserData?.rollNumber.slice(4, 6).toString()}
							</h2> */}
						</div>
					</div>
				</div>
				<div className="grid grid-cols-2 md:place-items-end">
					<button
						className="text-xs md:text-sm p-3 outline-none border-none text-turquoise bg-transparent font-bold cursor-pointer rounded-lg"
						onClick={navigateToEdit}
					>
						Edit Profile
					</button>
					<button
						className="text-xs md:text-sm p-3 outline-none border-none text-turquoise bg-transparent font-bold cursor-pointer rounded-lg"
						onClick={copyProfileToClipboard}
					>
						Share Profile
					</button>
				</div>
			</header>
			<section className="grid sm:grid-cols-[2fr,1fr] gap-10 h-full">
				<div className="grid grid-rows-2 gap-10 xl:gap-5">
					<div>
						<h3 className="text-xl text-turquoise md:text-2xl text-center lg:text-start mb-2">
							About me
						</h3>
						<p className="text-gray-100 text-sm md:text-lg text-center lg:text-start">
							{currentUserData?.userBio}
						</p>
					</div>
					<div>
						<h3 className="text-xl text-turquoise md:text-2xl text-center lg:text-start mb-2">
							Hostels Stayed
						</h3>
						<div className="flex gap-3 flex-wrap justify-center lg:justify-start">
							{currentUserData?.hostels.map((hostel, idx) => (
								<p
									className="text-gray-100 text-sm md:text-lg text-center lg:text-start flex items-center"
									key={idx}
								>
									{hostel.hostelName} &#40;{hostel.roomNumber}
									&#41;
								</p>
							))}
						</div>
					</div>
				</div>
				<div className="grid grid-rows-3 gap-10 xl:gap-5">
					<div>
						<h3 className="text-xl text-turquoise md:text-2xl text-center lg:text-start mb-2">
							Email Id
						</h3>
						<p className="text-gray-100 text-sm md:text-lg text-center lg:text-start">
							{currentUserData?.email}
						</p>
					</div>
					<div>
						<h3 className="text-xl text-turquoise md:text-2xl text-center lg:text-start mb-2">
							Contact Number
						</h3>
						<p className="text-gray-100 text-sm md:text-lg text-center lg:text-start">
							{currentUserData?.contact}
						</p>
					</div>
					<div>
						<h3 className="text-xl text-turquoise md:text-2xl text-center lg:text-start">
							Date of birth
						</h3>
						<p className="text-gray-100 text-sm md:text-lg text-center lg:text-start">
							{currentUserData &&
								currentUserData.dateOfBirth &&
								new Date(currentUserData.dateOfBirth)
									.toDateString()
									.split(" ")
									.slice(1)
									.join(" ")}
						</p>
					</div>
				</div>
			</section>
			<section className="w-full flex items-center gap-2">
				{remsVisible && (
					<button
						className="w-full sm:text-lg outline-none border-none rounded-md font-bold text-turquoise bg-transparent hover:bg-violet hover:bg-opacity-30 hover:text-turquoise cursor-pointer transition-all py-3"
						onClick={openRembook}
					>
						View Rembook
					</button>
				)}
				{writtenRemsVisible && (
					<button
						className="w-full sm:text-lg outline-none border-none rounded-md font-bold text-turquoise bg-transparent hover:bg-violet hover:bg-opacity-30 hover:text-turquoise cursor-pointer transition-all py-3"
						onClick={openWrittenRems}
					>
						View Written Rems
					</button>
				)}
				{/* {remsVisible && (
					<button className="w-full text-lg outline-none border-none rounded-md font-bold text-turquoise md:text-violet bg-transparent hover:bg-violet hover:bg-opacity-30 hover:text-turquoise cursor-pointer transition-all py-3">
						Download Rems
					</button>
				)} */}
			</section>
			<footer className="flex items-center justify-center xl:justify-end">
				{currentUserData?.linkedin &&
					currentUserData?.linkedin.length > 0 && (
					<Image
						src="/assets/images/linkedin.png"
						width={70}
						height={70}
						style={{ cursor: "pointer" }}
						onClick={() =>
							window.open(currentUserData.linkedin, "_blank")
						}
					/>
				)}
				{currentUserData?.instagram &&
					currentUserData?.instagram.length > 0 && (
					<Image
						src="/assets/images/instagram.png"
						width={50}
						height={50}
						style={{ cursor: "pointer" }}
						onClick={() =>
							window.open(currentUserData.instagram, "_blank")
						}
					/>
				)}
			</footer>
		</section>
	);
};

export default ProfileBox;
