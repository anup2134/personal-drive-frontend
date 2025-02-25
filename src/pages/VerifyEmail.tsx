import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [expired, setExpired] = useState(false);
  const [success, setSuccess] = useState(false);
  const [invalid, setInvalid] = useState(false);
  const token = searchParams.get("token");

  if (!token)
    return (
      <div className="w-screen h-screen flex font-medium justify-center items-center gap-x-2">
        <img
          src="https://www.svgrepo.com/show/254624/warning-error.svg"
          width={20}
          height={20}
        />
        <h1>Invalid token</h1>
      </div>
    );

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const { data } = await axios.get(
          `http://127.0.0.1:8000/api/v1/user/verify_email/${token}/`,
          { withCredentials: true }
        );
        if (data.message === "email verified successfully") {
          setSuccess(true);
        }
      } catch (err: any) {
        if (err.response) {
          console.log(err.response.data.message);
          if (err.response.data.message === "invalid token") {
            setInvalid(true);
          }
          if (err.response.data.message === "link expired") {
            setExpired(true);
          }
        }
      }
    };

    verifyEmail().finally(() => {
      setLoading(false);
    });
  }, []);

  return (
    <div className="flex justify-center items-center w-screen h-screen gap-x-2">
      {loading && (
        <>
          <div className="rounded-full border-black border-l-2 border-r-2 border-t-2 animate-spin w-10 h-10"></div>
          <h1 className="font-medium">
            Verifying email
            <span>.</span>
            <span className="animate-ping">.</span>
            <span className="animate-ping delay-200">.</span>
          </h1>
        </>
      )}
      {success && <div>Email verified successfully</div>}
      {invalid && (
        <div className="w-screen h-screen flex font-medium justify-center items-center gap-x-2">
          <img
            src="https://www.svgrepo.com/show/254624/warning-error.svg"
            width={20}
            height={20}
          />
          <h1>Invalid token</h1>
        </div>
      )}
      {expired && <div>Link expired</div>}
    </div>
  );
}
