import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../store/context";
import { useNavigate } from "react-router-dom";
import useFetch from "../lib/useFetch";
import { useSnackbar } from "notistack";

const Logout = () => {
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);
  const { enqueueSnackbar } = useSnackbar();
  const [loggedOut, setLoggedOut] = useState(false);
  const { executeFetch: logout, loading, data, error } = useFetch("logout");

  const errorMessage = "Something unexpected happened, please try again.";

  useEffect(() => {
    if (loggedOut) {
      dispatch({ type: "LOGOUT USER" });
      navigate("/login");
      setLoggedOut(false);
    }
  }, [loggedOut]);

  useEffect(() => {
    if (data) setLoggedOut(true);
  }, [data]);

  useEffect(() => {
    if (error) {
      enqueueSnackbar(errorMessage, { variant: "error" });
    }
  }, [error]);

  const handleLogout = async () => {
    await logout({ method: "POST" });
  };

  return (
    <div className="logout">
      <button onClick={handleLogout}>
        {loading ? "Logging out..." : "Log Out"}
      </button>
    </div>
  );
};

export default Logout;
