import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import useFetch from "../lib/useFetch";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../store/context";
import { useSnackbar } from "notistack";
import Cookies from "js-cookie";

const SignUp = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { user, dispatch } = useContext(AuthContext);

  const { executeFetch: register, loading, data, error } = useFetch("register");

  const navigate = useNavigate();
  const [userInput, setUserInput] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  
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

  const handleInputChange = (e) => {
    setUserInput({
      ...userInput,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
      await register({
        method: "POST",
        body: userInput,
      });
  

  };

  return (
    <form onSubmit={handleSubmit} className="signup">
      <label>
        First Name:
        <input
          type="text"
          name="firstName"
          value={userInput.firstName}
          onChange={handleInputChange}
          required
        />
      </label>
      <br />
      <label>
        Last Name:
        <input
          type="text"
          name="lastName"
          value={userInput.lastName}
          onChange={handleInputChange}
          required
        />
      </label>
      <br />
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={userInput.email}
          onChange={handleInputChange}
          required
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
          required
        />
      </label>
      <br />
      <p>Already have an account? <Link to={'/login'}>Login</Link></p>
      <button type="submit" >{loading ? "Signing up" : "Sign Up"}</button>
    </form>
  );
};

export default SignUp;
