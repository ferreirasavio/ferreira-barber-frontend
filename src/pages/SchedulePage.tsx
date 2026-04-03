import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useEffect, useState } from "react";
import Button from "../components/Button";
import Title from "../components/Title";
import api from "../services/api";
type SchedulesProps = {
  id: string;
  name: string;
  phone: string;
  scheduled_at: string;
  type_cut: "cabelo" | "barba" | "cabelo e barba";
};
export default function SchedulePage() {
  const [loading, setLoading] = useState(false);
  const [schedules, setSchedules] = useState<SchedulesProps[]>([]);

  const [page, setPage] = useState(0);
  const pageSize = 10;
  // Cálculo do índice inicial e final
  const startIndex = page * pageSize;
  const endIndex = startIndex + pageSize;

  // O array que você vai usar no seu .map()
  const paginatedItems = schedules.slice(startIndex, endIndex);

  // Total de páginas (importante para os botões)
  const totalPages = Math.ceil(schedules.length / pageSize);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await api.get("/schedules");
        if (response.data.status !== 200) {
          throw new Error("Erro ao buscar os dados");
        }
        setSchedules(response.data.data);
      } catch (error) {
        alert("Ih, algo deu errado.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return loading ? (
    <Title title="Horários agendados" />
  ) : (
    <div className="p-6">
      <Title title="Horários agendados" />
      <table className="border-collapse border border-slate-400 w-full rounded-md">
        <thead>
          <tr>
            <th className="border border-slate-400">Id</th>
            <th className="border border-slate-400">Nome</th>
            <th className="border border-slate-400">Celular</th>
            <th className="border border-slate-400">Horário</th>
            <th className="border border-slate-400">Tipo de corte</th>
          </tr>
        </thead>
        <tbody>
          {paginatedItems.map((item) => (
            <tr key={item.id} className="text-center">
              <td className="border border-slate-400">{item.id}</td>
              <td className="border border-slate-400">{item.name}</td>
              <td className="border border-slate-400">{item.phone}</td>
              <td className="border border-slate-400">{item.scheduled_at}</td>
              <td className="border border-slate-400">{item.type_cut}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-end">
        <Button
          onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
          disabled={page === 0}
        >
          <ChevronLeftIcon />
        </Button>
        <Button
          onClick={() => setPage((prev) => prev + 1)}
          disabled={page >= totalPages - 1}
        >
          <ChevronRightIcon />
        </Button>
      </div>
    </div>
  );
}
