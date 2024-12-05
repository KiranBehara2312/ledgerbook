import React from "react";
import BaseLayout from "../base";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <BaseLayout>
      <Outlet />
    </BaseLayout>
  );
};

export default AuthLayout;
