import { jwtDecode } from "jwt-decode";
import { Navigate, Outlet } from "react-router-dom";

interface PrivateRouteProps {
  allowedRoles?: string[];
}

export const PrivateRoute = ({ allowedRoles }: PrivateRouteProps) => {
  const token = localStorage.getItem("@App:token");

  if (!token) {
    return <Navigate to="/signin" replace />;
  }

  // Se a rota pedir roles específicas (ex: admin)
  if (allowedRoles) {
    try {
      const decoded: any = jwtDecode(token);
      const userRole = decoded.role;

      if (!allowedRoles.includes(userRole)) {
        return <Navigate to="/" replace />;
      }
    } catch (error) {
      return <Navigate to="/signin" replace />;
    }
  }

  return <Outlet />;
};
