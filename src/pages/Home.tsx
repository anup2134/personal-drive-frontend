import { useAppSelector } from "@/store/hooks";
import { useAppDispatch } from "@/store/hooks";
import {
  fetchUser,
  selectStatus,
  selectFname,
  selectPicture,
  userLogout,
} from "@/store/userSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Home() {
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectStatus);
  const name = useAppSelector(selectFname);
  const picture = useAppSelector(selectPicture);
  const navigate = useNavigate();

  useEffect(() => {
    if (status === "failed") navigate("/login");
    if (status === "idle") dispatch(fetchUser());
  }, [status]);

  return (
    <div>
      <h1>Home</h1>
      {status === "pending" && <p>Loading...</p>}
      {status === "success" && (
        <>
          <p>Hello {name}</p>
          {picture !== "" && <img src={picture} />}
          <Button
            onClick={() => {
              dispatch(userLogout());
            }}
          >
            Log out
          </Button>
        </>
      )}
    </div>
  );
}
