import { Avatar } from "@mantine/core";
import { IconLogout, IconSearch } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

import config from "../../Config";
import { userSelector } from "../../Slices";
import { logoutUser } from "../../Slices";
import { useAppDispatch } from "../../Store/hooks";
import { CustomAxios } from "../../Utils";
import { Toast } from "../";
const Navbar = () => {
	const [image, setImage] = useState<string>("temp");
	const userProfile = useSelector(userSelector);
	const getAvatar = async () => {
		try {
			const res = await CustomAxios.get(
				`${config.backend_url}/user/getCurrentUser`,
				{ withCredentials: true }
			);
			if (res.data.user.image)
				setImage(res.data.user.image.split(".")[0]);
		} catch (e) {
			setImage("temp");
		}
	};
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const callLogout = async () => {
		const logoutDispatch = await dispatch(logoutUser());
		if (logoutUser.fulfilled.match(logoutDispatch)) {
			Toast("green", "Success!", "Logged out successfully");
			navigate("/");
		} else {
			Toast("toastRed", "Oops!", "There seems to be an issue!");
		}
	};
	useEffect(() => {
		(async () => {
			await getAvatar();
		})();
	}, [userProfile.loggedIn]);
	return (
		<nav className="bg-black h-[7vh] flex items-center justify-between py-2 px-10">
			<h1
				className="text-turquoise text-2xl tracking-tighter font-heading font-semibold md:text-3xl"
				onClick={() => navigate("/")}
				style={{ cursor: "pointer" }}
			>
				REMBOOK
			</h1>
			{userProfile && userProfile.loggedIn === true ? (
				<div className="flex gap-5">
					<button
						className="outline-none border-0 bg-transparent"
						style={{ cursor: "pointer" }}
						onClick={() => navigate("/user/search")}
					>
						<IconSearch width={30} height={30} color="white" />
					</button>
					<Avatar
						src={`${config.backend_url}/assets/images/profiles/${image}.jpg`}
						style={{ cursor: "pointer" }}
						onClick={() => navigate("/user/profile")}
					/>
					<button
						className="outline-none border-0 bg-transparent"
						style={{ cursor: "pointer" }}
					>
						<IconLogout
							width={30}
							height={30}
							color="white"
							onClick={callLogout}
						/>
					</button>
				</div>
			) : (
				<>
					<button
						style={{ paddingLeft: "20px", paddingRight: "20px" }}
						className="sm:text-lg outline-none border-none w-[150px] rounded-md font-semibold text-black font-heading bg-transparent bg-turquoise hover:tracking-wider cursor-pointer transition-all py-3"
						onClick={() => navigate("/auth/user/login")}
					>
						LOGIN
					</button>
				</>
			)}
		</nav>
	);
};

export default Navbar;
