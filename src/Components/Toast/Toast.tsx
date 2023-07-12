import { showNotification } from "@mantine/notifications";
import {
	IconAlertCircle,
	IconCircleCheck,
	IconCircleX,
} from "@tabler/icons-react";

interface ITitleToColor {
	[key: string]: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const IconMapping: any = {
	toastGreen: <IconCircleCheck />,
	toastRed: <IconCircleX />,
	blue: <IconAlertCircle />,
};

export const typeToColor: ITitleToColor = {
	SUCCESS: "toastGreen",
	ERROR: "toastRed",
	INFO: "blue",
};

export const typeToTitle: ITitleToColor = {
	SUCCESS: "Success!",
	ERROR: "Oops!",
	INFO: "Notice!",
};

const Toast = (color: string, title: string, label = "") => {
	showNotification({
		styles: (theme) => ({
			root: {
				//zIndex:"2001",
				backgroundColor: theme.colors["dark_green"][0],
				borderRadius: "10px",
				borderWidth: "3px",
				borderColor: theme.colors[color],
				color: theme.colors.white[0],
				width: "20rem",
				minHeight:
					window.innerWidth < 400 || window.innerHeight < 700
						? "3.1em"
						: "4em",
				maxHeight: "none !important",
			},
			title: {
				color: theme.colors.white[0],
				fontWeight: 900,
				fontSize:
					window.innerWidth < 400 || window.innerHeight < 700
						? "0.95em"
						: "1.1em",
			},
			description: {
				color: theme.colors.white[0],
				fontSize:
					window.innerWidth < 400 || window.innerHeight < 700
						? "0.85em"
						: "1em",
			},
			closeButton: {
				color: theme.colors.white[0],
				"&:hover": { backgroundColor: theme.colors[color] },
			},
		}),
		icon: IconMapping[color],
		color: color,
		title: title,
		message: label,
		id: label,
		// zIndex: 100,
	});
};

export default Toast;
