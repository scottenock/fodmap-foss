import NavBar from "../components/NavBar";
import { useTriggerFoods } from "../hooks/useTriggerFoods";

function TriggerFoods() {
  const triggers = useTriggerFoods();

  return (
    <div>
      <NavBar goesHome={false} title="Trigger Foods" />
      <div className="mx-3 mt-3 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
        <ul>
          {triggers.map((c, i) => (
            <li
              key={c.foodId}
              className={`flex items-center justify-between px-4 py-3 ${i < triggers.length - 1 ? "border-b border-gray-100 dark:border-gray-700" : ""}`}
            >
              <div>
                <p className="text-sm font-medium text-gray-800 dark:text-gray-100">{c.name}</p>
                <p className="text-xs text-gray-400 dark:text-gray-500">{c.category}</p>
              </div>
              <span className="text-xs text-gray-400 dark:text-gray-500 shrink-0">{c.count}×</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TriggerFoods;
