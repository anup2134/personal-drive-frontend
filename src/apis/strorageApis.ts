import axios from "axios";
import { File, Folder } from "@/types";

const base = "http://127.0.0.1:8000/api/v1/storage/";

export const getMyFiles = async () => {
  try {
    const { data } = await axios.get(`${base}my_files/`, {
      withCredentials: true,
    });
    return data as {
      files: File[];
      sub_folders: Folder[];
    };
  } catch (err: any) {
    throw new Error((err?.name as string) ?? "Something went wrong");
  }
};
