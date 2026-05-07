import NavBar from "../components/NavBar";
import { useTriggerFoods } from "../hooks/useTriggerFoods";

function TriggerFoods() {
  const triggers = useTriggerFoods();

  return (
    <div>
      <NavBar goesHome={false} title="Trigger Foods" />
      <div className="mx-3 mt-3 bg-white rounded-xl border border-gray-100 overflow-hidden">
        <ul>
          {triggers.map((c, i) => (
            <li
              key={c.foodId}
              className={`flex items-center justify-between px-4 py-3 ${i < triggers.length - 1 ? "border-b border-gray-100" : ""}`}
            >
              <div>
                <p className="text-sm font-medium text-gray-800">{c.name}</p>
                <p className="text-xs text-gray-400">{c.category}</p>
              </div>
              <span className="text-xs text-gray-400 shrink-0">{c.count}×</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TriggerFoods;
