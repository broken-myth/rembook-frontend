import { Button, PasswordInput, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useCallback, useState } from "react";
import { GoogleReCaptcha } from "react-google-recaptcha-v3";
import { useNavigate } from "react-router-dom";

import { Particle, Toast } from "../../../Components";
import { adminLogin } from "../../../Slices";
import { useAppDispatch } from "../../../Store/hooks";
import style from "../auth.module.css";

const AdminLogin = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const loginHandler = async (dispatchObject: Credentials) => {
		const loginDispatch = await dispatch(adminLogin(dispatchObject));
		if (adminLogin.fulfilled.match(loginDispatch)) {
			navigate("/admin/dashboard");
			Toast("toastGreen", "Success", "Signed In!");
		} else {
			navigate("/auth/admin/login");
			if (loginDispatch.payload?.message)
				Toast("toastRed", "Oops!", loginDispatch.payload.message);
			else Toast("toastRed", "Oops!", "There seems to be an issue!");
		}
	};

	const form = useForm({
		initialValues: { email: "", password: "" },

		validate: {
			email: (value: string) =>
				/^\S+@\S+$/.test(value.trim()) ? null : "Invalid email",
			password: (value: string) =>
				value.trim().length < 6
					? "Password must be atleast 6 characters long"
					: null,
		},

		transformValues: (values) => ({
			email: values.email,
			password: values.password,
			token: token,
		}),
	});

	const [token, setToken] = useState<string>("");
	const onVerify = useCallback((token: string) => {
		setToken(token);
	}, []);

	return (
		<>
			<Particle>
				<div className="absolute w-full h-full z-10 flex justify-center items-center">
					<div
						className={`w-[80%] lg:w-[35%] min-h-[10rem] p-5 rounded-2xl text-center ${style.landing_overlay_bg}`}
					>
						<h1 className="text-turquoise text-5xl">ADMIN LOGIN</h1>
						<form onSubmit={form.onSubmit(loginHandler)}>
							<TextInput
								styles={(theme) => ({
									root: {
										width: "60%",
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
								styles={(theme) => ({
									root: {
										width: "60%",
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
								placeholder="Password"
								{...form.getInputProps("password")}
							/>
							<Button
								type="submit"
								mt="sm"
								disabled={token == null}
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
							>
								LOGIN
							</Button>
						</form>
					</div>
				</div>
			</Particle>

			<GoogleReCaptcha onVerify={onVerify} />
		</>
	);
};

export default AdminLogin;
