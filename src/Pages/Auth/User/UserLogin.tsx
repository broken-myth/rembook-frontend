import {
	Anchor,
	Button,
	Flex,
	Group,
	Image,
	PasswordInput,
	TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconKey, IconMail } from "@tabler/icons-react";
import { useCallback, useEffect, useState } from "react";
import { GoogleReCaptcha } from "react-google-recaptcha-v3";
import { useNavigate } from "react-router-dom";

import { Particle, Toast } from "../../../Components";
import Footer from "../../../Components/Footer/Footer";
import config from "../../../Config";
import Dauth from "../../../public/dauth.png";
import { forgotPwd, getUser, loginUser } from "../../../Slices";
import { useAppDispatch } from "../../../Store/hooks";
import style from "../auth.module.css";

const UserLogin = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const [loggingIn, setLoggingIn] = useState<boolean>(false);
	const [login, setLogin] = useState<boolean>(true);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	useEffect(() => {
		(async () => checkHandler())();
	}, []);

	const dauthHandler = () => {
		const url = new URL("https://auth.delta.nitt.edu/authorize");
		url.searchParams.set("client_id", config.client_id);
		url.searchParams.set("redirect_uri", config.redirect_uri);
		url.searchParams.set("response_type", config.response_type);
		url.searchParams.set("grant_type", config.grant_type);
		url.searchParams.set("state", config.state);
		url.searchParams.set("scope", config.scope);
		url.searchParams.set("nonce", config.scope);
		window.location.replace(url.toString());
	};

	const authHandler = async (dispatchObject: any) => {
		if (login) {
			await loginHandler(dispatchObject);
		} else await forgotHandler(dispatchObject);
	};

	const loginHandler = async (dispatchObject: Credentials) => {
		setIsLoading(true);
		const loginDispatch = await dispatch(loginUser(dispatchObject));
		setIsLoading(false);
		if (loginUser.fulfilled.match(loginDispatch)) {
			if (
				loginDispatch.payload?.message ==
				"Set the alternate credentials first"
			) {
				navigate("/user/creds");
			} else {
				navigate("/user/profile");
			}
			Toast("toastGreen", "Success", "Signed In!");
		} else {
			navigate("/auth/user/login");
			if (loginDispatch.payload?.message)
				Toast("toastRed", "Oops!", loginDispatch.payload.message);
			else Toast("toastRed", "Oops!", "There seems to be an issue!");
		}
	};

	const forgotHandler = async (dispatchObject: any) => {
		setIsLoading(true);
		const forgotDispatch = await dispatch(forgotPwd(dispatchObject));
		setIsLoading(false);
		if (forgotPwd.fulfilled.match(forgotDispatch)) {
			Toast(
				"toastGreen",
				"Success",
				"Check your Email for Reset Password Link!"
			);
		} else {
			if (forgotDispatch.payload?.message)
				Toast("toastRed", "Oops!", forgotDispatch.payload.message);
			else Toast("toastRed", "Oops!", "There seems to be an issue!");
		}
	};

	const checkHandler = async () => {
		setIsLoading(true);
		const checkDispatch = await dispatch(getUser());
		setIsLoading(false);
		if (getUser.fulfilled.match(checkDispatch)) {
			navigate("/user/profile");
			Toast("toastGreen", "Welcome Back", "Share Memories on Rembook!");
		} else {
			setLoggingIn(true);
		}
	};

	const form = useForm({
		initialValues: { email: "", password: "" },

		validate: {
			email: (value: string) =>
				/^\S+@\S+$/.test(value.trim()) ? null : "Invalid email",
			password: (value: string) => {
				if (login)
					return value.trim().length < 6
						? "Password must be atleast 6 characters long"
						: null;
				else return null;
			},
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
				{!loggingIn ? null : (
					<div className="absolute w-full h-full z-10 flex justify-center items-center">
						<div
							className={`w-[80%] lg:w-[35%] min-h-[10rem] p-5 rounded-2xl text-center ${style.landing_overlay_bg}`}
						>
							{login ? null : (
								<Group
									position="left"
									mt="md"
									style={{ width: "65%", margin: "auto 0" }}
								>
									<Anchor<"a">
										onClick={() => {
											form.clearErrors();
											setLogin(true);
										}}
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
							)}
							{login ? (
								<h1 className="text-turquoise text-xl sm:text-4xl lg:text-5xl mt-1">
									LOGIN
								</h1>
							) : (
								<h1 className="text-turquoise text-xl sm:text-3xl lg:text-4xl">
									FORGOT PASSWORD
								</h1>
							)}
							<form onSubmit={form.onSubmit(authHandler)}>
								<TextInput
									icon={
										<IconMail size="1.1rem" stroke={1.5} />
									}
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
								{login ? (
									<>
										<PasswordInput
											icon={
												<IconKey
													size="1.1rem"
													stroke={1.5}
												/>
											}
											styles={(theme) => ({
												root: {
													width: "65%",
													margin: "0rem auto 0.5rem",
												},
												input: {
													borderRadius: "10px",
													height: "2.5rem",
													background:
														"rgba(0, 0, 0, 0.8)",
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
										<Group
											position="center"
											mt="md"
											style={{
												width: "65%",
												margin: "auto",
											}}
										>
											<Anchor<"a">
												onClick={() => {
													form.clearErrors();
													setLogin(false);
												}}
												sx={(theme) => ({
													color: theme.colors
														.turquoise[0],
													margin: "10px 0 0.5rem 0",
													fontWeight: 500,
													textAlign: "left",
													fontFamily:
														theme.fontFamily,
													fontSize:
														theme.fontSizes.sm,
												})}
											>
												Forgot Password?
											</Anchor>
										</Group>
										<Flex direction="column">
											<Button
												type="submit"
												mt="sm"
												loaderProps={{
													size: "sm",
													color: "#41EAD4",
													variant: "bars",
												}}
												disabled={token == null}
												sx={(theme) => ({
													fontSize: "1.2rem",
													height: "2.5rem",
													width: "50%",
													margin: "0rem auto 0.5rem",
													background:
														"rgba(0, 0, 0, 0.8)",
													borderRadius: "10px",
													transition: "transform .5s",
													color: theme.colors
														.turquoise[0],
													"&:hover": {
														background:
															theme.colors
																.turquoise[0],
														color: "black",
														transform: "scale(1.1)",
													},
												})}
												className="text-sm sm:text-2xl"
											>
												{isLoading ? "" : "LOGIN"}
											</Button>
											<Button
												mt="sm"
												onClick={() => {
													dauthHandler();
												}}
												disabled={token == null}
												sx={(theme) => ({
													fontSize: "0.8rem",
													height: "2.5rem",
													width: "50%",
													margin: "0rem auto 0.5rem",
													background:
														"rgba(0, 0, 0, 0.8)",
													borderRadius: "10px",
													transition: "transform .5s",
													color: theme.colors
														.turquoise[0],
													"&:hover": {
														background:
															theme.colors
																.turquoise[0],
														color: "black",
														transform: "scale(1.1)",
														"& img": {
															filter: "brightness(5%)",
														},
													},
												})}
											>
												<Image
													width={80}
													height={40}
													fit="contain"
													src={Dauth}
												></Image>
											</Button>
										</Flex>
									</>
								) : (
									<Button
										type="submit"
										mt="sm"
										disabled={token == null}
										loading={isLoading}
										loaderProps={{
											size: "sm",
											color: "#41EAD4",
											variant: "bars",
										}}
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
												background:
													theme.colors.turquoise[0],
												color: "black",
												transform: "scale(1.1)",
											},
										})}
										className="text-sm sm:text-2xl"
									>
										{isLoading ? "" : "SEND"}
									</Button>
								)}
							</form>
						</div>
					</div>
				)}
				<Footer />
			</Particle>

			<GoogleReCaptcha onVerify={onVerify} />
		</>
	);
};

export default UserLogin;
