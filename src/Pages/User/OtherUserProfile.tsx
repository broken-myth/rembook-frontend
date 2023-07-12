import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
	OtherUserProfileBox,
	Particle,
	Recommendations,
} from "../../Components";
import { CustomAxios } from "../../Utils";
import { User } from "./types";

const OtherUserProfile = () => {
	const navigate = useNavigate();

	const [recommendedUsersData, setRecommendedUsersData] = useState<User[]>(
		[]
	);
	const [userData, setUserData] = useState<User | null>(null);
	const [showWriteRem, setShowWriteRem] = useState<boolean>(false);

	const { id } = useParams();

	const fetchCurrentUserId = async () => {
		try {
			const res = await CustomAxios.get("/user/getCurrentUser", {
				withCredentials: true,
			});
			return res.data.user._id;
		} catch (err: any) {
			if (err.response.status === 500) navigate("/user/profile");
			return "";
		}
	};

	const fetchUserDetails = async () => {
		try {
			const res = await CustomAxios.get(`/user/getUser?id=${id}`, {
				withCredentials: true,
			});
			return res.data.user;
		} catch (err: any) {
			if (err.response.status === 500) navigate("/user/profile");
			return null;
		}
	};

	const fetchRecommendedUserDetails = async (id?: string) => {
		try {
			const res = await CustomAxios.get(`/user/getRecommend/${id}`, {
				withCredentials: true,
			});
			return res.data;
		} catch (err: any) {
			if (err.response.status === 500) navigate("/user/profile");
			return [];
		}
	};

	const fetchIfPairRemExist = async () => {
		try {
			const res = await CustomAxios.post(
				"/memory/getRemOfPair",
				{
					id: id,
				},
				{
					withCredentials: true,
				}
			);
			return true;
		} catch (err: any) {
			if (err.response.status === 500) navigate("/user/profile");
			return false;
		}
	};

	useEffect(() => {
		(async () => {
			const currentUserId = await fetchCurrentUserId();
			if (id === currentUserId || id === undefined) {
				navigate("/user/profile");
			}
			const recommendedUsers = await fetchRecommendedUserDetails(id);
			setRecommendedUsersData(recommendedUsers);
			const userDetails = await fetchUserDetails();
			setUserData(userDetails);
			const remOfPairExists = await fetchIfPairRemExist();
			setShowWriteRem(!remOfPairExists);
		})();
	}, [id]);

	return (
		<Particle>
			<main className="min-h-[93vh] grid grid-cols-1 xl:grid-cols-[4fr,1fr] gap-5 pb-5 pt-5 xl:pb-2 px-10">
				<OtherUserProfileBox
					userData={userData}
					setUserData={setUserData}
					showWriteRem={showWriteRem}
				/>
				<Recommendations
					recommendedUsersData={recommendedUsersData}
					setRecommendedUsersData={setRecommendedUsersData}
				/>
			</main>
		</Particle>
	);
};

export default OtherUserProfile;
