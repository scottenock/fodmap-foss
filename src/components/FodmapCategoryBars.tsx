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
        className={`px-4 py-3 ${i < categories.length - 1 ? "border-b border-divider" : ""}`}
      >
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-sm font-medium text-foreground-primary">{c.label}</span>
          <span className="text-xs text-foreground-muted">{c.percentage}%</span>
        </div>
        <div className="h-1.5 bg-background-tertiary rounded-full overflow-hidden">
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
