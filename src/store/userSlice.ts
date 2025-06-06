import { createSlice } from "@reduxjs/toolkit";
import { createAppAsyncThunk } from "./hooks";
import type { UserState } from "@/types";
import {
  fetchUser as getUser,
  login,
  logout,
  googleSignin,
} from "@/apis/userApis";
import { RootState } from "./store";

const initialState: UserState = {
  status: "idle",
  f_name: "",
  l_name: "",
  email: "",
  id: -1,
  limit: -1,
  picture: "",
  root_folder_id: -1,
};

export const fetchUser = createAppAsyncThunk("user/fetch", async () => {
  return await getUser();
});

export const loginUser = createAppAsyncThunk(
  "user/login",
  async (creds: [string, string]) => {
    return await login(creds[0], creds[1]);
  }
);

export const logoutUser = createAppAsyncThunk("user/logout", async () => {
  return await logout();
});

export const signupGoogleUser = createAppAsyncThunk(
  "user/signin",
  async (access_token: string) => {
    return await googleSignin(access_token);
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        if (!action.payload) {
          Object.assign(state, { ...initialState, status: "failed" });
          return;
        }
        Object.assign(state, {
          ...action.payload,
          status: "success",
        });
      })
      .addCase(loginUser.pending, (state) => {
        state.status = "pending";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        if (!action.payload[0]) {
          Object.assign(state, { ...initialState, status: action.payload[1] });
          return;
        }
        Object.assign(state, {
          ...action.payload[0],
          status: "success",
        });
      })
      .addCase(logoutUser.pending, (state) => {
        state.status = "pending";
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        if (!action.payload) {
          return;
        }
        Object.assign(state, initialState);
      })
      .addCase(signupGoogleUser.fulfilled, (state, action) => {
        if (!action.payload[0]) {
          Object.assign(state, { ...initialState, status: action.payload[1] });
          return;
        }
        Object.assign(state, {
          ...action.payload[0],
          status: "success",
        });
        // console.log(state);
      });
  },
});

export const selectStatus = (state: RootState) => state.userReducer.status;
export const selectFname = (state: RootState) => state.userReducer.f_name;
export const selectLname = (state: RootState) => state.userReducer.l_name;
export const selectEmail = (state: RootState) => state.userReducer.email;
export const selectId = (state: RootState) => state.userReducer.id;
export const selectPicture = (state: RootState) => state.userReducer.picture;
export const selectLimit = (state: RootState) => state.userReducer.limit;
export const selectRootFolderId = (state: RootState) =>
  state.userReducer.root_folder_id;

// export const { userLogout } = userSlice.actions;

export default userSlice.reducer;
