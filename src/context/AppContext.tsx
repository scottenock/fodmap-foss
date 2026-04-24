import { Dispatch, createContext, useEffect, useReducer } from "react";

type AppProvider = {
  children: React.ReactNode;
  initialState?: AppState;
};

type ActionProps = {
  type: string;
  payload?: unknown;
};

type DayLog = Record<string, number>;
export type FoodLog = Record<string, DayLog>;

export type MealType = "breakfast" | "lunch" | "dinner";
export type MealEntry = { foodId: string; quantity: number };
type DayMeals = Record<MealType, MealEntry[]>;
export type MealLog = Record<string, DayMeals>;

type AppState = {
  sortOrder: string;
  favorites: string[];
  log: FoodLog;
  meals: MealLog;
};

type ContextProps = {
  state: AppState;
  dispatch: Dispatch<ActionProps>;
};

export enum ACTIONS {
  ALPHABETICAL_ORDER = "ALPHABETICAL_ORDER",
  HIGH_LOW_ORDER = "HIGH_LOW_ORDER",
  LOW_HIGH_ORDER = "LOW_HIGH_ORDER",
  TOGGLE_FAVORITE = "TOGGLE_FAVORITE",
  LOG_FOOD = "LOG_FOOD",
  UNLOG_FOOD = "UNLOG_FOOD",
  ADD_MEAL_FOOD = "ADD_MEAL_FOOD",
  REMOVE_MEAL_FOOD = "REMOVE_MEAL_FOOD",
}

const STORAGE_KEY = "fodmap-foss";

const defaultState: AppState = {
  sortOrder: "a-z",
  favorites: [],
  log: {},
  meals: {},
};

const migrateMeals = (raw: unknown): MealLog => {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return {};
  const result: MealLog = {};
  for (const [date, dayMeals] of Object.entries(raw as Record<string, unknown>)) {
    if (!dayMeals || typeof dayMeals !== "object") continue;
    const migrated = emptyDayMeals();
    for (const mealType of ["breakfast", "lunch", "dinner"] as MealType[]) {
      const entries = (dayMeals as Record<string, unknown>)[mealType];
      if (Array.isArray(entries)) {
        migrated[mealType] = entries.map((e) =>
          typeof e === "string" ? { foodId: e, quantity: 3 } : (e as MealEntry)
        );
      }
    }
    result[date] = migrated;
  }
  return result;
};

const loadState = (): AppState => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    const parsed = stored ? (JSON.parse(stored) as Record<string, unknown>) : {};
    return {
      ...defaultState,
      favorites: Array.isArray(parsed.favorites)
        ? (parsed.favorites as string[])
        : [],
      log:
        parsed.log && typeof parsed.log === "object" && !Array.isArray(parsed.log)
          ? (parsed.log as FoodLog)
          : {},
      meals: migrateMeals(parsed.meals),
    };
  } catch {
    return defaultState;
  }
};

const emptyDayMeals = (): DayMeals => ({
  breakfast: [],
  lunch: [],
  dinner: [],
});

export const AppProvider = ({ children, initialState }: AppProvider) => {
  const reducer = (state: AppState, action: ActionProps) => {
    switch (action.type) {
      case ACTIONS.ALPHABETICAL_ORDER:
        return { ...state, sortOrder: "a-z" };
      case ACTIONS.HIGH_LOW_ORDER:
        return { ...state, sortOrder: "h-l" };
      case ACTIONS.LOW_HIGH_ORDER:
        return { ...state, sortOrder: "l-h" };
      case ACTIONS.TOGGLE_FAVORITE: {
        const id = action.payload as string;
        const favorites = state.favorites.includes(id)
          ? state.favorites.filter((f) => f !== id)
          : [...state.favorites, id];
        return { ...state, favorites };
      }
      case ACTIONS.LOG_FOOD: {
        const { id, date } = action.payload as { id: string; date: string };
        const dayLog = state.log[date] ?? {};
        return {
          ...state,
          log: {
            ...state.log,
            [date]: { ...dayLog, [id]: (dayLog[id] ?? 0) + 1 },
          },
        };
      }
      case ACTIONS.UNLOG_FOOD: {
        const { id, date } = action.payload as { id: string; date: string };
        const dayLog = state.log[date] ?? {};
        const currentCount = dayLog[id] ?? 0;
        if (currentCount <= 1) {
          const remainingDay = Object.fromEntries(
            Object.entries(dayLog).filter(([k]) => k !== id)
          );
          const newLog =
            Object.keys(remainingDay).length === 0
              ? Object.fromEntries(
                  Object.entries(state.log).filter(([k]) => k !== date)
                )
              : { ...state.log, [date]: remainingDay };
          return { ...state, log: newLog };
        }
        return {
          ...state,
          log: {
            ...state.log,
            [date]: { ...dayLog, [id]: currentCount - 1 },
          },
        };
      }
      case ACTIONS.ADD_MEAL_FOOD: {
        const { date, meal, foodId, quantity } = action.payload as {
          date: string;
          meal: MealType;
          foodId: string;
          quantity: number;
        };
        const dayMeals = state.meals[date] ?? emptyDayMeals();
        return {
          ...state,
          meals: {
            ...state.meals,
            [date]: { ...dayMeals, [meal]: [...dayMeals[meal], { foodId, quantity }] },
          },
        };
      }
      case ACTIONS.REMOVE_MEAL_FOOD: {
        const { date, meal, index } = action.payload as {
          date: string;
          meal: MealType;
          index: number;
        };
        const dayMeals = state.meals[date] ?? emptyDayMeals();
        const updatedMeal = [
          ...dayMeals[meal].slice(0, index),
          ...dayMeals[meal].slice(index + 1),
        ];
        const newDayMeals = { ...dayMeals, [meal]: updatedMeal };
        const isEmpty = Object.values(newDayMeals).every(
          (arr) => arr.length === 0
        );
        const newMeals = isEmpty
          ? Object.fromEntries(
              Object.entries(state.meals).filter(([k]) => k !== date)
            )
          : { ...state.meals, [date]: newDayMeals };
        return { ...state, meals: newMeals };
      }
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(
    reducer,
    initialState,
    (init) => init ?? loadState()
  );

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        favorites: state.favorites,
        log: state.log,
        meals: state.meals,
      })
    );
  }, [state.favorites, state.log, state.meals]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

const AppContext = createContext<ContextProps>({
  state: defaultState,
  dispatch: () => null,
});

export default AppContext;
