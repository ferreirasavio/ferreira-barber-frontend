import {
  ChevronLeftIcon,
  ChevronRightIcon,
  Pencil,
  Trash2,
} from "lucide-react"; // Adicionados ícones de ação
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
  onEditItem?: (id: string | number) => void;
  onDeleteItem?: (id: string | number) => void;
};

export default function Table<T extends BaseData>({
  data,
  columns,
  title,
  isError,
  onEditItem,
  onDeleteItem,
}: GenericPageProps<T>) {
  const [page, setPage] = useState(0);
  const pageSize = 10;

  const startIndex = page * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedItems = data.slice(startIndex, endIndex);
  const totalPages = Math.ceil(data.length / pageSize);

  // Verifica se há alguma ação disponível para renderizar a coluna de ações
  const hasActions = !!onEditItem || !!onDeleteItem;

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
    <div className="pb-6 w-full">
      <Title title={title} />

      <div className="w-full overflow-x-auto border border-slate-200 rounded-lg shadow-sm">
        <table className="min-w-full border-collapse bg-white text-left text-sm text-slate-600">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              {columns.map((col, index) => (
                <th
                  key={index}
                  className="px-6 py-4 font-semibold text-slate-700 text-center "
                >
                  {col.header}
                </th>
              ))}
              {hasActions && (
                <th className="px-6 py-4 font-semibold text-slate-700 text-center">
                  Ações
                </th>
              )}
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-200">
            {paginatedItems.map((item) => (
              <tr
                key={item.id}
                className="text-center hover:bg-slate-50/70 transition-colors"
              >
                {columns.map((col, index) => (
                  <td key={index} className="px-6 py-4 whitespace-nowrap">
                    {col.render ? col.render(item) : (item as any)[col.key]}
                  </td>
                ))}

                {hasActions && (
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center justify-center gap-4">
                      {onEditItem && (
                        <button
                          onClick={() => onEditItem(item.id)}
                          className="text-slate-500 hover:text-blue-600 transition-colors"
                          title="Alterar agendamento"
                        >
                          <Pencil size={18} />
                        </button>
                      )}
                      {onDeleteItem && (
                        <button
                          onClick={() => onDeleteItem(item.id)}
                          className="text-slate-500 hover:text-red-600 transition-colors"
                          title="Excluir agendamento"
                        >
                          <Trash2 size={18} />
                        </button>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Paginação */}
      <div className="flex justify-end gap-2 mt-4 items-center">
        <span className="text-sm text-slate-500">
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
