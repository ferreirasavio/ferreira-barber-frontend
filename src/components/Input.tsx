import { Eye, EyeOff } from "lucide-react"; // Sugestão de biblioteca de ícones
import { InputHTMLAttributes, useState } from "react";

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
  const [showPassword, setShowPassword] = useState(false);

  const baseStyle =
    "w-full border border-gray-300 px-2 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500";

  const isPassword = type === "password";
  const inputTypeFinal = isPassword
    ? showPassword
      ? "text"
      : "password"
    : type;

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
        <div className="relative w-full">
          <input
            type={inputTypeFinal}
            className={`${baseStyle} ${isPassword ? "pr-10" : ""}`}
            {...(props as any)}
          />

          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
