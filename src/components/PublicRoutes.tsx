// PublicRoute.tsx
import { jwtDecode } from "jwt-decode";
import { Navigate, Outlet } from "react-router-dom";

export const PublicRoute = () => {
  const token = localStorage.getItem("@App:token");

  if (token) {
    try {
      const decoded: any = jwtDecode(token);
      const userRole = decoded.role;

      return (
        <Navigate
          to={userRole === "admin" ? "/schedules" : "/my-schedules"}
          replace
        />
      );
    } catch (error) {
      localStorage.removeItem("@App:token");
    }
  }

  return <Outlet />;
};
