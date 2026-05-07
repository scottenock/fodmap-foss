import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import FodmapCategoryBars from "../components/FodmapCategoryBars";
import { useTriggerFoods } from "../hooks/useTriggerFoods";
import { useFodmapCategoryRanking } from "../hooks/useFodmapCategoryRanking";

function SymptomAnalysis() {
  const triggers = useTriggerFoods();
  const categoryRanking = useFodmapCategoryRanking();
  const top5 = triggers.slice(0, 5);

  const hasData = categoryRanking.some((c) => c.score > 0);

  return (
    <div>
      <NavBar title="Analysis" />
      <div className="p-3 space-y-3">

        <div className="bg-background-primary rounded-xl border border-divider overflow-hidden">
          <div className="px-4 py-3 border-b border-divider">
            <h2 className="font-semibold text-base text-foreground-primary">Potential Trigger Foods</h2>
            <p className="text-xs text-foreground-muted mt-0.5">
              Foods eaten before logged symptoms, ranked by frequency
            </p>
          </div>

          {top5.length === 0 ? (
            <div className="px-4 py-8 text-center">
              <p className="text-foreground-muted text-sm">No data yet</p>
              <p className="text-foreground-muted text-xs mt-1 opacity-60">
                Log meals and symptoms on the Track page to see correlations
              </p>
            </div>
          ) : (
            <>
              <ul>
                {top5.map((c, i) => (
                  <li
                    key={c.foodId}
                    className={`flex items-center justify-between px-4 py-3 ${i < top5.length - 1 ? "border-b border-divider" : ""}`}
                  >
                    <div>
                      <p className="text-sm font-medium text-foreground-primary">{c.name}</p>
                      <p className="text-xs text-foreground-muted">{c.category}</p>
                    </div>
                    <span className="text-xs text-foreground-muted shrink-0">{c.count}×</span>
                  </li>
                ))}
              </ul>
              {triggers.length > 5 && (
                <div className="border-t border-divider">
                  <Link
                    to="/analysis/triggers"
                    className="block w-full px-4 py-3 text-sm text-green-600 font-medium text-center"
                  >
                    View all {triggers.length} foods
                  </Link>
                </div>
              )}
            </>
          )}
        </div>

        <div className="bg-background-primary rounded-xl border border-divider overflow-hidden">
          <div className="px-4 py-3 border-b border-divider">
            <h2 className="font-semibold text-base text-foreground-primary">FODMAP Category Sensitivity</h2>
            <p className="text-xs text-foreground-muted mt-0.5">
              Categories ranked by how often high-scoring foods appeared before symptoms
            </p>
          </div>

          {!hasData ? (
            <div className="px-4 py-8 text-center">
              <p className="text-foreground-muted text-sm">No data yet</p>
              <p className="text-foreground-muted text-xs mt-1 opacity-60">
                Log meals and symptoms on the Track page to see correlations
              </p>
            </div>
          ) : (
            <FodmapCategoryBars categories={categoryRanking} />
          )}
        </div>

      </div>
    </div>
  );
}

export default SymptomAnalysis;
