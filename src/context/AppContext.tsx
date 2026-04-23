import { Dispatch, createContext, useEffect, useReducer } from "react";

type AppProvider = {
  children: React.ReactNode;
  initialState?: AppState;
};

type ActionProps = {
  type: string;
  payload?: unknown;
};

type AppState = {
  sortOrder: string;
  favorites: string[];
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
}

const STORAGE_KEY = "fodmap-foss";

const defaultState: AppState = { sortOrder: "a-z", favorites: [] };

const loadState = (): AppState => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    const parsed = stored ? (JSON.parse(stored) as Record<string, unknown>) : {};
    return {
      ...defaultState,
      favorites: Array.isArray(parsed.favorites) ? (parsed.favorites as string[]) : [],
    };
  } catch {
    return defaultState;
  }
};

export const AppProvider = ({
  children,
  initialState,
}: AppProvider) => {
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
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ favorites: state.favorites }));
  }, [state.favorites]);

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
