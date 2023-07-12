import { Avatar, Image } from "@mantine/core";
import { IconBuilding, IconSchool } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

import config from "../../Config";
import styles from "../../Pages/User/profile.module.css";
import { OtherUserProfileBoxProps } from "./types";
const OtherUserProfileBox: React.FC<OtherUserProfileBoxProps> = ({
	userData,
	setUserData,
	showWriteRem,
}) => {
	const navigate = useNavigate();
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
								userData?.image?.split(".")[0]
							}.jpg`}
							className="w-[70px] h-[70px] mb-5 lg:w-[150px] lg:h-[150px] rounded-[50%]"
						/>
					</div>
					<div className="flex flex-col items-start xl:items-start justify-center gap-5">
						<div>
							<h1 className="text-turquoise text-ellipsis text-xl sm:text-2xl lg:text-3xl">
								{userData?.name}
							</h1>
						</div>
						<div className="flex items-center gap-5">
							<h2 className="text-gray-300 flex items-center gap-2 text-xs sm:text-sm lg:text-xl">
								<span>
									<IconBuilding />
								</span>
								{userData?.department}
							</h2>
							{/* <h2 className="flex items-center gap-2 text-xs sm:text-sm lg:text-xl">
								<span>
									<IconSchool />
								</span>
								{"20"+userData?.rollNumber.slice(4, 6).toString()}
							</h2> */}
						</div>
					</div>
				</div>
				<div className="grid grid-cols-2 md:place-items-end">
					{showWriteRem ? (
						<button
							className="text-xs md:text-sm p-3 outline-none border-none text-turquoise bg-transparent font-bold cursor-pointer rounded-lg"
							onClick={() =>
								navigate(`/user/write-rem?id=${userData?._id}`)
							}
						>
							Write Rem
						</button>
					) : (
						<button
							className="text-xs md:text-sm p-3 outline-none border-none text-turquoise bg-transparent font-bold cursor-pointer rounded-lg"
							onClick={() =>
								navigate(`/user/edit-rem?id=${userData?._id}`)
							}
						>
							Edit Rem
						</button>
					)}
				</div>
			</header>
			<section className="grid sm:grid-cols-[2fr,1fr] gap-10 h-full">
				<div className="grid grid-rows-2 gap-10 xl:gap-5">
					<div>
						<h3 className="text-turquoise text-xl md:text-2xl text-center lg:text-start mb-2">
							About me
						</h3>
						<p className="text-gray-200 text-sm md:text-lg text-center lg:text-start">
							{userData?.userBio}
						</p>
					</div>
					<div>
						<h3 className="text-turquoise text-xl md:text-2xl text-center lg:text-start mb-2">
							Hostels Stayed
						</h3>
						<div className="flex gap-3 flex-wrap justify-center lg:justify-start">
							{userData?.hostels.map((hostel, idx) => (
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
						<h3 className="text-turquoise text-xl md:text-2xl text-center lg:text-start mb-2">
							Email Id
						</h3>
						<p className="text-gray-200 text-sm md:text-lg text-center lg:text-start">
							{userData?.email}
						</p>
					</div>
					<div>
						<h3 className="text-turquoise text-xl md:text-2xl text-center lg:text-start mb-2">
							Contact Number
						</h3>
						<p className="text-gray-200 text-sm md:text-lg text-center lg:text-start">
							{userData?.contact}
						</p>
					</div>
					<div>
						<h3 className="text-turquoise text-xl md:text-2xl text-center lg:text-start">
							Date of birth
						</h3>
						<p className="text-gray-200 text-sm md:text-lg text-center lg:text-start">
							{userData &&
								new Date(userData?.dateOfBirth)
									.toDateString()
									.split(" ")
									.slice(1)
									.join(" ")}
						</p>
					</div>
				</div>
			</section>
			<footer className="flex items-center justify-center xl:justify-end">
				{userData?.linkedin && userData?.linkedin.length > 0 && (
					<Image
						src="/assets/images/linkedin.png"
						width={70}
						height={70}
						style={{ cursor: "pointer" }}
						onClick={() => window.open(userData.linkedin, "_blank")}
					/>
				)}
				{userData?.instagram && userData?.instagram.length > 0 && (
					<Image
						src="/assets/images/instagram.png"
						width={50}
						height={50}
						style={{ cursor: "pointer" }}
						onClick={() =>
							window.open(userData.instagram, "_blank")
						}
					/>
				)}
			</footer>
		</section>
	);
};

export default OtherUserProfileBox;
