import { createSlice } from "@reduxjs/toolkit";

import {
	adminLogin,
	adminLogout,
	getDetails,
	updateDetails,
} from "./AdminActions";

const initialState = {
	loggedIn: false,
	isFetching: false,
} as UserState;

export const admin = createSlice({
	name: "admin",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(adminLogin.rejected, (state) => {
			state.loggedIn = false;
			state.isFetching = false;
		});
		builder.addCase(adminLogin.pending, (state) => {
			state.loggedIn = false;
			state.isFetching = true;
		});
		builder.addCase(adminLogin.fulfilled, (state) => {
			state.loggedIn = true;
			state.isFetching = false;
		});
		builder.addCase(adminLogout.rejected, (state) => {
			state.loggedIn = true;
			state.isFetching = false;
		});
		builder.addCase(adminLogout.pending, (state) => {
			state.loggedIn = true;
			state.isFetching = true;
		});
		builder.addCase(adminLogout.fulfilled, (state) => {
			state.loggedIn = false;
			state.isFetching = false;
		});
		builder.addCase(getDetails.rejected, (state) => {
			state.isFetching = false;
		});
		builder.addCase(getDetails.pending, (state) => {
			state.isFetching = true;
		});
		builder.addCase(getDetails.fulfilled, (state) => {
			state.isFetching = false;
		});
		builder.addCase(updateDetails.rejected, (state) => {
			state.isFetching = false;
		});
		builder.addCase(updateDetails.pending, (state) => {
			state.isFetching = true;
		});
		builder.addCase(updateDetails.fulfilled, (state) => {
			state.isFetching = false;
		});
	},
});

export const adminSelector = (state: { admin: UserState }) => state.admin;

export default admin.reducer;
