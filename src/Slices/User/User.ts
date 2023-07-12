import { createSlice } from "@reduxjs/toolkit";

import {
	dauthLogin,
	fetchUserFromId,
	forgotPwd,
	getSearch,
	getUser,
	loginUser,
	logoutUser,
	resetPwd,
	setCredentials,
	updateProfile,
	updateProfilePicture,
} from "./UserActions";

const initialState = {
	loggedIn: false,
	isFetching: true,
	hasSecondaryCreds: false,
	isSecodaryCredsVerified: false,
	isProfileUpdated: false,
	isUserFetching: false,
	isOtherUserFetched: false,
	isFetchingSearch: false,
	isFetchingUser: false,
} as UserState;

export const user = createSlice({
	name: "user",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(loginUser.rejected, (state) => {
			state.loggedIn = false;
			state.isFetching = false;
		});
		builder.addCase(loginUser.pending, (state) => {
			state.loggedIn = false;
			state.isFetching = true;
		});
		builder.addCase(loginUser.fulfilled, (state, { payload }) => {
			state.loggedIn = true;
			state.isFetching = false;
			state.hasSecondaryCreds = payload.hasSecondaryCreds;
			state.isSecodaryCredsVerified = payload.isSecodaryCredsVerified;
			state.isProfileUpdated = payload.isProfileUpdated;
			state.name = payload.name;
			state.department = payload.department;
			state.hostelsList = payload.hostels;
			state.email = payload.email;
			state.contact = payload.contact;
			state.instagram = payload.instagram;
			state.linkedin = payload.linkedin;
			state.userBio = payload.userBio;
		});
		builder.addCase(dauthLogin.rejected, (state) => {
			state.loggedIn = false;
			state.isFetching = false;
		});
		builder.addCase(dauthLogin.pending, (state) => {
			state.loggedIn = false;
			state.isFetching = true;
		});
		builder.addCase(dauthLogin.fulfilled, (state, { payload }) => {
			state.loggedIn = true;
			state.isFetching = false;
			state.hasSecondaryCreds = payload.hasSecondaryCreds;
			state.isSecodaryCredsVerified = payload.isSecodaryCredsVerified;
			state.isProfileUpdated = payload.isProfileUpdated;
			state.name = payload.name;
			state.department = payload.department;
			state.hostelsList = payload.hostels;
			state.email = payload.email;
			state.contact = payload.contact;
			state.instagram = payload.instagram;
			state.linkedin = payload.linkedin;
			state.userBio = payload.userBio;
		});
		builder.addCase(getUser.rejected, (state) => {
			state.loggedIn = false;
			state.isFetching = false;
		});
		builder.addCase(getUser.pending, (state) => {
			state.loggedIn = false;
			state.isFetching = true;
		});
		builder.addCase(getUser.fulfilled, (state, { payload }) => {
			state.loggedIn = true;
			state.isFetching = false;
			state.hasSecondaryCreds = payload.hasSecondaryCreds;
			state.isSecodaryCredsVerified = payload.isSecodaryCredsVerified;
			state.isProfileUpdated = payload.isProfileUpdated;
			state.contact = payload.user.contact;
			state.dateOfBirth = payload.user.dateOfBirth;
			state.department = payload.user.department;
			state.name = payload.user.name;
			state.hostelsList = payload.user.hostels;
			state.rollNumber = payload.user.rollNumber;
			state.userBio = payload.user.userBio;
			state.email = payload.user.email;
			state.linkedin = payload.user.linkedin;
			state.instagram = payload.user.instagram;
		});
		builder.addCase(resetPwd.rejected, (state) => {
			state.isFetching = false;
		});
		builder.addCase(resetPwd.pending, (state) => {
			state.isFetching = true;
		});
		builder.addCase(resetPwd.fulfilled, (state) => {
			state.isFetching = false;
		});
		builder.addCase(forgotPwd.rejected, (state) => {
			state.isFetching = false;
		});
		builder.addCase(forgotPwd.pending, (state) => {
			state.isFetching = true;
		});
		builder.addCase(forgotPwd.fulfilled, (state) => {
			state.isFetching = false;
		});
		builder.addCase(setCredentials.rejected, (state) => {
			state.isFetching = false;
		});
		builder.addCase(setCredentials.pending, (state) => {
			state.isFetching = true;
		});
		builder.addCase(setCredentials.fulfilled, (state, { payload }) => {
			state.isFetching = false;
			state.hasSecondaryCreds = true;
			state.email = payload.email;
		});
		builder.addCase(updateProfile.rejected, (state) => {
			state.isFetching = false;
		});
		builder.addCase(updateProfile.pending, (state) => {
			state.isFetching = true;
		});
		builder.addCase(updateProfile.fulfilled, (state, { payload }) => {
			state.isFetching = false;
			state.isProfileUpdated = true;
			state.contact = payload.contact;
			state.hostelsList = payload.hostels;
			state.linkedin = payload.linkedin;
			state.instagram = payload.instagram;
			state.dateOfBirth = payload.dateOfBirth;
			state.userBio = payload.userBio;
		});
		builder.addCase(updateProfilePicture.rejected, (state) => {
			state.isFetching = false;
		});
		builder.addCase(updateProfilePicture.pending, (state) => {
			state.isFetching = true;
		});
		builder.addCase(updateProfilePicture.fulfilled, (state) => {
			state.isFetching = false;
		});
		builder.addCase(fetchUserFromId.fulfilled, (state) => {
			state.isOtherUserFetched = true;
		});
		builder.addCase(fetchUserFromId.rejected, (state) => {
			state.isOtherUserFetched = false;
		});
		builder.addCase(fetchUserFromId.pending, (state) => {
			state.isOtherUserFetched = false;
		});
		builder.addCase(logoutUser.rejected, (state) => {
			state.isFetching = false;
			state.loggedIn = true;
		});
		builder.addCase(logoutUser.pending, (state) => {
			state.isFetching = true;
			state.loggedIn = true;
		});
		builder.addCase(logoutUser.fulfilled, (state) => {
			state.isFetching = false;
			state.loggedIn = false;
		});
		builder.addCase(getSearch.rejected, (state) => {
			state.isFetchingSearch = false;
		});
		builder.addCase(getSearch.pending, (state) => {
			state.isFetchingSearch = false;
		});
		builder.addCase(getSearch.fulfilled, (state) => {
			state.isFetchingSearch = true;
		});
	},
});

export const userSelector = (state: { user: UserState }) => state.user;

export default user.reducer;
