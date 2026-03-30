import { createBrowserRouter } from "react-router";
import LoginPage from "./login/page";
import SignupPage from "./signup/page";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: LoginPage,
  },
  {
    path: "/login",
    Component: LoginPage,
  },
  {
    path: "/signup",
    Component: SignupPage,
  },
]);