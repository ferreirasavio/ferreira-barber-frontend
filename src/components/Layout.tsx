// src/components/Layout.tsx
import { LogOut } from "lucide-react"; // Opcional: ícone legal
import { Outlet, useNavigate } from "react-router-dom";
import api from "../services/api";
import { Breadcrumbs } from "./Breadcrumb";

export function Layout() {
  const navigate = useNavigate();

  const handleSignout = () => {
    localStorage.removeItem("@App:token");
    localStorage.removeItem("@App:role");
    localStorage.removeItem("@App:userId");
    delete api.defaults.headers.Authorization;

    window.location.href = "/signin";
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-slate-800 text-white p-4 flex justify-between items-center shadow-md">
        <h1
          className="font-bold text-xl cursor-pointer"
          onClick={() => navigate("/")}
        >
          Ferreira Barber
        </h1>
        <button
          onClick={handleSignout}
          className="flex items-center gap-2 bg-red-500 hover:bg-red-600 px-4 py-2 rounded transition-colors"
        >
          <LogOut size={18} />
          Sair
        </button>
      </header>

      <main className="flex-1 w-full px-6 py-4">
        <Breadcrumbs />
        <Outlet />
      </main>
    </div>
  );
}
