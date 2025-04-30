import { type LucideProps } from "lucide-react";
export interface User {
  f_name: string;
  l_name: string;
  picture: string;
  id: number;
  email: string;
  limit: number;
  root_folder_id: number;
}

export type icon = React.ForwardRefExoticComponent<
  Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
>;

export interface UserState extends User {
  status:
    | "idle"
    | "pending"
    | "success"
    | "failed"
    | "something went wrong"
    | "wrong credentials";
}

export interface File {
  id: number;
  name: string;
  size: number;
  type: string;
  created_at: string;
  is_shared: boolean;
  url: string;
}

export interface SharedFile extends File {
  owner_email: string;
  owner_name: string;
  owner_image: string;
}

export interface Folder {
  id: number;
  name: string;
  created_at: string;
  owner: number;
}

export interface storage {
  status: "idle" | "pending" | "success" | "failed";
  error: string;
  files: File[];
  folders: Folder[];
}
export interface StorageTab {
  name: string;
  main: boolean;
  id: number | null;
}
export interface storageState extends storage, StorageTab {
  tabStack: StorageTab[];
}
