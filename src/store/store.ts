import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice.js";
import storageReducer from "./storageSlice.js";

const store = configureStore({
  reducer: { userReducer, storageReducer },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
export type AppThunk = ThunkAction<void, RootState, unknown, Action>;
