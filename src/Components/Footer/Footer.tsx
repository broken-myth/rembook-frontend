import { Anchor, Center, createStyles, Group } from "@mantine/core";
import { useState } from "react";

const useStyles = createStyles((theme) => ({
	footer: {
		position: "fixed",
		bottom: "1rem",
		color: theme.colors.white[0],
		width: "100%",
		textTransform: "uppercase",
		fontSize: "1.3em",
		zIndex: 999,
		// "@media only screen and (max-width: 700px)": {
		// 	fontSize: "1.2em",
		// },
	},
	heart: {
		width: "25px",
	},
	link: {
		color: "#20c20e",
		marginLeft: "5px",
	},
}));

const Footer = () => {
	const { classes } = useStyles();
	const [clickCount, setClickCount] = useState(0);
	return (
		<Group
			position="center"
			spacing="xs"
			className={classes.footer + " font-heading"}
		>
			Made with
			<Center
				onClick={() => {
					if (clickCount < 2) {
						setClickCount(clickCount + 1);
					} else if (clickCount >= 2) {
						window.open(
							"https://delta.nitt.edu/byebyefolks",
							"_blank"
						);
						setClickCount(0);
					}
				}}
				className="cursor-pointer"
			>
				<svg
					viewBox="0 0 24 24"
					className={classes.heart}
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					stroke="#000000"
				>
					<g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
					<g
						id="SVGRepo_tracerCarrier"
						strokeLinecap="round"
						strokeLinejoin="round"
					></g>
					<g id="SVGRepo_iconCarrier">
						{" "}
						<path
							d="M19.3 5.71002C18.841 5.24601 18.2943 4.87797 17.6917 4.62731C17.0891 4.37666 16.4426 4.2484 15.79 4.25002C15.1373 4.2484 14.4909 4.37666 13.8883 4.62731C13.2857 4.87797 12.739 5.24601 12.28 5.71002L12 6.00002L11.72 5.72001C10.7917 4.79182 9.53273 4.27037 8.22 4.27037C6.90726 4.27037 5.64829 4.79182 4.72 5.72001C3.80386 6.65466 3.29071 7.91125 3.29071 9.22002C3.29071 10.5288 3.80386 11.7854 4.72 12.72L11.49 19.51C11.6306 19.6505 11.8212 19.7294 12.02 19.7294C12.2187 19.7294 12.4094 19.6505 12.55 19.51L19.32 12.72C20.2365 11.7823 20.7479 10.5221 20.7442 9.21092C20.7405 7.89973 20.2218 6.64248 19.3 5.71002Z"
							fill="#ff3d3d"
						></path>{" "}
					</g>
				</svg>
			</Center>
			by{" "}
			<Anchor
				className={
					classes.link +
					" font-heading hover:font-semibold hover:tracking-wide hover:no-underline !transition-all"
				}
				href="https://delta.nitt.edu"
				target="_blank"
			>
				Delta Force
			</Anchor>
		</Group>
	);
};

export default Footer;
