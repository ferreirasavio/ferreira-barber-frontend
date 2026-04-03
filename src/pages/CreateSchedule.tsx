import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Card from "../components/Card";
import Input from "../components/Input";
import Title from "../components/Title";
import api from "../services/api";

export default function () {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [hourly, setHourly] = useState("");
  const [typeCut, setTypeCut] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleCreateSchedule = async () => {
    try {
      setLoading(true);
      if (!name || !phone || !hourly || !typeCut) {
        return alert("Todos campos precisam ser preenchidos");
      }
      const response = await api.post("/schedules", {
        name,
        phone,
        scheduled_at: hourly,
        type_cut: typeCut,
      });

      if (response.data.status !== 201) {
        return alert("Erro ao tentar agendar horário");
      }
      navigate("/schedules");
    } catch (error) {
      alert("Erro de conexão com o servidor.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <Card>
      <Title title="Faça seu agendamento" />
      <Input
        title="Nome"
        placeholder="Digite seu nome"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        title="Celular"
        placeholder="Digite seu número"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <Input
        title="Horário"
        placeholder="Escolha o horário"
        value={hourly}
        onChange={(e) => setHourly(e.target.value)}
      />
      <Input
        title="Tipo de corte"
        placeholder="Escolha o corte"
        value={typeCut}
        onChange={(e) => setTypeCut(e.target.value)}
      />

      <Button disabled={loading} onClick={handleCreateSchedule}>
        {loading ? "Salvando..." : "Salvar"}
      </Button>
    </Card>
  );
}
