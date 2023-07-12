import { Avatar, Image, Tooltip } from "@mantine/core";
import { IconChevronLeft, IconLock, IconLockOpen } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

import config from "../../Config";
import styles from "../../Pages/User/profile.module.css";
import { OverlayState } from "../../Pages/User/types";
import { CustomAxios } from "../../Utils";
import { RemBoxProps } from "./types";

const RemBox: React.FC<RemBoxProps> = ({
	setOverlay,
	overlay,
	activeRemFromId,
	remsData,
	setRemsData,
}) => {
	const activeRem = remsData.find((rem) => rem.fromID === activeRemFromId);
	const navigate = useNavigate();

	const goToProfile = () => {
		setOverlay(OverlayState.PROFILE);
	};

	const navigateToProfile = () => {
		navigate("/user/" + activeRem?.fromID);
	};

	const togglePrivacy = async () => {
		try {
			if (activeRem?.isPrivate) {
				await CustomAxios.post(
					"/memory/makePublic",
					{
						from: activeRemFromId,
					},
					{
						withCredentials: true,
					}
				);
			} else {
				await CustomAxios.post(
					"/memory/makePrivate",
					{
						from: activeRemFromId,
					},
					{
						withCredentials: true,
					}
				);
			}
			const updatedRemsData = remsData.map((rem) => {
				if (rem.fromID === activeRemFromId) {
					rem.isPrivate = !rem.isPrivate;
				}
				return rem;
			});
			setRemsData(updatedRemsData);
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<section
			className={`rounded-lg p-10 border border-solid border-turquoise flex flex-col gap-10 ${styles.profile_box_bg}`}
		>
			<header className="flex justify-between">
				<button
					className="text-turquoise bg-transparent font-bold text-sm md:text-lg border-none outline-none border-0 cursor-pointer flex items-center justify-center"
					onClick={goToProfile}
				>
					<IconChevronLeft width={30} height={30} />
					Back
				</button>
				<Tooltip
					label={`${
						activeRem?.isPrivate ? "Make public" : "Make private"
					}`}
				>
					<button
						className="bg-transparent text-turquoise text-sm md:text-lg border-0 cursor-pointer"
						onClick={togglePrivacy}
					>
						{activeRem?.isPrivate ? (
							<IconLock width={30} height={30} />
						) : (
							<IconLockOpen width={30} height={30} />
						)}
					</button>
				</Tooltip>
			</header>
			<div>
				<div
					className="flex gap-5 items-center mb-5 cursor-pointer"
					onClick={navigateToProfile}
				>
					<Avatar
						src={`${config.backend_url}/assets/images/profiles/${
							activeRem?.userImage?.split(".")[0]
						}.jpg`}
						className="w-[30px] h-[30px] sm:w-[50px] sm:h-[50px] rounded-[50%]"
					/>
					<h1 className="font-normal text-[1.2rem] sm:text-[1.5rem] text-white">
						<span className="font-bold">{activeRem?.from}</span>{" "}
						says
					</h1>
				</div>
				<section className="flex flex-col items-start gap-0 md:gap-10 mt-10">
					<div className="m-auto my-10">
						<Image
							src={`${
								config.backend_url
							}/assets/images/memories/${
								activeRem?.remImage?.split(".")[0]
							}.jpg`}
							height={200}
							width={200}
						/>
					</div>
					<div className="flex flex-col gap-5">
						{activeRem?.question.map((question, idx) => {
							const answer = activeRem.answers.find(
								(answer) => answer.questionId === question.id
							);
							return (
								<div className="flex flex-col gap-3" key={idx}>
									<h1 className="text-xl text-turquoise md:text-3xl">
										{question.question}
									</h1>
									<p className="text-gray-300 text-lg md:text-xl">
										{answer?.answer}
									</p>
								</div>
							);
						})}
					</div>
					{/* <div className="flex flex-col gap-3">
						<h1 className="text-xl md:text-3xl">About Jane Doe</h1>
						<p className="text-lg md:text-xl">great</p>
					</div>
					<div className="flex flex-col gap-3">
						<h1 className="text-xl md:text-3xl">
							The first thing about Jane Doe
						</h1>
						<p className="text-lg md:text-xl">great</p>
					</div>
					<div className="flex flex-col gap-3">
						<h1 className="text-xl md:text-3xl">About Jane Doe</h1>
						<p className="text-lg md:text-xl">great</p>
					</div>
					<div className="flex flex-col gap-3">
						<h1 className="text-xl md:text-3xl">About Jane Doe</h1>
						<p className="text-lg md:text-xl">great</p>
					</div> */}
				</section>
			</div>
		</section>
	);
};

export default RemBox;
