import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createAppAsyncThunk } from "./hooks";
import { File, Folder, storageState, SharedFile, StorageTab } from "@/types";
import {
  getFolderData,
  getPhotos,
  getSharedFiles,
  deleteFile,
  shareFile,
  createFolder,
} from "@/apis/strorageApis";
import { RootState } from "./store";
import { createSelector } from "@reduxjs/toolkit";
import { uploadFile } from "@/apis/strorageApis";

export const folderData = createAppAsyncThunk(
  "storage/folderData",
  async (id: string | number) => {
    return await getFolderData(id);
  }
);
export const folderCreate = createAppAsyncThunk(
  "storage/createFolder",
  async ({
    folder_name,
    parent_folder_id,
  }: {
    folder_name: string;
    parent_folder_id: number;
  }) => {
    return await createFolder(folder_name, parent_folder_id);
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
export const fileDelete = createAppAsyncThunk(
  "storage/deleteFile",
  async (file_id: number) => {
    return await deleteFile(file_id);
  }
);

export const fileShare = createAppAsyncThunk(
  "storage/shareFile",
  async ({
    file_id,
    anyone,
    email,
  }: {
    file_id: number;
    anyone: boolean;
    email: string;
  }) => {
    return await shareFile(file_id, anyone, email);
  }
);

const initialState: storageState = {
  name: "My Files",
  toast: "",
  main: true,
  error: "",
  status: "idle",
  id: -1,
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
      } else if (state.tabStack.find((tab) => tab.id === action.payload.id)) {
        for (let i = 0; i < state.tabStack.length; i++) {
          if (state.tabStack[i].id === action.payload.id) {
            state.tabStack.splice(i + 1);
            break;
          }
        }
      } else state.tabStack.push(action.payload);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(folderData.pending, (state) => {
        state.status = "pending";
        state.toast = "";
        state.error = "";
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
          error: "",
          toast: "",
        });
      })
      .addCase(folderData.rejected, (state, action) => {
        Object.assign(state, {
          ...initialState,
          status: "failed",
          error: action.error.message ?? "Something went wrong.",
        });
      })
      .addCase(sharedFiles.pending, (state) => {
        state.status = "pending";
        state.toast = "";
        state.error = "";
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
          error: "",
          toast: "",
        });
      })
      .addCase(sharedFiles.rejected, (state, action) => {
        Object.assign(state, {
          ...initialState,
          status: "failed",
          error: action.error.message ?? "Something went wrong.",
        });
      })
      .addCase(Images.pending, (state) => {
        state.status = "pending";
        state.toast = "";
        state.error = "";
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
          error: "",
          toast: "",
        });
      })
      .addCase(Images.rejected, (state, action) => {
        Object.assign(state, {
          ...initialState,
          status: "failed",
          error: action.error.message ?? "Something went wrong.",
        });
      })
      .addCase(fileUpload.rejected, (state, action) => {
        state.error = action.error.message ?? "Something went wrong.";
        state.toast = "";
      })
      .addCase(fileUpload.pending, (state) => {
        state.toast = "uploading";
        state.error = "";
      })
      .addCase(fileUpload.fulfilled, (state, action) => {
        if (!action.payload) {
          state.error = "something went wrong";
        }
        state.status = "success";
        state.toast = "File uploaded successfully.";
        state.error = "";
        state.files = [...state.files, action.payload];
      })
      .addCase(fileDelete.pending, (state) => {
        state.toast = "deleting";
        state.error = "";
      })
      .addCase(fileDelete.fulfilled, (state, action) => {
        state.status = "success";
        state.toast = action.payload;
        state.error = "";
        state.files = state.files.filter((file) => file.id !== action.meta.arg);
      })
      .addCase(fileShare.pending, (state) => {
        state.toast = "Processing...";
        state.error = "";
      })
      .addCase(fileShare.fulfilled, (state, action) => {
        state.status = "success";
        state.toast = action.payload;
        state.error = "";
      })
      .addCase(fileShare.rejected, (state, action) => {
        state.error = action.error.message ?? "Something went wrong.";
        state.toast = "";
      })
      .addCase(folderCreate.pending, (state) => {
        state.toast = "creating folder...";
        state.error = "";
      })
      .addCase(folderCreate.fulfilled, (state, action) => {
        state.status = "success";
        state.toast = "Folder created successfully.";
        state.folders = [...state.folders, action.payload];
        state.error = "";
      })
      .addCase(folderCreate.rejected, (state, action) => {
        state.error = action.error.message ?? "Something went wrong.";
        state.toast = "";
      });
  },
});

export const selectStatus = (state: RootState) => state.storageReducer.status;
export const selectFiles = (state: RootState) => state.storageReducer.files;
export const selectFolders = (state: RootState) => state.storageReducer.folders;
export const selectError = (state: RootState) => state.storageReducer.error;
export const selectTabStack = (state: RootState) =>
  state.storageReducer.tabStack;
export const selectToast = (state: RootState) => state.storageReducer.toast;

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
