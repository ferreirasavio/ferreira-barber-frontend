import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  title?: string;
  inputType?: "select" | "other";
  listOptions?: string[];
}

export default function Input({
  title,
  type = "text",
  inputType = "other",
  listOptions = [],
  ...props
}: InputProps) {
  const baseStyle =
    "w-full border border-gray-300 px-2 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500";

  return (
    <div className="w-full flex flex-col gap-1">
      {title && (
        <label className="text-sm font-medium text-gray-700">{title}</label>
      )}

      {inputType === "select" ? (
        <select className={baseStyle} {...(props as any)}>
          <option value="" hidden disabled>
            Selecione uma opção
          </option>
          {listOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input type={type} className={baseStyle} {...(props as any)} />
      )}
    </div>
  );
}
