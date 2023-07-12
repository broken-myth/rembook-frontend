import { PageNotFound, UserLogin } from "../Pages";

interface Routes {
	title: string;
	path: `/${string}`;
	description: string;
	element: JSX.Element;
}

const routes: Routes[] = [
	{
		title: "Login",
		path: "/",
		description: "Login Page",
		element: <UserLogin />,
	},
	{
		title: "Page Not Found",
		path: "/404",
		description: "Page not found",
		element: <PageNotFound />,
	},
];

export default routes;
