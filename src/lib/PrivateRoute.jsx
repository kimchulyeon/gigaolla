import React from "react";
import { Navigate, Outlet } from "react-router";
import { isLoggedIn } from "../utils/atoms";
import { useRecoilValue } from "recoil";

const PrivateRoute = () => {
  const isLogged = useRecoilValue(isLoggedIn);
  return isLogged ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
