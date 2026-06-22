import { InputHTMLAttributes } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    title?: string;
    inputType?: "select" | "other";
    listOptions?: string[];
}