import React from "react";
import { useAuth } from "./AuthContext";
import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoutes = () => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? <Outlet /> : <Navigate to="/auth/login" />;
};

export default ProtectedRoutes;
