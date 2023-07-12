import {
	Button,
	Center,
	Container,
	FileInput,
	Flex,
	Image,
	SimpleGrid,
	Space,
	Text,
	Textarea,
	TextInput,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import ImageCompression from "browser-image-compression";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Particle, Toast } from "../../Components";
import config from "../../Config/index";
import remImg from "../../public/remImage.png";
import {
	fetchUserFromId,
	getMemoryOfPair,
	getQuestions,
	updateRem,
} from "../../Slices";
import { useAppDispatch } from "../../Store/hooks";
import style from "./writerem.module.css";
const WriteRem = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const isMobile = useMediaQuery("(max-width: 767px)");
	const [name, setName] = useState<string>("");
	const [question, setQuestion] = useState<Questions>();
	const [about, setAbout] = useState<string>("");
	const [nicknames, setNicknames] = useState<string>("");
	const [words, setWords] = useState<string>("");
	const [feature, setStrikingFeature] = useState<string>("");
	const [image, setImage] = useState<string>("");
	const [file, setFile] = useState<File>();
	const url = new URL(window.location.href);
	const remUser = url.searchParams.get("id");
	const [isDisabled, setDisabled] = useState<boolean>(false);
	const remUserDetails = async () => {
		const fetchUserResponse = await dispatch(
			fetchUserFromId({ id: remUser })
		);
		if (fetchUserFromId.fulfilled.match(fetchUserResponse)) {
			Toast(
				"green",
				"Success",
				`Successfully fetched details for ${fetchUserResponse.payload.user.name}`
			);
			setName(fetchUserResponse.payload.user.name);
		} else {
			navigate("/");
			Toast("red", "Oops!", "There seems to be an issue!");
		}
	};

	const getMemory = async () => {
		const getMemoryResponse = await dispatch(
			getMemoryOfPair({ id: remUser })
		);
		if (getMemoryOfPair.fulfilled.match(getMemoryResponse)) {
			setDisabled(true);
			setAbout(getMemoryResponse.payload.data.answers[3].answer);
			setNicknames(getMemoryResponse.payload.data.answers[0].answer);
			setWords(getMemoryResponse.payload.data.answers[2].answer);
			setStrikingFeature(
				getMemoryResponse.payload.data.answers[1].answer
			);
			setImage(getMemoryResponse.payload.data.remImage);
			Toast(
				"yellow",
				"Already written a Rem",
				"You can view it here, or edit on the edit rem page"
			);
		} else {
			if (
				getMemoryResponse.payload?.message ===
				"No rem exist between the two users"
			) {
				setDisabled(false);
			} else Toast("red", "Oops!", "There seems to be an issue!");
		}
	};

	const handleImageChange = async (file: any) => {
		if (file) {
			setImage(URL.createObjectURL(file));
			const options = {
				maxSizeMB: 1,
				maxWidthOrHeight: 1024,
				useWebWorker: false,
			};
			try {
				const compressedFile = await ImageCompression(file, options);
				setFile(compressedFile);
			} catch (error) {
				console.log(error);
			}
		} else {
			setImage("");
			setFile(undefined);
		}
	};

	const fetchQuestions = async () => {
		const fetchQuestionsResponse = await dispatch(getQuestions());
		if (getQuestions.fulfilled.match(fetchQuestionsResponse)) {
			setQuestion(fetchQuestionsResponse.payload.question);
		} else {
			navigate("/");
			Toast("red", "Oops!", "Error getting the questions!");
		}
	};

	const submitForm = async () => {
		if (about !== "") {
			const answers = [
				{
					answer: nicknames,
					questionId: 0,
				},
				{
					answer: feature,
					questionId: 1,
				},
				{
					answer: words,
					questionId: 2,
				},
				{
					answer: about,
					questionId: 3,
				},
			];
			const updateRemResponse = await dispatch(
				updateRem({
					to: remUser as string,
					questions: question?.id as string,
					answer: answers,
					image: file,
				})
			);
			if (updateRem.fulfilled.match(updateRemResponse)) {
				navigate("/");
				Toast("green", "Success", "Successfully written Rem");
			} else {
				Toast("red", "Oops!", "Error occured while submitting Rem");
			}
		} else {
			Toast("red", "Oops!", "Please fill fields marked with *");
		}
	};

	useEffect(() => {
		fetchQuestions();
		if (remUser) {
			remUserDetails();
			getMemory();
		} else navigate("/");
	}, []);
	return (
		<Particle>
			<Center className={style.writeRemPage}>
				<Container className={style.glassContainer}>
					<Text
						style={{ textAlign: isMobile ? "center" : "left" }}
						pl={"xs"}
						inline
						className="text-turquoise text-xl lg:text-2xl"
					>
						Write a Rem about{" "}
						<span style={{ fontWeight: 700 }}>{name}</span>
					</Text>
					<Space h="md" />
					<SimpleGrid
						cols={isMobile ? 1 : 2}
						spacing={isMobile ? "md" : "xl"}
					>
						<div>
							<Text
								pl={"xs"}
								pb={isMobile ? "0" : "md"}
								size={isMobile ? "sm" : "md"}
								className="text-turquoise text-lg lg:text-xl"
							>
								{question?.questions[3].question} *
							</Text>
							<Textarea
								minRows={isMobile ? 2 : 8}
								radius="md"
								styles={(theme) => ({
									input: {
										fontSize: "1.2rem",
										borderRadius: "10px",
										background: "rgba(0, 0, 0, 0.8)",
										border: "none",
										color: "white",
									},
									innerInput: {
										height: "2rem",
										margin: "auto 0",
										color: "white",
									},
								})}
								value={about}
								onChange={(e) => setAbout(e.target.value)}
								readOnly={isDisabled}
							/>
						</div>
						<div>
							<Flex
								direction="column"
								align={"center"}
								mt={isMobile ? "0" : "xl"}
							>
								<Image
									width={"100%"}
									style={{
										maxWidth: "60%",
										maxHeight: "70%",
									}}
									alt="Rem"
									p={isMobile ? "xs" : "sm"}
									src={
										!isDisabled
											? image
											: image
												? `${
													config.backend_url
											  }/assets/images/memories/${
													image?.split(".")[0]
											  }.jpg`
												: remImg
									}
									onError={(e: any) =>
										(e.target.src = remImg)
									}
								/>
								{!isDisabled ? (
									<FileInput
										accept="image/png,image/jpeg,image/jpg"
										placeholder="Upload your memories"
										w={isMobile ? "75%" : "50%"}
										pl={isMobile ? "0" : "sm"}
										onChange={(e) => handleImageChange(e)}
										clearable
										value={file}
										readOnly={isDisabled}
									/>
								) : (
									<></>
								)}
							</Flex>
						</div>
						<div>
							<Text
								pl={"xs"}
								pb={isMobile ? "0" : "md"}
								size={isMobile ? "sm" : "md"}
								className="text-turquoise text-lg lg:text-xl"
							>
								{question?.questions[0].question}
							</Text>
							<TextInput
								radius="md"
								value={nicknames}
								onChange={(e) => setNicknames(e.target.value)}
								readOnly={isDisabled}
								styles={(theme) => ({
									input: {
										fontSize: "1.2rem",
										borderRadius: "10px",
										height: "2.5rem",
										background: "rgba(0, 0, 0, 0.8)",
										border: "none",
										color: "white",
									},
									innerInput: {
										height: "2rem",
										margin: "auto 0",
										color: "white",
									},
								})}
							/>
						</div>
						<div>
							<Text
								pl={"xs"}
								pb={isMobile ? "0" : "md"}
								size={isMobile ? "sm" : "md"}
								className="text-turquoise text-lg lg:text-xl"
							>
								{question?.questions[2].question}
							</Text>
							<TextInput
								radius="md"
								styles={(theme) => ({
									input: {
										fontSize: "1.2rem",
										borderRadius: "10px",
										height: "2.5rem",
										background: "rgba(0, 0, 0, 0.8)",
										border: "none",
										color: "white",
									},
									innerInput: {
										height: "2rem",
										margin: "auto 0",
										color: "white",
									},
								})}
								value={words}
								onChange={(e) => setWords(e.target.value)}
								readOnly={isDisabled}
							/>
						</div>
						<div>
							<Text
								pl={"xs"}
								pb={isMobile ? "0" : "md"}
								size={isMobile ? "sm" : "md"}
								className="text-turquoise text-lg lg:text-xl"
							>
								{question?.questions[1].question}
							</Text>
							<TextInput
								radius="md"
								styles={(theme) => ({
									input: {
										fontSize: "1.2rem",
										borderRadius: "10px",
										height: "2.5rem",
										background: "rgba(0, 0, 0, 0.8)",
										border: "none",
										color: "white",
									},
									innerInput: {
										height: "2rem",
										margin: "auto 0",
										color: "white",
									},
								})}
								value={feature}
								onChange={(e) =>
									setStrikingFeature(e.target.value)
								}
								readOnly={isDisabled}
							/>
						</div>
					</SimpleGrid>
					<Space h="md" />
					<Center>
						{isDisabled ? (
							<></>
						) : (
							<Button
								radius={"md"}
								className="bg-turquoise text-black"
								onClick={submitForm}
							>
								Submit
							</Button>
						)}
					</Center>
				</Container>
			</Center>
		</Particle>
	);
};

export default WriteRem;
