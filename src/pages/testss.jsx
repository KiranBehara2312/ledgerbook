import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const Testss = () => {
  const userProfile = useSelector((state) => state.userProfile.user);
  useEffect(() => {
    console.log(userProfile);
  }, [userProfile]);
  // return <>asdasd</>;
  return <div>{userProfile ? JSON.stringify(userProfile) : "No user"} </div>;
};

export default Testss;
