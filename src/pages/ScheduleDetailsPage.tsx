import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Table, { ColumnConfig } from "../components/Table";
import Title from "../components/Title";
import api from "../services/api";
import { formatDateTime } from "../utils/formatDate";
import { formatPhone } from "../utils/formatPhone";

type SchedulesProps = {
  id: string;
  name: string;
  phone: string;
  scheduled_at: string;
  type_cut: "cabelo" | "barba" | "cabelo e barba";
};

export default function ScheduleDetailsPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const userId = localStorage.getItem("@App:userId");

  const {
    data: schedules,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["my-schedules", userId],
    queryFn: async () => {
      const response = await api.get("/my-schedules", {
        params: { userId },
      });
      return response.data.data;
    },
  });

  const myColumns: ColumnConfig<SchedulesProps>[] = [
    { header: "Nome", key: "name" },
    { header: "Telefone", key: "phone", render: (i) => formatPhone(i.phone) },
    {
      header: "Data",
      key: "scheduled_at",
      render: (i) => formatDateTime(i.scheduled_at),
    },
    { header: "Corte", key: "type_cut" },
  ];

  function onCreateSchedule() {
    navigate("/create-schedule");
  }

  const onDeleteSchedule = async (id: string | number) => {
    try {
      const hasConfirmed = window.confirm(
        "Tem certeza que deseja remover esse agendamento?",
      );

      if (!hasConfirmed) return;

      await api.delete(`/schedules/${id}`);
      queryClient.invalidateQueries({ queryKey: ["my-schedules"] });
    } catch (error) {
      console.log(error);
    }
  };

  const onEditSchedule = (id: string | number) => {
    const scheduleToEdit = schedules?.find(
      (item: SchedulesProps) => item.id === id,
    );

    if (scheduleToEdit) {
      navigate("/create-schedule", { state: { scheduleData: scheduleToEdit } });
    }
  };

  return isLoading ? (
    <Title title="Carregando" />
  ) : (
    <>
      <Table
        data={schedules ?? []}
        title="Meus horários agendados"
        columns={myColumns}
        isError={isError}
        onDeleteItem={onDeleteSchedule}
        onEditItem={onEditSchedule}
      />
      <div className="flex flex-col items-end">
        <Button onClick={onCreateSchedule}>Fazer agendamento</Button>
      </div>
    </>
  );
}
