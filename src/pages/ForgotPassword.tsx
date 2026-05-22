import { useState } from "react";
import Button from "../components/Button";
import Card from "../components/Card";
import Input from "../components/Input";
import api from "../services/api";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);

  const onSendToken = async () => {
    if (!email) return alert("Preencha o campo!");
    setLoading(true);
    try {
      await api.post("/requestToken", { email });
      setSuccessMessage(true);
    } catch (error) {
      console.log(error);
      alert("Erro ao solicitar código.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      {!successMessage ? (
        <>
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
            {loading ? "Carregando..." : "Enviar E-mail"}
          </Button>
        </>
      ) : (
        <p className="text-base text-green-400 text-start">
          Verifique sua caixa de entrada! Enviamos um link de redefinição
          contendo o código para <strong>{email}</strong>.
        </p>
      )}
    </Card>
  );
}
