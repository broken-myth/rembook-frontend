import { Button, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";

import { Particle, Toast } from "../../Components";
import { getDetails, updateDetails } from "../../Slices";
import { useAppDispatch } from "../../Store/hooks";
import style from "../Auth/auth.module.css";

const AdminDashboard = () => {
	const dispatch = useAppDispatch();
	const [oldDetails, setOldDetails] = useState<oldDetails | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const getUserDetails = async (dispatchObject: any) => {
		const getDetailsDispatch = await dispatch(getDetails(dispatchObject));
		if (getDetails.fulfilled.match(getDetailsDispatch)) {
			setOldDetails(getDetailsDispatch.payload?.user);
			Toast("toastGreen", "Success", "Found user");
		} else {
			if (getDetailsDispatch.payload?.message)
				Toast("toastRed", "Oops!", getDetailsDispatch.payload.message);
			else Toast("toastRed", "Oops!", "There seems to be an issue!");
		}
	};

	const updateUserDetails = async (dispatchObject: any) => {
		const updateDetailsDispatch = await dispatch(
			updateDetails(dispatchObject)
		);
		if (updateDetails.fulfilled.match(updateDetailsDispatch)) {
			Toast(
				"toastGreen",
				"Success",
				updateDetailsDispatch.payload.message
			);
		} else {
			if (updateDetailsDispatch.payload?.message)
				Toast(
					"toastRed",
					"Oops!",
					updateDetailsDispatch.payload.message
				);
			else Toast("toastRed", "Oops!", "There seems to be an issue!");
		}
	};

	const getform = useForm({
		initialValues: { rollnumber: "" },

		validate: {
			rollnumber: (value: string) =>
				value.trim().length === 9 ? null : "Invalid RollNumber",
		},

		transformValues: (values) => ({
			rollNumber: values.rollnumber,
		}),
	});

	const updateForm = useForm({
		initialValues: { newEmail: "" },

		validate: {
			newEmail: (value: string) =>
				/^\S+@\S+$/.test(value.trim()) ? null : "Invalid email",
		},

		transformValues: (values) => ({
			newEmail: values.newEmail,
			rollNumber: oldDetails?.rollNumber,
		}),
	});
	return (
		<>
			<Particle />
			<div className="absolute w-full h-full z-10 flex justify-center items-center top-0">
				<div
					className={`w-[80%] lg:w-[35%] min-h-[10rem] p-5 rounded-2xl text-center ${style.landing_overlay_bg}`}
				>
					<h1 className="text-turquoise text-6xl mt-6 mb-6">
						ADMIN PANEL
					</h1>
					<h1 className="text-turquoise text-3xl mb-0">SEARCH</h1>
					<form onSubmit={getform.onSubmit(getUserDetails)}>
						<TextInput
							styles={(theme) => ({
								root: {
									width: "60%",
									margin: "1rem auto 1rem",
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
							})}
							placeholder="Roll Number"
							{...getform.getInputProps("rollnumber")}
						/>
						<Button
							type="submit"
							mt="sm"
							loaderProps={{
								size: "sm",
								color: "#41EAD4",
								variant: "bars",
							}}
							sx={(theme) => ({
								fontSize: "1.2rem",
								height: "2.5rem",
								width: "40%",
								margin: "0rem auto 0.5rem",
								background: "rgba(0, 0, 0, 0.8)",
								borderRadius: "10px",
								transition: "transform .5s",
								color: theme.colors.turquoise[0],
								"&:hover": {
									background: theme.colors.turquoise[0],
									color: "black",
									transform: "scale(1.1)",
								},
							})}
						>
							{isLoading ? "" : "CHECK"}
						</Button>
					</form>
					{oldDetails != null ? (
						<>
							<h3 className="text-green  mb-0">
								{oldDetails.name} : {oldDetails.rollNumber}
							</h3>
							<h3 className="text-green  mb-0">
								{oldDetails.email}
							</h3>
							<h1 className="text-turquoise text-3xl mt-6 mb-0">
								UPDATE
							</h1>
							<form
								onSubmit={updateForm.onSubmit(
									updateUserDetails
								)}
							>
								<TextInput
									styles={(theme) => ({
										root: {
											width: "60%",
											margin: "1rem auto 1rem",
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
									})}
									placeholder="New Email"
									{...updateForm.getInputProps("newEmail")}
								/>
								<Button
									type="submit"
									mt="sm"
									loaderProps={{
										size: "sm",
										color: "#41EAD4",
										variant: "bars",
									}}
									sx={(theme) => ({
										fontSize: "1.2rem",
										height: "2.5rem",
										width: "40%",
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
							</form>
						</>
					) : null}
				</div>
			</div>
		</>
	);
};

export default AdminDashboard;
