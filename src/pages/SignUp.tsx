import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createUser } from "@/apis/userApis";
import { useEffect, useState } from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import GoogleSVG from "@/assets/google.svg";
import { useGoogleLogin } from "@react-oauth/google";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import EmailPassword from "@/components/EmailPassword";
import FormButton from "@/components/FormButton";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { signupGoogleUser, selectStatus } from "@/store/userSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

export default function SignUp() {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [disabled, setDisable] = useState(true);
  const [message, setMessage] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectStatus);
  const navigate = useNavigate();
  useEffect(() => {
    if (status === "success") navigate("/");
    else if (status === "something went wrong") toast(status);
  }, [status]);

  const handleSignUp = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      dispatch(signupGoogleUser(tokenResponse.access_token));
    },
  });

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setLoading(true);
    setDisable(true);
    await createUser(email, password, fname, lname)
      .then(() => {
        setDisable(false);
        setLoading(false);
        setShowMessage(true);
      })
      .catch((err) => {
        if (err === "user already exists") {
          toast("An account with this email already exists.");
        }
        setDisable(false);
        setLoading(false);
      });
  };

  useEffect(() => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const nameRegex = /^[a-zA-Z]+$/;
    const tempMessage: string[] = [];
    let isDisabled = loading;
    if (fname === "") {
      tempMessage.push("First name is required.");
      isDisabled = true;
    } else if (fname.length < 3) {
      tempMessage.push("First name should contain at least 3 characters.");
      isDisabled = true;
    } else if (!nameRegex.test(fname)) {
      tempMessage.push("First name must contain only letters.");
      isDisabled = true;
    } else if (fname.length > 20) {
      tempMessage.push("First name must not exceed 20 characters.");
      isDisabled = true;
    }

    if (lname.length > 20) {
      tempMessage.push("Last name must not exceed 20 characters.");
      isDisabled = true;
    } else if (
      !(lname.length === 0 || (lname.length > 0 && nameRegex.test(lname)))
    ) {
      tempMessage.push("Last name must contain only letters.");
      isDisabled = true;
    }
    if (email === "") {
      tempMessage.push("Email is required.");
    } else if (!emailRegex.test(email)) {
      tempMessage.push("Enter a valid email.");
      isDisabled = true;
    }

    if (password.length < 8) {
      tempMessage.push("Password must be at least 8 characters long.");
      isDisabled = true;
    }
    setDisable(isDisabled);
    if (JSON.stringify(tempMessage) !== JSON.stringify(message))
      setMessage(tempMessage);
  }, [fname, email, password, lname]);

  return (
    <div className="flex flex-col justify-center w-80 gap-y-2 mx-auto mt-20">
      <h1 className="geist-600 text-2xl mb-2 text-center">Create Account</h1>
      <form className="flex flex-col gap-y-2">
        <Label>Name</Label>
        <div className="gap-x-2 flex">
          <Input
            type="text"
            placeholder="First Name"
            onChange={(e) => {
              setFname(e.target.value.trim());
            }}
            value={fname}
          />
          <Input
            type="text"
            placeholder="Last Name"
            onChange={(e) => {
              setLname(e.target.value.trim());
            }}
            value={lname}
          />
        </div>

        <EmailPassword
          password={password}
          email={email}
          setEmail={setEmail}
          setPassword={setPassword}
        />
        <HoverCard>
          <HoverCardTrigger>
            <FormButton
              name="Create Account"
              disabled={disabled}
              handleSubmit={handleSubmit}
              loading={loading}
            />
          </HoverCardTrigger>
          {message.length > 0 && (
            <HoverCardContent className="w-full">
              {message.map((mess, i) => {
                return <p key={i}>&#8226; {mess}</p>;
              })}
            </HoverCardContent>
          )}
        </HoverCard>
        {showMessage && (
          <p className="font-medium">
            Follow the link sent to your email to verify your account.
          </p>
        )}
      </form>
      <div>
        <div className="w-full border-b border-gray-200 relative h-0 top-3.5"></div>
        <p className="bg-white w-fit mx-auto relative">or</p>
      </div>

      <button
        className="flex items-center w-full border justify-center gap-x-1 py-2 rounded-md hover:cursor-pointer hover:bg-neutral-100"
        onClick={() => {
          handleSignUp();
        }}
      >
        <img src={GoogleSVG} width={30} height={30} />
        <p>Sign up with Google</p>
      </button>
      <Toaster />
      <div>
        Already have an account?{" "}
        <Link to="/login" className="font-bold">
          Log in{" "}
        </Link>
        instead
      </div>
    </div>
  );
}
