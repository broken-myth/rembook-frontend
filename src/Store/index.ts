import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { AdminReducer, MemoryReducer, UserReducer } from "../Slices/index";

const rootReducer = combineReducers({
	user: UserReducer,
	memory: MemoryReducer,
	admin: AdminReducer,
});

export const store = configureStore({
	reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
