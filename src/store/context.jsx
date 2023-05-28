import react, { useReducer, useEffect } from "react";
import useFetch from "../lib/useFetch";
import { todoReducer, userReducer } from "./reducer";
import Cookies from "js-cookie";

export const AuthContext = react.createContext();
export const TodoContext = react.createContext();

export const TodoProvider = ({ children }) => {
  const [todos, dispatch] = useReducer(todoReducer, []);

  return (
    <TodoContext.Provider
      value={{
        todos,
        dispatch,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export const AuthProvider = ({ children }) => {
  const [user, dispatch] = useReducer(userReducer, {
    isAuthenticated: false,
    user: null,
  });

  useEffect(() => {
    getUser();
  }, []);

  const getUser = () => {
    const data = Cookies.get("user");
    if (data) {
      dispatch({ type: "AUTHENTICATE USER", payload: JSON.parse(data) });
    }
  };

  return (
    <AuthContext.Provider value={{ user, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
