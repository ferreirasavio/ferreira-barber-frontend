import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useState } from "react";
import Button from "../components/Button";
import Title from "../components/Title";

export interface ColumnConfig<T> {
  header: string;
  key: keyof T | string;
  render?: (item: T) => React.ReactNode;
}

interface BaseData {
  id: string | number;
}

type GenericPageProps<T> = {
  data: T[];
  columns: ColumnConfig<T>[];
  title: string;
  isError: boolean;
};

export default function Table<T extends BaseData>({
  data,
  columns,
  title,
  isError,
}: GenericPageProps<T>) {
  const [page, setPage] = useState(0);
  const pageSize = 10;

  const startIndex = page * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedItems = data.slice(startIndex, endIndex);
  const totalPages = Math.ceil(data.length / pageSize);

  if (isError) {
    return (
      <div className="pb-6">
        <Title title={title} />

        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md">
          Algo deu errado
        </div>
      </div>
    );
  }

  if (paginatedItems.length === 0) {
    return <Title title="Não há agendamento" />;
  }

  return (
    <div className="pb-6">
      <Title title={title} />
      <table className="border-collapse border border-slate-400 w-full rounded-md">
        <thead>
          <tr className="bg-slate-100">
            {columns.map((col, index) => (
              <th key={index} className="border border-slate-400 p-2">
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedItems.map((item) => (
            <tr
              key={item.id}
              className="text-center hover:bg-slate-50 transition-colors"
            >
              {columns.map((col, index) => (
                <td key={index} className="border border-slate-400 p-2">
                  {col.render ? col.render(item) : (item as any)[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-end gap-2 mt-4 items-center">
        <span className="text-sm text-slate-600">
          Página {page + 1} de {totalPages || 1}
        </span>
        <Button
          onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
          disabled={page === 0}
        >
          <ChevronLeftIcon size={18} />
        </Button>
        <Button
          onClick={() => setPage((prev) => prev + 1)}
          disabled={page >= totalPages - 1 || totalPages === 0}
        >
          <ChevronRightIcon size={18} />
        </Button>
      </div>
    </div>
  );
}
