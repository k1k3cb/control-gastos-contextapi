import { createContext, useMemo, useReducer } from 'react';
import {
  BudgetActions,
  BudgetState,
  budgetReducer,
  initialState
} from '../reducers/budget-reducer';

interface BudgetContextProps {
  state: BudgetState;
  dispatch: React.Dispatch<BudgetActions>;
  totalExpenses: number;
  remainingBudget: number
}
interface BudgetProviderProps {
  children: React.ReactNode;
}

export const BudgetContext = createContext<BudgetContextProps>(
  {} as BudgetContextProps
);

export const BudgetProvider = ({ children }: BudgetProviderProps) => {
  const [state, dispatch] = useReducer(budgetReducer, initialState);

  const totalExpenses = useMemo(
    () => state.expenses.reduce((total, expense) => expense.amount + total, 0),
    [state.expenses]
  );

  const remainingBudget = state.budget - totalExpenses;

  return (
    <BudgetContext.Provider value={{ state, dispatch , totalExpenses, remainingBudget}}>
      {children}
    </BudgetContext.Provider>
  );
};
