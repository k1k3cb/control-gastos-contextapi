import { useMemo, useState } from 'react';
import { useBudget } from '../hooks/useBudget';

const BudgetForm = () => {
  const [budget, setBudget] = useState(0);
  const {  dispatch } = useBudget();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // setBudget(Number(e.target.value));
    // setBudget(+e.target.value);
    setBudget(e.target.valueAsNumber);
  };

  const isValid = useMemo(() => {
    return isNaN(budget) || budget <= 0;
  }, [budget]);

const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  dispatch({ type: 'add-budget', payload: { budget } });
}



  return (
    <form className='space-y-5' onSubmit={handleSubmit}>
      <div className='flex flex-col space-y-5'>
        <label
          htmlFor='budgetID'
          className='text-4xl text-blue-600 font-bold text-center'
        >
          Definir Presupuesto
        </label>
      </div>
      <input
        id='budgetID'
        type='number'
        className='w-full bg-white border border-gray-200 p-2'
        placeholder='Define tu presupuestoo'
        name='budget'
        value={budget}
        onChange={handleChange}
      />
      <input
        type='submit'
        value='Definir presupuesto'
        className='bg-blue-700 hover:bg-blue-700 cursor-pointer w-full p-2 text-white font-bold uppercase disabled:opacity-40 disabled:cursor-default'
        disabled={isValid}
      />
    </form>
  );
};

export default BudgetForm;
