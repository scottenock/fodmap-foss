type SearchInputProps = {
  value: string;
  onChange: (value: string) => void;
};

const SearchInput: React.FC<SearchInputProps> = ({ value, onChange }) => {
  return (
    <input
      placeholder="search..."
      className="appearance-none text-lg border-2 placeholder:text-white bg-green-400 border-green-300 rounded-full w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:text-black text-white focus:border-white"
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default SearchInput;
