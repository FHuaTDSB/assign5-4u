import type { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  variant?: "primary" | "secondary" | "red";
  disabled?: boolean;
  onClick: () => void;
};

const baseStyles = "px-4 py-2 text-sm rounded-sm transition font-medium disabled:opacity-50 disabled:cursor-not-allowed";

const variants = {
  primary: "bg-cyan-600 hover:bg-cyan-500 text-white",
  red: "bg-indigo-800 text-white",
  secondary: "bg-fuchsia-800 hover:bg-fuchsia-600 text-white",
};

export const Button = ({ children, variant = "primary", disabled = false, onClick }: ButtonProps) => {
  return (
    <button className={`${baseStyles} ${variants[variant]}`} disabled={disabled} onClick={onClick} type="button">
      {children}
    </button>
  );
};
