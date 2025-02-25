import axios from "axios";
export const base = "http://127.0.0.1:8000/";

export const createUser = async (
  email: string,
  password: string,
  f_name: string,
  l_name: string
): Promise<string> => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.post(`${base}api/v1/user/register/`, {
        email,
        password,
        f_name,
        l_name,
      });
      resolve(data.message);
    } catch (err: any) {
      if (err.response) {
        reject(err.response.data.message);
      } else {
        console.log(err.name);
        reject(err.name);
      }
    }
  });
};
