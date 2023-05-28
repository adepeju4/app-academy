import React, { useContext } from "react";
import { AuthContext } from "../store/context";
import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const { user } = useContext(AuthContext);

  return user.isAuthenticated ? children : <Navigate to="/signup" />
}

export default PrivateRoute;
