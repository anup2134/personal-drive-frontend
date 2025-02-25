// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App.tsx";
import store from "./store/store.js";
import { GoogleOAuthProvider } from "@react-oauth/google";

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <Provider store={store}>
    <GoogleOAuthProvider clientId="379292893536-ank56m85b0n5theji1osamp4vnhqds8l.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
  </Provider>
  // </StrictMode>
);
