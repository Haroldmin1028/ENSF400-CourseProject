import { createBrowserRouter } from "react-router";
import LogInForm from "./components/LogInForm";
import SignUpForm from "./components/SignUpForm";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: LogInForm,
  },
  {
    path: "/login",
    Component: LogInForm,
  },
  {
    path: "/signup",
    Component: SignUpForm,
  },
]);