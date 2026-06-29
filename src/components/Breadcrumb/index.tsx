import { ChevronRight, Home } from "lucide-react";
import { Link, useMatches } from "react-router-dom";
import { RouteMatch } from "./types";

export const Breadcrumbs = () => {
  const matches = useMatches() as RouteMatch[];

  // Filtramos apenas as rotas que possuem a propriedade 'crumb' definida no handle
  const crumbs = matches.filter((match) => match.handle?.crumb);

  if (crumbs.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className="mb-4">
      <ol className="flex items-center gap-2 text-sm text-slate-500 font-medium">
        <li className="flex items-center gap-2">
          <Link
            to="/"
            className="hover:text-slate-800 transition-colors flex items-center gap-1"
          >
            <Home size={16} />
            <span className="sr-only">Início</span>
          </Link>
        </li>

        {crumbs.map((crumb, index) => {
          const isLast = index === crumbs.length - 1;

          return (
            <li key={crumb.pathname} className="flex items-center gap-2">
              <ChevronRight size={14} className="text-slate-400" />

              {isLast ? (
                <span className="text-slate-800 font-semibold">
                  {crumb.handle?.crumb}
                </span>
              ) : (
                <Link
                  to={crumb.pathname}
                  className="hover:text-slate-800 transition-colors"
                >
                  {crumb.handle?.crumb}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
