import {
	Anchor,
	Button,
	FileInput,
	Flex,
	Group,
	NativeSelect,
	NumberInput,
	Textarea,
	TextInput,
} from "@mantine/core";
import { DatePickerInput, DatesProvider } from "@mantine/dates";
import { useForm } from "@mantine/form";
import {
	IconBrandInstagram,
	IconBrandLinkedin,
	IconBuilding,
	IconCalendar,
	IconMail,
	IconPhone,
	IconPhoto,
	IconUser,
} from "@tabler/icons-react";
import ImageCompression from "browser-image-compression";
import { useEffect } from "react";
import { useCallback, useState } from "react";
import { GoogleReCaptcha } from "react-google-recaptcha-v3";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Particle, Toast } from "../../Components";
import {
	forgotPwd,
	updateProfile,
	updateProfilePicture,
	userSelector,
} from "../../Slices";
import { useAppDispatch } from "../../Store/hooks";
import styles from "../Auth/auth.module.css";

const EditProfile = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const userProfile = useSelector(userSelector);
	const [token, setToken] = useState<string>("");
	const onVerify = useCallback((token: string) => {
		setToken(token);
	}, []);

	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isResetLoading, setResetIsLoading] = useState<boolean>(false);
	const [dob, setDob] = useState<Date | null>(
		userProfile.dateOfBirth === undefined ||
			userProfile.dateOfBirth === null
			? null
			: new Date(userProfile.dateOfBirth)
	);
	const [file, setfile] = useState<File | null>(null);
	const [hostelList, setHostelList] = useState<any[]>([
		{ hostelName: undefined, roomNumber: undefined },
		{ hostelName: undefined, roomNumber: undefined },
		{ hostelName: undefined, roomNumber: undefined },
		{ hostelName: undefined, roomNumber: undefined },
	]);

	useEffect(() => {
		setHostelList(
			hostelList.map((value, index) => {
				if (userProfile.hostelsList && userProfile.hostelsList[index])
					return {
						hostelName: userProfile.hostelsList[index].hostelName,
						roomNumber: userProfile.hostelsList[index].roomNumber,
					};
				else return value;
			})
		);
	}, [userProfile]);
	const forgotHandler = async () => {
		setResetIsLoading(true);
		const forgotDispatch = await dispatch(
			forgotPwd({ email: userProfile.email, token: token })
		);
		setResetIsLoading(false);
		if (forgotPwd.fulfilled.match(forgotDispatch)) {
			Toast("toastturquoise", "Success", "Reset Password!!");
		} else {
			if (forgotDispatch.payload?.message)
				Toast("toastRed", "Oops!", forgotDispatch.payload.message);
			else Toast("toastRed", "Oops!", "There seems to be an issue!");
		}
	};

	const updateHandler = async (dispatchObject: any) => {
		setIsLoading(true);
		const updateDispatch = await dispatch(updateProfile(dispatchObject));
		if (updateProfile.fulfilled.match(updateDispatch)) {
			navigate("/user/profile");
			Toast("toastturquoise", "Success!", "Updated Profile");
		} else {
			if (updateDispatch.payload?.message)
				Toast("toastRed", "Oops!", updateDispatch.payload.message);
			else
				Toast(
					"toastRed",
					"Oops!",
					"There seems to be an issue with updating the profile!"
				);
		}
		if (file) {
			const options = {
				maxSizeMB: 1,
				maxWidthOrHeight: 1024,
				useWebWorker: false,
			};
			try {
				const compressedFile = await ImageCompression(file, options);
				const updatePictureDispactch = await dispatch(
					updateProfilePicture(compressedFile)
				);
				if (
					updateProfilePicture.fulfilled.match(updatePictureDispactch)
				) {
					Toast(
						"toastturquoise",
						"Success!",
						"Updated Profile Picture"
					);
				} else {
					if (updatePictureDispactch.payload?.message)
						Toast(
							"toastRed",
							"Oops!",
							updatePictureDispactch.payload.message
						);
					else
						Toast(
							"toastRed",
							"Oops!",
							"There seems to be an issue with uploading profile picture!"
						);
				}
			} catch (error) {
				Toast(
					"toastRed",
					"Oops!",
					"Error occured while uploading profile pic"
				);
			}
		}
		setIsLoading(false);
	};

	const form = useForm({
		initialValues: {
			name: userProfile.name,
			email: userProfile.email,
			contact: userProfile.contact,
			department: userProfile.department,
			userBio: userProfile.userBio,
			instagram: userProfile.instagram,
			linkedin: userProfile.linkedin,
		},

		validate: {
			email: (value: string | undefined) => {
				if (value)
					return /^\S+@\S+$/.test(value.trim())
						? null
						: "Invalid email";
				else return null;
			},
		},

		transformValues: (values) => ({
			name: values.name,
			email: values.email,
			department: values.department,
			userBio: values.userBio,
			hostels: hostelList,
			contact: values.contact,
			dateOfBirth: dob,
			instagram: values.instagram,
			linkedin: values.linkedin,
		}),
	});
	useEffect(() => {
		setHostelList(
			hostelList.map((value, index) => {
				if (userProfile.hostelsList && userProfile.hostelsList[index])
					return {
						hostelName: userProfile.hostelsList[index].hostelName,
						roomNumber: userProfile.hostelsList[index].roomNumber,
					};
				else return value;
			})
		);
		form.setValues({
			name: userProfile.name,
			email: userProfile.email,
			department: userProfile.department,
			userBio: userProfile.userBio,
			contact: userProfile.contact,
			instagram: userProfile.instagram,
			linkedin: userProfile.linkedin,
		});
	}, [userProfile]);
	return (
		<>
			<Particle>
				<div
					className={
						"w-full z-10 min-h-full flex justify-center items-center"
					}
				>
					<div
						className={`z-20 rounded-lg overflow-y-scroll w-[80%] lg:w-[80%] mt-[5vh] mb-[5vh] min-h-[10rem]  p-6 rounded-2xl text-center ${styles.landing_overlay_bg}`}
					>
						<Group
							position="left"
							mt="md"
							style={{ width: "80%", margin: "auto 0" }}
						>
							<Anchor<"a">
								onClick={() => navigate("/user/profile")}
								sx={(theme) => ({
									color: theme.colors.turquoise[0],
									margin: "10px 0 0rem",
									fontWeight: 500,
									textAlign: "left",
									fontFamily: theme.fontFamily,
									fontSize: theme.fontSizes.sm,
								})}
							>
								&#8598; Back to Profile
							</Anchor>
						</Group>
						<h1 className="text-turquoise text-lg sm:text-3xl lg:text-4xl my-3">
							UPDATE PROFILE
						</h1>
						<form onSubmit={form.onSubmit(updateHandler)}>
							<Group position="center" className="m-5">
								<TextInput
									icon={
										<IconUser size="1.1rem" stroke={1.5} />
									}
									styles={(theme) => ({
										root: {
											width: "20rem",
											margin: "0rem auto 0rem",
										},
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
										label: {
											color: theme.colors.turquoise[0],
											fontSize: "1.2rem",
											margin: "0 0 0.5rem",
										},
									})}
									label="Name"
									readOnly
									{...form.getInputProps("name")}
								/>
								<TextInput
									icon={
										<IconPhone size="1.1rem" stroke={1.5} />
									}
									styles={(theme) => ({
										root: {
											width: "20rem",
											margin: "0rem auto 0rem",
										},
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
										label: {
											color: theme.colors.turquoise[0],
											fontSize: "1.2rem",
											margin: "0 0 0.5rem",
										},
									})}
									label="Contact"
									{...form.getInputProps("contact")}
								/>
								<TextInput
									icon={
										<IconMail size="1.1rem" stroke={1.5} />
									}
									styles={(theme) => ({
										root: {
											width: "20rem",
											margin: "0rem auto 0rem",
										},
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
										label: {
											color: theme.colors.turquoise[0],
											fontSize: "1.2rem",
											margin: "0 0 0.5rem",
										},
									})}
									label="Email"
									readOnly
									{...form.getInputProps("email")}
								/>
								<TextInput
									icon={
										<IconBuilding
											size="1.1rem"
											stroke={1.5}
										/>
									}
									styles={(theme) => ({
										root: {
											width: "20rem",
											margin: "0rem auto 0rem",
										},
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
										label: {
											color: theme.colors.turquoise[0],
											fontSize: "1.2rem",
											margin: "0 0 0.5rem",
										},
									})}
									label="Department"
									readOnly
									{...form.getInputProps("department")}
								/>
								<TextInput
									icon={
										<IconBrandInstagram
											size="1.1rem"
											stroke={1.5}
										/>
									}
									styles={(theme) => ({
										root: {
											width: "20rem",
											margin: "0rem auto 0rem",
										},
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
										label: {
											color: theme.colors.turquoise[0],
											fontSize: "1.2rem",
											margin: "0 0 0.5rem",
										},
									})}
									label="Instagram ID(Link)"
									{...form.getInputProps("instagram")}
								/>
								<TextInput
									icon={
										<IconBrandLinkedin
											size="1.1rem"
											stroke={1.5}
										/>
									}
									styles={(theme) => ({
										root: {
											width: "20rem",
											margin: "0rem auto 0rem",
										},
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
										label: {
											color: theme.colors.turquoise[0],
											fontSize: "1.2rem",
											margin: "0 0 0.5rem",
										},
									})}
									label="Linkedin ID(Link)"
									{...form.getInputProps("linkedin")}
								/>
								<DatesProvider
									settings={{
										locale: "ru",
										firstDayOfWeek: 0,
										weekendDays: [0],
									}}
								>
									<DatePickerInput
										allowDeselect
										styles={(theme) => ({
											root: {
												width: "20rem",
												margin: "0rem auto 0rem",
											},
											input: {
												fontSize: "1.2rem",
												borderRadius: "10px",
												height: "2.5rem",
												background:
													"rgba(0, 0, 0, 0.8)",
												border: "none",
												color: "white",
											},
											label: {
												color: theme.colors
													.turquoise[0],
												fontSize: "1.2rem",
												margin: "0 0 0.5rem",
											},
										})}
										icon={
											<IconCalendar
												size="1.1rem"
												stroke={1.5}
											/>
										}
										mt="md"
										label="Date of Birth"
										value={dob}
										onChange={setDob}
									/>
								</DatesProvider>
								<FileInput
									icon={
										<IconPhoto size="1.1rem" stroke={1.5} />
									}
									styles={(theme) => ({
										root: {
											width: "20rem",
											margin: "0rem auto 0rem",
										},
										input: {
											fontSize: "1.2rem",
											borderRadius: "10px",
											height: "2.5rem",
											background: "rgba(0, 0, 0, 0.8)",
											border: "none",
											color: "white",
										},
										label: {
											color: theme.colors.turquoise[0],
											fontSize: "1.2rem",
											margin: "0 0 0.5rem",
										},
									})}
									name="file"
									value={file}
									onChange={setfile}
									placeholder="Pick a Pic"
									label="Profile Picture"
								/>
							</Group>
							<Group
								position="center"
								className="m-10"
								style={{ justifyContent: "space-around" }}
							>
								{hostelList.map((value, index) => (
									<Flex direction="row" gap="md" key={index}>
										<NativeSelect
											styles={(theme) => ({
												root: {
													width: "10rem",
													margin: "0rem auto 0rem",
												},
												input: {
													fontSize: "1.2rem",
													borderRadius: "10px",
													height: "2.5rem",
													background:
														"rgba(0, 0, 0, 0.8)",
													border: "none",
													color: "white",
												},
												label: {
													color: theme.colors
														.turquoise[0],
													fontSize: "1.2rem",
													margin: "0 0 0.5rem",
												},
											})}
											value={hostelList[index].hostelName}
											onChange={(event) => {
												const newHostelList =
													hostelList;
												newHostelList[
													index
												].hostelName =
													event.currentTarget.value;
												setHostelList(newHostelList);
											}}
											label={"Hostel " + (index + 1)}
											data={[
												"None",
												"Opal A",
												"Opal B",
												"Opal C",
												"Opal D",
												"Opal E",
												"Opal F",
												"Aqua A",
												"Aqua B",
												"Amber A",
												"Amber B",
												"Garnet A",
												"Garnet B",
												"Garnet C",
												"Zircon A",
												"Zircon B",
												"Zircon C",
												"Agate",
												"Diamond",
												"CORAL",
												"Jade",
												"Beryl",
												"Emerald",
												"Pearl",
												"Ruby",
												"Sapphire",
												"Topaz",
												"Lapis",
												"Jasper",
											]}
										/>
										<NumberInput
											styles={(theme) => ({
												root: {
													width: "5rem",
													margin: "0rem auto 0rem",
												},
												input: {
													fontSize: "1.2rem",
													borderRadius: "10px",
													height: "2.5rem",
													background:
														"rgba(0, 0, 0, 0.8)",
													border: "none",
													color: "white",
												},
												label: {
													color: theme.colors
														.turquoise[0],
													fontSize: "1.2rem",
													margin: "0 0 0.5rem",
												},
											})}
											value={
												hostelList[index].roomNumber
													? Number(
														hostelList[index]
															.roomNumber
													  )
													: undefined
											}
											onChange={(event) => {
												const newHostelList =
													hostelList;
												if (event != "")
													newHostelList[
														index
													].roomNumber =
														Number(event);
												setHostelList(newHostelList);
											}}
											label={"Room"}
											hideControls
										/>
									</Flex>
								))}
							</Group>
							<Textarea
								styles={(theme) => ({
									root: {
										width: "80%",
										margin: "0rem auto 1rem",
									},
									input: {
										fontSize: "1.2rem",
										borderRadius: "10px",
										background: "rgba(0, 0, 0, 0.8)",
										border: "none",
										color: "white",
									},
									label: {
										color: theme.colors.turquoise[0],
										fontSize: "1.2rem",
										margin: "0 0 0.5rem",
									},
								})}
								{...form.getInputProps("userBio")}
								label={"About Me (Bio)"}
							/>
							<Flex direction="row" wrap="wrap">
								<Button
									disabled={token == null}
									type="submit"
									mt="sm"
									loaderProps={{
										size: "sm",
										color: "#41EAD4",
										variant: "bars",
									}}
									loading={isLoading}
									sx={(theme) => ({
										fontSize: "0.8rem",
										height: "2.5rem",
										width: "10rem",
										margin: "0rem auto 0.5rem",
										background: "rgba(0, 0, 0, 0.8)",
										borderRadius: "10px",
										transition: "transform .5s",
										color: theme.colors.turquoise[0],
										"&:hover": {
											background:
												theme.colors.turquoise[0],
											color: "black",
											transform: "scale(1.1)",
										},
									})}
								>
									{isLoading ? "" : "UPDATE"}
								</Button>
								<Button
									disabled={token == null}
									loaderProps={{
										size: "sm",
										color: "#41EAD4",
										variant: "bars",
									}}
									mt="sm"
									onClick={() => {
										navigate("/user/creds");
									}}
									sx={(theme) => ({
										fontSize: "0.8rem",
										height: "2.5rem",
										width: "10rem",
										margin: "0rem auto 0.5rem",
										background: "rgba(0, 0, 0, 0.8)",
										borderRadius: "10px",
										transition: "transform .5s",
										color: theme.colors.turquoise[0],
										"&:hover": {
											background:
												theme.colors.turquoise[0],
											color: "black",
											transform: "scale(1.1)",
											"& img": {
												filter: "brightness(5%)",
											},
										},
									})}
								>
									{"SET CREDENTIALS"}
								</Button>
								<Button
									disabled={token == null}
									loaderProps={{
										size: "sm",
										color: "#41EAD4",
										variant: "bars",
									}}
									loading={isResetLoading}
									mt="sm"
									onClick={() => {
										forgotHandler();
									}}
									sx={(theme) => ({
										fontSize: "0.8rem",
										height: "2.5rem",
										width: "10rem",
										margin: "0rem auto 0.5rem",
										background: "rgba(0, 0, 0, 0.8)",
										borderRadius: "10px",
										transition: "transform .5s",
										color: theme.colors.turquoise[0],
										"&:hover": {
											background:
												theme.colors.turquoise[0],
											color: "black",
											transform: "scale(1.1)",
											"& img": {
												filter: "brightness(5%)",
											},
										},
									})}
								>
									{isResetLoading ? "" : "RESET PASSWORD"}
								</Button>
							</Flex>
						</form>
					</div>
				</div>
			</Particle>
			<GoogleReCaptcha onVerify={onVerify} />
		</>
	);
};

export default EditProfile;
