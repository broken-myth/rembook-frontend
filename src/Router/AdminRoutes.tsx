import { AdminDashboard } from "../Pages";

interface Routes {
	title: string;
	path: `/${string}`;
	description: string;
	element: JSX.Element;
}

const routes: Routes[] = [
	{
		title: "Admin Dashboard",
		path: "/dashboard",
		description: "Admin Dashboard Page",
		element: <AdminDashboard />,
	},
];

export default routes;
