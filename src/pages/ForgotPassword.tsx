import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Card from "../components/Card";
import Input from "../components/Input";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState<string>();
  const [newPassword, setNewPassword] = useState<string>();
  const [codeSent, setCodeSent] = useState(false);
  const navigate = useNavigate();

  const NewPassword = () => {
    return (
      <Card>
        <p className="text-base text-slate-400 text-start">
          Insira o código e sua nova senha
        </p>
        <Input
          type="number"
          title="Código"
          placeholder="Digite o código"
          value={code}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setCode(e.target.value)
          }
        />
        <Input
          type="text"
          title="Nova senha"
          placeholder="Digite a nova senha"
          value={newPassword}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setNewPassword(e.target.value)
          }
        />
        <Button onClick={() => navigate("/signin")}>Enviar</Button>
      </Card>
    );
  };
  return !codeSent ? (
    <Card>
      <p className="text-base text-slate-400 text-start">
        Insira o e-mail que precisa receber o código de para resetar sua senha.
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
      <Button onClick={() => setCodeSent(!codeSent)}>Enviar</Button>
    </Card>
  ) : (
    <NewPassword />
  );
}
