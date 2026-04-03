import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  title?: string;
}

export default function Input({ title, type = "text", ...props }: InputProps) {
  return (
    <div>
      {title && (
        <label className="text-sm font-medium text-gray-700">{title}</label>
      )}
      <div className="w-full flex flex-col gap-1">
        <input
          type={type}
          className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          {...props}
        />
      </div>
    </div>
  );
}
