import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Card from "../components/Card";
import Input from "../components/Input";
import api from "../services/api";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) return alert("Preencha tudo!");
    setLoading(true);

    try {
      const response = await api.post("/signin", { email, password });
      const { status, error, data } = response.data;

      if (status !== 200 || error) {
        alert("Erro ao realizar login");
        return;
      }

      if (data.token) {
        localStorage.setItem("@App:token", data.token);
        localStorage.setItem("@App:role", data.user.role);
        localStorage.setItem("@App:userId", data.user.userId);

        api.defaults.headers.Authorization = `Bearer ${data.token}`;

        if (data.user.role === "admin") {
          navigate("/schedules", { replace: true });
        } else {
          navigate("/my-schedules", { replace: true });
        }
      }
    } catch (error) {
      alert("Erro ao conectar.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <Card>
      <Input
        title="E-mail"
        placeholder="Digite seu e-mail"
        type="text"
        value={email}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setEmail(e.target.value)
        }
      />
      <Input
        title="Senha"
        placeholder="Digite sua senha"
        type="password"
        value={password}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setPassword(e.target.value)
        }
      />
      <Button onClick={handleLogin} disabled={loading}>
        {loading ? "Carregando..." : "Entrar"}
      </Button>
      <div className="flex flex-col items-end ">
        <p className="text-sm text-slate-700">
          <a href="/forgot-password">Esqueci minha senha</a>
        </p>
        <p className="text-sm text-slate-700">
          <a href="/signup">Registrar-me</a>
        </p>
      </div>
    </Card>
  );
}
