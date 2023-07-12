import { Button, PasswordInput, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconKey, IconMail } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

import { Particle, Toast } from "../../Components";
import Footer from "../../Components/Footer/Footer";
import { setCredentials } from "../../Slices";
import { useAppDispatch } from "../../Store/hooks";
import style from "../Auth/auth.module.css";

const Credentials = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const credentialHandler = async (dispatchObject: any) => {
		const credentialDispatch = await dispatch(
			setCredentials(dispatchObject)
		);
		if (setCredentials.fulfilled.match(credentialDispatch)) {
			Toast("toastGreen", "Success", "New Credentials are set!");
			navigate("/user/profile");
		} else {
			if (credentialDispatch.payload?.message)
				Toast("toastRed", "Oops!", credentialDispatch.payload.message);
			else Toast("toastRed", "Oops!", "There seems to be an issue!");
		}
	};

	const form = useForm({
		initialValues: { confirm: "", password: "", email: "" },

		validate: {
			email: (value: string) =>
				/^\S+@\S+$/.test(value.trim())
					? value.trim().endsWith("@nitt.edu")
						? "Use an Mail Id othen than your webmail"
						: null
					: "Invalid email",
			password: (value: string) =>
				value.trim().length < 6
					? "Password must be atleast 6 characters long"
					: null,
			confirm: (value, values) =>
				value !== values.password ? "Passwords did not match" : null,
		},

		transformValues: (values) => ({
			password: values.password,
			email: values.email,
		}),
	});

	return (
		<>
			<Particle>
				<div className="absolute w-full h-full z-10 flex justify-center items-center">
					<div
						className={`w-[80%] lg:w-[40%] min-h-[10rem] p-6 rounded-2xl text-center ${style.landing_overlay_bg}`}
					>
						<h1 className="text-turquoise text-lg sm:text-3xl lg:text-4xl">
							SET CREDENTIALS
						</h1>
						<form onSubmit={form.onSubmit(credentialHandler)}>
							<TextInput
								icon={<IconMail size="1.1rem" stroke={1.5} />}
								styles={(theme) => ({
									root: {
										width: "65%",
										margin: "4rem auto 1rem",
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
								placeholder="Email"
								{...form.getInputProps("email")}
							/>
							<PasswordInput
								icon={<IconKey size="1.1rem" stroke={1.5} />}
								styles={(theme) => ({
									root: {
										width: "65%",
										margin: "0rem auto 1rem",
									},
									input: {
										borderRadius: "10px",
										height: "2.5rem",
										background: "rgba(0, 0, 0, 0.8)",
										border: "none",
									},
									innerInput: {
										fontSize: "1.2rem",
										height: "2rem",
										margin: "auto 0",
										color: "white",
									},
								})}
								placeholder="Password"
								{...form.getInputProps("password")}
							/>
							<PasswordInput
								icon={<IconKey size="1.1rem" stroke={1.5} />}
								styles={(theme) => ({
									root: {
										width: "65%",
										margin: "0rem auto 0.5rem",
									},
									input: {
										borderRadius: "10px",
										height: "2.5rem",
										background: "rgba(0, 0, 0, 0.8)",
										border: "none",
									},
									innerInput: {
										fontSize: "1.2rem",
										height: "2rem",
										margin: "auto 0",
										color: "white",
									},
								})}
								placeholder="Confirm"
								{...form.getInputProps("confirm")}
							/>

							<Button
								type="submit"
								mt="sm"
								sx={(theme) => ({
									fontSize: "1.2rem",
									height: "2.5rem",
									width: "50%",
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
								className="text-xl sm:text-2xl"
							>
								SUBMIT
							</Button>
						</form>
					</div>
				</div>
				<Footer />
			</Particle>
		</>
	);
};

export default Credentials;
