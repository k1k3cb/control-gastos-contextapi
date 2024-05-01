import { useEffect, useState } from 'react';
import 'react-calendar/dist/Calendar.css';
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import { categories } from '../data/categories';
import { useBudget } from '../hooks/useBudget';
import { DraftExpense, Value } from '../types';
import ErrorMessage from './ErrorMessage';

const ExpenseForm = () => {



  
  const [expense, setExpense] = useState<DraftExpense>({
    amount: 0,
    expenseName: '',
    category: '',
    date: new Date()
  });

  const [error, setError] = useState('');
  const [previousAmount, setPreviousAmount] = useState(0);

  const { dispatch, state ,remainingBudget } = useBudget();

  useEffect(() => {
    if (state.editingId) {
      const editingExpense = state.expenses.filter(
        currentExpense => currentExpense.id === state.editingId
      )[0];
      setExpense(editingExpense);
      setPreviousAmount(editingExpense.amount);
    }
  }, [state.editingId]);

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    const isAmountField = ['amount'].includes(name);
    setExpense({ ...expense, [name]: isAmountField ? Number(value) : value });
  };
  const handleChangeDate = (value: Value) => {
    setExpense({ ...expense, date: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //validación
    if (Object.values(expense).includes('')) {
      setError('Todos los campos son obligatorios');
      return;
    }

    //validación de  límite de presupuesto
    if ((expense.amount - previousAmount) > remainingBudget) {
      setError('El gasto supera el presupuesto restante');
      return;
    }


    //Agregar o actualizar  gasto
    if (state.editingId) {
      dispatch({
        type: 'update-expense',
        payload: { expense: { id: state.editingId, ...expense } }
      });
    } else {
      dispatch({ type: 'add-expense', payload: { expense } });
    }

    //limpiar formulario
    setExpense({
      amount: 0,
      expenseName: '',
      category: '',
      date: new Date()
    });
    setPreviousAmount(0);
  };

  return (
    <form className='space-y-5 ' onSubmit={handleSubmit}>
      <legend className='uppercase text-center text-2xl font-black border-b-4 border-blue-500 py-2'>
        {state.editingId ? 'Editar Gasto' : 'Añadir Gasto'}
      </legend>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <div className='flex flex-col gP-2'>
        <label htmlFor='expenseName' className='text-xl'>
          Nombre Gasto:
        </label>
        <input
          type='text'
          name='expenseName'
          id='expenseName'
          placeholder='Añade el nombre del gasto '
          className='bg-slate-100 p-2'
          value={expense.expenseName}
          onChange={handleChange}
        />
      </div>

      <div className='flex flex-col gP-2'>
        <label htmlFor='amount' className='text-xl'>
          Cantidad:
        </label>
        <input
          type='number'
          name='amount'
          id='amount'
          placeholder='Añade la cantidad del gasto: ej. 300 '
          className='bg-slate-100 p-2'
          value={expense.amount}
          onChange={handleChange}
        />
      </div>

      <div className='flex flex-col gP-2'>
        <label htmlFor='category' className='text-xl'>
          Categoría:
        </label>
        <select
          name='category'
          id='category'
          className='bg-slate-100 p-2'
          value={expense.category}
          onChange={handleChange}
        >
          <option value=''>-- Seleccione --</option>
          {categories.map(category => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div className='flex flex-col gP-2'>
        <label htmlFor='amout' className='text-xl'>
          Fecha gasto:
        </label>
        <DatePicker
          className='bg-slate-100 p-2 border-0'
          value={expense.date}
          onChange={handleChangeDate}
        />
      </div>
      <input
        type='submit'
        className='bg-blue-600 cursor-pointer w-full p-2 text-white uppercase font-bold rounded-lg'
        value={state.editingId ? 'Editar Gasto' : 'Añadir Gasto'}
      />
    </form>
  );
};

export default ExpenseForm;
