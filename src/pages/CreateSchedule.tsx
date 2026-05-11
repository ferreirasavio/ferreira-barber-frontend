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
  const role = localStorage.getItem("@App:role");

  const handleCreateSchedule = async () => {
    try {
      setLoading(true);
      if (!name || !phone || !hourly || !typeCut) {
        return alert("Todos campos precisam ser preenchidos");
      }

      const isoDate = new Date(hourly).toISOString();
      const response = await api.post("/schedules", {
        name,
        phone,
        scheduled_at: isoDate,
        type_cut: typeCut.toLowerCase(),
      });

      if (response.data.status !== 201) {
        return alert("Erro ao tentar agendar horário");
      }
      if (role !== "admin") navigate("/my-schedules");
      else navigate("/schedules");
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
        type="datetime-local"
      />
      <Input
        title="Tipo de corte"
        placeholder="Selecione uma opção"
        value={typeCut}
        onChange={(e) => setTypeCut(e.target.value)}
        inputType="select"
        listOptions={["Barba", "Cabelo", "Cabelo e Barba"]}
      />

      <Button disabled={loading} onClick={handleCreateSchedule}>
        {loading ? "Salvando..." : "Salvar"}
      </Button>
    </Card>
  );
}
