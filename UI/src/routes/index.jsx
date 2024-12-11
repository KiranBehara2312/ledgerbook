import React from "react";
import { Navigate, useRoutes } from "react-router-dom";
import AuthLayout from "../layouts/auth";
import Login from "../pages/auth/Login";
import PagesLayout from "../layouts/pages";
import Home from "../pages/Home";
import Registration from "../pages/registration";
import SignUp from "../pages/auth/Signup";
import Masters from "../pages/Masters";

const AppRoutes = () => {
  const routes = useRoutes([
    {
      path: "/",
      element: <Navigate to={"/auth/login"} replace />,
    },
    {
      path: "auth",
      element: <AuthLayout />,
      children: [
        {
          path: "login",
          element: <Login />,
        },
        { path: "signup", element: <SignUp /> },
      ],
    },
    {
      path: "pages",
      element: <PagesLayout />,
      children: [
        {
          path: "home",
          index: true,
          element: <Home />,
        },
        {
          path: "registration",
          element: <Registration />,
        },
        {
          path: "appointment",
          element: <>appointment</>,
        },
        {
          path: "masters",
          element: <Masters />,
        },
      ],
    },
  ]);
  return routes;
};

export default AppRoutes;
