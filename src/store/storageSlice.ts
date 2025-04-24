import { createSlice } from "@reduxjs/toolkit";
import { createAppAsyncThunk } from "./hooks";
import { File, Folder, storageState } from "@/types";
import { getMyFiles } from "@/apis/strorageApis";
import { RootState } from "./store";

export const myFiles = createAppAsyncThunk("storage/getMyFiles", async () => {
  return await getMyFiles();
});

const initialState: storageState = {
  error: "",
  status: "idle",
  files: [] as File[],
  folders: [] as Folder[],
};

export const storageSlice = createSlice({
  name: "storage",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(myFiles.pending, (state) => {
        state.status = "pending";
      })
      .addCase(myFiles.fulfilled, (state, action) => {
        if (!action.payload) {
          Object.assign(state, { ...initialState, status: "failed" });
          return;
        }
        Object.assign(state, {
          ...state,
          files: action.payload.files,
          folders: action.payload.sub_folders,
          status: "success",
        });
      })
      .addCase(myFiles.rejected, (state, action) => {
        Object.assign(state, {
          ...initialState,
          status: "failed",
          error: action.error.message,
        });
      });
  },
});

export const selectStatus = (state: RootState) => state.storageReducer.status;
export const selectFiles = (state: RootState) => state.storageReducer.files;
export const selectFolders = (state: RootState) => state.storageReducer.folders;
export const selectError = (state: RootState) => state.storageReducer.error;

export default storageSlice.reducer;
