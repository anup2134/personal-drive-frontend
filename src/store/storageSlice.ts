import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createAppAsyncThunk } from "./hooks";
import { File, Folder, storageState, SharedFile, StorageTab } from "@/types";
import { getFolderData, getPhotos, getSharedFiles } from "@/apis/strorageApis";
import { RootState } from "./store";
import { createSelector } from "@reduxjs/toolkit";
import { uploadFile } from "@/apis/strorageApis";

export const folderData = createAppAsyncThunk(
  "storage/folderData",
  async (id: string | number) => {
    return await getFolderData(id);
  }
);

export const sharedFiles = createAppAsyncThunk(
  "storage/sharedFiles",
  async () => {
    return await getSharedFiles();
  }
);
export const Images = createAppAsyncThunk("storage/images", async () => {
  return await getPhotos();
});

export const fileUpload = createAppAsyncThunk(
  "storage/uploadFile",
  async (formData: FormData) => {
    return await uploadFile(formData);
  }
);

const initialState: storageState = {
  name: "My Files",
  main: true,
  error: "",
  status: "idle",
  id: null,
  files: [] as File[] | SharedFile[],
  folders: [] as Folder[],
  tabStack: [
    { name: "test1", id: 2, main: false },
    { name: "test2", id: 9, main: false },
  ] as StorageTab[],
};

export const storageSlice = createSlice({
  name: "storage",
  initialState,
  reducers: {
    mainActiveTab: (
      state,
      action: PayloadAction<{
        name: string;
        main: boolean;
        id: number;
      }>
    ) => {
      state.name = action.payload.name;
      state.main = action.payload.main;
      state.id = action.payload.id;
      if (action.payload.main) {
        state.tabStack = [action.payload];
      } else {
        state.tabStack.push(action.payload);
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(folderData.pending, (state) => {
        state.status = "pending";
      })
      .addCase(folderData.fulfilled, (state, action) => {
        if (!action.payload) {
          Object.assign(state, {
            ...initialState,
            status: "failed",
            error: "something went wrong",
          });
          return;
        }
        Object.assign(state, {
          ...state,
          files: action.payload.files,
          folders: action.payload.sub_folders,
          status: "success",
        });
      })
      .addCase(folderData.rejected, (state, action) => {
        Object.assign(state, {
          ...initialState,
          status: "failed",
          error: action.error.message,
        });
      })
      .addCase(sharedFiles.pending, (state) => {
        state.status = "pending";
      })
      .addCase(sharedFiles.fulfilled, (state, action) => {
        if (!action.payload) {
          Object.assign(state, {
            ...initialState,
            status: "failed",
            error: "something went wrong",
          });
          return;
        }
        Object.assign(state, {
          ...state,
          files: action.payload,
          folders: [],
          status: "success",
        });
      })
      .addCase(sharedFiles.rejected, (state, action) => {
        Object.assign(state, {
          ...initialState,
          status: "failed",
          error: action.error.message,
        });
      })
      .addCase(Images.pending, (state) => {
        state.status = "pending";
      })
      .addCase(Images.fulfilled, (state, action) => {
        if (!action.payload) {
          Object.assign(state, {
            ...initialState,
            status: "failed",
            error: "something went wrong",
          });
          return;
        }
        Object.assign(state, {
          ...state,
          files: action.payload,
          folders: [],
          status: "success",
        });
      })
      .addCase(Images.rejected, (state, action) => {
        Object.assign(state, {
          ...initialState,
          status: "failed",
          error: action.error.message,
        });
      })
      .addCase(fileUpload.rejected, (state, action) => {
        state.error = action.error.message ?? "something went wrong";
      });
  },
});

export const selectStatus = (state: RootState) => state.storageReducer.status;
export const selectFiles = (state: RootState) => state.storageReducer.files;
export const selectFolders = (state: RootState) => state.storageReducer.folders;
export const selectError = (state: RootState) => state.storageReducer.error;
export const selectTabStack = (state: RootState) =>
  state.storageReducer.tabStack;

const selectStorageReducer = (state: RootState) => state.storageReducer;
export const selectActiveTab = createSelector(
  selectStorageReducer,
  (storage) => ({
    name: storage.name,
    main: storage.main,
    id: storage.id,
  })
);

export const { mainActiveTab } = storageSlice.actions;
export default storageSlice.reducer;
