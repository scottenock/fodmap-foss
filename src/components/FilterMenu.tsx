import PillButton from "./PillButton";

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
  { label: "A-Z",        value: "a-z" },
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
    <div className="relative z-20 bg-white dark:bg-gray-800 shadow-bottom border-b border-gray-200 dark:border-gray-700">
      <div className="p-3 border-b border-gray-100 dark:border-gray-700">
        <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500 mb-2">
          Favorites
        </p>
        <PillButton
          active={showFavoritesOnly}
          onClick={onToggleFavoritesOnly}
          className="flex items-center gap-1.5 py-1 px-3"
        >
          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
          </svg>
          Favorites only
        </PillButton>
      </div>

      <div className="p-3 border-b border-gray-100 dark:border-gray-700">
        <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500 mb-2">
          Sort
        </p>
        <div className="flex gap-2">
          {sortOptions.map(({ label, value }) => (
            <PillButton
              key={value}
              active={sortOrder === value}
              onClick={() => onSortChange(value)}
              className="flex-1 py-1 px-2"
            >
              {label}
            </PillButton>
          ))}
        </div>
      </div>

      <div className="p-3">
        <div className="flex justify-between items-center mb-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500">
            Category
          </p>
          {selectedCategories.length > 0 && (
            <button
              onClick={onClearCategories}
              className="text-xs text-green-600 dark:text-green-400 font-medium"
            >
              Clear all
            </button>
          )}
        </div>
        <div className="grid grid-cols-3 gap-2">
          {categories.map((category) => (
            <PillButton
              key={category}
              active={selectedCategories.includes(category)}
              onClick={() => onCategoryToggle(category)}
              className="py-1 px-3"
            >
              {category}
            </PillButton>
          ))}
        </div>
      </div>
    </div>
  </>
);

export default FilterMenu;
