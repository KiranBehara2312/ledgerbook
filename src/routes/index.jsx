import React from "react";
import {
  BrowserRouter,
  Outlet,
  Route,
  Routes,
  useRoutes,
} from "react-router-dom";
import AuthLayout from "../layouts/auth";
import BaseLayout from "../layouts/base";
import SimCard from "../components/custom/Sim-Card";

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
          index: true,
          element: (
            <>
              <SimCard cardStyles={{ height: "200px", width: "200px", ml :20, mt : 50, p:1 }}>
                Login
              </SimCard>
            </>
          ),
        },
        { path: "signup", element: <>signup</> },
      ],
    },
  ]);
  return routes;
};

export default AppRoutes;
