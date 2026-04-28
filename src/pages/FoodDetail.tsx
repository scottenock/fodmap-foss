import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import fodmap from "../data/fodmap";
import NavBar from "../components/NavBar";
import Score from "../components/Score";
import StarButton from "../components/StarButton";
import FoodLogBanner from "../components/FoodLogBanner";
import AppContext, { ACTIONS } from "../context/AppContext";
import FodmapCategoryBars from "../components/FodmapCategoryBars";
import { useFodmapCategoryRanking } from "../hooks/useFodmapCategoryRanking";

const styles = {
  container: "p-3 flex my-1 shadow-md mb-2 justify-between",
};

const fodmapRating = (score?: number) => {
  if (score === 0) return "Low";
  if (score === 1) return "Medium";
  if (score === 2) return "High";
  return "N/A";
};

const toDateString = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

const adjustDate = (dateStr: string, days: number): string => {
  const d = new Date(dateStr + "T00:00:00");
  d.setDate(d.getDate() + days);
  return toDateString(d);
};

function FoodDetail() {
  const { id } = useParams();
  const { state, dispatch } = useContext(AppContext);
  const [selectedDate, setSelectedDate] = useState(() => toDateString(new Date()));
  const food = fodmap.find((f) => f.id === id);

  if (!food) return null;

  const categoryRanking = useFodmapCategoryRanking();
  const hasRankingData = categoryRanking.some((c) => c.score > 0);

  const sensitiveCategories = food.details
    ? categoryRanking.filter(
        (c) => c.percentage >= 50 && (food.details![c.key] ?? 0) === 2
      )
    : [];

  const today = toDateString(new Date());
  const ratingColour = food.fodmap === "high" ? "bg-red-500" : "bg-green-300";
  const isFavorited = state.favorites.includes(food.id);
  const logCount = state.log[selectedDate]?.[food.id] ?? 0;

  return (
    <div>
      <NavBar goesHome={false} />
      <section className={styles.container}>
        <div>
          <div className="flex items-center gap-2">
            <p className="text-3xl">{food.name}</p>
            <StarButton
              isFavorited={isFavorited}
              onToggle={() =>
                dispatch({ type: ACTIONS.TOGGLE_FAVORITE, payload: food.id })
              }
            />
          </div>
          <p className="text-base">{food.category}</p>
          <p className="text-base">Max Quantity: {food.qty ?? "unspecified"}</p>
        </div>
        <div className="flex items-center my-1">
          <span className={`rounded-full w-5 h-5 block mr-2 ${ratingColour}`} />
          <p className="text-2xl">{food.fodmap.toUpperCase()}</p>
        </div>
      </section>
      <section className="p-3">
        <h2 className="text-base font-bold mb-3">Details:</h2>
        <p className="text-base font-medium">Oligos</p>
        <Score
          score={food.details?.oligos ?? 3}
          text={fodmapRating(food.details?.oligos)}
        />
        <div className="border-b-2 border-gray-300 mb-2" />
        <p className="text-base font-medium">Lactose</p>
        <Score
          score={food.details?.lactose ?? 3}
          text={fodmapRating(food.details?.lactose)}
        />
        <div className="border-b-2 border-gray-300 mb-2" />
        <p className="text-base font-medium">Fructose</p>
        <Score
          score={food.details?.fructose ?? 3}
          text={fodmapRating(food.details?.fructose)}
        />
        <div className="border-b-2 border-gray-300 mb-2" />
        <p className="text-base font-medium">Polyols</p>
        <Score
          score={food.details?.polyols ?? 3}
          text={fodmapRating(food.details?.polyols)}
        />
        <div className="border-b-2 border-gray-300" />
      </section>
      {sensitiveCategories.length > 0 && (
        <div className="mx-3 mb-3 rounded-xl bg-amber-50 border border-amber-200 px-4 py-3 flex gap-3">
          <span className="text-amber-500 text-lg leading-none shrink-0">⚠</span>
          <div>
            <p className="text-sm font-semibold text-amber-800">Likely sensitive to this food</p>
            <p className="text-xs text-amber-700 mt-0.5">
              This food is high in{" "}
              {sensitiveCategories.map((c) => c.label).join(" and ")}, which{" "}
              {sensitiveCategories.length === 1 ? "is" : "are"} among your most triggered categories.
            </p>
          </div>
        </div>
      )}
      {hasRankingData && (
        <section className="mx-3 mb-3 rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-100">
            <h2 className="font-semibold text-base">Your FODMAP Sensitivity</h2>
            <p className="text-xs text-gray-400 mt-0.5">Based on your logged symptoms</p>
          </div>
          <FodmapCategoryBars categories={categoryRanking} />
        </section>
      )}
      <FoodLogBanner
        date={selectedDate}
        onPrevDay={() => setSelectedDate((d) => adjustDate(d, -1))}
        onNextDay={() => setSelectedDate((d) => adjustDate(d, 1))}
        nextDayDisabled={selectedDate >= today}
        count={logCount}
        onLog={() =>
          dispatch({ type: ACTIONS.LOG_FOOD, payload: { id: food.id, date: selectedDate } })
        }
        onUnlog={() =>
          dispatch({ type: ACTIONS.UNLOG_FOOD, payload: { id: food.id, date: selectedDate } })
        }
      />
    </div>
  );
}

export default FoodDetail;
