import { useContext } from "react";
import { useParams } from "react-router-dom";
import fodmap from "../data/fodmap";
import NavBar from "../components/NavBar";
import Score from "../components/Score";
import StarButton from "../components/StarButton";
import AppContext, { ACTIONS } from "../context/AppContext";
import FodmapCategoryBars from "../components/FodmapCategoryBars";
import { useFodmapCategoryRanking } from "../hooks/useFodmapCategoryRanking";

const fodmapRating = (score?: number) => {
  if (score === 0) return "Low";
  if (score === 1) return "Medium";
  if (score === 2) return "High";
  return "N/A";
};

const detailFields = [
  { key: "oligos"   as const, label: "Oligos" },
  { key: "lactose"  as const, label: "Lactose" },
  { key: "fructose" as const, label: "Fructose" },
  { key: "polyols"  as const, label: "Polyols" },
];

function FoodDetail() {
  const { id } = useParams();
  const { state, dispatch } = useContext(AppContext);
  const food = fodmap.find((f) => f.id === id);

  if (!food) return null;

  const categoryRanking = useFodmapCategoryRanking();
  const hasRankingData = categoryRanking.some((c) => c.score > 0);

  const sensitiveCategories = food.details
    ? categoryRanking.filter(
        (c) => c.percentage >= 50 && (food.details![c.key] ?? 0) === 2
      )
    : [];

  const isFavorited = state.favorites.includes(food.id);

  return (
    <div className="pb-6">
      <NavBar goesHome={false} />

      <div className="bg-background-primary border border-divider mx-3 mt-3 rounded-2xl px-4 py-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-2xl font-bold text-foreground-primary">{food.name}</h1>
              <StarButton
                isFavorited={isFavorited}
                onToggle={() =>
                  dispatch({ type: ACTIONS.TOGGLE_FAVORITE, payload: food.id })
                }
              />
            </div>
            <p className="text-sm text-foreground-muted mt-0.5">{food.category}</p>
            {food.qty && (
              <p className="text-sm text-foreground-muted mt-0.5">Max: {food.qty}</p>
            )}
          </div>
          <Score
            text={food.fodmap.toUpperCase()}
            score={food.fodmap === "high" ? 2 : 0}
          />
        </div>
      </div>

      {sensitiveCategories.length > 0 && (
        <div className="mx-3 mt-3 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 px-4 py-3 flex gap-3">
          <span className="text-amber-500 text-lg leading-none shrink-0">⚠</span>
          <div>
            <p className="text-sm font-semibold text-amber-800 dark:text-amber-300">Likely sensitive to this food</p>
            <p className="text-xs text-amber-700 dark:text-amber-400 mt-0.5">
              This food is high in{" "}
              {sensitiveCategories.map((c) => c.label).join(" and ")}, which{" "}
              {sensitiveCategories.length === 1 ? "is" : "are"} among your most triggered categories.
            </p>
          </div>
        </div>
      )}

      <section className="mx-3 mt-3 rounded-xl bg-background-primary border border-divider overflow-hidden">
        <div className="px-4 py-3 border-b border-divider">
          <h2 className="font-semibold text-base text-foreground-primary">FODMAP Breakdown</h2>
        </div>
        {detailFields.map(({ key, label }, i) => {
          const score = food.details?.[key] ?? 3;
          return (
            <div
              key={key}
              className={`flex items-center justify-between px-4 py-3 ${i < detailFields.length - 1 ? "border-b border-divider" : ""}`}
            >
              <p className="text-sm font-medium text-foreground-primary">{label}</p>
              <Score score={score} text={fodmapRating(food.details?.[key])} />
            </div>
          );
        })}
      </section>

      {hasRankingData && (
        <section className="mx-3 mt-3 rounded-xl border border-divider bg-background-primary overflow-hidden">
          <div className="px-4 py-3 border-b border-divider">
            <h2 className="font-semibold text-base text-foreground-primary">Your FODMAP Sensitivity</h2>
            <p className="text-xs text-foreground-muted mt-0.5">Based on your logged symptoms</p>
          </div>
          <FodmapCategoryBars categories={categoryRanking} />
        </section>
      )}
    </div>
  );
}

export default FoodDetail;
