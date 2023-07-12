import { AdminLogin, ResetPass, UserCallback, UserLogin } from "../Pages";

interface Routes {
	title: string;
	path: `/${string}`;
	description: string;
	element: JSX.Element;
}

const routes: Routes[] = [
	{
		title: "User Login",
		path: "/user/login",
		description: "User Login Page",
		element: <UserLogin />,
	},
	{
		title: "Dauth Callback",
		path: "/user/callback",
		description: "Dauth Callback",
		element: <UserCallback />,
	},
	{
		title: "reset Password",
		path: "/user/resetpass",
		description: "reset Password",
		element: <ResetPass />,
	},
	{
		title: "Admin Login",
		path: "/admin/login",
		description: "Admin Login",
		element: <AdminLogin />,
	},
];

export default routes;
