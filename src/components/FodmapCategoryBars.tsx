type CategoryBar = {
  label: string;
  percentage: number;
};

type FodmapCategoryBarsProps = {
  categories: CategoryBar[];
};

const FodmapCategoryBars: React.FC<FodmapCategoryBarsProps> = ({ categories }) => (
  <ul>
    {categories.map((c, i) => (
      <li
        key={c.label}
        className={`px-4 py-3 ${i < categories.length - 1 ? "border-b border-gray-100 dark:border-gray-700" : ""}`}
      >
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-sm font-medium text-gray-800 dark:text-gray-100">{c.label}</span>
          <span className="text-xs text-gray-400 dark:text-gray-500">{c.percentage}%</span>
        </div>
        <div className="h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-green-400 rounded-full"
            style={{ width: `${c.percentage}%` }}
          />
        </div>
      </li>
    ))}
  </ul>
);

export default FodmapCategoryBars;
