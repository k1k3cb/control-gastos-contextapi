import { createContext, useReducer } from 'react';
import {
  BudgetActions,
  BudgetState,
  budgetReducer,
  initialState
} from '../reducers/budget-reducer';

interface BudgetContextProps {
  state: BudgetState;
  dispatch: React.Dispatch<BudgetActions>;
}
interface BudgetProviderProps {
  children: React.ReactNode;
}

export const BudgetContext = createContext<BudgetContextProps>(
  {} as BudgetContextProps
);

export const BudgetProvider = ({ children }: BudgetProviderProps) => {
  const [state, dispatch] = useReducer(budgetReducer, initialState);

  return (
    <BudgetContext.Provider value={{ state, dispatch }}>
      {children}
    </BudgetContext.Provider>
  );
};
