import React from "react";
import { useRoutes } from "react-router-dom";
import AuthLayout from "../layouts/auth";
import Login from "../pages/auth/Login";

const AppRoutes = () => {
  const routes = useRoutes([
    {
      path: "/",
    },
    {
      path: "auth",
      element: <AuthLayout />,
      children: [
        {
          path: "login",
          element: <Login />,
        },
        { path: "signup", element: <>signup</> },
      ],
    },
  ]);
  return routes;
};

export default AppRoutes;
