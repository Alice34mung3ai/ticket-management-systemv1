import { createBrowserRouter } from "react-router-dom";
import App from "../../App";
import Login from "../../pages/Login";
import Register from "../../pages/Register";
import Dashboard from "../../pages/Dashboard";
import PrivateRoute from "./PrivateRoute";
import ForgotPassword from "../../pages/ForgotPassword";
import ResetPassword from "../../pages/resetPassword";



const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      {path: "forgot-password", element: <ForgotPassword />},
      {path : "reset-password", element: <ResetPassword />},
      {
        path: "dashboard",
        element: (
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;

