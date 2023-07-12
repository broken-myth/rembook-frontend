import { Anchor, Button, Group, PasswordInput, PinInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconKey } from "@tabler/icons-react";
import { useCallback, useEffect, useState } from "react";
import { GoogleReCaptcha } from "react-google-recaptcha-v3";
import { useNavigate } from "react-router-dom";

import { Particle, Toast } from "../../../Components";
import Footer from "../../../Components/Footer/Footer";
import { resetPwd } from "../../../Slices";
import { useAppDispatch } from "../../../Store/hooks";
import style from "../auth.module.css";

const ResetPass = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const url = new URL(window.location.href);

	useEffect(() => {
		if (
			url.searchParams.get("email") === null ||
			url.searchParams.get("hash") === null
		) {
			navigate("/auth/user/login");
			Toast("toastRed", "Oops!", "Invalid Link!");
		}
	}, []);

	const [token, setToken] = useState<string>("");
	const [error, setError] = useState<boolean>(false);
	const onVerify = useCallback((token: string) => {
		setToken(token);
	}, []);

	const resetHandler = async (dispatchObject: any) => {
		const resetDispatch = await dispatch(resetPwd(dispatchObject));
		if (resetPwd.fulfilled.match(resetDispatch)) {
			Toast("toastGreen", "Success", "Reset Password!!");
		} else {
			if (resetDispatch.payload?.message)
				Toast("toastRed", "Oops!", resetDispatch.payload.message);
			else Toast("toastRed", "Oops!", "There seems to be an issue!");
		}
		navigate("/auth/user/login");
	};

	const form = useForm({
		initialValues: { confirm: "", password: "", code: "" },

		validate: {
			password: (value: string) =>
				value.trim().length < 6
					? "Password must be atleast 6 characters long"
					: null,
			confirm: (value, values) =>
				value !== values.password ? "Passwords did not match" : null,
			code: (value, values) => {
				setError(true);
				return value.trim().length < 6 ? "Enter Code!" : null;
			},
		},

		transformValues: (values) => ({
			confirm: values.confirm,
			password: values.password,
			token: token,
			email: url.searchParams.get("email"),
			hash: url.searchParams.get("hash"),
			code: values.code,
		}),
	});

	return (
		<>
			<Particle>
				<div className="absolute w-full h-full z-10 flex justify-center items-center">
					<div
						className={`w-[80%] lg:w-[40%] min-h-[10rem] p-6 rounded-2xl text-center ${style.landing_overlay_bg}`}
					>
						<Group
							position="left"
							mt="md"
							style={{ width: "65%", margin: "auto 0" }}
						>
							<Anchor<"a">
								onClick={() => navigate("/auth/user/login")}
								sx={(theme) => ({
									color: theme.colors.turquoise[0],
									margin: "10px 0 0.5rem",
									fontWeight: 500,
									textAlign: "left",
									fontFamily: theme.fontFamily,
									fontSize: theme.fontSizes.sm,
								})}
							>
								&#8598; Back to Login
							</Anchor>
						</Group>
						<h1 className="text-turquoise text-3xl lg:text-4xl">
							RESET PASSWORD
						</h1>
						<form onSubmit={form.onSubmit(resetHandler)}>
							<Group position="center" className="m-10">
								<PinInput
									type="alphanumeric"
									length={6}
									error={error}
									placeholder="#"
									size="xl"
									{...form.getInputProps("code")}
									styles={(theme) => ({
										input: {
											borderRadius: "10px",
											background: "rgba(0, 0, 0, 0.8)",
											border: "none",
											color: "white",
										},
									})}
								/>
							</Group>
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
								disabled={token == null}
								sx={(theme) => ({
									fontSize: "1.2rem",
									height: "2.5rem",
									width: "fit-content",
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
								RESET
							</Button>
						</form>
					</div>
				</div>
				<Footer />
			</Particle>

			<GoogleReCaptcha onVerify={onVerify} />
		</>
	);
};

export default ResetPass;
