import react from "react";
import SignUp from "./components/Signup";
import Login from "./components/Login";
import AuthLayout from "./components/AuthLayout";
import Todolist from "./components/todolist";
import PrivateRoute from "./components/PrivateRoute";
import { TodoProvider, AuthProvider } from "./store/context";
import { SnackbarProvider } from "notistack";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";

const router = createBrowserRouter([
  {
    path: "/signup",
    element: (
      <AuthLayout>
        <SignUp />
      </AuthLayout>
    ),
  },
  {
    path: "/login",
    element: (
      <AuthLayout>
        <Login />
      </AuthLayout>
    ),
  },
  {
    path: "/",
    element: (
      <PrivateRoute>
        <Todolist />
      </PrivateRoute>
    ),
  },
]);

function App() {
  return (
    <SnackbarProvider>
      <AuthProvider>
        <TodoProvider>
          <RouterProvider router={router} />
        </TodoProvider>
      </AuthProvider>
    </SnackbarProvider>
  );
}

export default App;
