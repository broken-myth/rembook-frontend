import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { ProtectedRoute } from "../Components";
import { Navbar } from "../Components";
// import Footer from "../Components/Footer/Footer";
import { Landing, PageNotFound } from "../Pages";
import { getUser } from "../Slices";
import { useAppDispatch } from "../Store/hooks";
import AdminRoutes from "./AdminRoutes";
import AuthRoutes from "./AuthRoutes";
import UserRoutes from "./UserRoutes";
const Router = () => {
	const dispatch = useAppDispatch();
	useEffect(() => {
		(async () => {
			await dispatch(getUser());
		})();
	}, []);

	return (
		<BrowserRouter>
			<Navbar />
			<Routes>
				<Route path="/" element={<Landing />} />

				{AuthRoutes.map((route) => {
					return (
						<Route
							key={route.path}
							path={"/auth" + route.path}
							element={route.element}
						/>
					);
				})}
				{UserRoutes.map((route) => {
					return (
						<Route
							key={route.path}
							path={"/user" + route.path}
							element={
								<ProtectedRoute type="user">
									{route.element}
								</ProtectedRoute>
							}
						/>
					);
				})}
				{AdminRoutes.map((route) => {
					return (
						<Route
							key={route.path}
							path={"/admin" + route.path}
							element={
								<ProtectedRoute type="admin">
									{route.element}
								</ProtectedRoute>
							}
						/>
					);
				})}
				<Route path="*" element={<PageNotFound />} />
			</Routes>
			{/* <Footer /> */}
		</BrowserRouter>
	);
};

export default Router;
