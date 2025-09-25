import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./assets/route/PrivateRoute";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Dashboard />, // Default route to dashboard
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/dashboard',
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
  },
]);

export default router;
