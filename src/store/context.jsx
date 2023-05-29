import React, { useReducer} from "react";
import Proptypes from 'prop-types';
import { todoReducer, userReducer } from "./reducer";


export const AuthContext = React.createContext();
export const TodoContext = React.createContext();

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

  return (
    <AuthContext.Provider value={{ user, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};


TodoProvider.propTypes = {
  children: Proptypes.node,
};

AuthProvider.propTypes = {
  children: Proptypes.node,
};