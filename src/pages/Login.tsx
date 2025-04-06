import { useEffect, useState } from "react";
import EmailPassword from "@/components/EmailPassword";
import FormButton from "@/components/FormButton";
import { loginUser, selectStatus } from "@/store/userSlice";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectStatus);
  const navigate = useNavigate();

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    dispatch(loginUser([email, password]));
  };

  useEffect(() => {
    if (status === "something went wrong") toast("Something went wrong.");
    if (status === "wrong credentials") toast("Incorrect login credentials.");
    if (status === "success") navigate("/");
  }, [status]);

  const isDisabled = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return !emailRegex.test(email);
  };

  return (
    <form className="flex flex-col justify-center w-80 gap-y-2 mx-auto mt-20">
      <h1 className="font-medium text-2xl mb-2">Login</h1>
      <EmailPassword
        email={email}
        password={password}
        setEmail={setEmail}
        setPassword={setPassword}
      />
      <FormButton
        name="Login"
        disabled={isDisabled(email) || password === ""}
        handleSubmit={handleSubmit}
        loading={status === "pending"}
      />
      <Toaster />
      <div>
        Don't have an account?{" "}
        <Link to="/signup" className="font-bold">
          Sign Up
        </Link>
      </div>
    </form>
  );
}
