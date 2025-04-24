export interface User {
  f_name: string;
  l_name: string;
  picture: string;
  id: number;
  email: string;
  limit: number;
}

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
  owner: number;
  is_shared: boolean;
}

export interface Folder {
  id: number;
  name: string;
  created_at: string;
  owner: number;
}

export interface storageState {
  status: "idle" | "pending" | "success" | "failed";
  error: string;
  files: File[];
  folders: Folder[];
}
