import type { ReactNode } from "react";

type DetailItemProps = {
  label: string;
  icon?: ReactNode;
  value: string | number;
};

export const DetailItem = ({ label, icon, value }: DetailItemProps) => {
  return (
    <div className="flex items-center gap-2 rounded-lg bg-blue-800/60 p-3">
      {icon}
      <div>
        <p className="text-blue-300 text-xs">{label}</p>
        <p className="font-semibold text-sm">{value}</p>
      </div>
    </div>
  );
};
