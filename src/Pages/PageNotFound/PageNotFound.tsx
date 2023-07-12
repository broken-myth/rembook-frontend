import { Anchor, Group } from "@mantine/core";
import { useNavigate } from "react-router-dom";

import { Particle } from "../../Components";
import style from "../Auth/auth.module.css";

const PageNotFound = () => {
	const navigate = useNavigate();
	return (
		<Particle>
			<div className="absolute w-full h-full z-10 flex justify-center items-center">
				<div
					className={`w-[70%] md:w-[60%] lg:w-[30%] min-h-[10rem] p-5 rounded-2xl text-center ${style.landing_overlay_bg}`}
				>
					<h1 className="text-turquoise text-8xl">404</h1>
					<h1 className="text-green text-3xl">No Hidden </h1>
					<h1 className="text-green text-3xl">Memories Here :/</h1>

					<Group
						position="center"
						mt="md"
						style={{ width: "100%", margin: "auto 0" }}
					>
						<Anchor<"a">
							onClick={() => {
								navigate("/");
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
							&#8598; Home
						</Anchor>
					</Group>
				</div>
			</div>
		</Particle>
	);
};

export default PageNotFound;
