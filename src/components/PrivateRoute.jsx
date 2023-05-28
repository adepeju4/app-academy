import React, { useContext } from "react";
import PropTypes from 'prop-types';
import { AuthContext } from "../store/context";
import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const { user } = useContext(AuthContext);

  return user.isAuthenticated ? children : <Navigate to="/signup" />
}


PrivateRoute.propTypes = {
  children: PropTypes.node,
};


export default PrivateRoute;
