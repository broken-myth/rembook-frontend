/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from "@reduxjs/toolkit";

import { CustomAxios } from "../../Utils/index";

export const loginUser = createAsyncThunk<
	AuthResponse,
	Credentials,
	{ rejectValue: APIError }
>("user/loginUser", async (credentials: Credentials, { rejectWithValue }) => {
	try {
		const response = await CustomAxios.post(
			"/login",
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

export const resetPwd = createAsyncThunk<
	AuthResponse,
	IPassword,
	{ rejectValue: APIError }
>("user/resetPass", async (forgotPassword: IPassword, { rejectWithValue }) => {
	try {
		const response = await CustomAxios.post("/forgotpass", forgotPassword, {
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

export const dauthLogin = createAsyncThunk<
	AuthResponse,
	DauthCode,
	{ rejectValue: APIError }
>("user/dauthLogin", async (dauthCode: DauthCode, { rejectWithValue }) => {
	try {
		const headers = new Headers();
		headers.append("Content-Type", "application/json");
		headers.append("Access-Control-Allow-Credentials", "true");
		const response = await CustomAxios.get(
			`/dauth/callback?code=${dauthCode.code}`,
			{
				withCredentials: true,
				//@ts-ignore
				headers,
			}
		);
		return response.data;
	} catch (error: any) {
		if (error.response && error.response.data) {
			console.log(error);
			return rejectWithValue(error.response.data);
		} else {
			console.log(error.message);
			return rejectWithValue(error.message);
		}
	}
});

export const getUser = createAsyncThunk<
	IGetUser,
	void,
	{ rejectValue: APIError }
>("user/getUser", async (_, { rejectWithValue }) => {
	try {
		const response = await CustomAxios.get("/user/getCurrentUser", {
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

export const fetchUserFromId = createAsyncThunk<
	UserResponse,
	UserRequest,
	{ rejectValue: APIError }
>("user/fetchFromId", async (id: UserRequest, { rejectWithValue }) => {
	try {
		const response = await CustomAxios.get(`/user/getUser?id=${id.id}`, {
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

export const forgotPwd = createAsyncThunk<
	AuthResponse,
	IReset,
	{ rejectValue: APIError }
>("user/forgotPass", async (resetObject: IReset, { rejectWithValue }) => {
	try {
		const response = await CustomAxios.post(
			"/forgotPassword",
			resetObject,
			{
				withCredentials: true,
			}
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

export const setCredentials = createAsyncThunk<
	AuthResponse,
	Credentials,
	{ rejectValue: APIError }
>(
	"user/setCredentials",
	async (credentials: Credentials, { rejectWithValue }) => {
		try {
			const response = await CustomAxios.post(
				"/addSecondaryCreds",
				credentials,
				{
					withCredentials: true,
				}
			);
			return response.data;
		} catch (error: any) {
			if (error.response && error.response.data) {
				return rejectWithValue(error.response.data);
			} else {
				return rejectWithValue(error.message);
			}
		}
	}
);

export const updateProfile = createAsyncThunk<
	AuthResponse,
	IProfile,
	{ rejectValue: APIError }
>("user/updateProfile", async (profile: IProfile, { rejectWithValue }) => {
	try {
		const response = await CustomAxios.post(
			"/user/updateProfile",
			profile,
			{
				withCredentials: true,
			}
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

export const updateProfilePicture = createAsyncThunk<
	AuthResponse,
	File,
	{ rejectValue: APIError }
>("user/updateProfilePicture", async (file: File, { rejectWithValue }) => {
	try {
		const response = await CustomAxios.post(
			"/user/uploadProfileImage",
			{ image: file },
			{
				withCredentials: true,
				headers: {
					"Content-Type": "multipart/form-data",
				},
			}
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

export const getSearch = createAsyncThunk<
	SearchResponse,
	Query,
	{ rejectValue: APIError }
>("/user/getSearch", async (query: Query, { rejectWithValue }) => {
	try {
		const response = await CustomAxios.get(
			`/user/getSearch?${query.query}`,
			{
				withCredentials: true,
			}
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

export const logoutUser = createAsyncThunk<
	AuthResponse,
	void,
	{ rejectValue: APIError }
>("user/logout", async (_, { rejectWithValue }) => {
	try {
		const response = await CustomAxios.post(
			"/logout",
			{},
			{
				withCredentials: true,
			}
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
