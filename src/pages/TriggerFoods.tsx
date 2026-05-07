import NavBar from "../components/NavBar";
import { useTriggerFoods } from "../hooks/useTriggerFoods";

function TriggerFoods() {
  const triggers = useTriggerFoods();

  return (
    <div>
      <NavBar goesHome={false} title="Trigger Foods" />
      <div className="mx-3 mt-3 bg-background-primary rounded-xl border border-divider overflow-hidden">
        <ul>
          {triggers.map((c, i) => (
            <li
              key={c.foodId}
              className={`flex items-center justify-between px-4 py-3 ${i < triggers.length - 1 ? "border-b border-divider" : ""}`}
            >
              <div>
                <p className="text-sm font-medium text-foreground-primary">{c.name}</p>
                <p className="text-xs text-foreground-muted">{c.category}</p>
              </div>
              <span className="text-xs text-foreground-muted shrink-0">{c.count}×</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TriggerFoods;
