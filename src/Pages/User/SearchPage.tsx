import { Select } from "@mantine/core";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Particle, Toast } from "../../Components";
import ProfileCard from "../../Components/ProfileCard/ProfileCard";
import config from "../../Config";
import { getSearch } from "../../Slices/User/UserActions";
import { useAppDispatch } from "../../Store/hooks";
import style from "./profile.module.css";
import { User } from "./types";
const SearchPage = () => {
	const [searchedString, setSearchedString] = useState("");
	const [dept, setDept] = useState<string | null>(null);
	const [hostel, setHostel] = useState<string | null>(null);
	const [batch, setBatch] = useState<string | null>(null);
	const [searchResult, setSearchResult] = useState<any>(null);
	const navigate = useNavigate();

	const radius = 10;
	const dispatch = useAppDispatch();
	const getSearchQuery = (
		name: string | null,
		dept: string | null,
		hostel: string | null,
		batch: string | null
	) => {
		let query = "";
		if (name) {
			query += "name=" + name + "&";
		}
		if (dept) {
			query += "dept=" + dept + "&";
		}
		if (hostel) {
			query += "hostel=" + hostel + "&";
		}
		if (batch) {
			query += "batch=" + batch + "&";
		}
		return query;
	};

	const searchHandler = async () => {
		const searchDispatch = await dispatch(
			getSearch({
				query: getSearchQuery(searchedString, dept, hostel, batch),
			})
		);
		if (getSearch.fulfilled.match(searchDispatch)) {
			setSearchResult(searchDispatch.payload);
			Toast(
				"green",
				"Info",
				"Apply more filters if you haven't got desired result"
			);
		} else {
			if (searchDispatch.payload?.message)
				Toast("red", "Oops!", searchDispatch.payload.message);
			else Toast("red", "Oops!", "There seems to be an issue!");
		}
	};

	// useEffect(() => {
	// 	searchHandler();
	// }, [dept, hostel, batch]);

	return (
		<Particle>
			<div
				className={`min-h-[93vh] relative overflow-clip rounded-lg p-5 md:p-10 md:pb-3 border border-solid border-turquoise ${style.searchPage}`}
			>
				<div className="flex flex-col ">
					<div className="items-center flex m-10 justify-evenly transition duration-300 hover:scale-105">
						<input
							className="w-6/12 items-center p-5 bg-black rounded-xl shadow-slate-300 min-w-[300px] focus:outline-none text-turquoise"
							placeholder="Search for your Friends' names here :) (Use minimum 3 characters)"
							onChange={(event) =>
								setSearchedString(event.target.value)
							}
							onKeyDown={(event) => {
								if (event.key == "Enter") {
									if (
										searchedString.length >= 3 ||
										(dept && dept.length > 0) ||
										(batch && batch.length > 0) ||
										(hostel && hostel.length > 0)
									) {
										searchHandler();
									} else {
										if (searchedString.length < 3) {
											Toast(
												"yellow",
												"Oops!",
												"Name should be atleast 3 characters :)"
											);
										} else {
											Toast(
												"yellow",
												"Oops!",
												"Choose atleast 1 filter to search"
											);
										}
									}
								}
							}}
						/>
					</div>
					<div className="grid grid-cols-2 justify-items-center grid-rows-2 sm:grid-cols-3 sm:grid-rows-1">
						<Select
							placeholder="Department"
							data={[
								{ value: "ARCHI", label: "Architecture" },
								{ value: "CECASE", label: "CECASE" },
								{ value: "CHL", label: "Chemical Engineering" },
								{ value: "CHEM", label: "Chemistry" },
								{ value: "CIV", label: "Civil Engineering" },
								{
									value: "MCA",
									label: "Computer Applications",
								},
								{
									value: "CSE",
									label: "Computer Science Engineering",
								},
								{
									value: "EEE",
									label: "Electrical and Electronics Engineering",
								},
								{
									value: "ECE",
									label: "Electronics and Communications Engineering",
								},
								{
									value: "CEESAT",
									label: "Energy and Environment",
								},
								{
									value: "HSIR",
									label: "Humanities and Social Sciences",
								},
								{
									value: "ICE",
									label: "Instrumentation and Control Engineering",
								},
								{
									value: "DOMS",
									label: "Management Studies",
								},
								{
									value: "MBA",
									label: "Masters in Business Administration",
								},
								{
									value: "MECH",
									label: "Mechanical Engineering",
								},
								{ value: "MATHS", label: "Mathematics" },
								{ value: "PHY", label: "Physics" },
								{
									value: "MME",
									label: "Metallurgical and Materials Engineering",
								},
								{
									value: "PROD",
									label: "Production Engineering",
								},
							]}
							radius={radius}
							size="lg"
							searchable
							className="m-5 lg:w-[25vw] col-span-2 sm:col-auto"
							styles={(theme) => ({
								input: {
									backgroundColor: theme.colors.dark,
									color: "#A1DCE0",
								},
								dropdown: {
									backgroundColor: theme.colors.dark,
								},
								item: {
									color: "#A1DCE0",
								},
							})}
							rightSectionWidth={20}
							clearable
							value={dept}
							onChange={setDept}
						/>
						<Select
							placeholder="Batch"
							data={[
								{ value: "25", label: "2025" },
								{ value: "24", label: "2024" },
								{ value: "23", label: "2023" },
								{ value: "22", label: "2022" },
								{ value: "21", label: "2021" },
								{ value: "20", label: "2020" },
								{ value: "19", label: "2019" },
								{ value: "18", label: "2018" },
								{ value: "17", label: "2017" },
								{ value: "16", label: "2016" },
							]}
							radius={radius}
							size="lg"
							searchable
							className="m-5 lg:w-[25vw]"
							styles={(theme) => ({
								input: {
									backgroundColor: theme.colors.dark,
									color: "#A1DCE0",
								},
								dropdown: {
									backgroundColor: theme.colors.dark,
								},
								item: {
									color: "#A1DCE0",
								},
							})}
							clearable
							value={batch}
							onChange={setBatch}
						/>
						<Select
							placeholder="Hostel"
							data={[
								{ value: "opala", label: "OPAL A" },
								{ value: "opalb", label: "OPAL B" },
								{ value: "opalc", label: "OPAL C" },
								{ value: "opald", label: "OPAL D" },
								{ value: "aquaa", label: "AQUA A" },
								{ value: "aquab", label: "AQUA B" },
								{ value: "ambera", label: "AMBER A" },
								{ value: "amberb", label: "AMBER B" },
								{ value: "garneta", label: "GARNET A" },
								{ value: "garnetb", label: "GARNET B" },
								{ value: "garnetc", label: "GARNET C" },
								{ value: "zirconb", label: "ZIRCON A" },
								{ value: "zircona", label: "ZIRCON B" },
								{ value: "zirconc", label: "ZIRCON C" },
								{ value: "agate", label: "AGATE" },
								{ value: "coral", label: "CORAL" },
								{ value: "diamond", label: "DIAMOND" },
								{ value: "jade", label: "JADE" },
							]}
							radius={radius}
							size="lg"
							className="m-5 lg:w-[25vw]"
							styles={(theme) => ({
								input: {
									backgroundColor: theme.colors.dark,
									color: "#A1DCE0",
								},
								dropdown: {
									backgroundColor: theme.colors.dark,
								},
								item: {
									color: "#A1DCE0",
								},
							})}
							searchable
							clearable
							value={hostel}
							onChange={setHostel}
						/>
					</div>
					<div className="grid m-10 justify-around gap-y-10 grid-cols-[repeat(auto-fit,minmax(300px,1fr))] justify-items-center px-4">
						{searchResult &&
							searchResult.map(
								(row: User) =>
									row.name &&
									row.name.length > 0 && (
										<div
											className="w-[300px]"
											key={row._id}
											onClick={() => {
												navigate("/user/" + row._id);
											}}
										>
											<ProfileCard
												name={row.name}
												dept={row.department}
												userBio={row.userBio}
												image={`${
													config.backend_url
												}/assets/images/profiles/${
													row.image?.split(".")[0]
												}.jpg`}
											></ProfileCard>
										</div>
									)
							)}
					</div>
				</div>
			</div>
		</Particle>
	);
};

export default SearchPage;
