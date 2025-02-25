import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoggedIn: false,
    name: "",
    email: "",
  },
  reducers: {
    login: (state) => {
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.isLoggedIn = false;
    },
    setUser: (
      state,
      action: PayloadAction<{ name: string; email: string }>
    ) => {
      state.isLoggedIn = true;
      state.name = action.payload.name;
      state.email = action.payload.email;
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
