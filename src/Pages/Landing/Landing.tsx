import { Center } from "@mantine/core";
import { useNavigate } from "react-router-dom";

import { Particle } from "../../Components";
import Footer from "../../Components/Footer/Footer";
import style from "../Auth/auth.module.css";

const Landing = () => {
	const navigate = useNavigate();
	return (
		<>
			<Particle>
				<div className="absolute w-full h-full z-10 flex justify-center items-center flex-col">
					<Center
						className={`w-[80%] flex-col lg:w-[50%] min-h-[30rem] py-5 px-7 text-center ${style.landing_overlay_bg}`}
					>
						<h1 className="text-turquoise text-5xl tracking-tighter font-heading font-semibold lg:text-9xl mt-5 mb-5">
							REMBOOK
						</h1>
						<h1 className="text-white text-2xl font-heading font-thin">
							Millions of memories and fleeting moments, the time
							spent with friends and classmates, this is the place
							to rem-ember them all! Search for your friends
							<button
								className="text-2xl inline ease-in-out border-0 cursor-pointer bg-transparent transition-all origin-center text-turquoise font-semibold p-0.5 hover:tracking-wider"
								onClick={() => navigate("/user/search")}
							>
								here!
							</button>
						</h1>{" "}
					</Center>
					<div className="bg-gradient-to-r from-turquoise to to-cyan-400 h-2 w-[80%] lg:w-[50%]"></div>
				</div>
				<Footer />
			</Particle>
		</>
	);
};

export default Landing;
