import React from "react";
import BaseLayout from "../base";
import { Outlet } from "react-router-dom";
import MyHeader from "../../components/shared/MyHeader";

const PagesLayout = () => {
  return (
    <BaseLayout>
      <MyHeader />
      <Outlet />
    </BaseLayout>
  );
};

export default PagesLayout;
