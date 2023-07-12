import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Loader, Particle, Toast } from "../../../Components";
import Footer from "../../../Components/Footer/Footer";
import { dauthLogin } from "../../../Slices";
import { useAppDispatch } from "../../../Store/hooks";

const DauthCallback = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const url = new URL(window.location.href);

	const dauthHandler = async () => {
		const code = url.searchParams.get("code");
		const dauthDispatch = await dispatch(dauthLogin({ code: code }));
		if (dauthLogin.fulfilled.match(dauthDispatch)) {
			if (
				dauthDispatch.payload?.message ==
				"Set the alternate credentials first"
			) {
				navigate("/user/creds");
			} else {
				navigate("/user/profile");
			}
			Toast("toastGreen", "Success", "Signed In!");
		} else {
			navigate("/");
			Toast("toastRed", "Oops!", "There seems to be an issue!");
		}
	};

	useEffect(() => {
		if (url.searchParams.get("code") === null) {
			navigate("/auth/user/login");
			Toast("toastRed", "Oops!", "There seems to be an error!");
		}
		dauthHandler();
	}, []);
	return (
		<>
			<Particle>
				<Loader />
				<Footer />
			</Particle>
		</>
	);
};

export default DauthCallback;
