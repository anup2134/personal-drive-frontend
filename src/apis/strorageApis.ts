import axios from "axios";
import { File, Folder, SharedFile } from "@/types";

const base = "http://127.0.0.1:8000/api/v1/storage/";

export const getFolderData = async function (folder_id: number) {
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
    // console.log(err);
    if (err?.response?.data?.message)
      throw new Error("Duplicate file name found.");
    else throw new Error("Something went wrong");
  }
};

export const deleteFile = async (file_id: number) => {
  try {
    await axios.delete(`${base}file/upload/?file_id=${file_id}`, {
      withCredentials: true,
    });
    return "File deleted successfully.";
  } catch (err: any) {
    if (err?.response?.data?.error) throw new Error("File not found.");
    else throw new Error("Something went wrong.");
  }
};

export const shareFile = async (
  file_id: number,
  anyone: boolean,
  email: string
) => {
  try {
    await axios.put(
      `${base}file/update/share/`,
      { file_id, anyone, email },
      { withCredentials: true }
    );
    return "File shared successfully.";
  } catch (err: any) {
    if (err?.response?.data?.error)
      throw new Error(err.response.data.error as string);
    else throw new Error("Something went wrong.");
  }
};

export const queryFile = async (file_id: number, query: string) => {
  try {
    const { data } = await axios.post(
      `${base}api/v1/storage/file/query/`,
      { file_id, query },
      { withCredentials: true }
    );
    return data.response as string;
  } catch (err: any) {
    if (err?.response?.data?.message)
      throw new Error(err.response.data.message as string);
    throw new Error("Unable to answer at this moment.");
  }
};

export const createFolder = async (
  folder_name: string,
  parent_folder_id: number
) => {
  try {
    const { data } = await axios.post(
      `${base}folder/create/`,
      {
        folder_name,
        parent_folder_id,
      },
      { withCredentials: true }
    );

    return data.folder as Folder;
  } catch (err: any) {
    if (err?.response?.data?.error)
      throw new Error(err.response.data.error as string);
    else throw new Error("Something went wrong.");
  }
};
