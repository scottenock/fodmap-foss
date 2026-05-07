type SearchInputProps = {
  value: string;
  onChange: (value: string) => void;
  autoFocus?: boolean;
};

const SearchInput: React.FC<SearchInputProps> = ({ value, onChange, autoFocus = false }) => (
  <input
    placeholder="Search..."
    className="appearance-none text-base border-2 placeholder:text-green-200 bg-green-400 border-green-300 rounded-full w-full py-2 px-4 text-white leading-tight focus:outline-none focus:bg-background-primary focus:text-foreground-primary focus:placeholder:text-foreground-muted focus:border-transparent transition-colors"
    type="text"
    value={value}
    onChange={(e) => onChange(e.target.value)}
    autoFocus={autoFocus}
  />
);

export default SearchInput;
