import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Card from "../components/Card";
import Input from "../components/Input";
import Title from "../components/Title";
import api from "../services/api";

const TIME_OPTIONS = [
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
];

export default function CreateSchedule() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();
  const role = localStorage.getItem("@App:role");

  const editData = location.state?.scheduleData;
  const isEditing = !!editData;

  const getInitialDateTime = () => {
    if (isEditing && editData?.scheduled_at) {
      const [savedDate, savedTime] = editData.scheduled_at.split("T");
      return {
        date: savedDate,
        time: savedTime.slice(0, 5), // Ex: "08:30"
      };
    }
    return {
      date: new Date().toISOString().split("T")[0],
      time: "",
    };
  };

  const initialDateTime = getInitialDateTime();

  const [name, setName] = useState(editData?.name || "");
  const [phone, setPhone] = useState(editData?.phone || "");
  const [date, setDate] = useState(
    initialDateTime.date || new Date().toISOString().split("T")[0],
  );
  const [time, setTime] = useState(initialDateTime.time);
  const [typeCut, setTypeCut] = useState(editData?.type_cut || "");

  const availableTimes = useMemo(() => {
    const today = new Date().toISOString().split("T")[0];
    if (date !== today) return TIME_OPTIONS;

    const now = new Date();
    const currentHour = now.getHours();
    const currentMinutes = now.getMinutes();

    return TIME_OPTIONS.filter((t) => {
      const [h, m] = t.split(":").map(Number);
      return h > currentHour || (h === currentHour && m > currentMinutes);
    });
  }, [date]);

  const scheduleMutation = useMutation({
    mutationFn: async () => {
      const validationDate = new Date(`${date}T${time}:00`);
      if (validationDate.getTime() < Date.now() && !isEditing) {
        throw new Error("Você não pode escolher um horário que já passou.");
      }

      const formattedIsoDate = `${date}T${time}:00`;
      const payload = {
        name,
        phone,
        scheduled_at: formattedIsoDate,
        type_cut: typeCut.toLowerCase(),
      };

      if (isEditing) {
        return await api.put(`/schedules/${editData.id}`, payload);
      } else {
        return await api.post("/schedules", payload);
      }
    },
    onSuccess: (response) => {
      if (response.data?.status !== 201 && response.status !== 200) {
        alert("Erro ao salvar o agendamento");
        return;
      }

      queryClient.invalidateQueries({ queryKey: ["schedules"] });
      queryClient.invalidateQueries({ queryKey: ["my-schedules"] });
      alert(isEditing ? "Agendamento atualizado!" : "Agendamento realizado!");
      role !== "admin" ? navigate("/my-schedules") : navigate("/schedules");
    },
    onError: (error: any) => {
      alert(error.message || "Erro de conexão com o servidor.");
    },
  });

  const handleSaveSchedule = () => {
    if (!name || !phone || !date || !time || !typeCut) {
      return alert("Todos campos precisam ser preenchidos");
    }
    scheduleMutation.mutate();
  };

  return (
    <Card>
      <Title
        title={isEditing ? "Alterar agendamento" : "Faça seu agendamento"}
      />
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
        title="Data"
        type="date"
        value={date}
        min={new Date().toISOString().split("T")[0]}
        onChange={(e) => setDate(e.target.value)}
      />

      <Input
        title="Horário"
        inputType="select"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        listOptions={["", ...availableTimes]}
      />

      <Input
        title="Tipo de corte"
        placeholder="Selecione uma opção"
        value={typeCut}
        onChange={(e) => setTypeCut(e.target.value)}
        inputType="select"
        listOptions={["Barba", "Cabelo", "Cabelo e Barba"]}
      />

      <Button
        disabled={scheduleMutation.isPending}
        onClick={handleSaveSchedule}
      >
        {scheduleMutation.isPending
          ? "Salvando..."
          : isEditing
            ? "Atualizar"
            : "Salvar"}
      </Button>
    </Card>
  );
}
