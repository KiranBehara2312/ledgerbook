import React from "react";
import BaseLayout from "../base";
import { Outlet } from "react-router-dom";

const PagesLayout = () => {
  return (
    <BaseLayout>
      <Outlet />
    </BaseLayout>
  );
};

export default PagesLayout;
