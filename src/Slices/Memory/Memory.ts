import { createSlice } from "@reduxjs/toolkit";

import {
	getAllRems,
	getMemoryOfPair,
	getQuestions,
	updateRem,
} from "./MemoryActions";

const initialState = {
	isFetching: false,
	questions: [],
} as MemoryState;

export const memory = createSlice({
	name: "memory",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getAllRems.rejected, (state) => {
			state.isFetching = false;
		});
		builder.addCase(getAllRems.pending, (state) => {
			state.isFetching = true;
		});
		builder.addCase(getAllRems.fulfilled, (state) => {
			state.isFetching = false;
		});
		builder.addCase(updateRem.rejected, (state) => {
			state.isFetching = false;
		});
		builder.addCase(updateRem.pending, (state) => {
			state.isFetching = true;
		});
		builder.addCase(updateRem.fulfilled, (state) => {
			state.isFetching = false;
		});
		builder.addCase(getQuestions.rejected, (state) => {
			state.questions = [];
		});
		builder.addCase(getQuestions.pending, (state) => {
			state.questions = [];
		});
		builder.addCase(getQuestions.fulfilled, (state, action) => {
			state.questions = action.payload.question;
		});
		builder.addCase(getMemoryOfPair.rejected, (state) => {
			state.isFetching = false;
		});
		builder.addCase(getMemoryOfPair.pending, (state) => {
			state.isFetching = true;
		});
		builder.addCase(getMemoryOfPair.fulfilled, (state) => {
			state.isFetching = false;
		});
	},
});

export const memorySelector = (state: { memory: MemoryState }) => state.memory;

export default memory.reducer;
