import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export type PrivateRouteProps = {
  children: JSX.Element;
};

function PrivateRoute({ children }: PrivateRouteProps) {
  const { user } = useAuth();

  return user ? children : <Navigate to="/login" />;
}

export default PrivateRoute;
