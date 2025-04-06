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
