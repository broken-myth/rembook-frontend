import {
	Credentials,
	EditProfile,
	EditRem,
	UserDashboard,
	UserProfile,
	WriteRem,
} from "../Pages";
import OtherUserProfile from "../Pages/User/OtherUserProfile";
import SearchPage from "../Pages/User/SearchPage";

interface Routes {
	title: string;
	path: `/${string}`;
	description: string;
	element: JSX.Element;
}

const routes: Routes[] = [
	{
		title: "User Dashboard",
		path: "/dashboard",
		description: "User Dashboard Page",
		element: <UserDashboard />,
	},
	{
		title: "Search Page",
		path: "/search",
		description: "User Search Page",
		element: <SearchPage />,
	},
	{
		title: "Alternate Credentials",
		path: "/creds",
		description: "Alternate Credentials Page",
		element: <Credentials />,
	},
	{
		title: "User Profile",
		path: "/profile",
		description: "User Profile Page",
		element: <UserProfile />,
	},
	{
		title: "Edit Profile",
		path: "/editprofile",
		description: "Edit Profile Page",
		element: <EditProfile />,
	},
	{
		title: "Profile",
		path: "/:id",
		description: "User Profile Page",
		element: <OtherUserProfile />,
	},
	{
		title: "Edit Profile",
		path: "/editprofile",
		description: "Edit Profile Page",
		element: <EditProfile />,
	},
	{
		title: "Write Rem",
		path: "/write-rem",
		description: "Write Rem Page",
		element: <WriteRem />,
	},
	{
		title: "Edit Rem",
		path: "/edit-rem",
		description: "Edit Rem Page",
		element: <EditRem />,
	},
];

export default routes;
