import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense } from "react";

import Home from "./pages/Home";
// import VerifyEmail from "./pages/VerifyEmail";
import Test from "./pages/Test";

const Login = lazy(() => import("./pages/Login"));
const SignUp = lazy(() => import("./pages/SignUp"));
const VerifyEmail = lazy(() => import("./pages/VerifyEmail"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
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
    path: "/test",
    element: <Test />,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
