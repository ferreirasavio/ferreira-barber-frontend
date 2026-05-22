import { useState } from "react";
// 1. IMPORTADO O 'useSearchParams' AQUI
import { useNavigate, useSearchParams } from "react-router-dom";
import Button from "../components/Button";
import Card from "../components/Card";
import Input from "../components/Input";
import api from "../services/api";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") || "";

  const [showResetForm, setShowResetForm] = useState(!!token);

  const onSendToken = async () => {
    if (!email) return alert("Preencha o campo!");
    setLoading(true);
    try {
      const response = await api.post("/requestToken", { email });
      if (!response.data) {
        alert("Algo deu errado");
        return;
      }
      setShowResetForm(true);
    } catch (error) {
      console.log(error);
      alert("Erro ao solicitar código.");
    } finally {
      setLoading(false);
    }
  };

  const onChangePassword = async () => {
    if (!code || !newPassword) return alert("Preencha todos os campos!");
    setLoading(true);
    try {
      await api.post("/resetPassword", {
        token,
        code,
        newPassword,
      });

      alert("Senha alterada com sucesso!");
      navigate("/signin");
    } catch (error: any) {
      console.log(error);
      alert(error.response?.data?.error || "Algo deu errado");
    } finally {
      setLoading(false);
    }
  };

  return !showResetForm ? (
    <Card>
      <p className="text-base text-slate-400 text-start">
        Insira o e-mail que precisa receber o código para resetar sua senha.
      </p>
      <Input
        type="email"
        title="E-mail"
        placeholder="Digite seu e-mail"
        value={email}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setEmail(e.target.value)
        }
      />
      <Button disabled={loading} onClick={onSendToken}>
        {loading ? "Carregando..." : "Enviar"}
      </Button>
    </Card>
  ) : (
    <Card>
      <p className="text-base text-slate-400 text-start">
        Insira o código e sua nova senha
      </p>
      <Input
        type="text"
        title="Código"
        placeholder="Digite o código"
        value={code}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setCode(e.target.value)
        }
      />
      <Input
        type="password"
        title="Nova senha"
        placeholder="Digite a nova senha"
        value={newPassword}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setNewPassword(e.target.value)
        }
      />
      <Button disabled={loading} onClick={onChangePassword}>
        {loading ? "Carregando..." : "Enviar"}
      </Button>
    </Card>
  );
}
