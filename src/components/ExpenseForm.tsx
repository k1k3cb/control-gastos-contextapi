import DatePicker from 'react-date-picker';
import { categories } from '../data/categories';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';



type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const ExpenseForm = () => {
  return (
    <form className='space-y-5'>
      <legend className='uppercase text-center text-2xl font-black border-b-4 border-blue-500 py-2'>
        Nuevo gasto
      </legend>

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
        />
      </div>

      <div className='flex flex-col gP-2'>
        <label htmlFor='amout' className='text-xl'>
          Cantidad:
        </label>
        <input
          type='number'
          name='amout'
          id='amout'
          placeholder='Añade la cantidad del gasto: ej. 300 '
          className='bg-slate-100 p-2'
        />
      </div>

      <div className='flex flex-col gP-2'>
        <label htmlFor='category' className='text-xl'>
          Categoría:
        </label>
        <select name='category' id='category' className='bg-slate-100 p-2'>
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
        <DatePicker className='bg-slate-100 p-2 border-0' />
      </div>
      <input
        type='submit'
        className='bg-blue-600 cursor-pointer w-full p-2 text-white uppercase font-bold rounded-lg'
        value={'Añadir Gasto'}
      />
    </form>
  );
};

export default ExpenseForm;
