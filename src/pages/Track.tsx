import { useContext, useState } from "react";
import NavBar from "../components/NavBar";
import MonthCalendar from "../components/MonthCalendar";
import DateNav from "../components/DateNav";
import PillButton from "../components/PillButton";
import FoodPicker from "../components/FoodPicker";
import Score from "../components/Score";
import SymptomSheet from "../components/SymptomSheet";
import SymptomCard from "../components/SymptomCard";
import AppContext, { ACTIONS, MealType, SymptomEntry } from "../context/AppContext";
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

const mealDot: Record<MealType, string> = {
  breakfast: "bg-yellow-400",
  lunch: "bg-orange-400",
  dinner: "bg-indigo-400",
};

function Track() {
  const { state, dispatch } = useContext(AppContext);
  const [selectedDate, setSelectedDate] = useState(() => toDateString(new Date()));
  const [addingToMeal, setAddingToMeal] = useState<MealType | null>(null);
  const [showSymptomSheet, setShowSymptomSheet] = useState(false);

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

  const handleLogSymptom = (entry: SymptomEntry) => {
    dispatch({ type: ACTIONS.LOG_SYMPTOM, payload: { date: selectedDate, entry } });
    setShowSymptomSheet(false);
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
    <div className="pb-20">
      <NavBar title="Journal" />
      <MonthCalendar
        selectedDate={selectedDate}
        onSelectDate={setSelectedDate}
        maxDate={today}
        meals={state.meals}
        symptoms={state.symptoms}
      />
      <DateNav
        date={selectedDate}
        onPrevDay={() => setSelectedDate((d) => adjustDate(d, -1))}
        onNextDay={() => setSelectedDate((d) => adjustDate(d, 1))}
        nextDayDisabled={selectedDate >= today}
      />
      <div className="p-3">
        {(() => {
          const daySymptoms = state.symptoms[selectedDate] ?? [];
          const symptomCards = (context: MealType | "morning") =>
            daySymptoms
              .filter((e) => e.mealContext === context)
              .map((entry) => (
                <SymptomCard
                  key={entry.id}
                  entry={entry}
                  onRemove={() =>
                    dispatch({
                      type: ACTIONS.REMOVE_SYMPTOM,
                      payload: { date: selectedDate, id: entry.id },
                    })
                  }
                />
              ));

          const morningCards = symptomCards("morning");

          return (
            <>
              {morningCards.length > 0 && (
                <section className="mb-5">
                  <h2 className="font-semibold text-base mb-2 text-gray-700">Morning</h2>
                  {morningCards}
                </section>
              )}

              {meals.map((meal) => (
                <section key={meal} className="mb-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${mealDot[meal]}`} />
                    <h2 className="font-semibold text-base text-gray-700">{mealLabel[meal]}</h2>
                  </div>
                  <div className="bg-white rounded-xl border border-gray-100 overflow-hidden mb-2">
                    {dayMeals[meal].length === 0 ? (
                      <p className="px-4 py-3 text-sm text-gray-300">No foods logged</p>
                    ) : (
                      dayMeals[meal].map(({ foodId, quantity }, i) => {
                        const food = fodmap.find((f) => f.id === foodId);
                        if (!food) return null;
                        return (
                          <div
                            key={`${foodId}-${i}`}
                            className={`flex items-center justify-between px-4 py-3 ${i < dayMeals[meal].length - 1 ? "border-b border-gray-100" : ""}`}
                          >
                            <div>
                              <p className="text-base font-medium text-gray-900">{food.name}</p>
                              <p className="text-sm text-gray-400">
                                {food.category} · {QUANTITY_LABELS[quantity - 1]}
                              </p>
                            </div>
                            <div className="flex items-center gap-3">
                              <Score
                                text={food.fodmap}
                                score={food.fodmap === "high" ? 2 : 0}
                              />
                              <button
                                onClick={() =>
                                  dispatch({
                                    type: ACTIONS.REMOVE_MEAL_FOOD,
                                    payload: { date: selectedDate, meal, index: i },
                                  })
                                }
                                aria-label={`Remove ${food.name}`}
                                className="p-1 text-gray-300 text-xl leading-none"
                              >
                                ×
                              </button>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                  {symptomCards(meal)}
                  <PillButton
                    onClick={() => setAddingToMeal(meal)}
                    className="py-2 px-4 w-full"
                  >
                    + Add food
                  </PillButton>
                </section>
              ))}
            </>
          );
        })()}
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-10 flex justify-center">
        <div className="w-full max-w-screen-sm bg-white border-t border-gray-200 px-4 py-3">
          <button
            onClick={() => setShowSymptomSheet(true)}
            className="w-full bg-green-400 text-white rounded-full py-3 font-semibold"
          >
            Log Symptom
          </button>
        </div>
      </div>

      {showSymptomSheet && (
        <SymptomSheet
          existingSymptoms={state.symptoms[selectedDate] ?? []}
          onLog={handleLogSymptom}
          onClose={() => setShowSymptomSheet(false)}
        />
      )}
    </div>
  );
}

export default Track;
