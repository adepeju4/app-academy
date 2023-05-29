import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "../store/context";
import useFetch from "../lib/useFetch";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const navigate = useNavigate();
  const { user, dispatch } = useContext(AuthContext);
  const { dispatch: dispatchLogout } = useContext(AuthContext);
  const { executeFetch: logout } = useFetch("logout");
  const { executeFetch,  error, data } = useFetch("verify/token");
  const [authenticated, setAuthenticated] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const handleLogout = async () => {
    await logout({ method: "POST" });
    dispatchLogout({ type: "LOGOUT USER" });
  };

  useEffect(() => {
    executeFetch();
  }, []);

  useEffect(() => {
    if (data) {
      dispatch({ type: "AUTHENTICATE USER", payload: data });
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      if (error.status === 401) {
        if(error.message !== "No authorization is set"){
          enqueueSnackbar("Session expired, please log back in", {
            variant: "error",
          });
        }
        (async () => {
          await handleLogout();
          navigate("/login");
        })();
      } else {
        enqueueSnackbar("Something unexpected happened, please try again", {
          variant: "error",
        });
      }
      setAuthenticated(false);
    }
  }, [error]);


  useEffect(() => {
      if(user && user.isAuthenticated){
        setAuthenticated(true);
      }
  }, [user])

  return !authenticated ? <p>loading...</p> : children;
}

PrivateRoute.propTypes = {
  children: PropTypes.node,
};

export default PrivateRoute;
