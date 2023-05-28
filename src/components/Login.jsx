import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../store/context";
import useFetch from "../lib/useFetch";
import Cookies from "js-cookie";
import { useSnackbar } from "notistack";

const Login = () => {
  const { user, dispatch } = useContext(AuthContext);
  const { enqueueSnackbar } = useSnackbar();

  const navigate = useNavigate();
  const [userInput, setUserInput] = useState({
    email: "",
    password: "",
  });
  const { executeFetch: login, loading, data, error } = useFetch("login");

  useEffect(() => {
    const userInfo = Cookies.get("user");
    if(userInfo) dispatch({ type: "AUTHENTICATE USER", payload: JSON.parse(userInfo) });
  }, [data]);

  useEffect(() => {
    if (user.isAuthenticated) navigate("/");
  }, [user]);

  useEffect(() => {
    if (error) enqueueSnackbar(error.message, { variant: "error" });
  }, [error]);

  const loginUser = async (e) => {
    e.preventDefault();
    await login({
      method: "POST",
      body: userInput,
    });

    return;
  };

  const handleInputChange = (e) => {
    setUserInput({
      ...userInput,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form onSubmit={loginUser} className="login">
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={userInput.email}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <label>
        Password:
        <input
          type="password"
          name="password"
          value={userInput.password}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <p>Don't have an account? <Link to={'/signup'}>Signup</Link></p>
      <button type="submit" > {loading ? "loading..." : "login"} </button>
    </form>
  );
};

export default Login;
