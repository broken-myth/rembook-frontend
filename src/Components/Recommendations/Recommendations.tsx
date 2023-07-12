import { Link } from "react-router-dom";

import { RecommendationCard } from "../../Components";
import config from "../../Config";
import styles from "../../Pages/User/profile.module.css";
import { RecommendationProps } from "./types";
const Recommendations: React.FC<RecommendationProps> = ({
	recommendedUsersData,
}) => {
	return (
		<aside
			className={`flex flex-col gap-5 rounded-lg p-10 border border-solid border-turquoise w-full xl:max-w-[20rem] mx-auto ${styles.profile_box_bg}`}
		>
			<h2 className="text-turquoise xl:text-center mb-3 text-2xl xl:text-xl">
				You Might know
			</h2>
			<section className="flex overflow-x-auto md:flex-wrap xl:grid xl:grid-cols-1 gap-10 xl:max-h-[75vh] xl:overflow-y-auto p-3">
				{recommendedUsersData.map((user, idx) => {
					if (user.name.length > 0) {
						return (
							<Link to={`/user/${user._id}`} key={idx}>
								<RecommendationCard
									name={user.name}
									imgUrl={`${
										config.backend_url
									}/assets/images/profiles/${
										user.image?.split(".")[0]
									}.jpg`}
								/>
							</Link>
						);
					}
				})}
			</section>
		</aside>
	);
};

export default Recommendations;
