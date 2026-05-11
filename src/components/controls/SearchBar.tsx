type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
};

export const SearchBar = ({ value, onChange }: SearchBarProps) => {
  return (
    <div className="flex items-center gap-3">
      <input
        className="flex-1 rounded-xl bg-indigo-950 p-2 transition focus:outline-none focus:ring-2 focus:ring-fuchsia-600"
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search..."
        type="search"
        value={value}
      />
    </div>
  );
};
