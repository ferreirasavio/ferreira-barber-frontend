import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { Layout } from "./components/Layout.tsx";
import { PrivateRoute } from "./components/PrivateRoutes.tsx";
import { PublicRoute } from "./components/PublicRoutes.tsx";
import "./index.css";
import CreateSchedule from "./pages/CreateSchedule.tsx";
import ForgotPassword from "./pages/ForgotPassword.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import RegisterPage from "./pages/RegisterPage.tsx";
import ResetPassword from "./pages/ResetPassword.tsx";
import ScheduleDetailsPage from "./pages/ScheduleDetailsPage.tsx";
import SchedulePage from "./pages/SchedulePage.tsx";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    element: <PublicRoute />,
    children: [
      { path: "/signup", element: <RegisterPage /> },
      { path: "/signin", element: <LoginPage /> },
      { path: "/forgot-password", element: <ForgotPassword /> },
      { path: "/reset-password", element: <ResetPassword /> },
    ],
  },

  // GRUPO PRIVADO (Tudo aqui exige login)
  {
    element: <PrivateRoute />,
    children: [
      {
        element: <Layout />, // Layout comum para User e Admin
        children: [
          // 1. Rota Raiz (Redirecionador)
          {
            path: "/",
            element: (
              <Navigate
                to={
                  localStorage.getItem("@App:role") === "admin"
                    ? "/schedules"
                    : "/my-schedules"
                }
                replace
              />
            ),
          },
          // 2. Rotas de Usuário Comum
          { path: "/create-schedule", element: <CreateSchedule /> },
          { path: "/my-schedules", element: <ScheduleDetailsPage /> },

          // 3. Rotas Restritas de Admin (Ainda dentro do Layout)
          {
            element: <PrivateRoute allowedRoles={["admin"]} />,
            children: [{ path: "/schedules", element: <SchedulePage /> }],
          },
        ],
      },
    ],
  },

  // Rota de 404 Customizada (Evita a tela padrão do Router)
  { path: "*", element: <Navigate to="/" replace /> },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>,
);
