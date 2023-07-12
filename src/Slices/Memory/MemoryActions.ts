/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from "@reduxjs/toolkit";

import { CustomAxios } from "../../Utils/index";

export const getAllRems = createAsyncThunk<
	AuthResponse,
	void,
	{ rejectValue: APIError }
>("memory/getAllRems", async (_, { rejectWithValue }) => {
	try {
		const response = await CustomAxios.get("/memory/getMyAllRems", {
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

export const updateRem = createAsyncThunk<
	RemResponse,
	IUpdateRem,
	{ rejectValue: APIError }
>("memory/updateRem", async (updatedRem: IUpdateRem, { rejectWithValue }) => {
	try {
		const response = await CustomAxios.post(
			"/memory/updateRem",
			updatedRem,
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

export const getQuestions = createAsyncThunk<
	QuestionResponse,
	void,
	{ rejectValue: APIError }
>("question/getQuestion", async (_, { rejectWithValue }) => {
	try {
		const response = await CustomAxios.get("/getQuestions", {
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

export const getMemoryOfPair = createAsyncThunk<
	MemoryPairResponse,
	UserRequest,
	{ rejectValue: APIError }
>("memory/getRemOfPair", async (body: UserRequest, { rejectWithValue }) => {
	try {
		const response = await CustomAxios.post("/memory/getRemOfPair", body, {
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
