import React from "react";
import { Navigate, useRoutes } from "react-router-dom";
import AuthLayout from "../layouts/auth";
import Login from "../pages/auth/Login";
import PagesLayout from "../layouts/pages";

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
        { path: "signup", element: <>signup</> },
      ],
    },
    {
      path: "pages",
      element: <PagesLayout />,
      children: [
        {
          path: "home",
          element: <>Home</>,
        },
      ],
    },
  ]);
  return routes;
};

export default AppRoutes;
