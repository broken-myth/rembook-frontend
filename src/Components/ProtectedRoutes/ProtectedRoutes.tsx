import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Loader, Toast } from "../../Components/index";
import { adminSelector, userSelector } from "../../Slices/index";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ProtectedRoute = (props: any) => {
	const navigate = useNavigate();
	const { children, type } = props;
	const [isLoading, setIsLoading] = useState(true);
	const {
		loggedIn,
		isFetching,
		isProfileUpdated,
		isSecodaryCredsVerified,
		hasSecondaryCreds,
	} =
		type === "user"
			? useSelector(userSelector)
			: useSelector(adminSelector);
	useEffect(() => {
		if (!isFetching) {
			if (loggedIn) {
				setIsLoading(false);
				if (type == "user") {
					if (!hasSecondaryCreds) {
						navigate("/user/creds");
						Toast(
							"blue",
							"Setup Credentials",
							"Setup your alternate Credentials for Rembook"
						);
						return;
					}
					// Add it if we add verification in backend
					// else if (!isSecodaryCredsVerified) {
					// 	Toast(
					// 		"toastRed",
					// 		"Verify!",
					// 		"Kindly Verify your alternate credentials"
					// 	);
					// }
					if (!isProfileUpdated) {
						navigate("/user/editprofile");
						Toast(
							"blue",
							"Setup Profile",
							"Setup your Profile for Rembook"
						);
						return;
					}
				}
			} else {
				Toast("toastRed", "Oops!", "You are not signed in!");
				navigate("/");
			}
		}
	}, [loggedIn, isFetching, isProfileUpdated, hasSecondaryCreds, children]);

	return children;
};

export default ProtectedRoute;
