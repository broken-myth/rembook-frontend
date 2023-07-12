/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from "@reduxjs/toolkit";

import { CustomAxios } from "../../Utils/index";

export const adminLogin = createAsyncThunk<
	AuthResponse,
	Credentials,
	{ rejectValue: APIError }
>("admin/loginAdmin", async (credentials: Credentials, { rejectWithValue }) => {
	try {
		const response = await CustomAxios.post(
			"/admin/adminLogin",
			{
				email: credentials["email"],
				password: credentials["password"],
				token: credentials["token"],
			},
			{ withCredentials: true }
		);
		return response.data;
	} catch (error: any) {
		if (error.response && error.response.data) {
			return rejectWithValue(error.response.data);
		} else {
			return rejectWithValue(error.message);
		}
	}
});

export const adminLogout = createAsyncThunk<
	AuthResponse,
	void,
	{ rejectValue: APIError }
>("admin/adminLogout", async (_, { rejectWithValue }) => {
	try {
		const response = await CustomAxios.get("/admin/adminLogout", {
			withCredentials: true,
		});
		return response.data;
	} catch (error: any) {
		if (error.response && error.response.data) {
			return rejectWithValue(error.response.data);
		} else {
			return rejectWithValue(error.message);
		}
	}
});

export const getDetails = createAsyncThunk<
	IGetDetails,
	IDetails,
	{ rejectValue: APIError }
>("admin/getDetails", async (details: IDetails, { rejectWithValue }) => {
	try {
		const response = await CustomAxios.post("/admin/getUser", details, {
			withCredentials: true,
		});
		return response.data;
	} catch (error: any) {
		if (error.response && error.response.data) {
			return rejectWithValue(error.response.data);
		} else {
			return rejectWithValue(error.message);
		}
	}
});

export const updateDetails = createAsyncThunk<
	AuthResponse,
	IDetails,
	{ rejectValue: APIError }
>("admin/updateDetails", async (details: IDetails, { rejectWithValue }) => {
	try {
		const response = await CustomAxios.post("/admin/updateUser", details, {
			withCredentials: true,
		});
		return response.data;
	} catch (error: any) {
		if (error.response && error.response.data) {
			return rejectWithValue(error.response.data);
		} else {
			return rejectWithValue(error.message);
		}
	}
});
