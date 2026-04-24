import { useContext, useState } from "react";
import NavBar from "../components/NavBar";
import DateNav from "../components/DateNav";
import PillButton from "../components/PillButton";
import FoodPicker from "../components/FoodPicker";
import Score from "../components/Score";
import AppContext, { ACTIONS, MealType } from "../context/AppContext";
import { Fodmap } from "../types/Fodmap";
import fodmap from "../data/fodmap";

const QUANTITY_LABELS = ["Tiny", "Small", "Medium", "Large", "Loads"];

const toDateString = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

const adjustDate = (dateStr: string, days: number): string => {
  const d = new Date(dateStr + "T00:00:00");
  d.setDate(d.getDate() + days);
  return toDateString(d);
};

const meals: MealType[] = ["breakfast", "lunch", "dinner"];

const mealLabel: Record<MealType, string> = {
  breakfast: "Breakfast",
  lunch: "Lunch",
  dinner: "Dinner",
};

function Track() {
  const { state, dispatch } = useContext(AppContext);
  const [selectedDate, setSelectedDate] = useState(() =>
    toDateString(new Date()),
  );
  const [addingToMeal, setAddingToMeal] = useState<MealType | null>(null);

  const today = toDateString(new Date());
  const dayMeals = state.meals[selectedDate] ?? {
    breakfast: [],
    lunch: [],
    dinner: [],
  };

  const handleSelectFood = (food: Fodmap, quantity: number) => {
    if (!addingToMeal) return;
    dispatch({
      type: ACTIONS.ADD_MEAL_FOOD,
      payload: { date: selectedDate, meal: addingToMeal, foodId: food.id, quantity },
    });
    setAddingToMeal(null);
  };

  if (addingToMeal) {
    const existingFoodIds = dayMeals[addingToMeal].map((e) => e.foodId);
    return (
      <FoodPicker
        meal={mealLabel[addingToMeal]}
        existingFoodIds={existingFoodIds}
        onSelect={handleSelectFood}
        onClose={() => setAddingToMeal(null)}
      />
    );
  }

  return (
    <div>
      <NavBar />
      <DateNav
        date={selectedDate}
        onPrevDay={() => setSelectedDate((d) => adjustDate(d, -1))}
        onNextDay={() => setSelectedDate((d) => adjustDate(d, 1))}
        nextDayDisabled={selectedDate >= today}
      />
      <div className="p-3">
        {meals.map((meal) => (
          <section key={meal} className="mb-5">
            <h2 className="font-semibold text-base mb-2">{mealLabel[meal]}</h2>
            {dayMeals[meal].map(({ foodId, quantity }, i) => {
              const food = fodmap.find((f) => f.id === foodId);
              if (!food) return null;
              return (
                <div
                  key={`${foodId}-${i}`}
                  className="flex items-center justify-between py-2 border-b border-gray-200"
                >
                  <div>
                    <p className="text-base">{food.name}</p>
                    <p className="text-sm text-gray-400">
                      {food.category} · {QUANTITY_LABELS[quantity - 1]}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Score
                      text={food.fodmap}
                      score={food.fodmap === "high" ? 2 : 0}
                      reversed={true}
                    />
                    <button
                      onClick={() =>
                        dispatch({
                          type: ACTIONS.REMOVE_MEAL_FOOD,
                          payload: { date: selectedDate, meal, index: i },
                        })
                      }
                      aria-label={`Remove ${food.name}`}
                      className="p-2 text-gray-400 text-xl leading-none"
                    >
                      ×
                    </button>
                  </div>
                </div>
              );
            })}
            <PillButton
              onClick={() => setAddingToMeal(meal)}
              className="mt-3 py-2 px-4 w-full"
            >
              + Add food
            </PillButton>
          </section>
        ))}
      </div>
    </div>
  );
}

export default Track;
