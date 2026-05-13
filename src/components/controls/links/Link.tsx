import type { ReactNode } from "react";
import { NavLink, useMatch } from "react-router-dom";

type LinkProps = {
  children: ReactNode;
  to: string;
  match?: string;
};

export const Link = ({ children, to, match }: LinkProps) => {
  const matchResult = useMatch({ path: match || "" });
  const isMatched = !!match && !!matchResult;

  return (
    <NavLink
      className={({ isActive }) =>
        `flex items-center rounded-sm px-4 py-2 transition-all duration-200 ${
          isActive || isMatched
            ? "scale-105 bg-cyan-600 text-white shadow-lg"
            : "bg-fuchsia-800 text-fuchsia-200 hover:bg-fuchsia-600 hover:text-white"
        }`
      }
      replace
      to={to}
    >
      {children}
    </NavLink>
  );
};
