import { AspectRatio, Avatar, Image } from "@mantine/core";
import { IconChevronLeft } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

import config from "../../Config";
import styles from "../../Pages/User/profile.module.css";
import { OverlayState } from "../../Pages/User/types";
import { WrittenRemBoxProps } from "./types";

const WrittenRemBox: React.FC<WrittenRemBoxProps> = ({
	overlay,
	setOverlay,
	activeWrittenRemToId,
	writtenRemsData,
	setWrittenRemsData,
}) => {
	const activeWrittenRem = writtenRemsData.find(
		(writtenRem) => writtenRem.toID === activeWrittenRemToId
	);

	const navigate = useNavigate();

	const goToProfile = () => {
		setOverlay(OverlayState.PROFILE);
	};

	const navigateToProfile = () => {
		navigate("/user/" + activeWrittenRem?.toID);
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
				<button
					className="text-turquoise bg-transparent font-bold text-sm md:text-lg border-none outline-none border-0 cursor-pointer"
					onClick={() =>
						navigate(`/user/edit-rem?id=${activeWrittenRem?.toID}`)
					}
				>
					Edit Rem
				</button>
			</header>
			<div>
				<div
					className="flex gap-5 items-center mb-5 cursor-pointer"
					onClick={navigateToProfile}
				>
					<Avatar
						src={`${config.backend_url}/assets/images/profiles/${
							activeWrittenRem?.userImage?.split(".")[0]
						}.jpg`}
						className="w-[30px] h-[30px] sm:w-[50px] sm:h-[50px] rounded-[50%]"
					/>
					<h1 className="font-normal text-[1.2rem] sm:text-[1.5rem] text-white">
						You write about &nbsp;
						<span className="font-bold">
							{activeWrittenRem?.to}
						</span>
						&nbsp; as
					</h1>
				</div>
				{/* <div className="m-auto lg:mx-0 my-10 lg:w-[20rem] rounded-[2rem]">
						<Image
							src={`${config.backend_url}/assets/images/memories/${activeWrittenRem?.remImage}`}
							className="lg:m-auto w-[10rem] lg:w-[20rem]"
						/>
				</div> */}
				<section className="flex flex-col items-start gap-10 ">
					<div className="m-auto my-10">
						<Image
							src={`${
								config.backend_url
							}/assets/images/memories/${
								activeWrittenRem?.remImage?.split(".")[0]
							}.jpg`}
							height={200}
							width={200}
						/>
					</div>
					<div className="flex flex-col gap-5">
						{activeWrittenRem?.question.map((question, idx) => {
							const answer = activeWrittenRem.answers.find(
								(answer) => answer.questionId === question.id
							);
							return (
								<div className="flex flex-col" key={idx}>
									<h1 className="text-turquoise text-xl md:text-3xl">
										{question.question}
									</h1>
									<p className="text-gray-300 text-lg md:text-xl">
										{answer?.answer}
									</p>
								</div>
							);
						})}
					</div>
				</section>
			</div>
		</section>
	);
};

export default WrittenRemBox;
