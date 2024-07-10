import { Dispatch, createContext, useReducer } from "react";
import alphabetical from "../data/alphabetical";
import high from "../data/high";
import low from "../data/low";
import { Fodmap } from "../types/Fodmap";

type AppProvider = {
  children: React.ReactNode;
  initialState?: AppState;
};

type ActionProps = {
  type: string;
  payload?: unknown;
};

type AppState = {
  foods: Fodmap[];
  sortOrder: string;
};

type ContextProps = {
  state: AppState;
  dispatch: Dispatch<ActionProps>;
};

export enum ACTIONS {
  ALPHABETICAL_ORDER = "ALPHABETICAL_ORDER",
  HIGH_LOW_ORDER = "HIGH_LOW_ORDER",
  LOW_HIGH_ORDER = "LOW_HIGH_ORDER",
}

const defaultState: AppState = { foods: alphabetical, sortOrder: "a-z" };

export const AppProvider = ({
  children,
  initialState = defaultState,
}: AppProvider) => {
  const reducer = (state: AppState, action: ActionProps) => {
    switch (action.type) {
      case ACTIONS.ALPHABETICAL_ORDER:
        return { foods: alphabetical, sortOrder: "a-z" };
      case ACTIONS.HIGH_LOW_ORDER:
        return { foods: [...high, ...low], sortOrder: "h-l" };
      case ACTIONS.LOW_HIGH_ORDER:
        return { foods: [...low, ...high], sortOrder: "l-h" };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

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
