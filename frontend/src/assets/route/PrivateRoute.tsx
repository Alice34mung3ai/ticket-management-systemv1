import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

interface PrivateRouteProps {
  children: ReactNode;
  requiredRole?: string; // Optional: for role-based access
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, requiredRole }) => {
  const { user } = useAuth();


  

  // Redirect to login if user is not authenticated
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  // If a requiredRole is specified, check if the user has that role
  if (requiredRole && user !== requiredRole) {
    return <Navigate to="/unauthorized" replace />;
  }

 

  // If authenticated (and role matches if required), render children
  return <>{children}</>;
}

export default PrivateRoute;