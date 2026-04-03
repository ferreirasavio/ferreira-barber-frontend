import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Card from "../components/Card";
import Input from "../components/Input";
import api from "../services/api";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleRegister() {
    if (!name || !email || !password) {
      return alert("Todos os campos precisam ser preenchidos!");
    }
    setLoading(true);
    try {
      const response = await api.post("/signup", {
        name,
        email,
        password,
      });
      if (!response.data) {
        return alert("Algo deu errado no cadastro.");
      } else navigate("/signin");
    } catch (error: any) {
      const message =
        error.response?.data?.error || "Erro ao conectar com o servidor.";
      alert(message);
    } finally {
      setLoading(false);
    }
  }
  return (
    <Card>
      <Input
        title="Nome"
        placeholder="Digite seu nome"
        type="text"
        value={name}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setName(e.target.value)
        }
      />
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
        type="text"
        value={password}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setPassword(e.target.value)
        }
      />
      <Button onClick={handleRegister} disabled={loading}>
        {loading ? "Carregando..." : "Criar"}
      </Button>
    </Card>
  );
}
