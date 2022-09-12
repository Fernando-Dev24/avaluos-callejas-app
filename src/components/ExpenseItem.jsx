import React from 'react';
/* hooks */
import { useNewAvaluo } from '../contexts/NewAvaluoContext';
/* assets */
/* assets */
import { FiPlusCircle, FiEdit2, FiTrash2 } from 'react-icons/fi';
import { FaExclamation } from 'react-icons/fa';

export const ExpenseItem = ({
   expense,
   index,
   setExpenseToEdit,
   setTargetIndex,
   setShowExpensesModal,
}) => {
   /* hooks */
   const { newAvaluo, setNewAvaluo } = useNewAvaluo();
   const { expenses } = newAvaluo;

   /* props */
   const { id, description, price } = expense;

   /* functions */
   const handleDelete = (e) => {
      e.preventDefault();
      const targetId = e.target.id;
      
      // Filter all expenses that are not equal to targetId constant
      const newExpenses = expenses.filter(({ id }) => id !== targetId);
      
      // Update newAvaluoContext
      setNewAvaluo({
         ...newAvaluo,
         expenses: newExpenses,
      });
   };

   /* handleEdit */
   const handleEdit = (e) => {
      e.preventDefault();
      const targetId = e.target.id;
      // Capture target expense using its id
      const [ targetExpense ] = expenses.filter(({ id }) => id === targetId);
      // Update expense to edit
      setExpenseToEdit({
         state: true,
         content: targetExpense,
      });
   };

   const handleMarkAsImportant = (e, index) => {
      e.preventDefault();
      const { id: targetId } = e.target;

      // Filter the targetExpenses based on its id
      const [ targetExpense ] = expenses.filter(({ id }) => id === targetId);

      // Remove isImportant property if user clicks and its value is true
      if( targetExpense?.isImportant ) {
         const { description, id, price } = targetExpense;
         expenses[index] = { description, id, price };
         setNewAvaluo({ ...newAvaluo, expenses: expenses });
         return;
      };

      // Try to modify the expense directly
      expenses[index] = { ...targetExpense, isImportant: true, };
      setNewAvaluo({ ...newAvaluo, expenses: expenses });
   };

   /* handleAddExpense */
   const handleAddExpense = (index, e) => {
      e.preventDefault();
      setTargetIndex(index + 1);
      setShowExpensesModal(true);
   };

   return (
      <tr className='table-row-body'>
         <td>{ description }</td>
         <td>{ price }</td>
         <td>
            <button
               className='btn btn-table'
               id={ id }
               onClick={ handleEdit }>
               <FiEdit2 className='btn-icon' />
            </button>
         </td>
         <td className='btn btn-table'>
            <button
               className='btn btn-table'
               id={ id }
               onClick={ (e) => handleMarkAsImportant(e, index) }>
               <FaExclamation
                  className={ expense?.isImportant ? 'btn-icon important' : 'btn-icon' }
               />
            </button>
         </td>
         <td>
            <button
               className='btn btn-table'
               id={id}
               onClick={ handleDelete }>
               <FiTrash2 className='btn-icon' />
            </button>
         </td>
         <td className='floated-button'>
            <button
               className='btn btn-option'
               onClick={ (e) => handleAddExpense(index, e) }>
               <FiPlusCircle className='btn-icon' />
            </button>
         </td>
      </tr>
   );
};