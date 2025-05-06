import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";

import Home from "./pages/Home";
import Test from "./pages/Test";

const Login = lazy(() => import("./pages/Login"));
const SignUp = lazy(() => import("./pages/SignUp"));
const VerifyEmail = lazy(() => import("./pages/VerifyEmail"));
const Profile = lazy(() => import("./pages/Profile"));
const TermsOfService = lazy(() => import("./pages/TOSPage"));
const NotFound = lazy(() => import("./pages/404"));
const QueryPage = lazy(() => import("./pages/QueryPage"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/query_file",
    element: <QueryPage />,
  },
  {
    path: "/tos",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <TermsOfService />
      </Suspense>
    ),
  },
  {
    path: "/login",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Login />
      </Suspense>
    ),
  },
  {
    path: "/signup",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <SignUp />
      </Suspense>
    ),
  },
  {
    path: "/verify_email",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <VerifyEmail />
      </Suspense>
    ),
  },
  {
    path: "/profile",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Profile />
      </Suspense>
    ),
  },
  {
    path: "/test",
    element: <Test />,
  },
  {
    path: "*",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <NotFound />
      </Suspense>
    ),
  },
]);

export default function App() {
  useEffect(() => {
    const handleOnline = () => {
      window.location.reload();
    };

    window.addEventListener("online", handleOnline);

    return () => {
      window.removeEventListener("online", handleOnline);
    };
  }, []);
  return <RouterProvider router={router} />;
}
