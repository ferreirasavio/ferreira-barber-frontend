import { ComponentProps } from "react";

export type ButtonProps = ComponentProps<"button"> & {
    onClick?: () => void;
    children?: React.ReactNode; // ReactNode é mais completo para children
    disabled?: boolean;
};