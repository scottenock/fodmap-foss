import { useNavigate } from "react-router-dom";
import { useTriggerFoods } from "../hooks/useTriggerFoods";
import leftArrow from "../icons/arrow-left-solid.svg";

function TriggerFoods() {
  const navigate = useNavigate();
  const triggers = useTriggerFoods();

  return (
    <div>
      <nav className="px-4 py-3 bg-green-400 flex items-center gap-3">
        <button onClick={() => navigate(-1)} aria-label="Go back">
          <img src={leftArrow} className="w-5 h-5" alt="" />
        </button>
        <p className="text-white font-semibold">Trigger Foods</p>
      </nav>

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
  );
}

export default TriggerFoods;
