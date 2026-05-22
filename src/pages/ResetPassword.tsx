import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Button from "../components/Button";
import Card from "../components/Card";
import Input from "../components/Input";
import api from "../services/api";

export default function ResetPassword() {
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") || "";

  const onChangePassword = async () => {
    if (!code || !newPassword) return alert("Preencha todos os campos!");
    if (!token)
      return alert("Token de recuperação ausente. Solicite um novo e-mail.");

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

  return (
    <Card>
      <p className="text-base text-slate-400 text-start">
        Insira o código de 6 dígitos enviado ao seu e-mail e sua nova senha
        abaixo.
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
        {loading ? "Carregando..." : "Redefinir Senha"}
      </Button>
    </Card>
  );
}
