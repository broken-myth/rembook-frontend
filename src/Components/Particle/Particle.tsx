import { FC, useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import type { Engine } from "tsparticles-engine";

import Atom from "../../public/atom.png";
import Beaker from "../../public/beaker.png";
import Caliper from "../../public/caliper.png";
import Chip from "../../public/chip.png";
import College from "../../public/college.png";
import Friends from "../../public/friends.png";
import Gears from "../../public/gears.png";
import Globe from "../../public/globe.png";
import Hat from "../../public/hat.png";
import Integral from "../../public/integral.png";
import Line from "../../public/line.png";
import Magnet from "../../public/magnet.png";
import Medal from "../../public/medal.png";
import Notebook from "../../public/notebook.png";
import Pi from "../../public/pi.png";
import Plane from "../../public/plane.png";
import Radioactive from "../../public/radioactive.png";
import Resistor from "../../public/resistor.png";
import Rocket from "../../public/rocket.png";
import Shuffle from "../../public/shuffle.svg";
import Sinx from "../../public/sinx.png";
import Telescope from "../../public/telescope.png";
import style from "./particle.module.css";

interface IParticleProps {
	children?: React.ReactNode;
}

const Particle: FC<IParticleProps> = ({ children }) => {
	const particlesInit = useCallback(async (engine: Engine) => {
		await loadFull(engine);
	}, []);

	return (
		<div className="bg-black w-full min-h-[93vh] relative  overflow-clip">
			<Particles
				id="tsparticles"
				className={style.ts_particles}
				init={particlesInit}
				options={{
					fullScreen: {
						enable: true,
						zIndex: 1,
					},
					fpsLimit: 60,
					interactivity: {
						events: {
							onDiv: {
								elementId: "repulse-div",
								enable: false,
								mode: "repulse",
							},
							onHover: {
								enable: true,
								parallax: {
									enable: false,
									force: 60,
									smooth: 10,
								},
								mode: "repulse",
							},
							resize: true,
						},
						modes: {
							bubble: {
								distance: 400,
								duration: 2,
								opacity: 0.8,
								size: 40,
								speed: 3,
							},
							grab: {
								distance: 400,
								lineLinked: {
									opacity: 1,
								},
							},
							push: {
								quantity: 4,
							},
							remove: {
								quantity: 2,
							},
							repulse: {
								distance: 150,
								duration: 0.4,
							},
						},
					},
					particles: {
						color: {
							value: "random",
						},
						move: {
							attract: {
								enable: false,
								rotate: {
									x: 600,
									y: 1200,
								},
							},
							bounce: false,
							direction: "none",
							enable: true,
							outMode: "out",
							random: false,
							speed: 4,
							straight: false,
						},
						number: {
							density: {
								enable: true,
								area: 800,
							},
							limit: 80,
							value: 60,
						},
						opacity: {
							animation: {
								enable: false,
								minimumValue: 0.1,
								speed: 1,
								sync: false,
							},
							random: false,
							value: 0.5,
						},
						shape: {
							type: ["image"],
							image: [
								{ src: Plane },
								{ src: Shuffle },
								{ src: Friends },
								{ src: Notebook },
								{ src: College },
								{ src: Hat },
								{ src: Medal },
								{ src: Globe },
								{ src: Rocket },
								{ src: Atom },
								{ src: Caliper },
								{ src: Gears },
								{ src: Line },
								{ src: Telescope },
								{ src: Resistor },
								{ src: Beaker },
								{ src: Magnet },
								{ src: Radioactive },
								{ src: Sinx },
								{ src: Pi },
								{ src: Integral },
								{ src: Chip },
							],
						},
						size: {
							animation: {
								enable: true,
								size_min: 30,
								speed: 4,
								sync: false,
							},
							random: true,
							value: 40,
						},
					},
					background: {
						color: "transparent",
						image: "",
						position: "50% 50%",
						repeat: "no-repeat",
						size: "cover",
					},
				}}
			/>

			{children}
		</div>
	);
};

export default Particle;
