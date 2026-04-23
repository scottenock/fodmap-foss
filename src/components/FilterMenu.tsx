type FilterMenuProps = {
  sortOrder: string;
  onSortChange: (order: string) => void;
  showFavoritesOnly: boolean;
  onToggleFavoritesOnly: () => void;
  categories: string[];
  selectedCategories: string[];
  onCategoryToggle: (category: string) => void;
  onClearCategories: () => void;
  onClose: () => void;
};

const sortOptions = [
  { label: "Low → High", value: "l-h" },
  { label: "A-Z", value: "a-z" },
  { label: "High → Low", value: "h-l" },
];

const FilterMenu: React.FC<FilterMenuProps> = ({
  sortOrder,
  onSortChange,
  showFavoritesOnly,
  onToggleFavoritesOnly,
  categories,
  selectedCategories,
  onCategoryToggle,
  onClearCategories,
  onClose,
}) => (
  <>
    <div className="fixed inset-0 z-10" onClick={onClose} />
    <div className="relative z-20 bg-white shadow-bottom border-b border-gray-200">
      <label className="flex items-center gap-3 px-3 py-2.5 border-b border-gray-100 cursor-pointer">
        <input
          type="checkbox"
          checked={showFavoritesOnly}
          onChange={onToggleFavoritesOnly}
          className="accent-green-400 w-4 h-4"
        />
        <span className="text-sm font-medium">Favorites only</span>
        <svg
          className="w-4 h-4 text-yellow-400 ml-auto"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      </label>
      <div className="p-3 border-b border-gray-100">
        <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-2">
          Sort
        </p>
        <div className="flex gap-2">
          {sortOptions.map(({ label, value }) => (
            <button
              key={value}
              onClick={() => onSortChange(value)}
              className={`flex-1 py-1 px-2 rounded text-sm border transition-colors ${
                sortOrder === value
                  ? "bg-green-400 text-white border-green-400"
                  : "bg-white text-gray-700 border-gray-300"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
      <div className="p-3 max-h-60 overflow-y-auto">
        <div className="flex justify-between items-center mb-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
            Category
          </p>
          {selectedCategories.length > 0 && (
            <button
              onClick={onClearCategories}
              className="text-xs text-green-600 font-medium"
            >
              Clear all
            </button>
          )}
        </div>
        {categories.map((category) => (
          <label
            key={category}
            className="flex items-center gap-3 py-1.5 cursor-pointer"
          >
            <input
              type="checkbox"
              checked={selectedCategories.includes(category)}
              onChange={() => onCategoryToggle(category)}
              className="accent-green-400 w-4 h-4"
            />
            <span className="text-sm">{category}</span>
          </label>
        ))}
      </div>
    </div>
  </>
);

export default FilterMenu;
