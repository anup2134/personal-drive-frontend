import axios from "axios";
import { File, Folder, SharedFile } from "@/types";

const base = "http://127.0.0.1:8000/api/v1/storage/";

export const getFolderData = async (folder_id: number | string) => {
  try {
    const { data } = await axios.get(
      `${base}folder_content/?folder_id=${folder_id}`,
      {
        withCredentials: true,
      }
    );
    return data as {
      files: File[];
      sub_folders: Folder[];
    };
  } catch (err: any) {
    if (err?.response?.data?.error)
      throw new Error(err.response.data.error as string);
    else throw new Error("Something went wrong");
  }
};

export const getSharedFiles = async () => {
  try {
    const { data } = await axios.get(`${base}shared_files/`, {
      withCredentials: true,
    });
    return data as SharedFile[];
  } catch (err: any) {
    if (err?.response?.data?.error)
      throw new Error(err.response.data.error as string);
    else throw new Error("Something went wrong");
  }
};

export const getPhotos = async () => {
  try {
    const { data } = await axios.get(`${base}images/`, {
      withCredentials: true,
    });
    return data as File[];
  } catch (err: any) {
    if (err?.response?.data?.error)
      throw new Error(err.response.data.error as string);
    else throw new Error("Something went wrong");
  }
};

export const uploadFile = async (formData: FormData) => {
  try {
    const { data } = await axios.post(`${base}file/upload/`, formData, {
      withCredentials: true,
    });
    return data as File;
  } catch (err: any) {
    if (err?.response?.data?.error)
      throw new Error(err.response.data.error as string);
    else throw new Error("Something went wrong");
  }
};
